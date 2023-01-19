import * as React from "react"
import * as styles from "../styles/links.module.scss"

const Links = () => {
    return (
        <div className={styles.links}>
            <div className={styles.insta}><span>instagram</span></div>
            <div className={styles.other}>
                <div><span>humarizine</span></div>
                <div><span>office</span></div>
            </div>
        </div>
    )
}
export default Links