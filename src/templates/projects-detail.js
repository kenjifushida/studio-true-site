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
import { getImage, GatsbyImage } from "gatsby-plugin-image"

const NewsDetail = ({ data: { post, posts, places, actions} }) => {
    const featuredImage = getImage(post.featuredImage?.node.gatsbyImage);
    const categories = [
        {
            category: "place",
            options: ["all", ...places.nodes.map(node=>node.name)],
            states: [true, ...places.nodes.map(node=> true)]
        },
        {
            category: "actions",
            options: ["all", ...actions.nodes.map(node=>node.name)],
            states: [true, ...actions.nodes.map(node=> true)]
        },
    ]
    const projectArticle = {
        title: post.title,
        img: "",
        content: post.content,
        author: `${post.author.node.firstName} ${post.author.node.lastName}`,
        date: post.date,
        actions: "make to platform",
        place: () => {
            const hasPlace = post.categories.nodes.find(
                node=> node.ancestors?.nodes[0].name === "place"
            )
            return hasPlace !== -1 ? hasPlace.name : "";
        },
    };

    const projects = posts.edges.map(post => ({
        date: post.node.date,
        title: post.node.title,
        slug: `/projects/${post.node.slug}`,
        actions: "make to platform",
        place: () => {
            const hasPlace = post.node.categories.nodes.find(
                node=> node.ancestors?.nodes[0].name === "place"
            )
            return hasPlace !== -1 ? hasPlace.name : "";
        }
    }));
    
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [ dateSort, setDateSort ] = useState(false);
    const [currFilter, setCurrFilter] = useState(0);
    const [filters, setFilters] = useState(categories[currFilter].states);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const { height, width } = useWindowDimensions();
    const [ titleHeight, setHeight] = useState(0);
    const [previous, setPrevious] = useState(-1);
    const [next, setNext] = useState(-1);
    const ref = useRef(null);
    useEffect(() => {
        setHeight(ref.current.clientHeight);
        setHeaderHeight(headerRef.current.clientHeight);
    }, []);
    
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
                return false
            }
            if(filters[0]) {
                return index !== pos ? !item : item
            }
            return index === pos ? !item : item
        })
        setFilters(updatedFilterState)
    }

    const changeFilter = (pos) => {
        setCurrFilter(pos)
        setFilters(categories[pos].states)
    }

    useEffect(() => {
        var results = [];
        filters.forEach((filter, index) => filter ? results.push(categories[currFilter].options[index]) : null);
        if(dateSort) {
            const sorted = [...projects].sort((a, b) => {
                return new Date(b.date) - new Date(a.date)
            })
            setFilteredProjects(sorted);
        } else {
            setFilteredProjects(projects);
        }
        const current = filteredProjects.findIndex(project => project.title === projectArticle.title);
        if(current >= 0 && current < filteredProjects.length-1) {
            const n = filteredProjects.slice(current+1).findIndex(post=>results.includes(post[categories[currFilter].category]));
            n >= 0 ? setNext(current+1+n) : setNext(-1);
        } else {
            setNext(-1);
        }
        if(current > 0 && current <= filteredProjects.length-1) {
            const p = filteredProjects.slice(0, current).findLastIndex(post=>results.includes(post.category));
            p >= 0 ? setPrevious(p) : setPrevious(-1);
        } else {
            setPrevious(-1);
        }
    }, [filters, dateSort])

    return (
        <Layout headerRef={headerRef}>
            <PageTitle headerHeight={headerHeight} title={"projects!"} />
            <div className={styles.wrapper}>
                <SideBar headerHeight={headerHeight}>
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
                        {categories[currFilter].options.map((option, idx) => (
                            <li key={idx} onClick={() => handleFilter(idx)}
                                style={filters[0] && idx===0 ? activeFilter: 
                                    filters[idx] && !filters[0] ? activeFilter:{}}>
                                        {option}
                            </li>
                        ))}
                    </ul>
                </SideBar>
                <div className={styles.main}>
                    <div className={styles.top}
                    style={width > 720 ? { marginTop: `${titleHeight + 12}px`} : {}}>
                        <p>{projectArticle.date.replaceAll("-",".")}</p>
                        <p>{projectArticle.actions}</p>
                        <p>{projectArticle.author}</p>
                    </div>
                    <div className={styles.article}>
                        <p className={styles.title} ref={ref}>{projectArticle.title}</p>
                        <div className={styles.content} dangerouslySetInnerHTML={{__html: projectArticle.content}}>
                        </div>
                        <div className={styles.bottomLinks}>
                            { previous >= 0 ? <Link to={filteredProjects[previous].slug}>previous?</Link> : null}
                            { next > 0 ? <Link to={filteredProjects[next].slug}>next?</Link> : null}
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
            featuredImage {
                node {
                  gatsbyImage(width: 720)
                }
            }
        }
        posts: allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "projects"}}}}}) {
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
        places: allWpCategory(
            filter: {ancestors: {nodes: {elemMatch: {name: {eq: "place"}}}}}
          ) {
            nodes {
              name
            }
        }
        actions: allWpCategory(
            filter: {ancestors: {nodes: {elemMatch: {name: {eq: "actions"}}}}}
          ) {
            nodes {
              name
            }
        }
    }
`