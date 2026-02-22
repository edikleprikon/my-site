// Мобильное меню
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const nav = document.querySelector('.nav');

if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        // Меняем иконку
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
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

fadeElements.forEach(element => {
    observer.observe(element);
});

// ============================================
// GETFORM.IO ОБРАБОТЧИК ФОРМЫ
// ============================================
const form = document.getElementById('feedback-form');
const toast = document.getElementById('toast');

// Функция показа уведомлений
function showToast(message, isError = false) {
    toast.textContent = message;
    toast.className = 'toast' + (isError ? ' error' : '') + ' show';
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Блокируем кнопку на время отправки
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        
        // Собираем данные формы
        const formData = new FormData(form);
        
        try {
            // Отправляем на Getform.io
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            // Getform возвращает { success: true } при успехе
            if (data.success) {
                showToast('✅ Спасибо! Мы свяжемся с вами в ближайшее время.');
                form.reset(); // Очищаем форму
            } else {
                throw new Error(data.message || 'Ошибка отправки');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('❌ Ошибка! Попробуйте позже или позвоните нам.', true);
        } finally {
            // Разблокируем кнопку
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}

// Плавный скролл для всех якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Фиксированная шапка с изменением прозрачности при скролле
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
    }
});
