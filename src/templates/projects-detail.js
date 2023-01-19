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

const categories = [
    "all",
    "announcing",
    "writing",
    "speaking",
    "participating"
]

const NewsDetail = ({ data }) => {
    const newsArticle = {
        title: data.wpPost.title,
        img: "",
        content: data.wpPost.content,
        author: `${data.wpPost.author.node.firstName} ${data.wpPost.author.node.lastName}`,
        date: data.wpPost.date.replaceAll("-","."),
        action: "write"
    }

    const [ dateSort, setDateSort ] = useState(false);
    const [filters, setFilters] = useState([true, true, true, true, true]);
    const [filteredNews, setFilteredNews] = useState();
    const { height, width } = useWindowDimensions();
    const [ titleHeight, setHeight] = useState(0)
    const ref = useRef(null)

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

    return (
        <Layout>
            <PageTitle title={"projects!"} />
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
                        <p>{newsArticle.date}</p>
                        <p>{newsArticle.action}</p>
                        <p>{newsArticle.author}</p>
                    </div>
                    <div className={styles.article}>
                        <p className={styles.title} ref={ref}>{newsArticle.title}</p>
                        <div className={styles.imgContainer}></div>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: newsArticle.content}}>
                        </div>
                        <div className={styles.bottomLinks}>
                            <Link>previous?</Link>
                            <Link>next?</Link>
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
        wpPost(slug: {eq: $slug}) {
            date(formatString: "YYYY-MM-DD")
            content
            author {
              node {
                firstName
                lastName
              }
            }
            title
          }
    }
`