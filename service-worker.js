"use strict";

const CACHE_NAME = "tlm-for-all-v1";

const CORE_FILES = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/script.js",
    "./pages/classes.html",
    "./pages/teacher.html",
    "./pages/student.html",
    "./pages/ai-center.html",
    "./pages/library.html"
];

self.addEventListener("install", function (event) {

    event.waitUntil(

        caches.open(CACHE_NAME).then(
            function (cache) {

                return cache.addAll(
                    CORE_FILES
                );

            }
        )

    );

    self.skipWaiting();

});


self.addEventListener("activate", function (event) {

    event.waitUntil(

        caches.keys().then(
            function (cacheNames) {

                return Promise.all(

                    cacheNames
                        .filter(function (name) {

                            return name !== CACHE_NAME;

                        })
                        .map(function (name) {

                            return caches.delete(name);

                        })

                );

            }
        )

    );

    self.clients.claim();

});


self.addEventListener("fetch", function (event) {

    if (
        event.request.method !== "GET"
    ) {
        return;
    }

    event.respondWith(

        fetch(event.request)

            .then(function (response) {

                if (
                    response &&
                    response.status === 200
                ) {

                    const copy =
                        response.clone();

                    caches.open(
                        CACHE_NAME
                    ).then(function (cache) {

                        cache.put(
                            event.request,
                            copy
                        );

                    });

                }

                return response;

            })

            .catch(function () {

                return caches.match(
                    event.request
                ).then(function (cached) {

                    return (
                        cached ||
                        caches.match(
                            "./index.html"
                        )
                    );

                });

            })

    );

});
