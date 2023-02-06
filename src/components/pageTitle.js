import * as React from "react"
import * as styles from "../styles/pageTitle.module.scss"
import useWindowDimensions from "../hooks/useWindowDimensions"

const PageTitle = ({ headerHeight, title }) => {
    const { width } = useWindowDimensions();
    return (
        <h1 className={styles.pageTitle} style={width > 720 && headerHeight ?{top:`${headerHeight}px`}:{}}>{title}</h1>
    )
}

export default PageTitle