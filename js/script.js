// Мобильное меню
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('.nav');

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        mobileNavToggle.textContent = nav.classList.contains('active') ? '✕' : '☰';
    });
}

// Закрываем меню при клике на ссылку
document.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        if (mobileNavToggle) mobileNavToggle.textContent = '☰';
    });
});

// Анимация появления при скролле
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

fadeElements.forEach(element => observer.observe(element));

// ============================================
// FORMINIT.IO ОБРАБОТЧИК ФОРМЫ
// ============================================
const forminit = new Forminit();
const FORM_ID = 'rp8ais96j6k'; // Ваш Form ID

const form = document.getElementById('feedback-form');
const toast = document.getElementById('toast');

function showToast(message, isError = false) {
    toast.textContent = message;
    toast.className = 'toast' + (isError ? ' error' : '') + ' show';
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

if (form) {
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        // Собираем данные формы (включая скрытое поле _gotcha)
        const formData = new FormData(form);

        // Отправляем через SDK Forminit
        const { data, redirectUrl, error } = await forminit.submit(FORM_ID, formData);

        if (error) {
            console.error('Forminit Error:', error);
            showToast(`❌ Ошибка: ${error.message || 'Попробуйте позже'}`, true);
        } else {
            console.log('Submission successful:', data);
            showToast('✅ Спасибо! Мы свяжемся с вами.');
            form.reset(); // Очищаем форму
        }

        // Возвращаем кнопку в исходное состояние
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}

// Плавный скролл для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Изменение прозрачности шапки при скролле
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});
