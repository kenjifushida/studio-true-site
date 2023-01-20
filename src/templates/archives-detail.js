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
import { useCategory } from "../hooks/useCategories"

const NewsDetail = ({ data: {post, posts} }) => {
    const categories = useCategory("archives");
    const archiveArticle = {
        title: post.title,
        img: "",
        content: post.content,
        by: `${post.author.node.firstName} ${post.author.node.lastName}`,
        date: post.date,
        place: post.categories.nodes.find(
                node=> node.ancestors?.nodes[0].name === "place"
            ).name,
        media: "",
        project: "",

    };

    const archivesArticles = posts.edges.map(post => ({
        date: post.node.date,
        title: post.node.title,
        by: post.node.author.node.firstName.toLowerCase(),
        slug: `/archives/${post.node.slug}`,
        place: post.node.categories.nodes.find(
                node=> node.ancestors?.nodes[0].name === "place"
            ).name,
        media: "",
        project: "",
    }));
    
    const [ dateSort, setDateSort ] = useState(false);
    const [currFilter, setCurrFilter] = useState(0);
    const [filters, setFilters] = useState(categories.find((el) => el.category === categories[currFilter].category).states);
    const [filteredArchives, setFilteredArchives] = useState(archivesArticles);
    const { height, width } = useWindowDimensions();
    const [ titleHeight, setHeight] = useState(0);
    const [previous, setPrevious] = useState(-1);
    const [next, setNext] = useState(-1);
    const ref = useRef(null)
    useEffect(() => {
        setHeight(ref.current.clientHeight);
    }, [])
    
    const handleFilterAll = () => {
        if(filters[0]) {
            setFilters(filters.map((filter) => false))
        } else {
            setFilters(filters.map((filter) => true))
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

    const changeFilter = (pos) => {
        setCurrFilter(pos)
        setFilters(categories[pos].states)
    }

    useEffect(() => {
        var results = [];
        filters.forEach((filter, index) => filter ? results.push(categories[currFilter].options[index]) : null);
        if(dateSort) {
            const sorted = [...archivesArticles].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
            setFilteredArchives(sorted);
        } else {
            setFilteredArchives(archivesArticles);
        }
        const current = filteredArchives.findIndex(archive => archive.title === archiveArticle.title);
        if(current >= 0 && current < filteredArchives.length-1) {
            const n = filteredArchives.slice(current+1).findIndex(post=>results.includes(post[categories[currFilter].category]));
            n >= 0 ? setNext(current+1+n) : setNext(-1);
        } else {
            setNext(-1);
        }
        if(current > 0 && current <= filteredArchives.length-1) {
            const p = filteredArchives.slice(0, current).findLastIndex(post=>results.includes(post.category));
            p >= 0 ? setPrevious(p) : setPrevious(-1);
        } else {
            setPrevious(-1);
        }
    }, [filters, dateSort])

    return (
        <Layout>
            <PageTitle title={"archives!"} />
            <div className={styles.wrapper}>
                <SideBar>
                    <ul>
                        <li onClick={() => setDateSort(!dateSort)}
                          style={dateSort ? activeFilter : {}}>
                            date
                        </li>
                        {categories.map((category, idx) => (
                            <li key={idx} onClick={() => changeFilter(idx)}
                            style={currFilter===idx ? activeFilter : {}}>{category.category}</li>
                        ))}
                    </ul>
                    <ul>
                        {categories[currFilter].options.map((filter, idx) => (
                            <li key={idx} onClick={() => handleFilter(idx)}
                              style={filters[0] && idx === 0 ? activeFilter :
                              filters[idx] && !filters[0] ? activeFilter: {}}>
                                {filter}
                            </li>
                        ))}
                    </ul>
                </SideBar>
                <div className={styles.main}>
                    <div className={styles.top}
                    style={width > 720 ? { marginTop: `${titleHeight + 12}px`} : {}}>
                        <p>{archiveArticle.date.replaceAll("-",".")}</p>
                        <p>{archiveArticle.place}</p>
                        <p>{archiveArticle.by}</p>
                    </div>
                    <div className={styles.article}>
                        <p className={styles.title} ref={ref}>{archiveArticle.title}</p>
                        <div className={styles.imgContainer}></div>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: archiveArticle.content}}>
                        </div>
                        <div className={styles.bottomLinks}>
                            { previous >= 0 ? <Link to={filteredArchives[previous].slug}>previous?</Link> : null}
                            { next > 0 ? <Link to={filteredArchives[next].slug}>next?</Link> : null}
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
        posts: allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}}) {
            edges {
                node {
                    title
                    slug
                    date(formatString: "YYYY-MM-DD")
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
                }
            }
        }
    }
`