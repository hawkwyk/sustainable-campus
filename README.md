# 北京大学可持续校园实践课程网站

一个展示北京大学可持续校园实践课程项目的现代化响应式网站，包含交互式地图、项目展示、团队介绍等功能。

## 🌟 项目特色

### 核心功能
- **现代化设计**: 采用绿色主题和学术风格，体现可持续发展理念
- **响应式布局**: 完美适配桌面、平板和移动设备
- **交互式地图**: 集成高德地图API，展示校园可持续项目位置
- **项目展示**: 分类展示六大核心项目，支持详情查看
- **动态内容**: 实时统计数据、动画效果和滚动视差
- **内容管理**: 集中式配置文件，便于更新维护

### 技术亮点
- **纯前端实现**: 无需后端服务器，可直接部署到GitHub Pages
- **模块化架构**: 清晰的代码结构和组件化设计
- **丰富的交互**: 使用Anime.js、p5.js等库实现流畅动画
- **数据可视化**: ECharts.js展示项目成果和影响力
- **地图集成**: 高德地图API实现标记系统和路径规划

## 📁 项目结构

```
├── index.html              # 主页 - 课程介绍和特色项目
├── projects.html           # 项目故事页面 - 分类展示小组项目
├── tour.html              # Tour页面 - 交互式地图标记系统
├── about.html             # 关于我们页面 - 团队信息和联系方式
├── main.js                # 主要JavaScript功能
├── config.js              # 配置文件 - 统一管理内容和API
├── resources/             # 资源文件夹
│   ├── logo.png           # 网站logo
│   ├── hero-bg.jpg        # 主页背景图
│   ├── project-*.jpg      # 项目相关图片
│   └── team-*.jpg         # 团队成员头像
├── .github/               # GitHub配置
│   └── workflows/
│       └── deploy.yml     # GitHub Pages部署工作流
└── README.md              # 项目文档
```

## 🚀 快速开始

### 本地开发

1. **克隆项目**
   ```bash
   git clone https://github.com/hawkwyk/sustainable-campus.git
   cd sustainable-campus
   ```

2. **启动本地服务器**
   ```bash
   # 使用Python
   python -m http.server 8000
   
   # 或使用Node.js
   npx serve .
   
   # 或使用PHP
   php -S localhost:8000
   ```

3. **访问网站**
   打开浏览器访问 `http://localhost:8000`

### 部署到GitHub Pages

1. **配置GitHub仓库**
   - 在GitHub上创建新仓库 `sustainable-campus`
   - 将代码推送到仓库

2. **启用GitHub Pages**
   - 进入仓库 Settings → Pages
   - 选择 Source 为 "GitHub Actions"

3. **配置环境变量（可选）**
   - 如果需要使用GitHub API功能，请配置 Personal Access Token
   - Settings → Secrets and variables → Actions
   - 添加新的 Repository secret: `GITHUB_TOKEN`

4. **自动部署**
   - 推送代码到 `main` 分支将自动触发部署
   - 访问地址: `https://hawkwyk.github.io/sustainable-campus/`

## ⚙️ 配置说明

### 基础配置 (`config.js`)

```javascript
const CONFIG = {
    site: {
        title: "北京大学可持续校园实践课程",
        subtitle: "构建绿色未来，培养环保意识",
        // ... 其他网站基本信息
    },
    
    api: {
        amapKey: "你的高德地图API密钥",
        github: {
            username: "hawkwyk",
            repo: "sustainable-campus"
        }
    },
    
    map: {
        center: [116.3108, 39.9934], // 北京大学坐标
        zoom: 16,
        markerTypes: {
            // 项目类型配置
        }
    },
    
    projects: {
        // 项目数据和分类配置
    }
};
```

### 高德地图API配置

