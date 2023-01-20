import * as React from "react"
import { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../styles/news.module.scss"
import * as childStyles from "../styles/slideMenu.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SlideMenu from "../components/slideMenu"
import BoxIcon from "../images/BoxIcon.svg"
import PageTitle from "../components/pageTitle"
import SideBar from "../components/sideBar"

import { useCategory } from "../hooks/useCategories"

export const activeFilter = {
    background: "var(--primary-color)"
}

const News = ({ data }) => {
    const categories = useCategory("news")[0].options;
    const newsArticles = data.allWpPost.edges.map(news => ({
        date: news.node.date,
        title: news.node.title,
        desc: news.node.excerpt,
        slug: `/news/${news.node.slug}`,
        category: news.node.categories.nodes.find(
                    node => node.ancestors?.nodes[0].name === "we are"
                ).name
    }));

    const lines = [...Array(15).keys()];
    const [dateSort, setDateSort] = useState(false);
    const [filters, setFilters] = useState(categories.map(opt=>true));
    const [filteredNews, setFilteredNews] = useState(newsArticles);
    const [viewMode, setView] = useState(false);

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
        <Layout>
            <SlideMenu categories={categories} 
            viewMode={viewMode} setView={setView} 
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
            <PageTitle title={"news!"} />
            <BoxIcon onClick={() => setView(!viewMode)} className={styles.viewSwitch}
                active={viewMode ? "box" : "line"}/>
            <section className={styles.content}>
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
                    {viewMode ? <>
                    <div className={styles.boxes}>
                        {filteredNews.map((news, idx) => (
                            <Link key={idx} className={styles.post}>
                                <div className={styles.overlay}>
                                    <div className={styles.title}>{news.title}</div>
                                    <div className={styles.date}>{news.date.slice(2).replaceAll("-",".")}</div>
                                    <div className={styles.category}>{news.category}</div>
                                </div>
                                <div className={styles.innerPost}>
                                    <div className={styles.top}>
                                        <div>{news.title}</div>
                                        <div>{news.date.replaceAll("-",".")}</div>
                                        <div>read more...</div>
                                    </div>
                                    <div className={styles.desc} dangerouslySetInnerHTML={{__html: news.desc}}></div>
                                    <div className={styles.category}>{news.category}</div>     
                                </div>
                            </Link>
                        ))}
                    </div>
                    </> 
                    : <>
                        <div className={styles.labels}>
                            <span>date</span><span>title</span>
                        </div>
                        <div className={styles.lines}>
                            {lines.map((line, idx) => (
                                <div key={idx} className={styles.line}></div>
                            ))}
                        </div>
                        {filteredNews.map((news, idx) => (
                            <Link key={idx} to={news.slug}><span>{news.date.replaceAll("-",".")}</span><span>{news.title}</span></Link>
                        ))}
                    </>}
                </div>
            </section>
        </Layout>
    )
}

export const Head = () => <Seo title="About" />

export default News

export const query = graphql`
query MyQuery {
    allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "news"}}}}}) {
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
}
`