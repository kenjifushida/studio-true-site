import * as React from "react"
import { useState } from "react"
import * as styles from "../styles/actions.module.scss"

import SectionTitle from "./sectionTitle"
import useWindowDimensions from "../hooks/useWindowDimensions"

export const actions = [
    {
        japTitle: "サーキューラーデザイン",
        engTitle: "Circular Design",
        desc: "私たちは環境問題に向き合い、新しい資源の循環を設計し、そのサイクルの中でものづくりを行います。単なるものづくりに終始せず、使われる素材や廃棄されることを考えながら制作に取り組みます。個人のみならず集団もエンパワーメントすることで、新しい循環を支える仕組みから設計します。",
        tags: [
            {
                name: "マテリアル",
                desc: "自然素材や廃棄物などを採集し、これらを用いたマテリアルを開発し、新しい利用方法を提案します。"
            },
            {
                name: "ゴミ",
                desc: "ゴミや廃材を再び資源として集め、こうした廃棄物を転用したプロダクトや空間を設計します。"
            },
            {
                name: "修理",
                desc: "家具や建物からインフラまでを修理することで、持続可能な未来と都市の新しいつながりを生み出します。"
            },
            {
                name: "食品",
                desc: "廃棄された食品を地域で堆肥化し、地産地消の新しいサイクルをつくることで、地域コミュニティを盛り上げます。"
            },
        ]
    },
    {
        japTitle: "建築・都市",
        engTitle: "Architecture and Urbanism",
        desc: "私たちはまちに存在するあらゆる問題に向き合い、人々とともに問題を乗り越えていくために、幅広く建築と都市のデザインに取り組みます。市民や企業、行政などとともに活動を展開し、コミュニティを形成・運営します。こうした活動を持続可能にするために、まちづくりや政策にまでアプローチします。",
        tags: [
            {
                name: "空間デザイン",
                desc: "自然素材や廃棄物などを採集し、これらを用いたマテリアルを開発し、新しい利用方法を提案します。"
            },
            {
                name: "公共空間",
                desc: "都市のなかで私たち市民の場所を生み出していくために、ストリートファニチャーのデザインからイベントの企画・運営も行います。"
            },
            {
                name: "ローカル",
                desc: "まちに開かれた場所やコミュニティの企画・運営から、地域のセーフティネットを設計します。"
            },
            {
                name: "まちづくり",
                desc: "まちのビジョンや開発に市民の声を反映させるための調査の実施や、ワークショップなどの開催とファシリテーションをします。"
            },
            {
                name: "行政",
                desc: "建築や都市に関する専門的な知見や先進的なリサーチを通じて、都市計画や政策のレベルで提案を行います。"
            },
        ]
    },
    {
        japTitle: "パブリケーション",
        engTitle: "Publication",
        desc: "私たちは出版を通じて、人々の活動をサポートしていきます。企画から編集まで、そしてプロダクトとして完成させるためのグラフィックデザインから印刷まで行います。また印刷物に限らず、webメディアから映像メディアまで幅広く扱います。",
        tags: [
            {
                name: "印刷",
                desc: "リソグラフ印刷機を用いて、フライヤーや冊子などあらゆる印刷物を作成します。"
            },
            {
                name: "出版",
                desc: "自費出版誌（HUMARIZINE）の発刊を続けると同時に、これまでの知見を生かし、あらゆる出版活動を支援します。"
            },
            {
                name: "企画・編集",
                desc: "私たち独自のネットワークや切り口、専門性をもって、タウンペーパーからデザインなどの専門誌まで企画し、編集します。"
            },
            {
                name: "批評",
                desc: "デザイン・建築・都市・芸術といった領域への考察から、社会を写し出すテキストをあらゆるメディアで執筆します。"
            },
            {
                name: "写真・映像",
                desc: "テキストのみならず、写真や映像というメディアを駆使したドキュメンテーションを通じ、記録と作品をつくります。"
            },
        ]
    },
    {
        japTitle: "キュレーション",
        engTitle: "Curation",
        desc: "私たちは多様な人々との連携を通じて、複雑な社会のなかに新しいアクションを生み出していきます。東京から世界までという地理的なスケールから、芸術から社会までという学問的なスケールも横断しながら、あらゆるものごとを再編して、これからのありうべき社会を思索します。",
        tags: [
            {
                name: "コミュニケーション",
                desc: "通訳や翻訳といったコミュニケーションのサポートから、国際的なプロジェクトへの参画まで行います。"
            },
            {
                name: "共同制作",
                desc: "デザイナー・建築家・アーティストなどとの協働を行うと同時に、積極的にコラボレーションに参加します。"
            },
            {
                name: "イベント",
                desc: "新しい繋がりや価値観、プロジェクトを生み出していくために、イベントの企画や運営を行います。"
            },
            {
                name: "展覧会",
                desc: "あらゆる作品や事例、情報のキュレーションを行い、展示します。"
            },
        ]
    },
]

const Actions = () => {
    const { width } = useWindowDimensions();
    const [currentTagBox, setCurrentTagBox] = useState(actions[0].engTitle);
    const [currentTag, setCurrentTag] = useState("");
    const handleTagBox = (actionIndex, tagIndex) => {
        setCurrentTagBox(actions[actionIndex].engTitle);
        setCurrentTag(actions[actionIndex].tags[tagIndex].desc);
    }
    return (
        <div style={{display:"flex", flexDirection: "column"}}>
            <SectionTitle title={"actions"} />
            <div style={
                {
                    display: "flex", flexDirection: "column",
                    gap: "2.5rem"
                }
                }>
                {actions.map((action, actionIndex) => (
                    <div key={actionIndex} className={styles.post}>
                    <div className={styles.overlay}>
                        <div className={styles.postTitle}>{action.japTitle}</div>
                        <div className={styles.overlayTitle}>{action.engTitle}</div>
                    </div>
                    <div className={styles.innerPost}>
                        <div className={styles.actionContent}>
                            <div className={styles.postTitle}>{action.japTitle}</div>
                            <div className={styles.postDesc}>{action.desc}</div>
                        </div>
                        <div className={styles.hashtags}>
                            {action.tags.map((tag, tagIndex) => (
                                <div key={tagIndex} 
                                  onMouseEnter={()=>handleTagBox(actionIndex, tagIndex)}
                                  onMouseLeave={()=>setCurrentTagBox("")}
                                  >#{tag.name}</div>
                            ))}
                        </div>
                        { width > 720 ? 
                        <div className={styles.tagBox}
                          style={action.engTitle === currentTagBox ? 
                          {display: "block"} : {display:"none"}}>
                            {currentTag}
                        </div> : null
                        }
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