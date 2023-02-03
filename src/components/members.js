import * as React from "react"
import { useState, useEffect, useRef } from "react"
import { Link } from "gatsby"
import * as styles from "../styles/members.module.scss"

import SectionTitle from "./sectionTitle"

const members = [
    {
      name: "Rei Terauchi",
      kanji: "寺内 玲",
      birth: "1997年",
      origin: "静岡県長泉町",
      education: [
        "慶應義塾大学環境情報学部卒業",
        "Institute for advanced architecture of Catalonia Master in Design for Emergent Futures"
      ],
      page: "/rei",
      left: [
        {
          name: "mail",
          content: "rei[at]studio-ture.net",
        },
        {
          name: "tel",
          content: "080-7442-7180",
        }
      ],
      center: [
        {
          name: "instagram",
          content: "ponpon0505",
          link: "https://www.instagram.com/ponpon0505"
        },
        {
          name: "podcast",
          content: "kasenzikiradio",
        },
        {
          name: "twitter",
          content: "@fujisanrei",
          link: "https://twitter.com/fujisanrei"
        },
        {
          name: "portfolio",
          content: "portfolio",
          link: "/documents/rei_portfolio.pdf"
        },
        {
          name: "medium",
          content: "@reiterauchi",
          link: "https://medium.com/@reiterauchi"
        }
      ],
      spotify: "spotify"
    },
    {
      name: "Taiga Matsuoka",
      kanji: "松岡 大雅",
      birth: "1995年",
      origin: "静岡県長泉町",
      education: [
        "慶應義塾大学環境情報学部卒業",
        "Institute for advanced architecture of Catalonia Master in Design for Emergent Futures"
      ],
      page: "/taiga",
      left: [
        {
          name: "mail",
          content: "taiga[at]studio-true.net",
        },
        {
          name: "tell",
          content: "080-9665-7230",
        }
      ],
      center: [
        {
          name: "instagram",
          content: "taigamatsuoka",
          link: "https://www.instagram.com/taigamatsuoka/"
        },
        {
          name: "podcast",
          content: "河川敷のようなラジオ",
          link: "https://linktr.ee/kasenzikiradio"
        },
        {
          name: "twitter",
          content: "@Taiga0628",
          link: "https://twitter.com/Taiga0628"
        },
        {
          name: "master thesis",
          content: "廃棄物の転用による、つくることの探究",
        },
        {
          name: "portfolio",
          content: "2022.10",
        },
        {
          name: "note",
          content: "Taiga Matsuoka",
          link: "https://note.com/taigamatsuoka"
        }
      ],
      spotify: "spotify"
    }
]

const Members = ({ memberState, changeSelectedMember }) => {
    return (
      <div>
          {memberState >= 0 ?
          <div className={styles.memberContent}>
            <div className={styles.profile}>
              <div className={styles.profilePic}></div>
              <div className={styles.info}>
                <div>{members[memberState].kanji}</div>
                <p>{members[memberState].birth}生まれ</p>
                <p>{members[memberState].origin}出身</p>
                {members[memberState].education.map((school, idx) => (
                  <p key={idx}>{school}</p>
                ))}
              </div>
            </div>
            <div className={styles.left}>
              {members[memberState].left.map((box, idx) => (
                <div key={idx} className={styles.link}>
                  <div className={styles.box}>{box.name}</div>
                  <Link className={styles.innerBox}>{box.content}</Link>
                </div>
            ))}
            </div>
            <div className={styles.center}>
              {members[memberState].center.map((box, idx) => (
                <div key={idx} className={styles.link}>
                  <div className={styles.box}>{box.name}</div>
                  <a className={styles.innerBox} href={box.link ? box.link : null}
                  target="_blank" 
                  rel="noopener noreferrer">
                    {box.content}
                  </a>
                </div>
              ))}
            </div>
         </div>
         : <>
              <SectionTitle title={"members"} />
              <div className={styles.members}>
                  {members.map((member, idx) => (
                  <div key={idx} className={styles.member}>
                      <div onClick={()=>changeSelectedMember(idx)} className={styles.innerMember}>
                        <div>{member.kanji}</div>
                        <div>
                            <p>{member.left[0].name}: {member.left[0].content}</p>
                            <p>{member.left[1].name}: {member.left[1].content}</p>
                        </div>
                        <div className={styles.name}>{member.name}</div>
                      </div>
                  </div>
                  ))}
              </div>
            </>}
        </div>
    )
}

export default Members