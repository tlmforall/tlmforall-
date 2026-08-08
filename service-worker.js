""use strict";

/* =========================================
   TLM FOR ALL
   SERVICE WORKER — PART 32
   SMART CACHE
   ========================================= */

const CACHE_NAME = "tlm-for-all-v2";

const CORE_FILES = [
    "./",
    "./index.html",
    "./css/css/style.css",
    "./js/script.js",
    "./manifest.json",
    "./pages/classes.html",
    "./pages/teacher.html",
    "./pages/student.html",
    "./pages/ai-center.html",
    "./pages/library.html",
    "./assets/icon-192.png",
    "./assets/icon-512.png"
    "./offline.html"
];


/* =========================================
   INSTALL
   ========================================= */

self.addEventListener(
    "install",
    function (event) {

        event.waitUntil(

            caches.open(
                CACHE_NAME
            ).then(
                function (cache) {

                    return cache.addAll(
                        CORE_FILES
                    );

                }
            )

        );

        self.skipWaiting();

    }
);


/* =========================================
   ACTIVATE
   ========================================= */

self.addEventListener(
    "activate",
    function (event) {

        event.waitUntil(

            caches.keys().then(
                function (cacheNames) {

                    return Promise.all(

                        cacheNames.map(
                            function (cacheName) {

                                if (
                                    cacheName !==
                                    CACHE_NAME
                                ) {

                                    return caches.delete(
                                        cacheName
                                    );

                                }

                                return null;

                            }
                        )

                    );

                }
            )

        );

        self.clients.claim();

    }
);


/* =========================================
   FETCH
   ========================================= */

self.addEventListener(
    "fetch",
    function (event) {

        if (
            event.request.method !==
            "GET"
        ) {
            return;
        }


        event.respondWith(

            fetch(
                event.request
            )
            .then(
                function (response) {

                    if (
                        response &&
                        response.status === 200
                    ) {

                        const copy =
                            response.clone();


                        caches.open(
                            CACHE_NAME
                        ).then(
                            function (cache) {

                                cache.put(
                                    event.request,
                                    copy
                                );

                            }
                        );

                    }


                    return response;

                }
            )
            .catch(
                function () {

                    return caches.match(
                        event.request
                    ).then(
                        function (cachedResponse) {

                            if (
                                cachedResponse
                            ) {

                                return cachedResponse;

                            }


                            return caches.match("./index.html")
    .then(function (indexResponse) {

        if (indexResponse) {
            return indexResponse;
        }

        return caches.match("./offline.html");
    });
      
                            );

                        }
                    );

                }
            )

        );

    }
);


/* =========================================
   END — PART 32
   ========================================= */
