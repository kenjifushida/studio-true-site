import * as React from "react"
import * as styles from "../styles/sideBar.module.scss"

const SideBar = ({ headerHeight, children }) => {
    return (
        <div className={styles.sidebar} style={headerHeight? {top:`${headerHeight+92}px`}:{}}>
            { children }
        </div>
    )
}

export default SideBar