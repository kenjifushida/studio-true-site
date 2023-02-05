import * as React from "react"
import { useState, useEffect, useRef, useContext } from "react"
import { ThemeContext } from "../components/layout"
import { graphql } from "gatsby"
import * as styles from "../styles/projects.module.scss"
import * as slideMenuStyles from "../styles/slideMenu.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import SlideMenu from "../components/slideMenu"
import PageTitle from "../components/pageTitle"

import { activeFilter } from "./news"
import SideBar from "../components/sideBar"
import ViewToggle from "../components/viewToggle"
import MainProjects from "../components/mainProjects"
import useWindowDimensions from "../hooks/useWindowDimensions"
import { findAction, findPlace } from "../hooks/findCategory"

const Projects = ({ data: { posts, places, actions} }) => {
    const { width } = useWindowDimensions();
    const ref = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        setHeaderHeight(ref.current.clientHeight);
    }, [ref, width])
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
        img: project.node.featuredImage?.node.gatsbyImage,
        actions: findAction(project),
        place: findPlace(project)
    }));

    const lines = [...Array(15).keys()];
    const [dateSort, setDateSort] = useState(false);
    const [currFilter, setCurrFilter] = useState(0);
    const [filters, setFilters] = useState(categories.find((el) => el.category === categories[currFilter].category).states);
    const [filteredProjects, setFiltered] = useState(projects);
    const initialView = useContext(ThemeContext);
    const [viewMode, setView] = useState(initialView);

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
        <Layout headerRef={ref}>
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
            <PageTitle headerHeight={headerHeight} title={"projects!"} />
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
                <MainProjects filteredProjects={filteredProjects}/>
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
    actions: allWpCategory(
        filter: {ancestors: {nodes: {elemMatch: {name: {eq: "actions"}}}}}
      ) {
        nodes {
          name
        }
    }
}
`