// 可持续校园实践网站配置文件
// 所有内容和API配置集中管理，便于修改和维护

const CONFIG = {
    // 网站基本信息
    site: {
        title: "北京大学可持续校园实践课程",
        subtitle: "构建绿色未来，培养环保意识",
        description: "北京大学可持续校园实践课程官方网站，展示学生创新项目和环保实践成果",
        keywords: "北京大学, 可持续发展, 环保, 校园实践, 绿色校园",
        author: "北京大学可持续校园实践课程团队",
        year: "2025"
    },

    // API配置
    api: {
        // 高德地图API密钥
        amapKey: "2af2aacfc59717f760ca56328d699e95",
        
        // GitHub API配置
        github: {
            username: "hawkwyk",
            repo: "sustainable-campus",
            branch: "main",
            // 注意：Personal Access Token需要通过GitHub Secrets配置
            // 不要在代码中直接写入token
        }
    },

    // 地图配置
    map: {
        // 北京大学中心坐标
        center: [116.3108, 39.9934],
        zoom: 16,
        
        // 标记点分类配置
        markerTypes: {
            garden: {
                name: "花园改造",
                icon: "🌿",
                color: "#22c55e"
            },
            cafeteria: {
                name: "食堂改造", 
                icon: "🍽️",
                color: "#f59e0b"
            },
            birds: {
                name: "防鸟撞设施",
                icon: "🐦",
                color: "#3b82f6"
            },
            enzyme: {
                name: "酵素应用",
                icon: "🧪",
                color: "#8b5cf6"
            },
            kiosk: {
                name: "核酸亭改造",
                icon: "🏠",
                color: "#ef4444"
            },
            club: {
                name: "社团活动",
                icon: "👥",
                color: "#06b6d4"
            }
        }
    },

    // 项目数据
    projects: {
        categories: [
            {
                id: "garden",
                name: "蔚秀园改造",
                description: "将蔚秀园打造成生态友好型的学习休闲空间",
                icon: "🌿",
                color: "#22c55e"
            },
            {
                id: "cafeteria", 
                name: "食堂改造",
                description: "推动可持续餐饮实践，减少食物浪费",
                icon: "🍽️",
                color: "#f59e0b"
            },
            {
                id: "birds",
                name: "防鸟撞设施改造", 
                description: "保护校园鸟类，创建鸟类友好的建筑环境",
                icon: "🐦",
                color: "#3b82f6"
            },
            {
                id: "enzyme",
                name: "酵素应用",
                description: "推广环保酵素制作与应用技术",
                icon: "🧪", 
                color: "#8b5cf6"
            },
            {
                id: "kiosk",
                name: "核酸亭改造",
                description: "创新改造闲置核酸亭，赋予新功能",
                icon: "🏠",
                color: "#ef4444"
            },
            {
                id: "club",
                name: "可持续校园社团",
                description: "学生自发组织的可持续发展社团活动",
                icon: "👥",
                color: "#06b6d4"
            }
        ],

        // 具体项目数据
        items: [
            {
                id: "weixiuyuan-1",
                category: "garden",
                title: "蔚秀园生态花园改造",
                description: "通过种植本土植物、建设雨水收集系统、设置生态座椅等方式，将蔚秀园改造为集学习、休闲、生态教育于一体的绿色空间。",
                images: ["resources/project-weixiuyuan.jpg"],
                wechatUrl: "https://mp.weixin.qq.com/s/example1",
                location: [116.3108, 39.9934],
                completionDate: "2024-09-15",
                participants: 25,
                impact: "提升了校园生物多样性，为学生提供了生态学习场所"
            },
            {
                id: "cafeteria-1", 
                category: "cafeteria",
                title: "学五食堂可持续改造",
                description: "引入食物垃圾分类系统、推广可重复使用的餐具、建立食物浪费监测机制，打造绿色食堂示范点。",
                images: ["resources/project-cafeteria.jpg"],
                wechatUrl: "https://mp.weixin.qq.com/s/example2", 
                location: [116.3120, 39.9920],
                completionDate: "2024-10-20",
                participants: 18,
                impact: "食物浪费减少40%，垃圾分类准确率提升至95%"
            },
            {
                id: "birds-1",
                category: "birds", 
                title: "理科楼群防鸟撞改造",
                description: "在建筑物玻璃幕墙安装鸟类可见的图案贴膜，设置鸟类警示系统，有效减少鸟类撞击事件。",
                images: ["resources/project-birds.jpg"],
                wechatUrl: "https://mp.weixin.qq.com/s/example3",
                location: [116.3095, 39.9945], 
                completionDate: "2024-08-30",
                participants: 12,
                impact: "鸟类撞击事件减少85%，提升了校园生态友好度"
            },
            {
                id: "enzyme-1",
                category: "enzyme",
                title: "环保酵素制作与应用工坊",
                description: "建立酵素制作实验室，开展酵素制作培训，推广酵素清洁剂在校园清洁中的应用。",
                images: ["resources/project-enzyme.jpg"],
                wechatUrl: "https://mp.weixin.qq.com/s/example4",
                location: [116.3115, 39.9915],
                completionDate: "2024-11-10", 
                participants: 35,
                impact: "制作了500升环保酵素，替代了化学清洁剂的使用"
            },
            {
                id: "kiosk-1",
                category: "kiosk",
                title: "核酸亭变身绿色驿站",
                description: "将闲置核酸亭改造为校园绿色驿站，提供自行车维修工具、种子交换、环保信息咨询等服务。",
                images: ["resources/project-kiosk.jpg"],
                wechatUrl: "https://mp.weixin.qq.com/s/example5",
                location: [116.3125, 39.9935],
                completionDate: "2024-09-05",
                participants: 15,
                impact: "服务师生1000+人次，促进了校园共享经济发展"
            },
            {
                id: "club-1",
                category: "club",
                title: "绿色未来社团系列活动",
                description: "组织可持续发展主题讲座、环保实践活动、绿色创新竞赛等，培养学生环保意识和行动能力。",
                images: ["resources/team-group.jpg"],
                wechatUrl: "https://mp.weixin.qq.com/s/example6", 
                location: [116.3100, 39.9925],
                completionDate: "持续进行",
                participants: 80,
                impact: "影响了500+学生的环保行为，形成了良好的校园环保文化"
            }
        ]
    },

    // 统计数据
    statistics: {
        totalProjects: 6,
        totalParticipants: 185,
        completedProjects: 5,
        ongoingProjects: 1,
        co2Reduced: "2.5吨",
        wasteReduced: "40%",
        energySaved: "15%",
        biodiversityIndex: "+30%"
    },

    // 团队成员信息
    team: [
        {
            name: "张教授",
            role: "课程负责人",
            description: "环境科学学院教授，可持续发展研究专家",
            avatar: "resources/team-group.jpg"
        },
        {
            name: "李老师", 
            role: "项目指导",
            description: "城市与环境学院讲师，生态修复专家",
            avatar: "resources/team-group.jpg"
        },
        {
            name: "王同学",
            role: "学生负责人",
            description: "环境科学专业博士生，绿色未来社团主席",
            avatar: "resources/team-group.jpg"
        },
        {
            name: "陈同学",
            role: "技术负责人", 
            description: "信息科学技术学院硕士生，负责项目技术支持",
            avatar: "resources/team-group.jpg"
        }
    ],

    // 联系信息
    contact: {
        email: "sustainable-campus@pku.edu.cn",
        phone: "+86-10-6275-1234",
        address: "北京市海淀区颐和园路5号北京大学环境科学学院",
        wechat: {
            name: "北大可持续校园",
            qrcode: "resources/logo.png"
        },
        social: {
            weibo: "@北京大学可持续校园实践",
            bilibili: "北大绿色未来"
        }
    },

    // 页面文本内容
    content: {
        hero: {
            title: "构建可持续的校园未来",
            subtitle: "通过创新实践，将环保理念融入校园生活的每个角落",
            description: "北京大学可持续校园实践课程汇聚师生智慧，通过一系列创新项目推动校园可持续发展，培养下一代环保领袖。"
        },

        about: {
            history: [
                {
                    year: "2023",
                    title: "课程启动",
                    description: "北京大学可持续校园实践课程正式设立，开始招募第一批学生参与者"
                },
                {
                    year: "2024", 
                    title: "项目实施",
                    description: "六大核心项目陆续启动，覆盖校园生态、能源、废物管理等多个领域"
                },
                {
                    year: "2025",
                    title: "成果展示",
                    description: "项目取得显著成效，获得校内外广泛认可，影响力持续扩大"
                }
            ]
        }
    }
};

// 导出配置
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONFIG;
}