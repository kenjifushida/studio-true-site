import * as React from "react"

import SectionTitle from "./sectionTitle"
import DownloadBtn from "./downloadBtn"
import { useIntl } from "gatsby-plugin-react-intl"
import { getApproaches } from "../hooks/aboutInformation"
import * as styles from "../styles/approaches.module.scss"

const Approaches = () => {
    const  intl = useIntl();
    const approaches = getApproaches();
    return (
        <div className={styles.approachContent}>
            <SectionTitle title={"approaches"}/>
            {approaches.map((approach, idx) => (
                <div key={idx} className={styles.approachPost}>
                    <div className={styles.approachInner}>
                        <div className={styles.approachPostTitle}>{approach.japTitle}</div>
                        <div className={styles.approachPostDesc}>{intl.formatMessage({id: approach.desc})}</div>
                    </div>
                    <div className={styles.approachOverlay}>
                        <div className={styles.approachTopTitle}>{approach.japTitle}</div>
                        <div className={styles.approachOverlayTitle}>{approach.engTitle}</div>
                    </div>
                </div>
            ))}
            <DownloadBtn hyperlink={"/documents/230102_leaflet.pdf"} fileName={"approaches"}/>
        </div>
    )
}

export default Approaches