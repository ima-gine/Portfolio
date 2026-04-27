document.addEventListener('DOMContentLoaded', function() {

    initLoadingScreen();
    initMobileMenu();
    initProjectFilter();
    initCounterAnimation();
    initScrollAnimations();
    initChartJS();
});

function initLoadingScreen() {
    const loadingScreen = document.getElementById('loading-screen');
    const portfolioContent = document.getElementById('portfolio-content');
    
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        portfolioContent.classList.add('visible');

        initCounterAnimation();
        initChartJS();
    }, 2000);
}

function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            const isExpanded = nav.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });

        document.addEventListener('click', (e) => {
            if (!menuToggle.contains(e.target) && !nav.contains(e.target)) {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

function initProjectFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.port-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {

            filterButtons.forEach(btn => btn.classList.remove('active'));
        
            button.classList.add('active');
            
            const filter = button.getAttribute('data-filter');
            
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.5s ease-out forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; 
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(section);
    });
}

function initChartJS() {

    if (!document.getElementById('skillsChart')) return;
    
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', system-ui, sans-serif";

    const countryCtx = document.getElementById('skillsChart').getContext('2d');
    new Chart(countryCtx, {
        type: 'bar',
        data: {
            labels: ['India', 'USA', 'UK', 'UAE', 'Australia'],
            datasets: [{
                label: 'Transactions',
                data: [65, 15, 10, 6, 4],
                backgroundColor: [
                    '#22d3ee',
                    '#a78bfa',
                    '#f472b6',
                    '#34d399',
                    '#fb923c'
                ],
                borderRadius: 8,
                borderSkipped: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    const ratingCtx = document.getElementById('projectsChart').getContext('2d');
    new Chart(ratingCtx, {
        type: 'doughnut',
        data: {
            labels: ['2.0-2.9', '3.0-3.4', '3.5-3.9', '4.0-4.4', '4.5+'],
            datasets: [{
                data: [15, 35, 25, 18, 7],
                backgroundColor: [
                    '#ef4444',
                    '#f97316',
                    '#eab308',
                    '#22c55e',
                    '#14b8a6'
                ],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: { size: 11 }
                    }
                }
            },
            cutout: '55%'
        }
    });

    const cuisineCtx = document.getElementById('activityChart').getContext('2d');
    new Chart(cuisineCtx, {
        type: 'bar',
        data: {
            labels: ['North Indian', 'Chinese', 'Fast Food', 'Mughlai', 'Italian', 'Street Food'],
            datasets: [{
                label: 'Restaurant Count',
                data: [28, 22, 18, 15, 12, 10],
                backgroundColor: 'rgba(34, 211, 238, 0.7)',
                borderColor: '#22d3ee',
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(255, 255, 255, 0.05)'
                    }
                },
                y: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    const deliveryCtx = document.getElementById('proficiencyChart').getContext('2d');
    new Chart(deliveryCtx, {
        type: 'pie',
        data: {
            labels: ['Online Delivery', 'Table Booking', 'Both'],
            datasets: [{
                data: [45, 30, 25],
                backgroundColor: [
                    '#667eea',
                    '#22d3ee',
                    '#a78bfa'
                ],
                borderWidth: 0,
                hoverOffset: 15
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true,
                        pointStyle: 'circle'
                    }
                }
            }
        }
    });
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
 
            const nav = document.querySelector('nav');
            const menuToggle = document.querySelector('.menu-toggle');
            if (nav && nav.classList.contains('active')) {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
            }
        }
    });
});

window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.background = 'rgba(15, 23, 36, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = 'transparent';
    }
});
