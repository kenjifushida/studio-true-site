import * as React from "react"
import * as styles from "../styles/pageTitle.module.scss"

const PageTitle = ({ title }) => {
    return (
        <h1 className={styles.pageTitle}>{title}</h1>
    )
}

export default PageTitle