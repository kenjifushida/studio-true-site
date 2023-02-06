import * as React from "react"
import { IntlContextConsumer, changeLocale } from "gatsby-plugin-react-intl"
import * as styles from "../styles/languageToggle.module.scss"

import LanguageIcon from "../images/languageIcon.svg"

const LanguageToggle = () => {
    return (
        <div className={styles.toggle}>
            <IntlContextConsumer>
                {({languages, language: currentLocale}) => (
                    <a href="#" onClick={
                        ()=> currentLocale === "ja" ? 
                        changeLocale(languages[1]) : changeLocale(languages[0])
                        }>
                        <span className={styles.languageTop}>jp</span>
                        <span className={styles.languageBottom}>en</span>
                        <LanguageIcon className={styles.languageSwitch} active={currentLocale} />
                    </a>
                )}
            </IntlContextConsumer>
        </div>
    )
}

export default LanguageToggle