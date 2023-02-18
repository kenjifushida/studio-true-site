import * as React from "react"
import { useState, useEffect, useRef, useContext } from "react"
import { graphql } from "gatsby"
import * as styles from "../styles/news.module.scss"
import * as childStyles from "../styles/slideMenu.module.scss"

import Layout, { ThemeContext } from "../components/layout"
import MainNews from "../components/mainNews"
import PageTitle from "../components/pageTitle"
import Seo from "../components/seo"
import SideBar from "../components/sideBar"
import SlideMenu from "../components/slideMenu"
import ViewToggle from "../components/viewToggle"

import findCategory from "../hooks/findSortField"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { useIntl } from "gatsby-plugin-react-intl"

export const activeFilter = {
    background: "var(--primary-color)"
}

const pageTitle = "news!";
const News = ({ data: {posts, postsEnglish, weAre} }) => {
    // sidebar height
    const { width } = useWindowDimensions();
    const ref = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const initialView = useContext(ThemeContext);
    const [view, setView] = useState(initialView);
    useEffect(() => {
        setHeaderHeight(ref.current.clientHeight);
    }, [ref, width])

    // preprocessing initial news and categories
    const intl = useIntl();
    const categories = ["all", ...weAre.nodes.map(node=>node.name)];
    const initialNews = intl.locale === "ja" ? posts : postsEnglish;
    const newsArticles = initialNews.edges.map(news => ({
        date: news.node.date,
        title: intl.locale === "ja" ? news.node.title : news.node.translations[0].title,
        desc: intl.locale === "ja" ? news.node.excerpt : news.node.translations[0].excerpt,
        slug: `/news/${news.node.slug}`,
        category: findCategory(news.node),
        img: news.node.featuredImage?.node.gatsbyImage,
    }));

    const [dateSort, setDateSort] = useState(true);
    const [filters, setFilters] = useState(categories.map(opt=>true));
    const [filteredNews, setFilteredNews] = useState(newsArticles);

    const handleFilterAll = () => {
        if(filters[0]) {
            setFilters(categories.map(opt=>false))
        } else {
            setFilters(categories.map(opt=>true))
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

    useEffect(()=> {
        var results = [];
        if(filters[0]===false) {
            filters.forEach((filter, index) => filter ? results.push(categories[index]) : null)
            const filtered = newsArticles.filter(news => results.includes(news.category))
            
            if(dateSort) {
                const sorted = [...filtered].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                setFilteredNews(sorted)
            } else {
                setFilteredNews(filtered)
            }
        } else {
            if(dateSort) {
                const sorted = [...newsArticles].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                setFilteredNews(sorted)
            } else {
                setFilteredNews(newsArticles)
            }
        }
    }, [filters, dateSort])

    return (
        <Layout headerRef={ref} pageTitle={pageTitle}>
            <SlideMenu categories={categories} 
            view={view} changeView={setView}
            filters = {filters} handleFilter={handleFilter}
            dateSort={dateSort} setDateSort={setDateSort} >
                <ul>
                    <li className={childStyles.option}
                        onClick={()=>setDateSort(!dateSort)}
                        style={dateSort ? activeFilter : {}}>
                            date
                    </li>
                    <li className={childStyles.option} style={activeFilter}>
                        we are
                    </li>
                </ul>
            </SlideMenu>
            <PageTitle headerHeight={headerHeight} title={pageTitle} />
            <ViewToggle className={styles.viewSwitch}/>
            <section className={styles.content}>
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
                <MainNews filteredNews={filteredNews} />
            </section>
        </Layout>
    )
}

export const Head = () => <Seo title="News" />

export default News

export const query = graphql`
query MyQuery {
    posts: allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "news"}}}}}) {
      edges {
        node {
          date(formatString: "YYYY-MM-DD")
          title
          slug
          author {
            node {
              firstName
              lastName
            }
          }
          excerpt
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
          featuredImage {
            node {
              gatsbyImage(width: 720)
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
            date(formatString: "YYYY-MM-DD")
            slug
            author {
              node {
                firstName
                lastName
              }
            }
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
            featuredImage {
              node {
                gatsbyImage(width: 720)
              }
            }
            translations {
                slug
                title
                excerpt
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