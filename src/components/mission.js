import * as React from "react"

import SectionTitle from "./sectionTitle"
import DownloadBtn from "./downloadBtn"
import { useIntl } from "gatsby-plugin-react-intl"
import { getMission } from "../hooks/aboutInformation"
import * as styles from "../styles/mission.module.scss"

const Mission = () => {
  const missionContent = getMission();
  const intl = useIntl();
    return (
        <div className={styles.article}>
          <SectionTitle title={"mission"} />
          <div className={styles.post}>
            <div className={styles.innerPost}>
              <div className={styles.postTitle}>{missionContent.japTitle}</div>
              <div className={styles.postDesc}>{intl.formatMessage({id: missionContent.desc})}</div>
            </div>
            <div className={styles.overlay}>
              <div className={styles.postTitle}>{missionContent.japTitle}</div>
              <div className={styles.overlayTitle}>{missionContent.engTitle}</div>
            </div>
          </div>
          <DownloadBtn hyperlink={"/documents/230102_leaflet.pdf"} fileName={"mission"}/>
        </div>
    )
}

export default Mission;