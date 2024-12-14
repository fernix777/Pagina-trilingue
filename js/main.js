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
                // Primero intenta cargar desde locales JSON
                const localesResponse = await fetch(`locales/${lang}.json`);
                if (localesResponse.ok) {
                    translations[lang] = await localesResponse.json();
                    return translations[lang];
                }
                
                // Si falla, intenta cargar desde archivos .po
                const poResponse = await fetch(`translations/${lang}/LC_MESSAGES/messages.po`);
                if (poResponse.ok) {
                    const poText = await poResponse.text();
                    // Aquí necesitarías un parser de .po, por ahora usaremos un método simple
                    translations[lang] = parsePOFile(poText);
                    return translations[lang];
                }
                
                throw new Error(`No se encontraron traducciones para el idioma ${lang}`);
            } catch (error) {
                console.error(`Error cargando traducción ${lang}:`, error);
                return null;
            }
        }
        return translations[lang];
    }

    // Función mejorada para parsear archivos .po
    function parsePOFile(poText) {
        const translations = {};
        const lines = poText.split('\n');
        let currentKey = null;
        let currentValue = '';
        let isMultiline = false;

        lines.forEach(line => {
            line = line.trim();
            
            // Manejo de claves msgid
            if (line.startsWith('msgid ')) {
                currentKey = line.replace(/^msgid\s*"|"$/g, '').replace(/\\n/g, '\n');
                isMultiline = line.endsWith('""');
                currentValue = '';
            } 
            // Manejo de valores msgstr
            else if (line.startsWith('msgstr ')) {
                currentValue = line.replace(/^msgstr\s*"|"$/g, '').replace(/\\n/g, '\n');
                isMultiline = line.endsWith('""');

                // Mapeo de traducciones
                if (currentKey) {
                    const parts = currentKey.split('.');
                    if (parts.length >= 2) {
                        let currentTranslation = translations;
                        for (let i = 0; i < parts.length - 1; i++) {
                            currentTranslation[parts[i]] = currentTranslation[parts[i]] || {};
                            currentTranslation = currentTranslation[parts[i]];
                        }
                        currentTranslation[parts[parts.length - 1]] = currentValue;
                    }
                }
            }
            // Manejo de líneas multilínea
            else if (isMultiline) {
                if (line.startsWith('"') && line.endsWith('"')) {
                    currentValue += line.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
                }
                
                // Terminar línea multilínea
                if (!line.endsWith('""')) {
                    isMultiline = false;
                }
            }
        });

        return translations;
    }

    // Aplicar traducciones
    async function applyTranslations(lang) {
        const translation = await loadTranslations(lang);
        if (!translation) return;

        // Placeholders del formulario de contacto
        document.querySelectorAll('input[name="nombre"]').forEach(el => {
            el.setAttribute('placeholder', translation.contact?.placeholders?.name || el.getAttribute('placeholder'));
        });
        document.querySelectorAll('input[name="email"]').forEach(el => {
            el.setAttribute('placeholder', translation.contact?.placeholders?.email || el.getAttribute('placeholder'));
        });
        document.querySelectorAll('textarea[name="mensaje"]').forEach(el => {
            el.setAttribute('placeholder', translation.contact?.placeholders?.message || el.getAttribute('placeholder'));
        });

        // Copyright del footer
        document.querySelectorAll('[data-i18n-key="footer.copyright"]').forEach(el => {
            el.textContent = translation.footer?.copyright?.replace('{year}', new Date().getFullYear()) || el.textContent;
        });

        // Navbar
        document.querySelectorAll('[data-i18n-key="navbar.services"]').forEach(el => {
            el.textContent = translation.navbar?.services || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="navbar.projects"]').forEach(el => {
            el.textContent = translation.navbar?.projects || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="navbar.contact"]').forEach(el => {
            el.textContent = translation.navbar?.contact || el.textContent;
        });

        // Hero
        document.querySelectorAll('[data-i18n-key="hero.title"]').forEach(el => {
            el.textContent = translation.hero?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="hero.subtitle"]').forEach(el => {
            el.textContent = translation.hero?.subtitle || el.textContent;
        });

        // Servicios
        document.querySelectorAll('[data-i18n-key="services.title"]').forEach(el => {
            el.textContent = translation.services?.title || el.textContent;
        });
        
        // Servicios - E-commerce
        document.querySelectorAll('[data-i18n-key="services.ecommerce.title"]').forEach(el => {
            el.textContent = translation.services?.ecommerce?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="services.ecommerce.description"]').forEach(el => {
            el.textContent = translation.services?.ecommerce?.description || el.textContent;
        });
        
        // Servicios - Desarrollo Web Personalizado
        document.querySelectorAll('[data-i18n-key="services.card2.title"]').forEach(el => {
            el.textContent = translation.services?.card2?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="services.card2.description"]').forEach(el => {
            el.textContent = translation.services?.card2?.description || el.textContent;
        });
        
        // Servicios - Consultoría Tecnológica
        document.querySelectorAll('[data-i18n-key="services.card3.title"]').forEach(el => {
            el.textContent = translation.services?.card3?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="services.card3.description"]').forEach(el => {
            el.textContent = translation.services?.card3?.description || el.textContent;
        });

        // Tecnologías
        document.querySelectorAll('[data-i18n-key="technologies.title"]').forEach(el => {
            el.textContent = translation.technologies?.title || el.dataset.originalText || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="technologies.subtitle"]').forEach(el => {
            el.textContent = translation.technologies?.subtitle || el.dataset.originalText || el.textContent;
        });

        // Proyectos
        document.querySelectorAll('[data-i18n-key="projects.title"]').forEach(el => {
            el.textContent = translation.projects?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="projects.project1.title"]').forEach(el => {
            el.textContent = translation.projects?.project1?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="projects.project1.description"]').forEach(el => {
            el.textContent = translation.projects?.project1?.description || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="projects.project2.title"]').forEach(el => {
            el.textContent = translation.projects?.project2?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="projects.project2.description"]').forEach(el => {
            el.textContent = translation.projects?.project2?.description || el.textContent;
        });

        // Contacto
        document.querySelectorAll('[data-i18n-key="contact.title"]').forEach(el => {
            el.textContent = translation.contact?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="contact.name"]').forEach(el => {
            el.textContent = translation.contact?.name || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="contact.email"]').forEach(el => {
            el.textContent = translation.contact?.email || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="contact.message"]').forEach(el => {
            el.textContent = translation.contact?.message || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="contact.send"]').forEach(el => {
            el.textContent = translation.contact?.send || el.textContent;
        });

        // Política de privacidad
        document.querySelectorAll('[data-i18n-key="privacyPolicy.title"]').forEach(el => {
            el.textContent = translation.privacyPolicy?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="privacyPolicy.sections.dataCollection.title"]').forEach(el => {
            el.textContent = translation.privacyPolicy?.sections?.dataCollection?.title || el.textContent;
        });
        document.querySelectorAll('[data-i18n-key="privacyPolicy.sections.dataCollection.description"]').forEach(el => {
            el.textContent = translation.privacyPolicy?.sections?.dataCollection?.description || el.textContent;
        });
        // Añadir más secciones de política de privacidad según sea necesario

        // Footer
        document.querySelectorAll('[data-i18n-key="footer.rights"]').forEach(el => {
            el.textContent = translation.footer?.rights || el.textContent;
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

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Transición de color de fondo
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
    };
});

