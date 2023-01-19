import * as React from "react"
import { useState } from "react"
import * as styles from "../styles/slideMenu.module.scss"

import BoxIcon from "../images/BoxIcon.svg"
const SlideMenu = ({ 
    categories, filters, handleFilter,viewMode, setView, children
}) => {
    const [active, setActive] = useState(false);

    const activeMenu = {
        background: "var(--primary-color)",
        border: "4px solid var(--primary-color)",
        width: "5.2rem",
        height: "5.2rem"
    }

    const activeFilter = {
        background: "var(--primary-color)"
    }

    return (
        <>
            <div onClick={() => setActive(!active)} 
            className={styles.menuBtn}
            style={active ? activeMenu : {}}>menu</div>
            <div className={styles.wrapper} style={active ? {height:"13rem"}: {height:"0"}}>
                <div className={styles.slideMenu}>
                { active ? 
                    <BoxIcon onClick={() => setView(!viewMode)} 
                    className={styles.viewSwitch} active={viewMode ? "box" : "line"}/> 
                : null}
                <div className={styles.row}>
                    {children}
                </div>
                <div className={styles.row}>
                    {categories.map((category, idx) => (
                        <div key={idx} className={styles.option}
                        onClick={()=>handleFilter(idx)}
                        style={filters[0] && idx==0 ? activeFilter: 
                            filters[idx] && !filters[0] ? activeFilter:{}}
                        >{category}</div>
                    ))}
                </div>
                </div>
            </div>
        </>
    )
}

export default SlideMenu