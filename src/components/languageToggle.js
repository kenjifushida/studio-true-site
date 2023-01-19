import * as React from "react"
import * as styles from "../styles/languageToggle.module.scss"
import LanguageIcon from "../images/languageIcon.svg"

const LanguageToggle = () => {
    return (
        <div className={styles.toggle}>
            <span className={styles.languageTop}>jp</span>
            <span className={styles.languageBottom}>en</span>
            <LanguageIcon />
        </div>
    )
}

export default LanguageToggle