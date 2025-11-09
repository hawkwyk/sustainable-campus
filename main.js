// 主要JavaScript功能文件
// 包含所有页面的交互逻辑、动画效果和数据处理

class SustainableCampusApp {
    constructor() {
        this.config = CONFIG;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.initScrollReveal();
        this.initParticleBackground();
        this.initProjectCarousel();
        this.initStatisticsAnimation();
        this.initCharts();
        this.initMobileMenu();
    }

    // 事件监听器设置
    setupEventListeners() {
        document.addEventListener('DOMContentLoaded', () => {
            this.handlePageLoad();
        });

        window.addEventListener('scroll', () => {
            this.handleScroll();
        });

        window.addEventListener('resize', () => {
            this.handleResize();
        });
    }

    // 页面加载处理
    handlePageLoad() {
        // 标题文字动画
        this.animateHeroText();
        
        // 延迟启动统计数据动画
        setTimeout(() => {
            this.startStatisticsAnimation();
        }, 1000);
    }

    // Hero区域文字动画
    animateHeroText() {
        const title = document.getElementById('hero-title');
        const subtitle = document.getElementById('hero-subtitle');
        const description = document.getElementById('hero-description');

        if (title) {
            anime({
                targets: title,
                opacity: [0, 1],
                translateY: [50, 0],
                duration: 1200,
                easing: 'easeOutExpo',
                delay: 500
            });
        }

        if (subtitle) {
            anime({
                targets: subtitle,
                opacity: [0, 1],
                translateY: [30, 0],
                duration: 1000,
                easing: 'easeOutExpo',
                delay: 800
            });
        }

        if (description) {
            anime({
                targets: description,
                opacity: [0, 1],
                translateY: [20, 0],
                duration: 800,
                easing: 'easeOutExpo',
                delay: 1100
            });
        }
    }

