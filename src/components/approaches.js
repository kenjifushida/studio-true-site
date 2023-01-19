import * as React from "react"
import * as styles from "../styles/approaches.module.scss"
import SectionTitle from "./sectionTitle"

export const approaches = [
    {
        japTitle: "偶発性と身体性",
        engTitle: "Contingency and Embodiment",
        desc: "私たちは日々の生活の中で偶然に出会ったものや人、そして身の回りにあることや場所を大事にしています。偶発性と身体性を持ちながらデザインすることによって、社会のリアリティに向き合ったデザインを生み出せると考えます。",
        graph: "graph",
    },
    {
        japTitle: "小さいけれど継続的",
        engTitle: "Small but Continuous",
        desc: "私たちは小さくても何かを続けていくこと、そしてそこから育まれていくものごとを大事にしています。一度に大きな変化を生み出すことを目指すのではなく、継続的に取り組んでいくことで、その場その時に即したアクションを生み出せると考えます。",
    },
    {
        japTitle: "リサーチとアーカイブ",
        engTitle: "Research and Archive",
        desc: "私たちはものごとの質的な関係性を理解しながら調査し、生の情報とプロセスを記録し、積み重ねていくことを大事にしています。アーカイブを辿っていくことにより、リサーチに基づいたアクションが生み出せると考えます。",
        pdf: "studio-true_approaches.pdf"
    }
]

const Approaches = () => {
    return (
        <div className={styles.content}>
            <SectionTitle title={"approaches"}/>
            {approaches.map((approach, idx) => (
                <div key={idx} className={styles.article}>
                    <div className={styles.post}>
                        <div className={styles.innerPost}>
                            <div className={styles.postTitle}>{approach.japTitle}</div>
                            <div className={styles.postDesc}>{approach.desc}</div>
                        </div>
                        <div className={styles.overlay}>
                            <div className={styles.postTitle}>{approach.japTitle}</div>
                            <div className={styles.overlayTitle}>{approach.engTitle}</div>
                        </div>
                    </div>
                </div>
            ))}
            <div className={styles.downloadBtn}>
                <div>download?</div>
                <span>studio-true<br></br>_approaches.pdf</span>
            </div>
        </div>
    )
}

export default Approaches