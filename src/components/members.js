import * as React from "react"
import { Link } from "gatsby"
import * as styles from "../styles/members.module.scss"

import SectionTitle from "./sectionTitle"
import { getMembers } from "../hooks/aboutInformation"

import { useIntl } from "gatsby-plugin-react-intl"
import { GatsbyImage, getImage, StaticImage } from "gatsby-plugin-image"

const members = getMembers();

const Members = ({ memberState, changeSelectedMember }) => {
  const intl = useIntl();
  const memberImages = [
    <StaticImage src="../images/rei.jpg" alt="profile-picture" />, 
    <StaticImage src="../images/taiga.jpg" alt="profile-picture" />
  ];
    return (
      <div>
          {memberState >= 0 ?
          <div className={styles.memberContent}>
            <div className={styles.profile}>
              <div className={styles.profilePic}>
                {memberImages[memberState]}
              </div>
              <div className={styles.info}>
                <div>{intl.locale === "ja" ? members[memberState].kanji : members[memberState].name}</div>
                <p>{intl.formatMessage({id: members[memberState].birth})}</p>
                <p>{intl.formatMessage({id: members[memberState].origin})}</p>
                {members[memberState].education.map((school, idx) => (
                  <p key={idx}>{intl.formatMessage({id: school})}</p>
                ))}
              </div>
            </div>
            <p className={styles.desc}>{intl.formatMessage({id: members[memberState].desc})}</p>
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
                      {memberImages[idx]}
                      <div onClick={()=>changeSelectedMember(idx)} className={styles.innerMember}>
                        <div className={styles.kanji}>{member.kanji}</div>
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