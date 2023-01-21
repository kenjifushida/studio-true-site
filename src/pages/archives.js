import * as React from "react"
import { useState, useEffect } from "react"
import { graphql, Link} from "gatsby"
import * as styles from "../styles/archive.module.scss"
import * as slideMenuStyles from "../styles/slideMenu.module.scss"
import * as sideBarStyles from "../styles/projects.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SlideMenu from "../components/slideMenu"
import BoxIcon from "../images/BoxIcon.svg"
import PageTitle from "../components/pageTitle"

import { activeFilter } from "./news"
import SideBar from "../components/sideBar"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Archives = ({data: {posts, places, media, projects, authors}}) => {
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
    const archives = posts.edges.map(archive => ({
        title: archive.node.title,
        engTitle: archive.node.title,
        by: `${archive.node.author.node.firstName}`,
        date: archive.node.date,
        slug: `/archives/${archive.node.slug}`,
        img: archive.node.featuredImage?.node.gatsbyImage,
        place: archive.node.categories.nodes.find(
                node=> node.ancestors?.nodes[0].name === "place"
            ).name,
        media: "",
        projects: ""
    }));

    const lines = [...Array(15).keys()];
    const [dateSort, setDateSort] = useState(false);
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
        <Layout>
            <SlideMenu categories={categories[currFilter].options}
              viewMode={viewMode} setView={setView}
              filters={filters} handleFilter={handleFilter}
              dateSort={dateSort} setDateSort={setDateSort} >
                <div className={slideMenuStyles.option}
                    onClick={()=>setDateSort(!dateSort)}
                    style={dateSort ? activeFilter : {}}>
                        date
                </div>
                {categories.map((category, idx) => (
                    <div key={idx} onClick={() => changeFilter(idx)}
                    className={slideMenuStyles.option} 
                    style={currFilter === idx ? activeFilter : {}}>
                      {category.category}
                    </div>
                ))}
            </SlideMenu>
            <PageTitle title={"archives!"} />
            <BoxIcon onClick={() => setView(!viewMode)} 
              className={sideBarStyles.viewSwitch} 
              active={viewMode ? "box" : "line"} />
            <section className={sideBarStyles.content}>
                <SideBar>
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
                <div className={styles.main} style={viewMode ? {} : {width:"70%"}}>
                    {viewMode ?
                    <div className={styles.boxes}>
                        {filteredArchives.map((archive, idx) => {
                            const featuredImage = getImage(archive.img);
                            return (
                            <Link key={idx} className={styles.box} to={archive.slug}>
                                <div className={styles.post}>
                                    <div className={styles.imgContainer}>
                                        {featuredImage !== undefined ? <GatsbyImage image={featuredImage} alt={archive.title}/> : null}
                                    </div>
                                    <div className={styles.postContent}>
                                        <div className={styles.overlay}>
                                            <div className={styles.title}>
                                                {archive.title}
                                            </div>
                                            <div className={styles.author}>
                                                {archive.by}
                                            </div>
                                        </div>
                                        <div className={styles.innerPost}>
                                            <div className={styles.top}>
                                                <div>{archive.title}</div>
                                                <div className={styles.right}>
                                                    <div>
                                                        {archive.date.replaceAll("-",".")}
                                                    </div>
                                                    <div>
                                                        {archive.place.charAt(0).toUpperCase()+archive.place.slice(1)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={styles.readMore}>read more...</div>
                                            <div>{archive.engTitle}</div>
                                            <div className={styles.author}>{archive.by}</div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            )
                        }
                        )}
                    </div> 
                    : <>
                        <div className={styles.labels}>
                            <span>date</span><span>name</span>
                        </div>
                        <div className={styles.lines}>
                            {lines.map((line, idx) => (
                                <div key={idx} className={styles.line}></div>
                            ))}
                        </div>
                        {filteredArchives.map((archive, idx) => (
                            <Link key={idx} className={styles.lineItem} to={archive.slug}><span>{archive.date.replaceAll("-",".")}</span><span>{archive.title}</span></Link>
                        ))}
                    </>}

                </div>

            </section>
            

        </Layout>
    )
}

export const Head = () => <Seo title="About" />

export default Archives

export const archivesQuery = graphql`
query MyQuery {
    posts: allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "archives"}}}}}) {
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