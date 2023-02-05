import * as React from "react"
import * as styles from "../styles/vision.module.scss"

import SectionTitle from "./sectionTitle"
import { useIntl } from "gatsby-plugin-react-intl"

export const visionContent = {
    japTitle: "社会をサバイブする共同体をつくる",
    engTitle: "Creating a Community to Survive in Society",
    desc: "私たちはデザインを通じて、複雑で多様な社会を生き抜く共同体をつくることを目指します。私たちはこの社会に生きづらさを感じています。しかし、仲間とともに目の前にある問題にひとつずつ向き合うことで、この社会を共同体としてサバイブできると考えます。共同体は社会をともに生き抜いていくために重要な仲間との連帯であり、その社会を変えることのできる活動のネットワークだと信じています。私たちは世の中の様々な場所で共同体を生み出し、独自のアプローチからたくさんの仲間と協働し、社会をより良くしていけるようにアクションを展開させます。",
    graph: "graph",
    pdf: "studio-true_vision.pdf",
    filter: [true, false, false, false]
}

const Vision = () => {
  const intl = useIntl();

    return (
        <div className={styles.article}>
          <SectionTitle title={"vision"} />
          <div className={styles.post}>
            <div className={styles.innerPost}>
              <div className={styles.postTitle}>{visionContent.japTitle}</div>
              <div className={styles.postDesc}>{intl.formatMessage({id: "vision.desc"})}</div>
            </div>
            <div className={styles.overlay}>
              <div className={styles.postTitle}>{visionContent.japTitle}</div>
              <div className={styles.overlayTitle}>{visionContent.engTitle}</div>
            </div>
          </div>
          <div className={styles.downloadBtn}>
              <div className={styles.download}>download?</div>
              <span className={styles.pdf}>studio-true<br></br>_vision.pdf</span>
          </div>
        </div>
    )
}

export default Vision;