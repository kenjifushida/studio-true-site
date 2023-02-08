import * as React from "react"
import * as styles from "../styles/vision.module.scss"

import SectionTitle from "./sectionTitle"
import DownloadBtn from "./downloadBtn"
import { useIntl } from "gatsby-plugin-react-intl"
import { getVision } from "../hooks/aboutInformation"

const Vision = () => {
  const visionContent = getVision();
  const intl = useIntl();
    return (
        <div className={styles.article}>
          <SectionTitle title={"vision"} />
          <div className={styles.post}>
            <div className={styles.innerPost}>
              <div className={styles.postTitle}>{visionContent.japTitle}</div>
              <div className={styles.postDesc}>{intl.formatMessage({id: visionContent.desc})}</div>
            </div>
            <div className={styles.overlay}>
              <div className={styles.postTitle}>{visionContent.japTitle}</div>
              <div className={styles.overlayTitle}>{visionContent.engTitle}</div>
            </div>
          </div>
          <DownloadBtn hyperlink={"/documents/230102_leaflet.pdf"} fileName={"vision"}/>
        </div>
    )
}

export default Vision;