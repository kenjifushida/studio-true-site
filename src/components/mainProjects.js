import * as React from "react"
import { ThemeContext } from "./layout"
import { Link } from "gatsby"
import { getImage, GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/mainProjects.module.scss"

const MainProjects = ({filteredProjects}) => {
    const numLines = filteredProjects.length > 15 ? filteredProjects.length+5 : 15;
    const lines = [...Array(numLines).keys()];
    const {viewMode } = React.useContext(ThemeContext);

    if(!viewMode) {
        return null;
    }
    return (
        <div className={styles.main}>
            {viewMode === 'box' ? 
            <div className={styles.boxes}>
                {filteredProjects.map((project, idx) => {
                    const featuredImage = getImage(project.img);
                    return (
                    <Link key={idx} className={styles.post} to={project.slug}>
                        <div className={styles.imgContainer}>
                            {featuredImage !== undefined ? <GatsbyImage image={featuredImage} alt={project.title}/> : null}
                        </div>
                        <div className={styles.overlay}>
                            <span className={styles.name}>{project.name}</span>
                            <div className={styles.place}>{project.place}</div>
                        </div>
                        <div className={styles.actions}>{project.actions}</div>
                        <div className={styles.innerPost}>
                            <div className={styles.top}>
                                <div className={styles.name}>{project.name}</div>
                                <div className={styles.right}>
                                    {/* <div className={styles.date}>
                                        {project.date.replaceAll("-",".")}
                                    </div>
                                    <div className={styles.place}>
                                        {project.place.charAt(0).toUpperCase()+project.place.slice(1)}
                                    </div> */}
                                </div>
                            </div>
                            <div className={styles.bottom}>
                                <div className={styles.desc} dangerouslySetInnerHTML={{__html: project.desc}}></div>
                                <div className={styles.readMore}>read more...</div>
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
                {filteredProjects.map((project, idx) => (
                    <Link key={idx} to={project.slug}><span>{project.date.replaceAll("-",".")}</span><span>{project.name}</span></Link>
                ))}
            </>}
        </div>
    )
}

export default MainProjects;