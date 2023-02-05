import * as React from "react"
import { ThemeContext } from "./layout"
import { Link } from "gatsby"
import * as styles from "../styles/mainNews.module.scss"

const MainNews = ({ filteredNews }) => {
    const lines = [...Array(15).keys()];
    const {viewMode } = React.useContext(ThemeContext);

    if(!viewMode) {
        return null;
    }
    return (
        <div className={styles.main}>
            {viewMode === 'box' ? <>
            <div className={styles.boxes}>
                {filteredNews.map((news, idx) => (
                    <Link key={idx} className={styles.post} to={news.slug}>
                        <div className={styles.overlay}>
                            <div className={styles.title}>{news.title}</div>
                            <div className={styles.date}>{news.date.slice(2).replaceAll("-","")}</div>
                            <div className={styles.category}>{news.category}</div>
                        </div>
                        <div className={styles.innerPost}>
                            <div className={styles.top}>
                                <div className={styles.topTitle}>{news.title}</div>
                                <div>{news.date.replaceAll("-",".")}</div>
                                <div>read more...</div>
                            </div>
                            <div className={styles.desc} dangerouslySetInnerHTML={{__html: news.desc}}></div>
                            <div className={styles.category}>{news.category}</div>     
                        </div>
                    </Link>
                ))}
            </div>
            </> 
            : <>
                <div className={styles.labels}>
                    <span>date</span><span>title</span>
                </div>
                <div className={styles.lines}>
                    {lines.map((line, idx) => (
                        <div key={idx} className={styles.line}></div>
                    ))}
                </div>
                {filteredNews.map((news, idx) => (
                    <Link key={idx} to={news.slug}><span>{news.date.replaceAll("-",".")}</span><span>{news.title}</span></Link>
                ))}
            </>}
        </div>
    )
}

export default MainNews;