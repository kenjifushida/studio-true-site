import * as React from "react"
import { useState, useEffect, useRef } from "react"
import * as styles from "../styles/about.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Vision from "../components/vision"
import Approaches from "../components/approaches"
import Actions from "../components/actions"
import Members from "../components/members"
import PageTitle from "../components/pageTitle"
import SideBar from "../components/sideBar"

const initialState = [
  false, false, false, false
]

const About = () => {
  const ref = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    setHeaderHeight(ref.current.clientHeight);
}, [])

  const [checkedAll, setCheckedAll] = useState(true);
  const [filtered, setFiltered] = useState(initialState);
  const [selectedMember, setSelectedMember] = useState(-1);
  const sections = [
    <Vision />,
    <Approaches />,
    <Actions />,
    <Members memberState={selectedMember} changeSelectedMember={changeSelectedMember} />
  ]
  const [filteredComponents, setFilteredComponents] = useState(sections);

  function changeFilter(num) {
    if(num===-1) {
      setCheckedAll(!checkedAll);
      setFiltered(filtered.map(()=>false));
      return
    }
    const newState = filtered.map((filter, idx) => {
      if(idx == num) {
        return !filter
      }
      return filter
    })
    setCheckedAll(false);
    setFiltered(newState);
  }

  function changeSelectedMember(num) {
    setSelectedMember(num);
  }

  useEffect(() => {
      if(checkedAll || filtered===initialState) {
        setFilteredComponents(sections);
        return
      }
      let updatedComp = [];
      filtered.forEach((filter, idx) => {
        if(filter) {
          updatedComp.push(sections[idx])
        }
      })
      setFilteredComponents(updatedComp);
  }, [filtered, checkedAll, selectedMember])

  return (
  <Layout headerRef={ref}>
    <PageTitle headerHeight={headerHeight} title={"about!"}/>
    <div className={styles.content}>
      <SideBar headerHeight={headerHeight}>
        <ul>
          <li onClick={() => changeFilter(0)} 
            style={{background: filtered[0] ? "var(--primary-color)" : "var(--box-bg)"}}
            >vision</li>
          <li onClick={() => changeFilter(1)}
          style={{background: filtered[1] ? "var(--primary-color)" : "var(--box-bg)"}}
          >approaches</li>
          <li onClick={() => changeFilter(2)}
          style={{background: filtered[2] ? "var(--primary-color)" : "var(--box-bg)"}}
          >actions</li>
          <li onClick={() => changeFilter(3)}
          style={{background: filtered[3] ? "var(--primary-color)" : "var(--box-bg)"}}
          >members</li>
        </ul>
        {filtered[3] ? 
        <ul>
          <li onClick={() => changeSelectedMember(0)}
          style={{background: selectedMember === 0 ? "var(--primary-color)" : "var(--box-bg)"}}>rei</li>
          <li onClick={() => changeSelectedMember(1)}
          style={{background: selectedMember ===1 ? "var(--primary-color)" : "var(--box-bg)"}}>taiga</li>
        </ul>
        : null}
      </SideBar>
      <section className={styles.main}>
        {filteredComponents.map((filter) => filter)}
      </section>
    </div>
  </Layout>
  )
}

export const Head = () => <Seo title="About" />

export default About
