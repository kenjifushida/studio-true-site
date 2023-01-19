import * as React from "react"
import * as styles from "../styles/actions.module.scss"

import SectionTitle from "./sectionTitle"

export const actions = [
    {
        japTitle: "サーキューラーデザイン",
        engTitle: "Circular Design",
        desc: "私たちは環境問題に向き合い、新しい資源の循環を設計し、そのサイクルの中でものづくりを行います。単なるものづくりに終始せず、使われる素材や廃棄されることを考えながら制作に取り組みます。個人のみならず集団もエンパワーメントすることで、新しい循環を支える仕組みから設計します。"
    },
    {
        japTitle: "建築・都市",
        engTitle: "Architecture and Urbanism",
        desc: "私たちはまちに存在するあらゆる問題に向き合い、人々とともに問題を乗り越えていくために、幅広く建築と都市のデザインに取り組みます。市民や企業、行政などとともに活動を展開し、コミュニティを形成・運営します。こうした活動を持続可能にするために、まちづくりや政策にまでアプローチします。"
    },
    {
        japTitle: "パブリケーション",
        engTitle: "Publication",
        desc: "私たちは出版を通じて、人々の活動をサポートしていきます。企画から編集まで、そしてプロダクトとして完成させるためのグラフィックデザインから印刷まで行います。また印刷物に限らず、webメディアから映像メディアまで幅広く扱います。"
    },
    {
        japTitle: "キュレーション",
        engTitle: "Curation",
        desc: "私たちは多様な人々との連携を通じて、複雑な社会のなかに新しいアクションを生み出していきます。東京から世界までという地理的なスケールから、芸術から社会までという学問的なスケールも横断しながら、あらゆるものごとを再編して、これからのありうべき社会を思索します。"
    },
]

const Actions = () => {
    const postRows = [...Array(4).keys()];

    return (
        <div style={{display:"flex", flexDirection: "column"}}>
            <SectionTitle title={"actions"} />
            <div style={
                {
                    display: "flex", flexDirection: "column",
                    gap: "2.5rem"
                }
                }>
                {actions.map((action, idx) => (
                    <div key={idx} className={styles.post}>
                    <div className={styles.innerPost}>
                    <div className={styles.postTitle}>{action.japTitle}</div>
                    <div className={styles.postDesc}>{action.desc}</div>
                    </div>
                    <div className={styles.overlay}>
                    <div className={styles.postTitle}>{action.japTitle}</div>
                    <div className={styles.overlayTitle}>{action.engTitle}</div>
                    </div>
                </div>
                ))}
            </div>
            <div className={styles.downloadBtn}>
                <div>download?</div>
                <span>studio-true<br></br>_actions.pdf</span>
            </div>
        </div>
    )
}

export default Actions;