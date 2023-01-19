import * as React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/contact.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Links from "../components/links"

const Contact = () => {
    return (
        <Layout>
            <h1 className={styles.pageTitle}>contact!</h1>
            <div className={styles.content}>
                <input type="text" id="name" name="name" placeholder="name"></input>
                <input type="text" id="mail" name="mail" placeholder="mail"></input>
                <input type="text" id="subject" name="subject" placeholder="subject"></input>
                <textarea id="message" name="message" placeholder="message"></textarea>
                <button type="submit">ok?</button>
            </div>
            <Links />
        </Layout>
    )
}

export const Head = () => <Seo title="Contact" />

export default Contact
