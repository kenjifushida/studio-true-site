import * as React from "react"
import * as styles from "../styles/pageTitle.module.scss"

const PageTitle = ({ headerHeight, title }) => {
    return (
        <h1 className={styles.pageTitle} style={headerHeight?{top:`${headerHeight}px`}:{}}>{title}</h1>
    )
}

export default PageTitle