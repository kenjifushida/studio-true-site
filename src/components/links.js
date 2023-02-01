import * as React from "react"
import { useState } from "react"
import * as styles from "../styles/links.module.scss"

const Links = () => {
    const address = "〒201-0013 東京都狛江市 元和泉1-18-6"
    const [officeContent, setOfficeContent] = useState("office");

    return (
        <div className={styles.links}>
            <a className={styles.insta} href="https://instagram.com/studio.true.2023"
              target="_blank" rel="noopener noreferrer"><span>instagram</span></a>
            <div className={styles.other}>
                <a href="https://humarizine.com/"
                  target="_blank" rel="noopener noreferrer"><span>humarizine</span></a>
                <a href="https://goo.gl/maps/HgZx6tbH4z16T4pf9"
                  target="_blank" rel="noopener noreferrer"
                  onMouseEnter={()=>setOfficeContent(address)}
                  onMouseLeave={()=>setOfficeContent("office")}><span>{officeContent}</span></a>
            </div>
        </div>
    )
}
export default Links