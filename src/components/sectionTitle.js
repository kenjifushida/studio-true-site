import * as React from "react"
import * as styles from "../styles/sectionTitle.module.scss"

const SectionTitle = ({title}) => {
    return (
        <h2 className={styles.sectionTitle}>{title}</h2>
    )
}

export default SectionTitle