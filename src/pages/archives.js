import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { graphql} from "gatsby"
import * as styles from "../styles/archive.module.scss"
import * as slideMenuStyles from "../styles/slideMenu.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SlideMenu from "../components/slideMenu"
import PageTitle from "../components/pageTitle"

import { activeFilter } from "./news"
import SideBar from "../components/sideBar"
import MainArchives from "../components/mainArchives"
import ViewToggle from "../components/viewToggle"
import useWindowDimensions from "../hooks/useWindowDimensions"

import { findPlace } from "../hooks/findSortField"

import { useIntl } from "gatsby-plugin-react-intl"

const pageTitle = "archives!"

const Archives = ({data: {posts, postsEnglish, places, media, projects, authors}}) => {
    // categories and posts preprocessing
    const intl = useIntl();
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
    const initialArchives = intl.locale === "ja" ? posts : postsEnglish;
    const archives = initialArchives.edges.map(archive => ({
        title: intl.locale === "ja" ? archive.node.title : archive.node.translations[0].title,
        desc: intl.locale === "ja" ? archive.node.excerpt : archive.node.translations[0].excerpt,
        by: `${archive.node.author.node.firstName}`,
        date: archive.node.date,
        slug: `/archives/${archive.node.slug}`,
        img: archive.node.featuredImage?.node.gatsbyImage,
        place: findPlace(archive.node),
        media: "",
        projects: ""
    }));

    const { width } = useWindowDimensions();
    const ref = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        setHeaderHeight(ref.current.clientHeight);
    }, [ref, width]);
    const [dateSort, setDateSort] = useState(true);
    const [currFilter, setCurrFilter] = useState(0);
    const [filters, setFilters] = useState(categories.find((el) => el.category === categories[currFilter].category).states);
    const [filteredArchives, setFiltered] = useState(archives);
    const [viewMode, setView] = useState(false);

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
        if(filters[0] === false) {
            filters.forEach(
                (filter, index) => filter ? 
                results.push(categories[currFilter].options[index]) : null
            )
            const filtered = archives.filter(
                (archive) => results
                                .includes(archive[categories[currFilter].category])
            )
            if(dateSort) {
                const sorted = [...filtered].sort((a,b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                setFiltered(sorted)
            } else {
                setFiltered(filtered)
            }
        } else {
            if(dateSort) {
                const sorted = [...archives].sort((a,b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                setFiltered(sorted)
            } else {
                setFiltered(archives)
            }
        }
    }, [filters, dateSort])

    return (
        <Layout headerRef={ref} pageTitle={pageTitle}>
            <SlideMenu categories={categories[currFilter].options}
              viewMode={viewMode} setView={setView}
              filters={filters} handleFilter={handleFilter}
              dateSort={dateSort} setDateSort={setDateSort} >
                <ul>
                    <li className={slideMenuStyles.option}
                        onClick={()=>setDateSort(!dateSort)}
                        style={dateSort ? activeFilter : {}}>
                            date
                    </li>
                    {categories.map((category, idx) => (
                        <li key={idx} onClick={() => changeFilter(idx)}
                        className={slideMenuStyles.option} 
                        style={currFilter === idx ? activeFilter : {}}>
                        {category.category}
                        </li>
                    ))}
                </ul>
            </SlideMenu>
            <PageTitle headerHeight={headerHeight} title={pageTitle} />
            <ViewToggle className={styles.viewSwitch} />
            <section className={styles.content}>
                <SideBar headerHeight={headerHeight}>
                    <ul>
                        <li onClick={() => setDateSort(!dateSort)}
                          style={dateSort ? activeFilter : {}}>date</li>
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
                <MainArchives filteredArchives={filteredArchives} />
            </section>
            

        </Layout>
    )
}

export const Head = () => <Seo title="About" />

export default Archives

export const archivesQuery = graphql`
query MyQuery {
    posts: allWpPost(
        filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}}
        ) {
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
        filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}, translations: {elemMatch: {language: {code: {eq: EN}}}}}
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
    places: allWpCategory(
        filter: {ancestors: {nodes: {elemMatch: {name: {eq: "place"}}}}}
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
    projects: allWpCategory(
        filter: {ancestors: {nodes: {elemMatch: {name: {eq: "projects"}}}}}
      ) {
        nodes {
          name
        }
    }
    authors: allWpPost {
        distinct(field: {author: {node: {firstName: SELECT}}})
    }
}
`