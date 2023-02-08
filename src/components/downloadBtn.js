import * as React from "react"
import * as styles from "../styles/downloadBtn.module.scss"

const DownloadBtn = ({ hyperlink, fileName}) => {
    return (
        <a href={hyperlink}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.downloadBtn}>
                <div className={styles.download}>download?</div>
                <span className={styles.file}>studio-true<br></br>_{fileName}.pdf</span>
        </a>
    )
}

export default DownloadBtn;