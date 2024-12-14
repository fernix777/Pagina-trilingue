# ThaiTech Solutions - Sitio Web Multilingüe

## Descripción
Sitio web corporativo para ThaiTech Solutions, una empresa especializada en desarrollo web y soluciones digitales para el mercado tailandés.

## 🌐 Internacionalización (i18n)

### Idiomas Soportados
- 🇪🇸 Español
- 🇬🇧 Inglés
- 🇹🇭 Tailandés

### Estructura de Archivos de Traducción
- `locales/es.json`: Traducciones en español
- `locales/en.json`: Traducciones en inglés
- `locales/th.json`: Traducciones en tailandés

### Funcionalidades de Internacionalización
- Selector de idioma en la barra de navegación
- Cambio de idioma sin recargar la página
- Persistencia del idioma seleccionado mediante `localStorage`
- Traducciones completas para:
  - Navbar
  - Sección Hero
  - Servicios
  - Proyectos
  - Formulario de Contacto
  - Política de Privacidad
  - Footer

### Configuración
La configuración multilingüe se encuentra en:
- `config.json`: Detalles generales del proyecto en múltiples idiomas
- `manifest.json`: Metadatos multilingües para la aplicación web

## 🛠 Tecnologías
- HTML5
- CSS3 (Bulma)
- JavaScript
- Internacionalización nativa
- LocalStorage
- SVG
- Web App Manifest

## 📦 Instalación
1. Clonar repositorio
2. Abrir `index.html` en un navegador
3. Usar el selector de idioma en la navegación

## Estructura del Proyecto
thaitechsolutions/
│
├── index.html         # Página principal
├── privacy-policy.html # Política de privacidad
├── manifest.json      # Manifiesto web
├── config.json        # Configuración del proyecto
│
├── css/
│   └── styles.css     # Estilos personalizados
│
├── js/
│   └── main.js        # Scripts principales
│
└── img/
    ├── logo.svg       # Logotipo del sitio
    └── ...            # Otras imágenes

## Modo Oscuro
- Botón de cambio de tema en la barra de navegación
- Transiciones suaves entre modos
- Preferencia de tema guardada en LocalStorage

## Características Avanzadas de PWA

### Service Worker
- **Soporte Offline**: Implementado mediante `service-worker.js`
- **Estrategia de Caché**: Network First con fallback a caché
- **Archivos en Caché**: 
  - Archivos estáticos principales
  - Páginas de contenido
  - Recursos de internacionalización

### Funcionalidades
- Página de offline personalizada
- Registro automático de Service Worker
- Manejo de solicitudes de red fallidas
- Limpieza de caché antigua

### Configuración
Para habilitar completamente las características de PWA:
1. Asegúrate de servir el sitio desde un servidor HTTPS
2. Verifica que `service-worker.js` esté en la raíz del proyecto
3. Mantén actualizado el `manifest.json`

### Compatibilidad
- Probado en navegadores modernos
- Soporte para Chrome, Firefox, Safari, Edge
- Requiere JavaScript habilitado

## Próximos Desarrollos
- Implementación de backend para formulario de contacto
- Sistema de gestión de proyectos
- Optimización de rendimiento
- Mejoras de accesibilidad

## Licencia
MIT License

## Contacto
- Email: info@thaitechsolutions.com
- Ubicación: Bangkok, Tailandia

## 🌈 Contribuciones
¡Las contribuciones para añadir más idiomas son bienvenidas!