    // 滚动显示动画
    initScrollReveal() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, observerOptions);

        document.querySelectorAll('.scroll-reveal').forEach(el => {
            observer.observe(el);
        });
    }

    // 粒子背景效果
    initParticleBackground() {
        const container = document.getElementById('particle-container');
        if (!container) return;

        // p5.js粒子系统
        new p5((p) => {
            let particles = [];
            const numParticles = 50;

            p.setup = () => {
                const canvas = p.createCanvas(container.offsetWidth, container.offsetHeight);
                canvas.parent(container);
                
                // 创建粒子
                for (let i = 0; i < numParticles; i++) {
                    particles.push({
                        x: p.random(p.width),
                        y: p.random(p.height),
                        vx: p.random(-0.5, 0.5),
                        vy: p.random(-0.5, 0.5),
                        size: p.random(2, 6),
                        alpha: p.random(0.1, 0.3)
                    });
                }
            };

            p.draw = () => {
                p.clear();
                
                // 绘制粒子
                particles.forEach(particle => {
                    p.fill(255, 255, 255, particle.alpha * 255);
                    p.noStroke();
                    p.circle(particle.x, particle.y, particle.size);
                    
                    // 更新位置
                    particle.x += particle.vx;
                    particle.y += particle.vy;
                    
                    // 边界检测
                    if (particle.x < 0 || particle.x > p.width) particle.vx *= -1;
                    if (particle.y < 0 || particle.y > p.height) particle.vy *= -1;
                });
            };

            p.windowResized = () => {
                p.resizeCanvas(container.offsetWidth, container.offsetHeight);
            };
        });
    }

    // 项目轮播初始化
    initProjectCarousel() {
        const projectList = document.getElementById('project-list');
        if (!projectList) return;

        // 生成项目卡片
        this.config.projects.items.forEach(project => {
            const projectCard = this.createProjectCard(project);
            projectList.appendChild(projectCard);
        });

        // 初始化Splide轮播
        const splide = new Splide('#project-carousel', {
            type: 'loop',
            perPage: 3,
            perMove: 1,
            gap: '2rem',
            autoplay: true,
            interval: 4000,
            pauseOnHover: true,
            breakpoints: {
                1024: { perPage: 2 },
                640: { perPage: 1 }
            }
        });

        splide.mount();
    }

    // 创建项目卡片
    createProjectCard(project) {
        const li = document.createElement('li');
        li.className = 'splide__slide';
        
        li.innerHTML = `
            <div class="project-card h-full">
                <div class="aspect-w-16 aspect-h-9 bg-gray-200">
                    <img src="${project.images[0]}" alt="${project.title}" class="w-full h-48 object-cover">
                </div>
                <div class="p-6">
                    <div class="flex items-center mb-3">
                        <span class="text-2xl mr-2">${this.config.projects.categories.find(c => c.id === project.category)?.icon}</span>
                        <span class="text-sm font-medium text-gray-600">
                            ${this.config.projects.categories.find(c => c.id === project.category)?.name}
                        </span>
                    </div>
                    <h3 class="font-serif text-xl font-bold text-gray-800 mb-3">${project.title}</h3>
                    <p class="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">${project.description}</p>
                    <div class="flex justify-between items-center">
                        <span class="text-xs text-gray-500">${project.completionDate}</span>
                        <span class="text-xs text-green-600 font-medium">${project.participants}人参与</span>
                    </div>
                </div>
            </div>
        `;

        return li;
    }

    // 统计数据动画
    initStatisticsAnimation() {
        this.statisticsAnimated = false;
    }

    startStatisticsAnimation() {
        if (this.statisticsAnimated) return;
        this.statisticsAnimated = true;

        const stats = this.config.statistics;
        
        // 项目数量动画
        anime({
            targets: '#stat-projects',
            innerHTML: [0, stats.totalProjects],
            duration: 2000,
            round: 1,
            easing: 'easeOutExpo'
        });

        // 参与人数动画
        anime({
            targets: '#stat-participants',
            innerHTML: [0, stats.totalParticipants],
            duration: 2500,
            round: 1,
            easing: 'easeOutExpo',
            delay: 200
        });

        // CO2减少量动画
        setTimeout(() => {
            document.getElementById('stat-co2').textContent = stats.co2Reduced;
        }, 400);

        // 浪费减少百分比动画
        setTimeout(() => {
            document.getElementById('stat-waste').textContent = stats.wasteReduced;
        }, 600);
    }

    // 图表初始化
    initCharts() {
        this.initProjectChart();
        this.initImpactChart();
    }

    // 项目分类图表
    initProjectChart() {
        const chartDom = document.getElementById('project-chart');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);
        const categories = this.config.projects.categories;
        const projects = this.config.projects.items;

        // 统计每个分类的项目数量
        const categoryData = categories.map(category => {
            const count = projects.filter(p => p.category === category.id).length;
            return {
                name: category.name,
                value: count,
                itemStyle: { color: category.color }
            };
        });

        const option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b}: {c} ({d}%)'
            },
            series: [{
                name: '项目分类',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: '18',
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: categoryData
            }]
        };

        myChart.setOption(option);
        
        // 响应式处理
        window.addEventListener('resize', () => {
            myChart.resize();
        });
    }

    // 影响力趋势图表
    initImpactChart() {
        const chartDom = document.getElementById('impact-chart');
        if (!chartDom) return;

        const myChart = echarts.init(chartDom);

        const option = {
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['CO₂减排', '废物减少', '能源节约']
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['2023年', '2024年Q1', '2024年Q2', '2024年Q3', '2024年Q4', '2025年Q1']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '{value}%'
                }
            },
            series: [
                {
                    name: 'CO₂减排',
                    type: 'line',
                    stack: 'Total',
                    data: [0, 15, 28, 45, 60, 75],
                    itemStyle: { color: '#22c55e' }
                },
                {
                    name: '废物减少',
                    type: 'line', 
                    stack: 'Total',
                    data: [0, 10, 22, 35, 50, 65],
                    itemStyle: { color: '#3b82f6' }
                },
                {
                    name: '能源节约',
                    type: 'line',
                    stack: 'Total', 
                    data: [0, 8, 18, 28, 40, 55],
                    itemStyle: { color: '#f59e0b' }
                }
            ]
        };

        myChart.setOption(option);
        
        // 响应式处理
        window.addEventListener('resize', () => {
            myChart.resize();
        });
    }

    // 移动端菜单
    initMobileMenu() {
        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');

        if (menuBtn && mobileMenu) {
            menuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
        }
    }

    // 滚动处理
    handleScroll() {
        // 导航栏背景效果
        const nav = document.querySelector('nav');
        if (window.scrollY > 100) {
            nav.classList.add('bg-white/98');
        } else {
            nav.classList.remove('bg-white/98');
        }

        // 统计数据动画触发
        const statsSection = document.querySelector('.stat-number');
        if (statsSection && this.isElementInViewport(statsSection)) {
            this.startStatisticsAnimation();
        }
    }

    // 窗口大小调整处理
    handleResize() {
        // 重新初始化需要响应式处理的组件
        if (window.innerWidth > 768) {
            const mobileMenu = document.getElementById('mobile-menu');
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
        }
    }

    // 元素是否在视口中
    isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
}

