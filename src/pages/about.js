import * as React from "react"
import { useState, useEffect, useRef } from "react"
import * as styles from "../styles/about.module.scss"

import Actions from "../components/actions"
import Approaches from "../components/approaches"
import Layout from "../components/layout"
import Members from "../components/members"
import Seo from "../components/seo"
import SideBar from "../components/sideBar"
import PageTitle from "../components/pageTitle"
import Vision from "../components/vision"

import useWindowDimensions from "../hooks/useWindowDimensions"

const initialState = [
  false, false, false, false
]

const About = ({ location }) => {
  const isState = location.state;
  const state = isState ? isState : {};
  const initialCheck = "filter" in state ? false : true;
  const initialFilter = "filter" in state ? state.filter : initialState;
  const { width } = useWindowDimensions();
  const ref = useRef(null);
  const [headerHeight, setHeaderHeight] = useState(0);
  useEffect(() => {
    setHeaderHeight(ref.current.clientHeight);
}, [ref, width])

  const [checkedAll, setCheckedAll] = useState(initialCheck);
  const [filtered, setFiltered] = useState(initialFilter);
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
      if(idx === num) {
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
  <Layout headerRef={ref} pageTitle="about!">
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
