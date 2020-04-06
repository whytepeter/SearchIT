const staticCacheName = "site-static-v3";
const dynamicCache = "site-dynamic-v2";
const assets = [
  "/",
  "/index.html",
  "/app.js",
  "/Sass/main.css",
  "/assets/logo.png",
  "/assets/f-logo.png",
  "/assets/default.png",
  "/assets/diamond.png",
  "/assets/eco.png",
  "/assets/dcmb.png",
  "/assets/fidelity.png",
  "/assets/first.png",
  "/assets/gtb.png",
  "/assets/heritage.png",
  "/assets/keystone.png",
  "/assets/polaris.png",
  "/assets/stanbic.png",
  "/assets/sterling.png",
  "/assets/uba.png",
  "/assets/union.png",
  "/assets/unity.png",
  "/assets/wema.png",
  "/assets/zenith.png",
  "https://kit.fontawesome.com/0e2c38c33e.js",
  "https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.2/animate.min.css",
];

//install service worker
self.addEventListener("install", (e) => {
  //console.log("service worker has been installed");
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log("caching shell assets");
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener("activate", (e) => {
  //console.log("service worker has been activated");
  e.waitUntil(
    caches.keys().then((keys) => {
      //console.log(keys);
      return Promise.all(
        keys
          .filter((key) => key !== staticCacheName)
          .map((key) => caches.delete(key))
      );
    })
  );
});

// fetch event
self.addEventListener("fetch", (e) => {
  if (e.request.url.indexOf("firestore.googleapis.com") === -1) {
    e.respondWith(
      caches.match(e.request).then((cacheRes) => {
        return (
          cacheRes ||
          fetch(e.request).then((fetchRes) => {
            return caches.open(dynamicCache).then((cache) => {
              cache.put(e.request.url, fetchRes.clone());
              return fetchRes;
            });
          })
        );
      })
    );
  }
});
