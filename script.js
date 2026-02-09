// Плавная прокрутка для навигации
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Убираем активный класс у всех ссылок
            document.querySelectorAll('.nav-link').forEach(item => {
                item.classList.remove('active');
            });
            
            // Добавляем активный класс текущей ссылке
            this.classList.add('active');
            
            // Плавная прокрутка
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Анимация появления секций при скролле
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

// Наблюдаем за всеми секциями
document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Анимация статистики волонтерства
function animateCounter(element, target) {
    if (!element) return;
    
    let current = 0;
    const increment = target / 100;
    const duration = 2000;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, duration / 100);
}

// Запускаем анимацию счетчиков при загрузке
window.addEventListener('load', () => {
    // Ждем пока страница полностью загрузится
    setTimeout(() => {
        const stats = document.querySelectorAll('.stat-number');
        if (stats.length >= 2) {
            animateCounter(stats[0], 120);
            animateCounter(stats[1], 8);
        }
    }, 1000);
    
    // Добавляем анимацию при наведении на карточки
    document.querySelectorAll('.hobby-card, .pet-card, .contact-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});

// Анимация иконок в футере
const footerIcons = document.querySelectorAll('.footer-icons i');
footerIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.3) rotate(10deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0)';
    });
});

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', () => {
    // Плавное появление всей страницы
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Устанавливаем активную ссылку при загрузке
    const currentHash = window.location.hash;
    if (currentHash) {
        const activeLink = document.querySelector(`.nav-link[href="${currentHash}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    } else {
        // По умолчанию активна первая ссылка
        document.querySelector('.nav-link').classList.add('active');
    }
});