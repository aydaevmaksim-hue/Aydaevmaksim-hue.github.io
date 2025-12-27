// Данные для питомцев
const petsData = {
    dogs: {
        title: "Мои собаки",
        text: "У меня две активные собаки: Рекс (3 года, лабрадор) и Луна (2 года, немецкая овчарка). Они обожают долгие прогулки, особенно в парке, и всегда готовы к пробежке со мной по утрам."
    },
    cats: {
        title: "Мои кошки",
        text: "Две кошки: Барсик (4 года) и Муся (2 года). Барсик любит спать на подоконнике и наблюдать за птицами, а Муся — игривая и любопытная, всегда исследует новые уголки дома."
    }
};

// Элементы DOM
const petButtons = document.querySelectorAll('.pet-details-btn');
const modal = document.getElementById('pet-modal');
const closeModal = document.querySelector('.close-modal');
const modalTitle = document.getElementById('modal-title');
const modalText = document.getElementById('modal-text');
const telegramBtn = document.getElementById('telegram-btn');

// Счетчики
const counters = {
    running: { element: document.getElementById('running-counter'), target: 25, current: 0 },
    crossfit: { element: document.getElementById('crossfit-counter'), target: 4, current: 0 },
    walking: { element: document.getElementById('walking-counter'), target: 7, current: 0 },
    hours: { element: document.getElementById('hours'), target: 120, current: 0 },
    projects: { element: document.getElementById('projects'), target: 8, current: 0 }
};

// Открытие модального окна с информацией о питомце
petButtons.forEach(button => {
    button.addEventListener('click', () => {
        const petType = button.getAttribute('data-pet');
        const petInfo = petsData[petType];
        
        if (petInfo) {
            modalTitle.textContent = petInfo.title;
            modalText.textContent = petInfo.text;
            modal.style.display = 'flex';
        }
    });
});

// Закрытие модального окна
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Анимация счетчиков
function animateCounter(counter, target, element) {
    let current = 0;
    const increment = target / 50; // 50 шагов анимации
    const duration = 1000; // 1 секунда
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current);
    }, duration / 50);
}

// Запуск счетчиков при загрузке страницы
window.addEventListener('load', () => {
    // Запускаем анимацию счетчиков с небольшой задержкой
    setTimeout(() => {
        animateCounter(counters.running.current, counters.running.target, counters.running.element);
        animateCounter(counters.crossfit.current, counters.crossfit.target, counters.crossfit.element);
        animateCounter(counters.walking.current, counters.walking.target, counters.walking.element);
        animateCounter(counters.hours.current, counters.hours.target, counters.hours.element);
        animateCounter(counters.projects.current, counters.projects.target, counters.projects.element);
    }, 500);
});

// Обработка нажатия на кнопку Telegram
telegramBtn.addEventListener('click', (event) => {
    event.preventDefault();
    alert('Telegram: @maxim_pets (пример)');
});

// Плавная прокрутка к секциям при нажатии на ссылки (если они появятся)
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: 'smooth'
            });
        }
    });
});