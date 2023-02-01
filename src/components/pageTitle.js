import * as React from "react"
import useWindowDimensions from "../hooks/useWindowDimensions"
import * as styles from "../styles/pageTitle.module.scss"

const PageTitle = ({ headerHeight, title }) => {
    const { width } = useWindowDimensions();
    return (
        <h1 className={styles.pageTitle} style={width > 720 && headerHeight ?{top:`${headerHeight}px`}:{}}>{title}</h1>
    )
}

export default PageTitle