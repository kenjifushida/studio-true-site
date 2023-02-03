import * as React from "react"
import * as styles from "../styles/contact.module.scss"

import Layout from "../components/layout"
import Seo from "../components/seo"
import Links from "../components/links"
import PageTitle from "../components/pageTitle"

const Contact = () => {
    return (
        <Layout>
            <PageTitle title={"contact!"}/>
            <div className={styles.content}>
                <section>
                    <input type="text" id="name" name="name" placeholder="name"></input>
                    <input type="text" id="mail" name="mail" placeholder="mail"></input>
                    <input type="text" id="subject" name="subject" placeholder="subject"></input>
                    <textarea id="message" name="message" placeholder="message"></textarea>
                    <button type="submit">ok?</button>
                </section>
            </div>
            <Links />
        </Layout>
    )
}

export const Head = () => <Seo title="Contact" />

export default Contact
