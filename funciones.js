// FUNCIONES JAVASCRIPT - ALIENS ART

document.addEventListener('DOMContentLoaded', function() {
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
        const nombreEl = contactForm.querySelector('#nombre');
        const emailEl = contactForm.querySelector('#email');
        const asuntoEl = contactForm.querySelector('#asunto');
        const mensajeEl = contactForm.querySelector('#mensaje');
        const submitBtn = contactForm.querySelector('.submit-btn');

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        function getErrorEl(input) {
            const group = input.closest('.form-group');
            let err = group.querySelector('.error-msg');
            if (!err) {
                err = document.createElement('p');
                err.className = 'error-msg terminal-text';
                group.appendChild(err);
            }
            return err;
        }

        function showError(input, message) {
            const err = getErrorEl(input);
            err.textContent = message;
            input.classList.add('invalid');
            input.setAttribute('aria-invalid', 'true');
        }

        function clearError(input) {
            const err = getErrorEl(input);
            err.textContent = '';
            input.classList.remove('invalid');
            input.removeAttribute('aria-invalid');
        }

        // Limpiar errores al escribir
        [nombreEl, emailEl, asuntoEl, mensajeEl].forEach(el => {
            el.addEventListener('input', () => clearError(el));
            el.addEventListener('blur', () => {
                // Validación ligera en blur
                const val = el.value.trim();
                if (el === nombreEl && val.length < 2) showError(el, 'Ingresá tu nombre (mínimo 2 caracteres).');
                if (el === emailEl && !emailRegex.test(val)) showError(el, 'Ingresá un email válido.');
                if (el === asuntoEl && val.length < 3) showError(el, 'Ingresá el asunto (mínimo 3 caracteres).');
                if (el === mensajeEl && val.length < 10) showError(el, 'El mensaje debe tener al menos 10 caracteres.');
            });
        });

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            let valid = true;
            const nombre = nombreEl.value.trim();
            const email = emailEl.value.trim();
            const asunto = asuntoEl.value.trim();
            const mensaje = mensajeEl.value.trim();

            if (nombre.length < 2) {
                showError(nombreEl, 'Ingresá tu nombre (mínimo 2 caracteres).');
                valid = false;
            }
            if (!emailRegex.test(email)) {
                showError(emailEl, 'Ingresá un email válido.');
                valid = false;
            }
            if (asunto.length < 3) {
                showError(asuntoEl, 'Ingresá el asunto (mínimo 3 caracteres).');
                valid = false;
            }
            if (mensaje.length < 10) {
                showError(mensajeEl, 'El mensaje debe tener al menos 10 caracteres.');
                valid = false;
            }

            if (!valid) {
                // Enfocar el primer campo inválido
                const firstInvalid = contactForm.querySelector('.invalid');
                if (firstInvalid) firstInvalid.focus();
                return;
            }

            // Simulación de envío
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'ENVIANDO...';
            submitBtn.disabled = true;

            setTimeout(() => {
                alert('¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.');
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                contactForm.reset();
            }, 1200);
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
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll();

    // Lightbox solo para ampliar imágenes
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox-overlay';
    const lightboxImg = document.createElement('img');
    lightboxImg.className = 'lightbox-image';
    lightbox.appendChild(lightboxImg);
    document.body.appendChild(lightbox);

    function openLightboxImage(url) {
        lightboxImg.src = url;
        lightbox.classList.add('open');
    }

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
    }

    // Cierre por click en overlay y tecla Esc
    lightbox.addEventListener('click', closeLightbox);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeLightbox();
    });

    // Extrae URL del background-image (para imágenes tipo div)
    function extractBgUrl(el) {
        const bg = getComputedStyle(el).backgroundImage;
        const match = bg && bg !== 'none' ? bg.match(/url\((['"]?)(.*?)\1\)/) : null;
        return match ? match[2] : null;
    }

    // Hacer clicables imágenes de obras (se excluye la foto de perfil)
    const clickableImages = document.querySelectorAll('.work-image, img.work-image');
    clickableImages.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            const url = el.tagName.toLowerCase() === 'img' ? el.src : extractBgUrl(el);
            if (url) openLightboxImage(url);
        });
    });

    // NUEVO: Hacer clicables los videos de obras
    const clickableVideos = document.querySelectorAll('video.work-video');
    clickableVideos.forEach(videoEl => {
        videoEl.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();

            let url = videoEl.src;
            if (!url) {
                const source = videoEl.querySelector('source');
                url = source ? source.src : null;
            }
            if (url) openLightboxVideo(url);
        });
    });
});
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