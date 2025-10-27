// партиклы на фоне
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = 25;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = Math.random() * 3 + 1 + 'px';
        particle.style.height = particle.style.width;
        particle.style.background = `rgba(${Math.random() * 100 + 155}, ${Math.random() * 100 + 155}, 255, ${Math.random() * 0.5 + 0.1})`;
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${Math.random() * 10 + 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

// мобилка меню
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// функционал поиска
const searchInput = document.getElementById('searchInput');
const cards = document.querySelectorAll('.card');
const sections = document.querySelectorAll('.section');
const noResults = document.getElementById('noResults');
const container = document.querySelector('.container');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase().trim();
    let foundResults = false;
    let totalVisibleCards = 0;
    
    
  //возвратткаточек и секций
    cards.forEach(card => {
        card.style.display = 'block';
    });
    
    sections.forEach(section => {
        section.classList.remove('has-results');
    });
    
    // если поиск не активиоован
    if (searchTerm === '') {
        container.classList.remove('search-mode');
        noResults.style.display = 'none';
        return;
    }
    
    // акцитивация поиска
    container.classList.add('search-mode');
    
    // поиск карточек
    cards.forEach(card => {
        const username = card.querySelector('.username').textContent.toLowerCase();
        const userId = card.querySelector('.user-id').textContent.toLowerCase();
        const tags = Array.from(card.querySelectorAll('.tag')).map(tag => tag.textContent.toLowerCase());
        
        const matchesSearch = username.includes(searchTerm) || 
                           userId.includes(searchTerm) ||
                           tags.some(tag => tag.includes(searchTerm));
        
        if (matchesSearch) {
            card.style.display = 'block';
            foundResults = true;
            totalVisibleCards++;
            
            // сложная часть
            const section = card.closest('.section');
            if (section) {
                section.classList.add('has-results');
            }
        } else {
            card.style.display = 'none';
        }
    });
    
    if (foundResults) {
        noResults.style.display = 'none';
    } else {
        noResults.style.display = 'block';
    }
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 60,
                behavior: 'smooth'
            });
            
            if (window.innerWidth < 768) {
                navMenu.classList.remove('active');
                navToggle.innerHTML = '<i class="fas fa-bars"></i>';
            }
        }
    });
});

const navItems = document.querySelectorAll('.nav-item');
const bottomNavItems = document.querySelectorAll('.nav-btn');

function updateActiveNav() {
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 80) {
            currentSection = section.id;
        }
    });
    
    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
    
    bottomNavItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${currentSection}`) {
            item.classList.add('active');
        }
    });
}

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', () => {
    updateActiveNav();
    
    if (window.scrollY > 300) {
        scrollTopBtn.classList.add('active');
    } else {
        scrollTopBtn.classList.remove('active');
    }
});

scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.card').forEach(card => {
    card.style.animationPlayState = 'paused';
    observer.observe(card);
});

document.addEventListener('DOMContentLoaded', () => {
    createParticles();
    updateActiveNav();
});