// 项目详情模态框管理
class ProjectModal {
    constructor() {
        this.modal = null;
        this.init();
    }

    init() {
        this.createModal();
        this.setupEventListeners();
    }

    createModal() {
        const modalHTML = `
            <div id="project-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4">
                <div class="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    <div class="p-6">
                        <div class="flex justify-between items-start mb-4">
                            <h2 id="modal-title" class="font-serif text-2xl font-bold text-gray-800"></h2>
                            <button id="modal-close" class="text-gray-500 hover:text-gray-700">
                                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                        
                        <div id="modal-content">
                            <!-- 内容将通过JavaScript动态填充 -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        this.modal = document.getElementById('project-modal');
    }

    setupEventListeners() {
        document.getElementById('modal-close').addEventListener('click', () => {
            this.close();
        });

        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open(project) {
        this.fillContent(project);
        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.add('hidden');
        this.modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
    }

    fillContent(project) {
        document.getElementById('modal-title').textContent = project.title;
        
        const content = document.getElementById('modal-content');
        content.innerHTML = `
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <img src="${project.images[0]}" alt="${project.title}" class="w-full h-64 object-cover rounded-lg mb-4">
                </div>
                <div>
                    <div class="mb-4">
                        <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                            ${CONFIG.projects.categories.find(c => c.id === project.category)?.name}
                        </span>
                    </div>
                    
                    <p class="text-gray-600 leading-relaxed mb-4">${project.description}</p>
                    
                    <div class="space-y-2 text-sm">
                        <div class="flex justify-between">
                            <span class="text-gray-500">完成时间:</span>
                            <span class="font-medium">${project.completionDate}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">参与人数:</span>
                            <span class="font-medium">${project.participants}人</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-gray-500">项目影响:</span>
                            <span class="font-medium text-green-600">${project.impact}</span>
                        </div>
                    </div>
                    
                    ${project.wechatUrl ? `
                        <div class="mt-6">
                            <a href="${project.wechatUrl}" target="_blank" class="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                查看微信公众号推送
                                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                                </svg>
                            </a>
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }
}

// 地图标记管理类
class MapManager {
    constructor(config) {
        this.config = config;
        this.map = null;
        this.markers = [];
        this.markerLayer = null;
        this.isAddingMarker = false;
        this.init();
    }

    init() {
        if (typeof AMap !== 'undefined') {
            this.initMap();
        } else {
            // 等待高德地图API加载
            const checkAMap = setInterval(() => {
                if (typeof AMap !== 'undefined') {
                    clearInterval(checkAMap);
                    this.initMap();
                }
            }, 100);
        }
    }

    initMap() {
        try {
            this.map = new AMap.Map('map-container', {
                center: this.config.map.center,
                zoom: this.config.map.zoom,
                resizeEnable: true
            });

            this.markerLayer = new AMap.LabelsLayer({
                zooms: [3, 20],
                zIndex: 1000,
                collision: false,
                allowCollision: false
            });

            this.map.add(this.markerLayer);
            this.loadExistingMarkers();
            this.setupMapEvents();
        } catch (error) {
            console.error('地图初始化失败:', error);
            this.showMapError();
        }
    }

    loadExistingMarkers() {
        this.config.projects.items.forEach(project => {
            if (project.location) {
                this.addMarker(project.location, project);
            }
        });
    }

    addMarker(position, project) {
        const category = this.config.projects.categories.find(c => c.id === project.category);
        const marker = new AMap.LabelMarker({
            position: position,
            icon: {
                type: 'image',
                image: this.createMarkerIcon(category),
                size: [32, 32],
                anchor: 'center'
            },
            text: {
                content: category.icon,
                direction: 'bottom',
                offset: [0, -10],
                style: {
                    fontSize: 16,
                    fillColor: '#ffffff'
                }
            }
        });

        marker.on('click', () => {
            this.showMarkerInfo(project);
        });

        this.markerLayer.add(marker);
        this.markers.push({ marker, project });
    }

    createMarkerIcon(category) {
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');

        // 绘制圆形背景
        ctx.fillStyle = category.color;
        ctx.beginPath();
        ctx.arc(16, 16, 14, 0, 2 * Math.PI);
        ctx.fill();

        // 绘制边框
        ctx.strokeStyle = '#ffffff';
        ctx.lineWidth = 2;
        ctx.stroke();

        return canvas.toDataURL();
    }

    setupMapEvents() {
        this.map.on('click', (e) => {
            if (this.isAddingMarker) {
                this.showAddMarkerForm(e.lnglat);
            }
        });
    }

    showMarkerInfo(project) {
        const infoWindow = new AMap.InfoWindow({
            content: this.createInfoWindowContent(project),
            offset: new AMap.Pixel(0, -30),
            size: new AMap.Size(300, 200)
        });

        infoWindow.open(this.map, project.location);
    }

    createInfoWindowContent(project) {
        return `
            <div class="p-4 max-w-sm">
                <h3 class="font-bold text-lg mb-2">${project.title}</h3>
                <p class="text-sm text-gray-600 mb-3">${project.description}</p>
                <div class="text-xs text-gray-500">
                    <div>参与人数: ${project.participants}人</div>
                    <div>完成时间: ${project.completionDate}</div>
                </div>
            </div>
        `;
    }

    toggleAddMarkerMode() {
        this.isAddingMarker = !this.isAddingMarker;
        const button = document.getElementById('add-marker-btn');
        
        if (this.isAddingMarker) {
            button.textContent = '取消添加标记';
            button.classList.add('bg-red-500');
            button.classList.remove('bg-green-500');
            this.map.setDefaultCursor('crosshair');
        } else {
            button.textContent = '新增标记';
            button.classList.remove('bg-red-500');
            button.classList.add('bg-green-500');
            this.map.setDefaultCursor('default');
        }
    }

    showAddMarkerForm(lnglat) {
        const form = new MarkerForm(lnglat, this.config);
        form.show();
    }

    showMapError() {
        const container = document.getElementById('map-container');
        if (container) {
            container.innerHTML = `
                <div class="flex items-center justify-center h-full text-gray-500">
                    <div class="text-center">
                        <div class="text-4xl mb-4">🗺️</div>
                        <div>地图加载失败，请检查网络连接</div>
                    </div>
                </div>
            `;
        }
    }
}

// 标记表单管理类
class MarkerForm {
    constructor(lnglat, config) {
        this.lnglat = lnglat;
        this.config = config;
        this.init();
    }

    init() {
        this.createForm();
    }

    createForm() {
        const formHTML = `
            <div id="marker-form-modal" class="fixed inset-0 bg-black bg-opacity-50 z-50 hidden items-center justify-center p-4">
                <div class="bg-white rounded-lg max-w-md w-full">
                    <div class="p-6">
                        <h3 class="font-serif text-xl font-bold text-gray-800 mb-4">添加新标记</h3>
                        
                        <form id="marker-form">
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">项目名称</label>
                                <input type="text" id="marker-title" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                            </div>
                            
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">项目描述</label>
                                <textarea id="marker-description" rows="3" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required></textarea>
                            </div>
                            
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">项目类型</label>
                                <select id="marker-category" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                                    <option value="">请选择项目类型</option>
                                    ${this.config.projects.categories.map(cat => 
                                        `<option value="${cat.id}">${cat.name}</option>`
                                    ).join('')}
                                </select>
                            </div>
                            
                            <div class="mb-4">
                                <label class="block text-sm font-medium text-gray-700 mb-2">参与人数</label>
                                <input type="number" id="marker-participants" min="1" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required>
                            </div>
                            
                            <div class="mb-6">
                                <label class="block text-sm font-medium text-gray-700 mb-2">项目图片</label>
                                <input type="file" id="marker-image" accept="image/*" class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500">
                            </div>
                            
                            <div class="flex space-x-3">
                                <button type="button" id="form-cancel" class="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                                    取消
                                </button>
                                <button type="submit" class="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
                                    提交
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        document.body.insertAdjacentHTML('beforeend', formHTML);
        this.modal = document.getElementById('marker-form-modal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('form-cancel').addEventListener('click', () => {
            this.hide();
        });

        document.getElementById('marker-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
    }

    show() {
        this.modal.classList.remove('hidden');
        this.modal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.modal.classList.add('hidden');
        this.modal.classList.remove('flex');
        document.body.style.overflow = 'auto';
        document.getElementById('marker-form').reset();
    }

    async submitForm() {
        const formData = {
            title: document.getElementById('marker-title').value,
            description: document.getElementById('marker-description').value,
            category: document.getElementById('marker-category').value,
            participants: parseInt(document.getElementById('marker-participants').value),
            location: [this.lnglat.lng, this.lnglat.lat],
            timestamp: new Date().toISOString()
        };

        try {
            await this.submitToGitHub(formData);
            this.showSuccessMessage();
            this.hide();
        } catch (error) {
            console.error('提交失败:', error);
            this.showErrorMessage();
        }
    }

    async submitToGitHub(data) {
        // 这里应该调用GitHub API
        // 由于需要Personal Access Token，这里只是示例代码
        console.log('提交到GitHub的数据:', data);
        
        // 实际实现时需要：
        // 1. 创建GitHub Issue或提交PR
        // 2. 上传图片文件到repository
        // 3. 返回成功状态
        
        // 模拟API调用
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({ success: true });
            }, 1000);
        });
    }

    showSuccessMessage() {
        alert('标记提交成功！感谢您的贡献。');
    }

    showErrorMessage() {
        alert('提交失败，请稍后重试。');
    }
}

// 全局初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化主应用
    window.app = new SustainableCampusApp();
    
    // 初始化项目模态框
    window.projectModal = new ProjectModal();
    
    // 根据页面初始化特定功能
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    if (currentPage === 'tour.html') {
        // 延迟初始化地图，确保DOM已加载
        setTimeout(() => {
            window.mapManager = new MapManager(CONFIG);
        }, 100);
    }
});

// 导出全局函数供HTML调用
window.toggleAddMarkerMode = function() {
    if (window.mapManager) {
        window.mapManager.toggleAddMarkerMode();
    }
};

window.openProjectModal = function(project) {
    if (window.projectModal) {
        window.projectModal.open(project);
    }
};