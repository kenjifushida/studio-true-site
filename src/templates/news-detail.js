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

const NewsDetail = ({ data: {post, posts, weAre} }) => {
    const categories = weAre.nodes.map(node=>node.name);
    const newsArticle = {
        title: post.title,
        img: "",
        content: post.content,
        author: `${post.author.node.firstName} ${post.author.node.lastName}`,
        date: post.date,
        category: () => {
            const hasCategory = post.categories.nodes.find(
                    node => node.ancestors?.nodes[0].name === "we are"
                )
            return hasCategory !== -1 ? hasCategory.name : ""
            }
    };

    const newsArticles = posts.edges.map(news => ({
        date: news.node.date,
        title: news.node.title,
        slug: `/news/${news.node.slug}`,
        category: () => {
            const hasCategory = news.node.categories.nodes.find(
                    node => node.ancestors?.nodes[0].name === "we are"
                )
            return hasCategory !== -1 ? hasCategory.name : ""
            }
    }));

    const [ dateSort, setDateSort ] = useState(false);
    const [filters, setFilters] = useState(categories.map(opt=>true));
    const [filteredNews, setFilteredNews] = useState(newsArticles);
    const { height, width } = useWindowDimensions();
    const [ titleHeight, setHeight] = useState(0);
    const [previous, setPrevious] = useState(-1);
    const [next, setNext] = useState(-1);
    const ref = useRef(null);

    const handleFilterAll = () => {
        if(filters[0]) {
            setFilters([false, false, false, false, false])
        } else {
            setFilters([true, true, true, true, true])
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
        <Layout>
            <PageTitle title={"news!"} />
            <div className={styles.wrapper}>
                <SideBar>
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
                        <div className={styles.imgContainer}></div>
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
        weAre: allWpCategory(
            filter: {ancestors: {nodes: {elemMatch: {name: {eq: "we are"}}}}}
          ) {
            nodes {
              name
            }
        }
    }
`