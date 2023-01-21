import * as React from "react"
import { useState, useEffect } from "react"
import { graphql, Link } from "gatsby"
import * as styles from "../styles/projects.module.scss"
import * as slideMenuStyles from "../styles/slideMenu.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SlideMenu from "../components/slideMenu"
import BoxIcon from "../images/BoxIcon.svg"
import PageTitle from "../components/pageTitle"

import { activeFilter } from "./news"
import SideBar from "../components/sideBar"

const Projects = ({ data: { posts, places, actions} }) => {
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
    const projects = posts.edges.map(project => ({
        date: project.node.date,
        name: project.node.title,
        desc: project.node.excerpt,
        slug: `/projects/${project.node.slug}`,
        actions: project.node.categories.nodes.find(
                node=> node.ancestors?.nodes[0].name === "actions"
            ).name,
        place: project.node.categories.nodes.find(
                node=> node.ancestors?.nodes[0].name === "place"
            ).name
    }));

    const lines = [...Array(15).keys()];
    const [dateSort, setDateSort] = useState(false);
    const [currFilter, setCurrFilter] = useState(0);
    const [filters, setFilters] = useState(categories.find((el) => el.category === categories[currFilter].category).states);
    const [filteredProjects, setFiltered] = useState(projects);
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
            const filtered = projects.filter(
                (project) => results
                                .includes(project[categories[currFilter].category])
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
                const sorted = [...projects].sort((a,b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                setFiltered(sorted)
            } else {
                setFiltered(projects)
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
            <PageTitle title={"projects!"} />
            <BoxIcon onClick={() => setView(!viewMode)} className={styles.viewSwitch}
              active={viewMode ? "box" : "line"}/>
            <section className={styles.content}>
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
                <div className={styles.main}>
                    {viewMode ? 
                    <div className={styles.boxes}>
                        {filteredProjects.map((project, idx) => (
                            <Link key={idx} className={styles.post} to={project.slug}>
                                <div className={styles.imgContainer}></div>
                                <div className={styles.overlay}>
                                    <div className={styles.name}>{project.name}</div>
                                    <div className={styles.place}>{project.place}</div>
                                </div>
                                <div className={styles.actions}>{project.actions}</div>
                                <div className={styles.innerPost}>
                                    <div className={styles.top}>
                                        <div className={styles.name}>{project.name}</div>
                                        <div className={styles.right}>
                                            <div className={styles.date}>
                                                {project.date.replaceAll("-",".")}
                                            </div>
                                            <div className={styles.place}>
                                                {project.place.charAt(0).toUpperCase()+project.place.slice(1)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.bottom}>
                                        <div className={styles.desc} dangerouslySetInnerHTML={{__html: project.desc}}></div>
                                        <div className={styles.readMore}>read more...</div>
                                    </div>
                                </div>
                            </Link>
                        ))}
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
                        {filteredProjects.map((project, idx) => (
                            <Link key={idx} to={project.slug}><span>{project.date.replaceAll("-",".")}</span><span>{project.name}</span></Link>
                        ))}
                    </>}
                </div>
            </section>
        </Layout>
    )
}

export const Head = () => <Seo title="About" />

export default Projects

export const projectsQuery = graphql`
query MyQuery {
    posts: allWpPost(filter: {categories: {nodes: {elemMatch: {name: {eq: "projects"}}}}}) {
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