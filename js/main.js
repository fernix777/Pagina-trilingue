// Script principal para ThaiTech Solutions
document.addEventListener('DOMContentLoaded', () => {
    // Configuración de internacionalización
    const translations = {
        es: null,
        en: null,
        th: null
    };

    const defaultLang = 'en';
    let currentLang = localStorage.getItem('language') || defaultLang;

    // Cargar traducciones
    async function loadTranslations(lang) {
        if (!translations[lang]) {
            try {
                const response = await fetch(`locales/${lang}.json`);
                translations[lang] = await response.json();
            } catch (error) {
                console.error(`Error cargando traducción ${lang}:`, error);
                return null;
            }
        }
        return translations[lang];
    }

    // Aplicar traducciones
    async function applyTranslations(lang) {
        const translation = await loadTranslations(lang);
        if (!translation) return;

        // Placeholders del formulario de contacto
        document.querySelectorAll('input[name="nombre"]').forEach(el => {
            el.setAttribute('placeholder', translation.contact.placeholders.name);
        });
        document.querySelectorAll('input[name="email"]').forEach(el => {
            el.setAttribute('placeholder', translation.contact.placeholders.email);
        });
        document.querySelectorAll('textarea[name="mensaje"]').forEach(el => {
            el.setAttribute('placeholder', translation.contact.placeholders.message);
        });

        // Copyright del footer
        document.querySelectorAll('[data-i18n-key="footer.copyright"]').forEach(el => {
            el.textContent = translation.footer.copyright.replace('{year}', new Date().getFullYear());
        });

        // Navbar
        document.querySelectorAll('[data-i18n-key="navbar.services"]').forEach(el => {
            el.textContent = translation.navbar.services;
        });
        document.querySelectorAll('[data-i18n-key="navbar.projects"]').forEach(el => {
            el.textContent = translation.navbar.projects;
        });
        document.querySelectorAll('[data-i18n-key="navbar.contact"]').forEach(el => {
            el.textContent = translation.navbar.contact;
        });

        // Hero
        document.querySelectorAll('[data-i18n-key="hero.title"]').forEach(el => {
            el.textContent = translation.hero.title;
        });
        document.querySelectorAll('[data-i18n-key="hero.subtitle"]').forEach(el => {
            el.textContent = translation.hero.subtitle;
        });

        // Servicios
        document.querySelectorAll('[data-i18n-key="services.title"]').forEach(el => {
            el.textContent = translation.services.title;
        });
        document.querySelectorAll('[data-i18n-key="services.webDevelopment.title"]').forEach(el => {
            el.textContent = translation.services.webDevelopment.title;
        });
        document.querySelectorAll('[data-i18n-key="services.webDevelopment.description"]').forEach(el => {
            el.textContent = translation.services.webDevelopment.description;
        });
        document.querySelectorAll('[data-i18n-key="services.design.title"]').forEach(el => {
            el.textContent = translation.services.design.title;
        });
        document.querySelectorAll('[data-i18n-key="services.design.description"]').forEach(el => {
            el.textContent = translation.services.design.description;
        });
        document.querySelectorAll('[data-i18n-key="services.eCommerce.title"]').forEach(el => {
            el.textContent = translation.services.eCommerce.title;
        });
        document.querySelectorAll('[data-i18n-key="services.eCommerce.description"]').forEach(el => {
            el.textContent = translation.services.eCommerce.description;
        });

        // Proyectos
        document.querySelectorAll('[data-i18n-key="projects.title"]').forEach(el => {
            el.textContent = translation.projects.title;
        });
        document.querySelectorAll('[data-i18n-key="projects.project1.title"]').forEach(el => {
            el.textContent = translation.projects.project1.title;
        });
        document.querySelectorAll('[data-i18n-key="projects.project1.description"]').forEach(el => {
            el.textContent = translation.projects.project1.description;
        });
        document.querySelectorAll('[data-i18n-key="projects.project2.title"]').forEach(el => {
            el.textContent = translation.projects.project2.title;
        });
        document.querySelectorAll('[data-i18n-key="projects.project2.description"]').forEach(el => {
            el.textContent = translation.projects.project2.description;
        });

        // Contacto
        document.querySelectorAll('[data-i18n-key="contact.title"]').forEach(el => {
            el.textContent = translation.contact.title;
        });
        document.querySelectorAll('[data-i18n-key="contact.name"]').forEach(el => {
            el.textContent = translation.contact.name;
        });
        document.querySelectorAll('[data-i18n-key="contact.email"]').forEach(el => {
            el.textContent = translation.contact.email;
        });
        document.querySelectorAll('[data-i18n-key="contact.message"]').forEach(el => {
            el.textContent = translation.contact.message;
        });
        document.querySelectorAll('[data-i18n-key="contact.send"]').forEach(el => {
            el.textContent = translation.contact.send;
        });

        // Política de privacidad
        document.querySelectorAll('[data-i18n-key="privacyPolicy.title"]').forEach(el => {
            el.textContent = translation.privacyPolicy.title;
        });
        document.querySelectorAll('[data-i18n-key="privacyPolicy.sections.dataCollection.title"]').forEach(el => {
            el.textContent = translation.privacyPolicy.sections.dataCollection.title;
        });
        document.querySelectorAll('[data-i18n-key="privacyPolicy.sections.dataCollection.description"]').forEach(el => {
            el.textContent = translation.privacyPolicy.sections.dataCollection.description;
        });
        // Añadir más secciones de política de privacidad según sea necesario

        // Footer
        document.querySelectorAll('[data-i18n-key="footer.rights"]').forEach(el => {
            el.textContent = translation.footer.rights;
        });

        document.documentElement.lang = lang;
        localStorage.setItem('language', lang);
        currentLang = lang;
    }

    // Selector de idioma
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        languageSelector.value = currentLang;
        languageSelector.addEventListener('change', (e) => {
            applyTranslations(e.target.value);
        });
    }

    // Cargar traducción inicial
    applyTranslations(currentLang);

    console.log('ThaiTech Solutions - Sitio web cargado');
    
    // Navbar burger toggle para móviles
    const navbarBurgers = document.querySelectorAll('.navbar-burger');
    navbarBurgers.forEach(burger => {
        burger.addEventListener('click', () => {
            const target = document.getElementById(burger.dataset.target);
            burger.classList.toggle('is-active');
            target.classList.toggle('is-active');
        });
    });

    // Smooth scrolling para navegación
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Validación de formulario mejorada
    function validateForm(form) {
        const nombre = form.querySelector('input[name="nombre"]');
        const email = form.querySelector('input[name="email"]');
        const mensaje = form.querySelector('textarea[name="mensaje"]');
        
        // Resetear errores previos
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        
        let isValid = true;
        
        // Validación de nombre
        if (!nombre.value.trim()) {
            displayError(nombre, 'El nombre es obligatorio');
            isValid = false;
        } else if (nombre.value.length < 2) {
            displayError(nombre, 'El nombre es demasiado corto');
            isValid = false;
        }
        
        // Validación de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            displayError(email, 'El email es obligatorio');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            displayError(email, 'Por favor, introduce un email válido');
            isValid = false;
        }
        
        // Validación de mensaje
        if (!mensaje.value.trim()) {
            displayError(mensaje, 'El mensaje es obligatorio');
            isValid = false;
        } else if (mensaje.value.length < 10) {
            displayError(mensaje, 'El mensaje es demasiado corto');
            isValid = false;
        }
        
        return isValid;
    }

    function displayError(input, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message has-text-danger is-size-7 mt-1';
        errorDiv.textContent = message;
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
        input.classList.add('is-danger');
    }

    // Evento de envío de formulario
    const contactForm = document.querySelector('form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Limpiar clases de error previas
            document.querySelectorAll('.is-danger').forEach(el => el.classList.remove('is-danger'));
            
            if (validateForm(contactForm)) {
                // Simular envío de formulario
                alert('Mensaje enviado correctamente. ¡Gracias por contactarnos!');
                contactForm.reset();
            }
        });
    }

    // Modo oscuro / claro
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Recuperar preferencia de tema del almacenamiento local
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.toggle('dark-mode', savedTheme === 'dark');
        themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Cambiar ícono
        const isDarkMode = document.body.classList.contains('dark-mode');
        themeIcon.textContent = isDarkMode ? '☀️' : '🌙';
        
        // Guardar preferencia en almacenamiento local
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    });

    // Registro de Service Worker
    if ('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('/service-worker.js')
                .then((registration) => {
                    console.log('Service Worker registrado con éxito:', registration.scope);
                })
                .catch((error) => {
                    console.error('Registro de Service Worker fallido:', error);
                });
        });
    }
});
