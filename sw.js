const C="khamen-v13",F=["./","index.html","manifest.webmanifest","icons/icon-192.png","icons/icon-512.png"];
const T=(p,ms)=>new Promise((ok,no)=>{const t=setTimeout(()=>no("timeout"),ms);p.then(x=>{clearTimeout(t);ok(x)},e=>{clearTimeout(t);no(e)})});
self.addEventListener("install",e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(F)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener("fetch",e=>{if(e.request.method!=="GET")return;
e.respondWith(T(fetch(e.request),3000).then(r=>{if(r&&r.ok){const c=r.clone();caches.open(C).then(x=>x.put(e.request,c))}return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match("index.html"))))});