document.addEventListener('DOMContentLoaded', () => {
    // Configuración de internacionalización
    const translations = {
        es: null,
        en: null,
        th: null
    };

    const defaultLang = 'es';
    let currentLang = localStorage.getItem('language') || defaultLang;

    // Cargar traducciones
    async function loadTranslations(lang) {
        // Si ya está cargado, retornar
        if (translations[lang]) {
            return translations[lang];
        }

        try {
            // Primero intenta cargar desde locales JSON
            if (lang === 'th') {
                const localesResponse = await fetch(`locales/${lang}.json`);
                if (localesResponse.ok) {
                    translations[lang] = await localesResponse.json();
                    return translations[lang];
                }
            }
            
            // Cargar desde archivos .po para español e inglés
            const poResponse = await fetch(`translations/${lang}/LC_MESSAGES/messages.po`);
            if (poResponse.ok) {
                const poText = await poResponse.text();
                translations[lang] = parsePOFile(poText);
                return translations[lang];
            }
            
            throw new Error(`No se encontraron traducciones para el idioma ${lang}`);
        } catch (error) {
            console.error(`Error cargando traducción ${lang}:`, error);
            // Fallback al idioma por defecto
            return loadTranslations(defaultLang);
        }
    }

    // Función mejorada para parsear archivos .po
    function parsePOFile(poText) {
        const translations = {};
        const lines = poText.split('\n');
        let currentKey = null;
        let currentValue = '';
        let isMultiline = false;

        lines.forEach(line => {
            line = line.trim();
            
            // Manejo de claves msgid
            if (line.startsWith('msgid ')) {
                currentKey = line.replace(/^msgid\s*"|"$/g, '').replace(/\\n/g, '\n');
                isMultiline = line.endsWith('""');
                currentValue = '';
            } 
            // Manejo de valores msgstr
            else if (line.startsWith('msgstr ')) {
                currentValue = line.replace(/^msgstr\s*"|"$/g, '').replace(/\\n/g, '\n');
                isMultiline = line.endsWith('""');

                // Mapeo de traducciones
                if (currentKey) {
                    const parts = currentKey.split('.');
                    if (parts.length >= 2) {
                        let currentTranslation = translations;
                        for (let i = 0; i < parts.length - 1; i++) {
                            currentTranslation[parts[i]] = currentTranslation[parts[i]] || {};
                            currentTranslation = currentTranslation[parts[i]];
                        }
                        currentTranslation[parts[parts.length - 1]] = currentValue;
                    }
                }
            }
            // Manejo de líneas multilínea
            else if (isMultiline) {
                if (line.startsWith('"') && line.endsWith('"')) {
                    currentValue += line.replace(/^"|"$/g, '').replace(/\\n/g, '\n');
                }
                
                // Terminar línea multilínea
                if (!line.endsWith('""')) {
                    isMultiline = false;
                }
            }
        });

        return translations;
    }

    // Aplicar traducciones
    async function applyTranslations(lang) {
        try {
            const translation = await loadTranslations(lang);
            if (!translation) return;

            // Servicios
            document.querySelectorAll('[data-i18n-key="services.title"]').forEach(el => {
                el.textContent = translation.services?.title || el.dataset.originalText || el.textContent;
            });
            
            // Servicios - E-commerce
            document.querySelectorAll('[data-i18n-key="services.ecommerce.title"]').forEach(el => {
                el.textContent = translation.services?.ecommerce?.title || el.dataset.originalText || el.textContent;
            });
            document.querySelectorAll('[data-i18n-key="services.ecommerce.description"]').forEach(el => {
                el.textContent = translation.services?.ecommerce?.description || el.dataset.originalText || el.textContent;
            });
            
            // Servicios - Desarrollo Web Personalizado
            document.querySelectorAll('[data-i18n-key="services.card2.title"]').forEach(el => {
                el.textContent = translation.services?.card2?.title || el.dataset.originalText || el.textContent;
            });
            document.querySelectorAll('[data-i18n-key="services.card2.description"]').forEach(el => {
                el.textContent = translation.services?.card2?.description || el.dataset.originalText || el.textContent;
            });
            
            // Servicios - Consultoría Tecnológica
            document.querySelectorAll('[data-i18n-key="services.card3.title"]').forEach(el => {
                el.textContent = translation.services?.card3?.title || el.dataset.originalText || el.textContent;
            });
            document.querySelectorAll('[data-i18n-key="services.card3.description"]').forEach(el => {
                el.textContent = translation.services?.card3?.description || el.dataset.originalText || el.textContent;
            });

            // Tecnologías
            document.querySelectorAll('[data-i18n-key="technologies.title"]').forEach(el => {
                el.textContent = translation.technologies?.title || el.dataset.originalText || el.textContent;
            });
            document.querySelectorAll('[data-i18n-key="technologies.subtitle"]').forEach(el => {
                el.textContent = translation.technologies?.subtitle || el.dataset.originalText || el.textContent;
            });

            // Guardar estado del idioma
            document.documentElement.lang = lang;
            localStorage.setItem('language', lang);
            currentLang = lang;

            // Actualizar selector de idioma
            const languageSelector = document.getElementById('language-selector');
            if (languageSelector) {
                languageSelector.value = lang;
            }

        } catch (error) {
            console.error('Error aplicando traducciones:', error);
        }
    }

    // Inicializar almacenamiento de texto original
    function initializeOriginalText() {
        document.querySelectorAll('[data-i18n-key]').forEach(el => {
            if (!el.dataset.originalText) {
                el.dataset.originalText = el.textContent;
            }
        });
    }

    // Selector de idioma
    const languageSelector = document.getElementById('language-selector');
    if (languageSelector) {
        // Inicializar texto original
        initializeOriginalText();

        // Establecer valor inicial
        languageSelector.value = currentLang;

        // Evento de cambio de idioma
        languageSelector.addEventListener('change', (e) => {
            const selectedLang = e.target.value;
            applyTranslations(selectedLang);
        });
    }

    // Cargar traducción inicial
    applyTranslations(currentLang);
});

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('.section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth scroll para navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Transición de color de fondo
    const toggleTheme = () => {
        document.body.classList.toggle('dark-theme');
    };
});