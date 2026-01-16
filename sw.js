// sw.js - 超简离线缓存
const CACHE = 'hanzi-srs-offline-v1';
const ASSETS = [
  '/', '/index.html',
  '/vendor/hanzi-writer.min.js',
  // 课级合并包（按需添加，可在运行时缓存）
  '/bundles/chars-11.json','/bundles/chars-12.json','/bundles/chars-13.json','/bundles/chars-14.json','/bundles/chars-15.json',
  '/bundles/chars-16.json','/bundles/chars-17.json','/bundles/chars-18.json','/bundles/chars-19.json','/bundles/chars-20.json'
];
self.addEventListener('install', e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)));
});
self.addEventListener('fetch', e=>{
  e.respondWith(
    caches.match(e.request).then(r=> r || fetch(e.request).then(res=>{
      const clone = res.clone(); caches.open(CACHE).then(c=>c.put(e.request, clone)); return res;
    }).catch(()=> caches.match('/index.html')))
  );
});