1. 访问 [高德开放平台](https://lbs.amap.com/)
2. 创建应用并获取API Key
3. 在 `config.js` 中更新 `amapKey`

### GitHub API配置

1. 创建 Personal Access Token
   - Settings → Developer settings → Personal access tokens
   - 创建新token，选择 `repo` 权限

2. 配置GitHub Secrets
   - 仓库 Settings → Secrets and variables → Actions
   - 添加 `PERSONAL_ACCESS_TOKEN` (用于GitHub API)

## 🎯 功能详解

### 主页 (index.html)
- **Hero区域**: 粒子动画背景 + 课程介绍
- **统计数据**: 动态数字展示项目成果
- **项目轮播**: 特色项目自动轮播展示
- **数据可视化**: ECharts图表展示项目影响力
- **行动号召**: 引导用户探索更多内容

### 项目故事 (projects.html)
- **分类筛选**: 按项目类型筛选展示
- **项目卡片**: 悬停效果和详细信息
- **模态框**: 点击查看项目详情和图片
- **图片查看器**: 支持图片放大查看
- **微信公众号链接**: 跳转到相关推送

### 校园导览 (tour.html)
- **交互式地图**: 高德地图集成，显示项目位置
- **标记系统**: 不同类型项目使用不同图标
- **添加标记**: 用户可提交新的项目标记
- **筛选功能**: 按类型筛选地图标记
- **进度追踪**: 统计导览完成情况

### 关于我们 (about.html)
- **发展历程**: 时间轴展示项目历史
- **团队介绍**: 核心成员信息和联系方式
- **联系表单**: 用户反馈和咨询功能
- **社交媒体**: 微博、B站等社交平台链接
- **公众号二维码**: 微信扫码关注

## 🛠️ 技术栈

### 前端框架
- **HTML5**: 语义化标签和现代Web标准
- **CSS3**: Flexbox、Grid、动画和响应式设计
- **JavaScript ES6+**: 模块化、异步处理和现代语法

### UI框架和库
- **Tailwind CSS**: 实用优先的CSS框架
- **Google Fonts**: Noto Sans/Serif SC 中文字体
- **Anime.js**: 轻量级动画库
- **p5.js**: 创意编程和粒子动画

### 功能库
- **ECharts.js**: 数据可视化图表
- **Splide.js**: 轮播组件
- **高德地图API**: 交互式地图功能

### 开发工具
- **Git**: 版本控制
- **GitHub Actions**: 自动化部署
- **ESLint**: 代码质量检查

## 📱 响应式设计

网站采用移动优先的响应式设计策略：

### 断点设置
- **移动端**: < 640px
- **平板端**: 640px - 1024px  
- **桌面端**: > 1024px

### 适配特性
- **流式布局**: 使用Flexbox和Grid实现
- **图片适配**: 响应式图片和懒加载
- **触摸优化**: 移动端手势和交互优化
- **字体缩放**: 根据屏幕尺寸调整字体大小

## 🔧 自定义和扩展

### 添加新项目
1. 在 `config.js` 的 `projects.items` 中添加项目数据
2. 准备项目图片并放入 `resources/` 文件夹
3. 更新项目分类和统计信息

### 修改样式
1. 主要样式在各自HTML文件的 `<style>` 标签中
2. 颜色变量定义在 `:root` 选择器中
3. 响应式样式使用 Tailwind CSS 的断点类

### 添加新功能
1. 在 `main.js` 中添加相应的JavaScript类
2. 在HTML文件中添加必要的DOM结构
3. 更新配置文件和导航菜单

## 📊 性能优化

### 图片优化
- 使用WebP格式（如支持）
- 实现图片懒加载
- 压缩图片文件大小

### 代码优化
- JavaScript模块化加载
- CSS最小化和压缩
- 移除未使用的代码

### 加载优化
- 关键资源优先加载
- 异步加载非关键资源
- 使用CDN加速静态资源

## 🔒 安全考虑

### API密钥保护
- 高德地图API密钥已配置为环境变量
- GitHub Token通过Secrets安全存储
- 敏感信息不在代码中硬编码

### 内容安全
- 用户输入验证和过滤
- XSS攻击防护
- 安全的表单提交处理

## 🤝 贡献指南

### 开发流程
1. Fork 项目仓库
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

### 代码规范
- 使用ES6+语法
- 遵循语义化HTML标准
- 保持CSS类名的一致性
- 添加必要的注释说明

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🙏 致谢

- **北京大学环境科学学院**: 项目支持和指导
- **参与师生**: 项目的积极贡献者
- **开源社区**: 提供优秀的开源工具和库

## 📞 联系方式

- **邮箱**: sustainable-campus@pku.edu.cn
- **电话**: +86-10-6275-1234
- **地址**: 北京市海淀区颐和园路5号北京大学环境科学学院
- **微信公众号**: 北大可持续校园

---

**构建绿色未来，从校园开始！** 🌱