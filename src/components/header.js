import * as React from "react"
import { useState } from "react"
import { Link } from "gatsby"
import * as styles from "../styles/header.module.scss"

import LanguageToggle from "./languageToggle"
import Logo from "../images/logo.svg"
import ColorLogo from "../images/colorLogo.svg"

export const menuOptions = [
  "about",
  "news",
  "projects",
  "archives",
  "contact"
]

const Header = ({ headerRef, siteTitle }) => {
  const [nav, setNav] = useState(false);

  const mobileNavStyles = {
    height: nav ? "10.087rem" : "0"
  }

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.innerHeader}>
        <div className={styles.logo}>
          <Link to="/">
            <Logo className={styles.blackLogo} />
            <ColorLogo className={styles.colorLogo} />
          </Link>
        </div>
        <div className={styles.right}>
          <nav className={styles.deskNav}>
            {menuOptions.map((option, idx) => (
              <Link key={idx} 
                className={styles.deskOption}
                to={'/' + option}>{option}</Link>
            ))}
          </nav>
          <LanguageToggle />
        </div>
        <div 
          className={styles.menuBtn}
          onClick={()=>setNav(!nav)}
          style={{
            background: nav ? "var(--primary-color)" : "",
            border: nav ? "4px solid var(--primary-color)" : "4px solid var(--color-border)",
            transition: "all 0.4s ease"
          }}>
          <h3>menu</h3>
        </div>
      </div>
      <nav className={styles.mobileNav} style={mobileNavStyles}>
        <ul>
          {menuOptions.map(option => (
            <li><Link to={'/'+option}><span>{option}</span></Link></li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

export default Header
