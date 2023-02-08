import * as React from "react"
import { useRef, useState, useEffect } from "react"
import * as styles from "../styles/contact.module.scss"

import Layout from "../components/layout"
import Links from "../components/links"
import PageTitle from "../components/pageTitle"
import Seo from "../components/seo"

import useWindowDimensions from "../hooks/useWindowDimensions"

const pageTitle = "contact!";
const Contact = () => {
    const { width } = useWindowDimensions();
    const ref = useRef(null);
    const [headerHeight, setHeaderHeight] = useState(0);
    useEffect(() => {
        setHeaderHeight(ref.current.clientHeight);
    }, [ref, width])
    return (
        <Layout headerRef={ref} pageTitle={pageTitle}>
            <PageTitle headerHeight={headerHeight} title={pageTitle}/>
            <div className={styles.content}>
                <form name="contact" method="POST" data-netlify="true">
                    <input type="hidden" name="form-name" value="contact" />
                    <input type="text" id="name" name="name" placeholder="name"></input>
                    <input type="email" id="email" name="email" placeholder="email"></input>
                    <input type="text" id="subject" name="subject" placeholder="subject"></input>
                    <textarea id="message" name="message" placeholder="message"></textarea>
                    <button type="submit">ok?</button>
                </form>
            </div>
            <Links />
        </Layout>
    )
}

export const Head = () => <Seo title="Contact" />

export default Contact
