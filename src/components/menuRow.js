import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import * as styles from "../styles/index.module.scss"

const MenuRow = ({ option, posts}) => {
    const [highlight, setHighlight] = useState(false);

    return (
        <div className={styles.optionsContainer}>
            <Link to={`/${option}`} className={styles.option}
            style={highlight ? {color:"var(--primary-color)"}:{}}>{option}</Link>
            {posts.map((post, idx) => (
              <Link key={idx} to={post.slug ? post.slug : `/${option}`} className={styles.post}
              onMouseEnter={()=>setHighlight(true)}
              onMouseLeave={()=>setHighlight(false)}>
                  {option === "about" ? 
                  <>
                    <div className={styles.innerAbout}>
                      <p className={styles.postName}>{post.name}</p>
                      <p className={styles.postDesc}>{post.desc}</p>
                    </div>
                  </> : 
                  <>
                    <div className={styles.innerPost}>
                      <p className={styles.postDesc} dangerouslySetInnerHTML={{__html: post.desc}}></p>
                      <p>{post.date.replaceAll("-",".")}</p>
                      <p className={styles.postName}>{post.title.length > 8 ? post.title.slice(0,8)+"...": post.title}</p>
                    </div>
                    {post.img !== undefined ? <GatsbyImage className={styles.imgContainer} image={post.img} /> : null }
                  </>}
                <div className={styles.postOverlay} 
                style={post.img ===undefined ? {background: "var(--box-bg)"}:{}}
                >
                  {option === "news" ? post.date.replaceAll("-","").slice(2) : null}
                </div>
              </Link>
            ))}
        </div>
    )
}

export default MenuRow;