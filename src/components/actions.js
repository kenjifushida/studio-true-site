import * as React from "react"
import { useState } from "react"

import SectionTitle from "./sectionTitle"
import DownloadBtn from "./downloadBtn"
import useWindowDimensions from "../hooks/useWindowDimensions"
// import { useIntl } from "gatsby-plugin-react-intl"
import { getActions } from "../hooks/aboutInformation"
import * as styles from "../styles/actions.module.scss"

const Actions = () => {
    // const intl = useIntl();
    const actions = getActions();
    const { width } = useWindowDimensions();
    const [currentTagBox, setCurrentTagBox] = useState(actions[0].engTitle);
    const [currentTag, setCurrentTag] = useState("");
    const handleTagBox = (actionIndex, tagIndex) => {
        setCurrentTagBox(actions[actionIndex].engTitle);
        setCurrentTag(actions[actionIndex].tags[tagIndex].desc);
    }
    return (
        <div style={{display:"flex", flexDirection: "column"}}>
            <SectionTitle title={"actions"} />
            <div style={
                {
                    display: "flex", flexDirection: "column",
                    gap: "2.5rem"
                }
                }>
                {actions.map((action, actionIndex) => (
                    <div key={actionIndex} className={styles.post}>
                    <div className={styles.overlay}>
                        <div className={styles.postTitle}>{action.japTitle}</div>
                        <div className={styles.overlayTitle}>{action.engTitle}</div>
                    </div>
                    <div className={styles.innerPost}>
                        <div className={styles.actionContent}>
                            <div className={styles.postTitle}>{action.japTitle}</div>
                            <div className={styles.postDesc}>{action.desc}</div>
                        </div>
                        <div className={styles.hashtags}>
                            {action.tags.map((tag, tagIndex) => (
                                <div key={tagIndex} 
                                  onMouseEnter={()=>handleTagBox(actionIndex, tagIndex)}
                                  onMouseLeave={()=>setCurrentTagBox("")}
                                  >#{tag.name}</div>
                            ))}
                        </div>
                        { width > 720 ? 
                        <div className={styles.tagBox}
                          style={action.engTitle === currentTagBox ? 
                          {display: "block"} : {display:"none"}}>
                            {currentTag}
                        </div> : null
                        }
                    </div>
                </div>
                ))}
            </div>
            <DownloadBtn hyperlink={"/documents/230102_leaflet.pdf"} fileName={"actions"} />
        </div>
    )
}

export default Actions;