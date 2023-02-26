import * as React from "react"
import { ThemeContext } from "./layout"
import { Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/mainArchives.module.scss"

const MainArchives = ({filteredArchives}) => {
    const numLines = filteredArchives.length > 15 ? filteredArchives.length+5 : 15;
    const lines = [...Array(numLines).keys()];
    const {viewMode } = React.useContext(ThemeContext);

    if(!viewMode) {
        return null;
    }

    return (
        <div className={styles.main}>
            {viewMode === 'box' ?
            <div className={styles.boxes}>
                {filteredArchives.map((archive, idx) => {
                    const featuredImage = getImage(archive.img);
                    return (
                    <Link key={idx} className={styles.box} to={archive.slug}>
                        <div className={styles.post}>
                            <div className={styles.imgContainer}>
                                {featuredImage !== undefined ? <GatsbyImage image={featuredImage} alt={archive.title}/> : null}
                            </div>
                            <div className={styles.postContent}>
                                <div className={styles.overlay}>
                                    <div className={styles.title}>
                                        {archive.title}
                                    </div>
                                    <div className={styles.author}>
                                        {archive.by}
                                    </div>
                                </div>
                                <div className={styles.innerPost}>
                                    <div className={styles.top}>
                                        <div>{archive.title}</div>
                                        <div className={styles.right}>
                                            <div>
                                                {archive.date.replaceAll("-",".")}
                                            </div>
                                            <div>
                                                {archive.place.charAt(0).toUpperCase()+archive.place.slice(1)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={styles.readMore}>read more...</div>
                                    <div style={{maxWidth: "75%"}} dangerouslySetInnerHTML={{__html: archive.desc}}></div>
                                    <div className={styles.author}>{archive.by}</div>
                                </div>
                            </div>
                        </div>
                    </Link>
                    )
                }
                )}
            </div> 
            : <>
                <div className={styles.labels}>
                    <span>date</span><span>name</span>
                </div>
                <div className={styles.lines}>
                    {lines.map((line, idx) => (
                        <div key={idx} className={styles.line}></div>
                    ))}
                </div>
                {filteredArchives.map((archive, idx) => (
                    <Link key={idx} className={styles.lineItem} to={archive.slug}><span>{archive.date.replaceAll("-",".")}</span><span>{archive.title}</span></Link>
                ))}
            </>}
        </div>
    )
}

export default MainArchives;