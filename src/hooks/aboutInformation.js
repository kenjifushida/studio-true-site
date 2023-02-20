export const getVision = () => {
    const vision = {
        japTitle: "社会をサバイブする共同体をつくる",
        engTitle: "Creating a Community to Survive in Society",
        desc: "vision.desc",
        filter: [true, false, false, false, false]
    }
    return vision
}

export const getMission = () => {
  const mission = {
    japTitle: "オルタナティブな場所や仕組みからうまれる人や物のネットワークを都市から地球までのスケールでデザインする",
    engTitle: "We design a network of people and things that emerge from alternative places and systems on a scale ranging from urbanism to the earth.",
    desc: "mission.desc",
    filter: [false, true, false, false, false]

  }
  return mission
}

export const getApproaches = () => {
    const approaches = [
        {
            japTitle: "偶発性と身体性",
            engTitle: "Contingency and Embodiment",
            desc: "approaches.0.desc",
            filter: [false, false, true, false, false]
        },
        {
            japTitle: "小さいけれど継続的",
            engTitle: "Small but Continuous",
            desc: "approaches.1.desc",
            filter: [false, false, true, false, false]
        },
        {
            japTitle: "リサーチとアーカイブ",
            engTitle: "Research and Archive",
            desc: "approaches.2.desc",
            filter: [false, false, true, false, false]
        }
    ]
    return approaches
}

export const getActions = () => {
    const actions = [
        {
            japTitle: "サーキューラーデザイン",
            engTitle: "Circular Design",
            desc: "actions.0.desc",
            tags: [
                {
                    name: "actions.0.tags.0.name",
                    desc: "actions.0.tags.0.desc"
                },
                {
                    name: "actions.0.tags.1.name",
                    desc: "actions.0.tags.1.desc"
                },
                {
                    name: "actions.0.tags.2.name",
                    desc: "actions.0.tags.2.desc"
                },
                {
                    name: "actions.0.tags.3.name",
                    desc: "actions.0.tags.3.desc"
                },
            ],
            filter: [false, false, false, true, false]
        },
        {
            japTitle: "建築・都市",
            engTitle: "Architecture and Urbanism",
            desc: "actions.1.desc",
            tags: [
                {
                    name: "actions.1.tags.0.name",
                    desc: "actions.1.tags.0.desc"
                },
                {
                    name: "actions.1.tags.1.name",
                    desc: "actions.1.tags.1.desc"
                },
                {
                    name: "actions.1.tags.2.name",
                    desc: "actions.1.tags.2.desc"
                },
                {
                    name: "actions.1.tags.3.name",
                    desc: "actions.1.tags.3.desc"
                },
                {
                    name: "actions.1.tags.4.name",
                    desc: "actions.1.tags.4.desc"
                },
            ],
            filter: [false, false, false, true, false]
        },
        {
            japTitle: "パブリケーション",
            engTitle: "Publication",
            desc: "actions.2.desc",
            tags: [
                {
                    name: "actions.2.tags.0.name",
                    desc: "actions.2.tags.0.desc"
                },
                {
                    name: "actions.2.tags.1.name",
                    desc: "actions.2.tags.1.desc"
                },
                {
                    name: "actions.2.tags.2.name",
                    desc: "actions.2.tags.2.desc"
                },
                {
                    name: "actions.2.tags.3.name",
                    desc: "actions.2.tags.3.desc"
                },
                {
                    name: "actions.2.tags.4.name",
                    desc: "actions.2.tags.4.desc"
                },
            ]
        },
        {
            japTitle: "キュレーション",
            engTitle: "Curation",
            desc: "actions.3.desc",
            tags: [
                {
                    name: "actions.3.tags.0.name",
                    desc: "actions.3.tags.0.desc"
                },
                {
                    name: "actions.3.tags.1.name",
                    desc: "actions.3.tags.1.desc"
                },
                {
                    name: "actions.3.tags.2.name",
                    desc: "actions.3.tags.2.desc"
                },
                {
                    name: "actions.3.tags.3.name",
                    desc: "actions.3.tags.3.desc"
                },
            ],
            filter: [false, false, false, true, false]
        },
    ]
    return actions
}

export const getMembers = () => {
    const members = [
        {
            name: "Rei Terauchi",
            kanji: "寺内 玲",
            birth: "members.0.birth",
            origin: "members.0.origin",
            desc: "members.0.desc",
            img: "../images/rei.jpg",
            education: [
              "members.0.education.0",
              "members.0.education.1",
              "members.0.education.2",
              "members.0.education.3"
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
                name: "master thesis",
                content: "MDEF 2021-2022",
                link: "https://drive.google.com/file/d/1zlbgFdXZtRdhuHwarp2h-OcKmLO45aY-/view?usp=sharing"
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
            birth: "members.1.birth",
            origin: "members.1.origin",
            desc: "members.1.desc",
            img: "../images/taiga.jpg",
            education: [
              "members.1.education.0",
              "members.1.education.1",
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
                link: "https://drive.google.com/file/d/1bniPj-BxArmtOoywpXOCIBKh5gLBgbgS/view?usp=sharing"
              },
              {
                name: "portfolio",
                content: "2022.10",
                link: "https://drive.google.com/file/d/1gg-hUfAYbbfz16scIKqjL4mxB9iszyUs/view?usp=sharing"
              },
              {
                name: "note",
                content: "Taiga Matsuoka",
                link: "https://note.com/taigamatsuoka"
              }
            ],
            spotify: "spotify"
        }
    ];
    return members;
}