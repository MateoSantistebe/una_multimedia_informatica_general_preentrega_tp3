// FUNCIONES JAVASCRIPT - ALIENS ART

// Efecto de escaneo CRT
document.addEventListener('DOMContentLoaded', function() {
    // Animación de escaneo CRT
    const scanline = document.querySelector('.scanline');
    if (scanline) {
        setInterval(() => {
            scanline.style.top = Math.random() * 100 + '%';
        }, 5000);
    }

    // Efecto de glitch en textos
    const glitchTexts = document.querySelectorAll('.glitch-text');
    if (glitchTexts.length > 0) {
        setInterval(() => {
            glitchTexts.forEach(text => {
                if (Math.random() > 0.7) {
                    text.style.textShadow = `-2px 0 #ff00ff, 2px 0 #00ccff`;
                    setTimeout(() => {
                        text.style.textShadow = '';
                    }, 100);
                }
            });
        }, 2000);
    }

    // Efecto de terminal para textos
    const terminalTexts = document.querySelectorAll('.terminal-text');
    terminalTexts.forEach(text => {
        const originalText = text.textContent;
        const textLength = originalText.length;
        
        // Solo aplicar a textos cortos para mejor rendimiento
        if (textLength < 100 && Math.random() > 0.7) {
            text.textContent = '';
            let i = 0;
            const typeInterval = setInterval(() => {
                if (i < textLength) {
                    text.textContent += originalText.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 30);
        }
    });

    // Navegación activa
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.main-nav a');
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            link.classList.add('active');
        }
    });

    // Formulario de contacto
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Simulación de envío
            const submitBtn = contactForm.querySelector('.submit-btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }

    // Efecto hover para tarjetas de artistas
    const artistCards = document.querySelectorAll('.artist-card');
    artistCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.7)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Animación de aparición al hacer scroll
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.work-item, .featured-item, .artist-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (elementPosition < screenPosition) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Inicializar elementos con opacidad 0
    const fadeElements = document.querySelectorAll('.work-item, .featured-item, .artist-card');
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });

    // Ejecutar animación al cargar y al hacer scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Ejecutar una vez al cargar
});

// Efecto de cursor retro
(function() {
    const cursor = document.createElement('div');
    cursor.style.position = 'fixed';
    cursor.style.width = '15px';
    cursor.style.height = '15px';
    cursor.style.border = '1px solid #00ff00';
    cursor.style.borderRadius = '50%';
    cursor.style.pointerEvents = 'none';
    cursor.style.zIndex = '9999';
    cursor.style.transform = 'translate(-50%, -50%)';
    cursor.style.transition = 'width 0.2s, height 0.2s';
    document.body.appendChild(cursor);

    const cursorDot = document.createElement('div');
    cursorDot.style.position = 'fixed';
    cursorDot.style.width = '3px';
    cursorDot.style.height = '3px';
    cursorDot.style.backgroundColor = '#00ff00';
    cursorDot.style.borderRadius = '50%';
    cursorDot.style.pointerEvents = 'none';
    cursorDot.style.zIndex = '9999';
    cursorDot.style.transform = 'translate(-50%, -50%)';
    document.body.appendChild(cursorDot);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        
        cursorDot.style.left = e.clientX + 'px';
        cursorDot.style.top = e.clientY + 'px';
    });

    document.addEventListener('mousedown', function() {
        cursor.style.width = '12px';
        cursor.style.height = '12px';
        cursor.style.borderColor = '#00cc99';
    });

    document.addEventListener('mouseup', function() {
        cursor.style.width = '15px';
        cursor.style.height = '15px';
        cursor.style.borderColor = '#00ff00';
    });

    // Desactivar en dispositivos móviles
    if (window.matchMedia('(max-width: 768px)').matches) {
        cursor.style.display = 'none';
        cursorDot.style.display = 'none';
    }
})();