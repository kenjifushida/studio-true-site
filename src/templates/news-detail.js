import * as React from "react"
import { useState, useEffect, useRef } from "react"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { graphql, Link } from "gatsby"
import * as styles from "../styles/newsDetail.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import PageTitle from "../components/pageTitle"
import SideBar from "../components/sideBar"

import { activeFilter } from "../pages/news"
import findCategory from "../hooks/findSortField"
import { useIntl } from "gatsby-plugin-react-intl"

const NewsDetail = ({ data: {post, posts, postsEnglish, weAre} }) => {
    // posts preprocessing
    const intl = useIntl();
    const categories = ["all", ...weAre.nodes.map(node=>node.name)];
    const newsArticle = {
        title: (intl.locale === "en") && (post.translations.length > 0) ? post.translations[0].title : post.title,
        content: (intl.locale === "en") && (post.translations.length > 0) ? post.translations[0].content : post.content,
        author: `${post.author.node.firstName} ${post.author.node.lastName}`,
        date: post.date,
        category: findCategory(post)
    };
    const initialPosts = intl.locale === "ja" ? posts : postsEnglish;
    const newsArticles = initialPosts.edges.map(news => ({
        date: news.node.date,
        title: intl.locale === "ja" ? news.node.title : news.node.translations[0].title,
        slug: `/news/${news.node.slug}`,
        category: findCategory(news.node)
    }));

    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [ dateSort, setDateSort ] = useState(true);
    const [filters, setFilters] = useState(categories.map(opt=>true));
    const [filteredNews, setFilteredNews] = useState(newsArticles);
    const { width } = useWindowDimensions();
    const [ titleHeight, setHeight] = useState(0);
    const [previous, setPrevious] = useState(-1);
    const [next, setNext] = useState(-1);
    const ref = useRef(null);

    const handleFilterAll = () => {
        if(filters[0]) {
            setFilters(categories.map(opt=>false));
        } else {
            setFilters(categories.map(opt=>true));
        }
    }

    const handleFilter = (pos) => {
        if(pos === 0) {
            return handleFilterAll()
        }
        const updatedFilterState = filters.map((item, index) => {
            if(index===0) {
                return item
            }
            if(filters[0]) {
                return index !== pos ? !item : item
            }
            return index === pos ? !item : item
        })
        setFilters([false, ...updatedFilterState.slice(1, updatedFilterState.length)])
    }

    useEffect(() => {
        setHeaderHeight(headerRef.current.clientHeight);
        setHeight(ref.current.clientHeight);
    }, [])

    useEffect(() => {
        var results = [];
        filters.forEach((filter, index) => filter ? results.push(categories[index]) : null);
        if(dateSort) {
            const sorted = [...newsArticles].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
            setFilteredNews(sorted);
        } else {
            setFilteredNews(newsArticles);
        }
        const current = filteredNews.findIndex(news => news.title === newsArticle.title);
        if(current >= 0 && current < filteredNews.length-1) {
            const n = filteredNews.slice(current+1).findIndex(post=>results.includes(post.category));
            n >= 0 ? setNext(current+1+n) : setNext(-1);
        } else {
            setNext(-1);
        }
        if(current > 0 && current <= filteredNews.length-1) {
            const p = filteredNews.slice(0, current).findLastIndex(post=>results.includes(post.category));
            p >= 0 ? setPrevious(p) : setPrevious(-1);
        } else {
            setPrevious(-1);
        }
    }, [filters, dateSort])

    return (
        <Layout headerRef={headerRef}>
            <PageTitle headerHeight={headerHeight} title={"news!"} />
            <div className={styles.wrapper}>
                <SideBar headerHeight={headerHeight}>
                    <ul>
                        <li onClick={() => setDateSort(!dateSort)}
                          style={dateSort ? activeFilter : {}}>
                            date
                        </li>
                        <li style={activeFilter}>we are</li>
                    </ul>
                    <ul>
                        {categories.map((category, idx) => (
                            <li key={idx} onClick={() => handleFilter(idx)}
                                style={filters[0] && idx===0 ? activeFilter: 
                                    filters[idx] && !filters[0] ? activeFilter:{}}>
                                        {category}
                            </li>
                        ))}
                    </ul>
                </SideBar>
                <div className={styles.main}>
                    <div className={styles.top}
                    style={width > 720 ? { marginTop: `${titleHeight + 12}px`} : {}}>
                        <p>{newsArticle.date.replaceAll("-",".")}</p>
                        <p>{newsArticle.category}</p>
                        <p>{newsArticle.author}</p>
                    </div>
                    <div className={styles.article}>
                        <p className={styles.title} ref={ref}>{newsArticle.title}</p>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: newsArticle.content}}>
                        </div>
                        <div className={styles.bottomLinks}>
                            {previous >= 0 ? <Link to={filteredNews[previous].slug}>previous?</Link> : null}
                            {next > 0 ? <Link to={filteredNews[next].slug}>next?</Link> : null}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export const Head = () => <Seo title={"News Post"} />;

export default NewsDetail

export const pageQuery = graphql`
    query PostBySlug($slug: String!) {
        post: wpPost(slug: {eq: $slug}) {
            date(formatString: "YYYY-MM-DD")
            content
            author {
              node {
                firstName
                lastName
              }
            }
            title
            categories {
                nodes {
                  ancestors {
                    nodes {
                      name
                    }
                  }
                  name
                }
            }
            featuredImage {
                node {
                  gatsbyImage(width: 720)
                }
            }
            translations {
                title
                excerpt
                content
            }
        }
        posts: allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "news"}}}}}) {
            edges {
              node {
                title
                slug
                date(formatString: "YYYY-MM-DD")
                categories {
                  nodes {
                    name
                    ancestors {
                      nodes {
                        name
                      }
                    }
                  }
                }
              }
            }
        }
        postsEnglish: allWpPost(
            filter: {categories: {nodes: {elemMatch: {name: {eq: "news"}}}}, translations: {elemMatch: {language: {code: {eq: EN}}}}}
            ) {
            edges {
              node {
                title
                slug
                date(formatString: "YYYY-MM-DD")
                categories {
                  nodes {
                    name
                    ancestors {
                      nodes {
                        name
                      }
                    }
                  }
                }
                translations {
                    title
                }
              }
            }
        }
        weAre: allWpCategory(
            filter: {ancestors: {nodes: {elemMatch: {name: {eq: "we are"}}}}}
          ) {
            nodes {
              name
            }
        }
    }
`