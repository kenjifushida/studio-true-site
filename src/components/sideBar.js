import * as React from "react"
import * as styles from "../styles/sideBar.module.scss"

const SideBar = ({ children }) => {
    return (
        <div className={styles.sidebar}>
            { children }
        </div>
    )
}

export default SideBar