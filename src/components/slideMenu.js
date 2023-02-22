import * as React from "react"
import { useState } from "react"
import * as styles from "../styles/slideMenu.module.scss"

import LanguageToggle from "./languageToggle"
import ViewToggle from "./viewToggle"
const SlideMenu = ({ 
    categories, filters, handleFilter, 
    needView, children
}) => {
    const [active, setActive] = useState(false);

    const activeMenu = {
        background: "var(--primary-color)",
        border: "4px solid var(--primary-color)",
    }

    const activeFilter = {
        background: "var(--primary-color)"
    }

    return (
        <>
            <div onClick={() => setActive(!active)} 
            className={styles.menuBtn}
            style={active ? activeMenu : {}}>menu</div>
            <div className={styles.wrapper} style={active ? {height:"15rem"}: {height:"0"}}>
                <div className={styles.slideMenu}>
                    <LanguageToggle />
                    { needView ? <ViewToggle className={styles.viewSwitch}/> : null}
                    {children}
                    {categories ?
                    <ul className={styles.row}>
                        {categories.map((category, idx) => (
                            <li key={idx} className={styles.option}
                            onClick={()=>handleFilter(idx)}
                            style={filters[0] && idx==0 ? activeFilter: 
                                filters[idx] && !filters[0] ? activeFilter:{}}
                            >{category}</li>
                        ))}
                    </ul> : null
                    }
                </div>
            </div>
        </>
    )
}

export default SlideMenu