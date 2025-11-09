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
import { useIntl } from "gatsby-plugin-react-intl"
import { findPlace } from "../hooks/findSortField"

const NewsDetail = ({ data: {post, posts, postsEnglish, places, media, projects, authors} }) => {
    const categories = [
        {
            category: "projects",
            options: ["all", ...projects.nodes.map(node=>node.name)],
            states: [true, ...projects.nodes.map(node=> true)]
        },
        {
            category: "place",
            options: ["all", ...places.nodes.map(node=>node.name)],
            states: [true, ...places.nodes.map(node=> true)]
        },
        {
            category: "by",
            options: ["all", ...authors.distinct],
            states: [true, ...authors.distinct.map(node=> true)]
        },
        {
            category: "media",
            options: ["all", ...media.nodes.map(node=>node.name)],
            states: [true, ...media.nodes.map(node=> true)]
        },
    ];
    //preprocessing posts
    const intl = useIntl();
    const archiveArticle = {
        title: (intl.locale === "en") && (post.translations.length > 0) ? post.translations[0].title : post.title,
        content: (intl.locale === "en") && (post.translations.length > 0) ? post.translations[0].content : post.content,
        by: post.author.node.firstName.toLowerCase(),
        author: `${post.author.node.firstName} ${post.author.node.lastName}`,
        date: post.date,
        place: findPlace(post),
        media: "",
        project: "",

    };
    const initialPosts = intl.locale === "ja" ? posts : postsEnglish;
    const archivesArticles = initialPosts.edges.map(post => ({
        date: post.node.date,
        title: intl.locale === "ja" ? post.node.title : post.node.translations[0].title,
        by: post.node.author.node.firstName.toLowerCase(),
        slug: `/archives/${post.node.slug}`,
        place: findPlace(post.node),
        media: "",
        project: "",
    }));
    
    const headerRef = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    const [ dateSort, setDateSort ] = useState(true);
    const [currFilter, setCurrFilter] = useState(0);
    const [filters, setFilters] = useState(categories.find((el) => el.category === categories[currFilter].category).states);
    const [filteredArchives, setFilteredArchives] = useState(archivesArticles);
    const { width } = useWindowDimensions();
    const [ titleHeight, setHeight] = useState(0);
    const [previous, setPrevious] = useState(-1);
    const [next, setNext] = useState(-1);
    const ref = useRef(null)
    useEffect(() => {
        setHeight(ref.current.clientHeight);
        setHeaderHeight(headerRef.current.clientHeight);
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
        <Layout headerRef={headerRef}>
            <PageTitle headerHeight={headerHeight} title={"archives!"} />
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
                        <p>{archiveArticle.author}</p>
                    </div>
                    <div className={styles.article}>
                        <p className={styles.title} ref={ref}>{archiveArticle.title}</p>
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

export const Head = () => <Seo title="Archive Post" />;

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
        posts: allWpPost(
            filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}}
            ) {
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
        postsEnglish: allWpPost(
            filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}, translations: {elemMatch: {language: {code: {eq: EN}}}}}
            ) {
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
                    translations {
                        title
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
        projects: allWpCategory(
            filter: {ancestors: {nodes: {elemMatch: {name: {eq: "projects"}}}}}
          ) {
            nodes {
              name
            }
        }
        media: allWpCategory(
            filter: {ancestors: {nodes: {elemMatch: {name: {eq: "media"}}}}}
          ) {
            nodes {
              name
            }
        }
        authors: allWpPost {
            distinct(field: author___node___firstName)
        }
    }
`