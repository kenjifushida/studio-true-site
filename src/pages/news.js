import * as React from "react"
import { useState, useEffect, useRef, useContext } from "react"
import { graphql } from "gatsby"
import * as styles from "../styles/news.module.scss"
import * as childStyles from "../styles/slideMenu.module.scss"

import ViewToggle from "../components/viewToggle"
import Layout, { ThemeContext } from "../components/layout"
import Seo from "../components/seo"
import SlideMenu from "../components/slideMenu"
import PageTitle from "../components/pageTitle"
import SideBar from "../components/sideBar"
import MainNews from "../components/mainNews"

import findCategory from "../hooks/findCategory"
import useWindowDimensions from "../hooks/useWindowDimensions"

export const activeFilter = {
    background: "var(--primary-color)"
}

const News = ({ data: {posts, weAre} }) => {
    const { width } = useWindowDimensions();
    const ref = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const initialView = useContext(ThemeContext);
    const [view, setView] = useState(initialView);
    useEffect(() => {
        setHeaderHeight(ref.current.clientHeight);
    }, [ref, width])
    const categories = ["all", ...weAre.nodes.map(node=>node.name)];
    const newsArticles = posts.edges.map(news => ({
        date: news.node.date,
        title: news.node.title,
        desc: news.node.excerpt,
        slug: `/news/${news.node.slug}`,
        category: findCategory(news)
    }));

    const [dateSort, setDateSort] = useState(false);
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
        <Layout headerRef={ref}>
            <SlideMenu categories={categories} 
            view={view} changeView={setView}
            filters = {filters} handleFilter={handleFilter}
            dateSort={dateSort} setDateSort={setDateSort} >
                <div className={childStyles.option}
                    onClick={()=>setDateSort(!dateSort)}
                    style={dateSort ? activeFilter : {}}>
                        date
                </div>
                <div className={childStyles.option} style={activeFilter}>
                    we are
                </div>
            </SlideMenu>
            <PageTitle headerHeight={headerHeight} title={"news!"} />
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

export const Head = () => <Seo title="About" />

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