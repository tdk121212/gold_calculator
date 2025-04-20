// نسخه کش
const CACHE_NAME = 'gold-calculator-v2.1';
const urlsToCache = [
  './index.html',
  // می‌تونی فایل‌های دیگه مثل CSS یا JS جداگانه رو هم اضافه کنی اگه بعداً جدا کردی
];

// نصب Service Worker و کش کردن فایل‌ها
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// درخواست‌ها رو از کش برگردوندن
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});

// به‌روزرسانی کش و حذف کش‌های قدیمی
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
