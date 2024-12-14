const CACHE_NAME = 'thaitech-solutions-v1.0.0';
const OFFLINE_URL = '/offline.html';

const CACHE_ASSETS = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/main.js',
    '/img/logo-192.png',
    '/img/logo-512.png',
    '/locales/es.json',
    '/locales/en.json',
    '/locales/th.json',
    OFFLINE_URL
];

// Instalación del Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(CACHE_ASSETS);
            })
    );
});

// Activación y limpieza de caché antigua
self.addEventListener('activate', (event) => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// Estrategia de caché: Network First con fallback a caché
self.addEventListener('fetch', (event) => {
    // Ignorar solicitudes que no son HTTP/HTTPS
    if (!event.request.url.startsWith('http')) return;

    event.respondWith(
        fetch(event.request)
            .catch(() => {
                // Si falla la red, buscar en caché
                return caches.match(event.request)
                    .then((response) => {
                        // Si no está en caché, mostrar página offline
                        if (response) return response;
                        return caches.match(OFFLINE_URL);
                    })
            })
    );
});
