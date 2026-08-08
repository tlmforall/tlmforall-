/* =========================================
   TLM FOR ALL — js/script.js
   PART 1
   ========================================= */

document.addEventListener("DOMContentLoaded", function () {

    "use strict";

    /* =====================================
       MOBILE MENU
       ===================================== */

    const menuButtons = document.querySelectorAll(
        ".menu-toggle, .mobile-menu-btn"
    );

    const menus = document.querySelectorAll(
        "nav ul, .nav-menu"
    );

    menuButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            button.classList.toggle("active");

            menus.forEach(function (menu) {
                menu.classList.toggle("active");
            });

        });

    });


    /* =====================================
       CLOSE MOBILE MENU AFTER CLICK
       ===================================== */

    document.querySelectorAll(
        "nav a, .nav-menu a"
    ).forEach(function (link) {

        link.addEventListener("click", function () {

            menus.forEach(function (menu) {
                menu.classList.remove("active");
            });

            menuButtons.forEach(function (button) {
                button.classList.remove("active");
            });

        });

    });


    /* =====================================
       DARK / LIGHT MODE
       ===================================== */

    const themeButtons = document.querySelectorAll(
        "#themeToggle, .theme-toggle, [data-theme-toggle]"
    );

    function applyTheme(theme) {

        if (theme === "dark") {
            document.body.classList.add("dark-mode");
        } else {
            document.body.classList.remove("dark-mode");
        }

        localStorage.setItem("tlm-theme", theme);

        themeButtons.forEach(function (button) {

            if (theme === "dark") {
                button.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );
                button.textContent = "☀️";
            } else {
                button.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );
                button.textContent = "🌙";
            }

        });

    }


    const savedTheme =
        localStorage.getItem("tlm-theme");

    if (savedTheme) {
        applyTheme(savedTheme);
    } else if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    ) {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }


    themeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );

            applyTheme(
                isDark ? "light" : "dark"
            );

        });

    });


    /* =====================================
       LANGUAGE SELECTOR
       ===================================== */

    const languageButtons =
        document.querySelectorAll(
            ".language-selector button"
        );

    languageButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            languageButtons.forEach(function (item) {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const language =
                button.dataset.language ||
                button.getAttribute("data-lang");

            if (language) {
                localStorage.setItem(
                    "tlm-language",
                    language
                );

                document.documentElement.lang =
                    language;
            }

        });

    });


    const savedLanguage =
        localStorage.getItem("tlm-language");

    if (savedLanguage) {

        languageButtons.forEach(function (button) {

            const language =
                button.dataset.language ||
                button.getAttribute("data-lang");

            if (language === savedLanguage) {
                button.classList.add("active");
            }

        });

        document.documentElement.lang =
            savedLanguage;
    }


    /* =====================================
       SMOOTH INTERNAL LINKS
       ===================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (target) {

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });


    /* =====================================
       SCROLL TO TOP
       ===================================== */

    const scrollButtons =
        document.querySelectorAll(
            "#scrollTop, .scroll-top"
        );

    function updateScrollButton() {

        scrollButtons.forEach(function (button) {

            if (window.scrollY > 400) {
                button.classList.add("show");
                button.style.display = "flex";
            } else {
                button.classList.remove("show");
                button.style.display = "none";
            }

        });

    }

    window.addEventListener(
        "scroll",
        updateScrollButton,
        { passive: true }
    );

    updateScrollButton();


    scrollButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    });


    /* =====================================
       CURRENT YEAR
       ===================================== */

    document.querySelectorAll(
        "[data-current-year], #currentYear"
    ).forEach(function (element) {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================
       SEARCH BOX
       ===================================== */

    const searchInputs =
        document.querySelectorAll(
            ".smart-search input, #smartSearch"
        );

    searchInputs.forEach(function (input) {

        input.addEventListener(
            "input",
            function () {

                const searchText =
                    input.value
                        .trim()
                        .toLowerCase();

                const searchableItems =
                    document.querySelectorAll(
                        "[data-search]"
                    );

                searchableItems.forEach(
                    function (item) {

                        const content =
                            (
                                item.dataset.search ||
                                item.textContent ||
                                ""
                            ).toLowerCase();

                        if (
                            !searchText ||
                            content.includes(searchText)
                        ) {
                            item.style.display = "";
                        } else {
                            item.style.display =
                                "none";
                        }

                    }
                );

            }
        );

    });


    /* =====================================
       BUTTON RIPPLE EFFECT
       ===================================== */

    document.querySelectorAll(
        ".btn, button"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                const ripple =
                    document.createElement("span");

                ripple.className =
                    "tlm-ripple";

                const rect =
                    button.getBoundingClientRect();

                ripple.style.left =
                    (event.clientX - rect.left) + "px";

                ripple.style.top =
                    (event.clientY - rect.top) + "px";

                button.appendChild(ripple);

                setTimeout(function () {
                    ripple.remove();
                }, 600);

            }
        );

    });


    /* =====================================
       PAGE LOADER
       ===================================== */

    const loader =
        document.querySelector(
            ".tlm-loader"
        );

    if (loader) {

        window.addEventListener(
            "load",
            function () {

                setTimeout(function () {
                    loader.classList.add(
                        "hidden"
                    );
                }, 300);

            }
        );

    }


    /* =====================================
       ACTIVE NAVIGATION
       ===================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";

    document.querySelectorAll(
        "nav a, .nav-menu a"
    ).forEach(function (link) {

        const href =
            link.getAttribute("href");

        if (!href) {
            return;
        }

        const linkPage =
            href.split("/").pop();

        if (
            linkPage === currentPage ||
            (
                currentPage === "" &&
                linkPage === "index.html"
            )
        ) {
            link.classList.add("active");
        }

    });


    /* =====================================
       ESC KEY — CLOSE MENU
       ===================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {

                menus.forEach(function (menu) {
                    menu.classList.remove("active");
                });

                menuButtons.forEach(function (button) {
                    button.classList.remove("active");
                });

            }

        }
    );


    /* =====================================
       INITIALIZE
       ===================================== */

    document.body.classList.add(
        "tlm-ready"
    );

});
/* =========================================
   TLM FOR ALL — js/script.js
   PART 2
   SEARCH + QUOTES + NOTIFICATIONS
   ========================================= */

"use strict";


/* =========================================
   SMART SEARCH
   ========================================= */

function tlmSmartSearch() {

    const inputs = document.querySelectorAll(
        "#searchInput, .search-input, .smart-search input"
    );

    inputs.forEach(function (input) {

        input.addEventListener("keyup", function () {

            const value = input.value
                .trim()
                .toLowerCase();

            const items = document.querySelectorAll(
                "[data-search], .searchable"
            );

            items.forEach(function (item) {

                const text = (
                    item.dataset.search ||
                    item.textContent ||
                    ""
                ).toLowerCase();

                if (!value || text.includes(value)) {
                    item.style.display = "";
                } else {
                    item.style.display = "none";
                }

            });

        });

    });

}


/* =========================================
   DAILY MOTIVATIONAL QUOTES
   ========================================= */

function tlmDailyQuote() {

    const quoteElement = document.querySelector(
        "#dailyQuote, .daily-quote-text, [data-daily-quote]"
    );

    if (!quoteElement) {
        return;
    }

    const quotes = [
        {
            en: "Every child can learn when learning becomes meaningful.",
            hi: "हर बच्चा सीख सकता है, जब सीखना उसके लिए अर्थपूर्ण बन जाए।",
            te: "నేర్చుకోవడం అర్థవంతంగా మారితే ప్రతి పిల్లవాడు నేర్చుకోగలడు."
        },
        {
            en: "A great teacher creates curiosity, confidence and possibilities.",
            hi: "एक महान शिक्षक जिज्ञासा, आत्मविश्वास और संभावनाएँ पैदा करता है।",
            te: "ఒక గొప్ప ఉపాధ్యాయుడు ఆసక్తి, ఆత్మవిశ్వాసం మరియు అవకాశాలను సృష్టిస్తాడు."
        },
        {
            en: "Education becomes powerful when every learner gets a chance.",
            hi: "शिक्षा तब शक्तिशाली बनती है जब हर विद्यार्थी को अवसर मिलता है।",
            te: "ప్రతి విద్యార్థికి అవకాశం లభించినప్పుడు విద్య శక్తివంతమవుతుంది."
        },
        {
            en: "Teach with technology, learn with curiosity.",
            hi: "तकनीक के साथ सिखाएँ, जिज्ञासा के साथ सीखें।",
            te: "సాంకేతికతతో బోధించండి, ఆసక్తితో నేర్చుకోండి."
        },
        {
            en: "TLM FOR ALL — Learning for everyone.",
            hi: "TLM FOR ALL — सभी के लिए सीखने का अवसर।",
            te: "TLM FOR ALL — అందరికీ అభ్యాసం."
        }
    ];

    const language =
        localStorage.getItem("tlm-language") || "en";

    const today =
        new Date().getDate();

    const quote =
        quotes[today % quotes.length];

    quoteElement.textContent =
        quote[language] || quote.en;

}


/* =========================================
   DATE DISPLAY
   ========================================= */

function tlmDateDisplay() {

    const elements = document.querySelectorAll(
        "#todayDate, .today-date, [data-today-date]"
    );

    if (!elements.length) {
        return;
    }

    const today = new Date();

    const options = {
        day: "numeric",
        month: "long",
        year: "numeric"
    };

    const dateText =
        today.toLocaleDateString(
            "en-IN",
            options
        );

    elements.forEach(function (element) {
        element.textContent = dateText;
    });

}


/* =========================================
   WELCOME MESSAGE
   ========================================= */

function tlmWelcomeMessage() {

    const element = document.querySelector(
        "#welcomeMessage, .welcome-message"
    );

    if (!element) {
        return;
    }

    const hour = new Date().getHours();

    let message;

    if (hour < 12) {
        message = "Good Morning 👋";
    } else if (hour < 17) {
        message = "Good Afternoon 👋";
    } else {
        message = "Good Evening 👋";
    }

    element.textContent = message;

}


/* =========================================
   TOAST
   ========================================= */

function tlmToast(message, duration = 2500) {

    let toast =
        document.querySelector(".tlm-toast");

    if (!toast) {

        toast =
            document.createElement("div");

        toast.className =
            "tlm-toast";

        document.body.appendChild(toast);

    }

    toast.textContent = message;

    toast.classList.add("show");

    clearTimeout(
        window.tlmToastTimer
    );

    window.tlmToastTimer =
        setTimeout(function () {

            toast.classList.remove("show");

        }, duration);

}


/* =========================================
   COPY TEXT
   ========================================= */

function tlmCopyText(text) {

    if (!text) {
        return;
    }

    if (
        navigator.clipboard &&
        window.isSecureContext
    ) {

        navigator.clipboard.writeText(text)
            .then(function () {

                tlmToast(
                    "Copied successfully ✓"
                );

            })
            .catch(function () {

                tlmToast(
                    "Unable to copy"
                );

            });

    } else {

        const textarea =
            document.createElement("textarea");

        textarea.value = text;

        textarea.style.position =
            "fixed";

        textarea.style.opacity = "0";

        document.body.appendChild(
            textarea
        );

        textarea.select();

        try {

            document.execCommand(
                "copy"
            );

            tlmToast(
                "Copied successfully ✓"
            );

        } catch (error) {

            tlmToast(
                "Unable to copy"
            );

        }

        textarea.remove();

    }

}


/* =========================================
   COPY BUTTONS
   ========================================= */

function tlmCopyButtons() {

    document.querySelectorAll(
        "[data-copy]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const text =
                    button.dataset.copy;

                tlmCopyText(text);

            }
        );

    });

}


/* =========================================
   EXTERNAL LINKS
   ========================================= */

function tlmExternalLinks() {

    document.querySelectorAll(
        'a[href^="http"]'
    ).forEach(function (link) {

        if (
            link.hostname &&
            link.hostname !==
            window.location.hostname
        ) {

            link.setAttribute(
                "target",
                "_blank"
            );

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });

}


/* =========================================
   INITIALIZE PART 2
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmSmartSearch();

        tlmDailyQuote();

        tlmDateDisplay();

        tlmWelcomeMessage();

        tlmCopyButtons();

        tlmExternalLinks();

    }
);
/* =========================================
   TLM FOR ALL — js/script.js
   PART 3
   CLASS / SUBJECT / CARD INTERACTIONS
   ========================================= */

"use strict";


/* =========================================
   FILTER SYSTEM
   ========================================= */

function tlmFilterItems() {

    const filterButtons =
        document.querySelectorAll(
            "[data-filter]"
        );

    const items =
        document.querySelectorAll(
            "[data-category]"
        );

    if (!filterButtons.length || !items.length) {
        return;
    }

    filterButtons.forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const filter =
                    button.dataset.filter;

                filterButtons.forEach(
                    function (item) {
                        item.classList.remove("active");
                    }
                );

                button.classList.add("active");

                items.forEach(function (item) {

                    const category =
                        item.dataset.category;

                    if (
                        filter === "all" ||
                        filter === category
                    ) {
                        item.style.display = "";
                    } else {
                        item.style.display = "none";
                    }

                });

            }
        );

    });

}


/* =========================================
   CLASS SELECTOR
   ========================================= */

function tlmClassSelector() {

    document.querySelectorAll(
        "[data-class]"
    ).forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const className =
                    card.dataset.class;

                if (!className) {
                    return;
                }

                localStorage.setItem(
                    "tlm-selected-class",
                    className
                );

                document
                    .querySelectorAll(
                        "[data-class]"
                    )
                    .forEach(function (item) {
                        item.classList.remove(
                            "selected"
                        );
                    });

                card.classList.add(
                    "selected"
                );

            }
        );

    });

}


/* =========================================
   SUBJECT SELECTOR
   ========================================= */

function tlmSubjectSelector() {

    document.querySelectorAll(
        "[data-subject]"
    ).forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const subject =
                    card.dataset.subject;

                if (!subject) {
                    return;
                }

                localStorage.setItem(
                    "tlm-selected-subject",
                    subject
                );

                document
                    .querySelectorAll(
                        "[data-subject]"
                    )
                    .forEach(function (item) {
                        item.classList.remove(
                            "selected"
                        );
                    });

                card.classList.add(
                    "selected"
                );

            }
        );

    });

}


/* =========================================
   CARD RIPPLE
   ========================================= */

function tlmCardRipple() {

    document.querySelectorAll(
        ".quick-card, .class-card, .subject-card, .feature-card, .lesson-card"
    ).forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                card.classList.add(
                    "card-clicked"
                );

                setTimeout(function () {

                    card.classList.remove(
                        "card-clicked"
                    );

                }, 350);

            }
        );

    });

}


/* =========================================
   ACCORDION
   ========================================= */

function tlmAccordion() {

    document.querySelectorAll(
        ".accordion-header, [data-accordion]"
    ).forEach(function (header) {

        header.addEventListener(
            "click",
            function () {

                const parent =
                    header.closest(
                        ".accordion-item"
                    );

                if (!parent) {
                    return;
                }

                const content =
                    parent.querySelector(
                        ".accordion-content"
                    );

                const isOpen =
                    parent.classList.contains(
                        "open"
                    );

                document
                    .querySelectorAll(
                        ".accordion-item.open"
                    )
                    .forEach(function (item) {

                        if (item !== parent) {

                            item.classList.remove(
                                "open"
                            );

                            const itemContent =
                                item.querySelector(
                                    ".accordion-content"
                                );

                            if (itemContent) {
                                itemContent.style.maxHeight =
                                    null;
                            }

                        }

                    });

                if (isOpen) {

                    parent.classList.remove(
                        "open"
                    );

                    if (content) {
                        content.style.maxHeight =
                            null;
                    }

                } else {

                    parent.classList.add(
                        "open"
                    );

                    if (content) {

                        content.style.maxHeight =
                            content.scrollHeight +
                            "px";

                    }

                }

            }
        );

    });

}


/* =========================================
   TABS
   ========================================= */

function tlmTabs() {

    document.querySelectorAll(
        "[data-tab]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const tabName =
                    button.dataset.tab;

                document
                    .querySelectorAll(
                        "[data-tab]"
                    )
                    .forEach(function (item) {
                        item.classList.remove(
                            "active"
                        );
                    });

                document
                    .querySelectorAll(
                        "[data-tab-content]"
                    )
                    .forEach(function (content) {

                        content.classList.remove(
                            "active"
                        );

                    });

                button.classList.add(
                    "active"
                );

                const target =
                    document.querySelector(
                        '[data-tab-content="' +
                        tabName +
                        '"]'
                    );

                if (target) {
                    target.classList.add(
                        "active"
                    );
                }

            }
        );

    });

}


/* =========================================
   MODAL
   ========================================= */

function tlmModal() {

    document.querySelectorAll(
        "[data-modal-open]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const modalId =
                    button.dataset.modalOpen;

                const modal =
                    document.getElementById(
                        modalId
                    );

                if (!modal) {
                    return;
                }

                modal.classList.add(
                    "active"
                );

                document.body.classList.add(
                    "modal-open"
                );

            }
        );

    });


    document.querySelectorAll(
        "[data-modal-close]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const modal =
                    button.closest(
                        ".modal"
                    );

                if (modal) {

                    modal.classList.remove(
                        "active"
                    );

                }

                document.body.classList.remove(
                    "modal-open"
                );

            }
        );

    });


    document.querySelectorAll(
        ".modal"
    ).forEach(function (modal) {

        modal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target === modal
                ) {

                    modal.classList.remove(
                        "active"
                    );

                    document.body.classList.remove(
                        "modal-open"
                    );

                }

            }
        );

    });

}


/* =========================================
   ESCAPE — CLOSE MODAL
   ========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key !== "Escape") {
            return;
        }

        document
            .querySelectorAll(
                ".modal.active"
            )
            .forEach(function (modal) {

                modal.classList.remove(
                    "active"
                );

            });

        document.body.classList.remove(
            "modal-open"
        );

    }
);


/* =========================================
   INITIALIZE PART 3
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmFilterItems();

        tlmClassSelector();

        tlmSubjectSelector();

        tlmCardRipple();

        tlmAccordion();

        tlmTabs();

        tlmModal();

    }
);
/* =========================================
   TLM FOR ALL — js/script.js
   PART 4
   FAVORITES + RECENTLY VIEWED + PROGRESS
   ========================================= */

"use strict";


/* =========================================
   FAVORITES
   ========================================= */

function tlmGetFavorites() {

    try {
        return JSON.parse(
            localStorage.getItem("tlm-favorites")
        ) || [];
    } catch (error) {
        return [];
    }

}


function tlmSaveFavorites(favorites) {

    localStorage.setItem(
        "tlm-favorites",
        JSON.stringify(favorites)
    );

}


function tlmToggleFavorite(id) {

    if (!id) {
        return;
    }

    const favorites =
        tlmGetFavorites();

    const index =
        favorites.indexOf(id);

    if (index === -1) {

        favorites.push(id);

        tlmToast(
            "Added to Favorites ⭐"
        );

    } else {

        favorites.splice(
            index,
            1
        );

        tlmToast(
            "Removed from Favorites"
        );

    }

    tlmSaveFavorites(
        favorites
    );

    tlmUpdateFavoriteButtons();

}


function tlmUpdateFavoriteButtons() {

    const favorites =
        tlmGetFavorites();

    document.querySelectorAll(
        "[data-favorite]"
    ).forEach(function (button) {

        const id =
            button.dataset.favorite;

        if (favorites.includes(id)) {

            button.classList.add(
                "active"
            );

            button.setAttribute(
                "aria-label",
                "Remove from favorites"
            );

            button.textContent = "★";

        } else {

            button.classList.remove(
                "active"
            );

            button.setAttribute(
                "aria-label",
                "Add to favorites"
            );

            button.textContent = "☆";

        }

    });

}


function tlmFavoriteButtons() {

    document.querySelectorAll(
        "[data-favorite]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();
                event.stopPropagation();

                tlmToggleFavorite(
                    button.dataset.favorite
                );

            }
        );

    });

    tlmUpdateFavoriteButtons();

}


/* =========================================
   RECENTLY VIEWED
   ========================================= */

function tlmGetRecent() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "tlm-recent"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


function tlmAddRecent(id, title) {

    if (!id) {
        return;
    }

    let recent =
        tlmGetRecent();

    recent =
        recent.filter(
            function (item) {
                return item.id !== id;
            }
        );

    recent.unshift({
        id: id,
        title: title || "Learning Resource",
        time: Date.now()
    });

    recent =
        recent.slice(0, 10);

    localStorage.setItem(
        "tlm-recent",
        JSON.stringify(recent)
    );

}


function tlmRecentItems() {

    document.querySelectorAll(
        "[data-recent-id]"
    ).forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                tlmAddRecent(
                    item.dataset.recentId,
                    item.dataset.recentTitle ||
                    item.textContent.trim()
                );

            }
        );

    });

}


/* =========================================
   LEARNING PROGRESS
   ========================================= */

function tlmGetProgress() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "tlm-progress"
            )
        ) || {};

    } catch (error) {

        return {};

    }

}


function tlmSetProgress(id, value) {

    if (!id) {
        return;
    }

    let progress =
        tlmGetProgress();

    value =
        Math.max(
            0,
            Math.min(
                100,
                Number(value) || 0
            )
        );

    progress[id] =
        value;

    localStorage.setItem(
        "tlm-progress",
        JSON.stringify(progress)
    );

    tlmRenderProgress();

}


function tlmRenderProgress() {

    const progress =
        tlmGetProgress();

    document.querySelectorAll(
        "[data-progress-id]"
    ).forEach(function (element) {

        const id =
            element.dataset.progressId;

        const value =
            progress[id] || 0;

        element.style.width =
            value + "%";

        element.setAttribute(
            "aria-valuenow",
            value
        );

    });

    document.querySelectorAll(
        "[data-progress-value]"
    ).forEach(function (element) {

        const id =
            element.dataset.progressValue;

        const value =
            progress[id] || 0;

        element.textContent =
            value + "%";

    });

}


/* =========================================
   PROGRESS BUTTONS
   ========================================= */

function tlmProgressButtons() {

    document.querySelectorAll(
        "[data-progress]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    button.dataset.progress;

                const current =
                    tlmGetProgress()[id] || 0;

                const next =
                    current >= 100
                        ? 0
                        : 100;

                tlmSetProgress(
                    id,
                    next
                );

                button.classList.toggle(
                    "completed",
                    next === 100
                );

            }
        );

    });

}


/* =========================================
   FAVORITES PAGE
   ========================================= */

function tlmRenderFavorites() {

    const container =
        document.querySelector(
            "[data-favorites-list]"
        );

    if (!container) {
        return;
    }

    const favorites =
        tlmGetFavorites();

    const cards =
        document.querySelectorAll(
            "[data-favorite-card]"
        );

    cards.forEach(function (card) {

        const id =
            card.dataset.favoriteCard;

        if (
            favorites.includes(id)
        ) {
            card.style.display = "";
        } else {
            card.style.display = "none";
        }

    });

    const empty =
        container.querySelector(
            ".favorites-empty"
        );

    if (empty) {

        empty.style.display =
            favorites.length
                ? "none"
                : "block";

    }

}


/* =========================================
   STORAGE SYNC
   ========================================= */

window.addEventListener(
    "storage",
    function (event) {

        if (
            event.key ===
            "tlm-favorites"
        ) {
            tlmUpdateFavoriteButtons();
            tlmRenderFavorites();
        }

        if (
            event.key ===
            "tlm-progress"
        ) {
            tlmRenderProgress();
        }

    }
);


/* =========================================
   INITIALIZE PART 4
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmFavoriteButtons();

        tlmRecentItems();

        tlmProgressButtons();

        tlmRenderProgress();

        tlmRenderFavorites();

    }
);


/* =========================================
   END — PART 4
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 5
   QUIZ + TIMER + LEARNING TOOLS
   ========================================= */

"use strict";


/* =========================================
   QUIZ SYSTEM
   ========================================= */

function tlmQuiz() {

    document.querySelectorAll(
        ".tlm-quiz"
    ).forEach(function (quiz) {

        const questions =
            quiz.querySelectorAll(
                ".quiz-question"
            );

        if (!questions.length) {
            return;
        }

        let current = 0;
        let score = 0;

        function showQuestion(index) {

            questions.forEach(
                function (question, i) {

                    question.style.display =
                        i === index
                            ? "block"
                            : "none";

                }
            );

            const progress =
                quiz.querySelector(
                    ".quiz-progress"
                );

            if (progress) {

                progress.textContent =
                    "Question " +
                    (index + 1) +
                    " / " +
                    questions.length;

            }

        }

        questions.forEach(
            function (question) {

                const options =
                    question.querySelectorAll(
                        "[data-answer]"
                    );

                options.forEach(
                    function (option) {

                        option.addEventListener(
                            "click",
                            function () {

                                if (
                                    question.classList.contains(
                                        "answered"
                                    )
                                ) {
                                    return;
                                }

                                question.classList.add(
                                    "answered"
                                );

                                const correct =
                                    option.dataset.answer ===
                                    "correct";

                                if (correct) {

                                    score++;

                                    option.classList.add(
                                        "correct"
                                    );

                                    tlmToast(
                                        "Correct answer ✓"
                                    );

                                } else {

                                    option.classList.add(
                                        "wrong"
                                    );

                                    const answer =
                                        question.querySelector(
                                            '[data-answer="correct"]'
                                        );

                                    if (answer) {
                                        answer.classList.add(
                                            "correct"
                                        );
                                    }

                                    tlmToast(
                                        "Try again next time"
                                    );

                                }

                            }
                        );

                    }
                );

            }
        );


        const nextButton =
            quiz.querySelector(
                ".quiz-next"
            );

        if (nextButton) {

            nextButton.addEventListener(
                "click",
                function () {

                    if (
                        current <
                        questions.length - 1
                    ) {

                        current++;

                        showQuestion(
                            current
                        );

                    } else {

                        const result =
                            quiz.querySelector(
                                ".quiz-result"
                            );

                        if (result) {

                            result.style.display =
                                "block";

                            result.textContent =
                                "Your Score: " +
                                score +
                                " / " +
                                questions.length;

                        }

                        tlmToast(
                            "Quiz completed 🎉"
                        );

                    }

                }
            );

        }

        showQuestion(0);

    });

}


/* =========================================
   QUIZ RESET
   ========================================= */

function tlmQuizReset() {

    document.querySelectorAll(
        ".quiz-reset"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const quiz =
                    button.closest(
                        ".tlm-quiz"
                    );

                if (!quiz) {
                    return;
                }

                quiz.querySelectorAll(
                    ".quiz-question"
                ).forEach(
                    function (question) {

                        question.classList.remove(
                            "answered"
                        );

                        question.style.display =
                            "none";

                        question.querySelectorAll(
                            "[data-answer]"
                        ).forEach(
                            function (option) {

                                option.classList.remove(
                                    "correct",
                                    "wrong"
                                );

                            }
                        );

                    }
                );

                const result =
                    quiz.querySelector(
                        ".quiz-result"
                    );

                if (result) {
                    result.style.display =
                        "none";
                }

                const first =
                    quiz.querySelector(
                        ".quiz-question"
                    );

                if (first) {
                    first.style.display =
                        "block";
                }

            }
        );

    });

}


/* =========================================
   STUDY TIMER
   ========================================= */

function tlmStudyTimer() {

    document.querySelectorAll(
        "[data-study-timer]"
    ).forEach(function (timer) {

        let seconds =
            Number(
                timer.dataset.studyTimer
            ) || 25 * 60;

        let interval = null;

        const display =
            timer.querySelector(
                ".timer-display"
            );

        const start =
            timer.querySelector(
                ".timer-start"
            );

        const pause =
            timer.querySelector(
                ".timer-pause"
            );

        const reset =
            timer.querySelector(
                ".timer-reset"
            );


        function render() {

            const minutes =
                Math.floor(
                    seconds / 60
                );

            const remaining =
                seconds % 60;

            if (display) {

                display.textContent =
                    String(minutes)
                        .padStart(2, "0") +
                    ":" +
                    String(remaining)
                        .padStart(2, "0");

            }

        }


        function stopTimer() {

            clearInterval(
                interval
            );

            interval = null;

        }


        if (start) {

            start.addEventListener(
                "click",
                function () {

                    if (interval) {
                        return;
                    }

                    interval =
                        setInterval(
                            function () {

                                if (
                                    seconds <= 0
                                ) {

                                    stopTimer();

                                    tlmToast(
                                        "Study session completed 🎉"
                                    );

                                    return;
                                }

                                seconds--;

                                render();

                            },
                            1000
                        );

                }
            );

        }


        if (pause) {

            pause.addEventListener(
                "click",
                function () {

                    stopTimer();

                }
            );

        }


        if (reset) {

            reset.addEventListener(
                "click",
                function () {

                    stopTimer();

                    seconds =
                        Number(
                            timer.dataset.studyTimer
                        ) || 25 * 60;

                    render();

                }
            );

        }


        render();

    });

}


/* =========================================
   VIDEO PLAY TRACKING
   ========================================= */

function tlmVideoProgress() {

    document.querySelectorAll(
        "video[data-resource-id]"
    ).forEach(function (video) {

        video.addEventListener(
            "timeupdate",
            function () {

                if (
                    !video.duration ||
                    !isFinite(video.duration)
                ) {
                    return;
                }

                const percent =
                    Math.round(
                        (
                            video.currentTime /
                            video.duration
                        ) * 100
                    );

                const id =
                    video.dataset.resourceId;

                tlmSetProgress(
                    id,
                    percent
                );

            }
        );

    });

}


/* =========================================
   LESSON COMPLETE
   ========================================= */

function tlmLessonComplete() {

    document.querySelectorAll(
        "[data-complete-lesson]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const id =
                    button.dataset.completeLesson;

                if (!id) {
                    return;
                }

                tlmSetProgress(
                    id,
                    100
                );

                button.classList.add(
                    "completed"
                );

                button.textContent =
                    "✓ Completed";

                tlmToast(
                    "Lesson completed 🎉"
                );

            }
        );

    });

}


/* =========================================
   INITIALIZE PART 5
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmQuiz();

        tlmQuizReset();

        tlmStudyTimer();

        tlmVideoProgress();

        tlmLessonComplete();

    }
);


/* =========================================
   END — PART 5
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 6
   LOCAL SETTINGS + ACCESSIBILITY + SHARE
   ========================================= */

"use strict";


/* =========================================
   SAFE LOCAL STORAGE
   ========================================= */

function tlmStorageAvailable() {

    try {

        const testKey =
            "__tlm_storage_test__";

        localStorage.setItem(
            testKey,
            "1"
        );

        localStorage.removeItem(
            testKey
        );

        return true;

    } catch (error) {

        return false;

    }

}


/* =========================================
   USER SETTINGS
   ========================================= */

function tlmLoadSettings() {

    if (!tlmStorageAvailable()) {
        return;
    }

    const settings = {

        fontSize:
            localStorage.getItem(
                "tlm-font-size"
            ) || "normal",

        contrast:
            localStorage.getItem(
                "tlm-contrast"
            ) || "normal"

    };


    document.body.dataset.fontSize =
        settings.fontSize;

    document.body.dataset.contrast =
        settings.contrast;

}


/* =========================================
   FONT SIZE
   ========================================= */

function tlmFontSize() {

    document.querySelectorAll(
        "[data-font-size]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const size =
                    button.dataset.fontSize;

                if (!size) {
                    return;
                }

                document.body.dataset.fontSize =
                    size;

                localStorage.setItem(
                    "tlm-font-size",
                    size
                );

                document.querySelectorAll(
                    "[data-font-size]"
                ).forEach(function (item) {

                    item.classList.toggle(
                        "active",
                        item.dataset.fontSize === size
                    );

                });

            }
        );

    });

}


/* =========================================
   HIGH CONTRAST
   ========================================= */

function tlmContrast() {

    document.querySelectorAll(
        "[data-contrast-toggle]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                const enabled =
                    document.body.dataset.contrast ===
                    "high";

                const value =
                    enabled
                        ? "normal"
                        : "high";

                document.body.dataset.contrast =
                    value;

                localStorage.setItem(
                    "tlm-contrast",
                    value
                );

                button.classList.toggle(
                    "active",
                    value === "high"
                );

            }
        );

    });

}


/* =========================================
   SHARE WEBSITE
   ========================================= */

function tlmShare() {

    document.querySelectorAll(
        "[data-share]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            async function () {

                const title =
                    document.title ||
                    "TLM FOR ALL";

                const url =
                    window.location.href;

                if (
                    navigator.share
                ) {

                    try {

                        await navigator.share({
                            title: title,
                            text:
                                "TLM FOR ALL — Learning for everyone.",
                            url: url
                        });

                    } catch (error) {

                        if (
                            error.name !==
                            "AbortError"
                        ) {
                            tlmToast(
                                "Sharing cancelled"
                            );
                        }

                    }

                } else {

                    tlmCopyText(url);

                    tlmToast(
                        "Website link copied ✓"
                    );

                }

            }
        );

    });

}


/* =========================================
   PRINT CURRENT PAGE
   ========================================= */

function tlmPrint() {

    document.querySelectorAll(
        "[data-print]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                window.print();

            }
        );

    });

}


/* =========================================
   BACK BUTTON
   ========================================= */

function tlmBackButton() {

    document.querySelectorAll(
        "[data-go-back]"
    ).forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                if (
                    window.history.length > 1
                ) {

                    window.history.back();

                } else {

                    window.location.href =
                        "index.html";

                }

            }
        );

    });

}


/* =========================================
   EXTERNAL PAGE NAVIGATION
   ========================================= */

function tlmPageLinks() {

    document.querySelectorAll(
        "[data-page]"
    ).forEach(function (element) {

        element.addEventListener(
            "click",
            function () {

                const page =
                    element.dataset.page;

                if (!page) {
                    return;
                }

                window.location.href =
                    page;

            }
        );

    });

}


/* =========================================
   KEYBOARD ACCESSIBILITY
   ========================================= */

function tlmKeyboardAccessibility() {

    document.querySelectorAll(
        "[role='button']"
    ).forEach(function (element) {

        element.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {

                    event.preventDefault();

                    element.click();

                }

            }
        );

    });

}


/* =========================================
   REVEAL ON SCROLL
   ========================================= */

function tlmRevealOnScroll() {

    const elements =
        document.querySelectorAll(
            ".reveal-on-scroll"
        );

    if (!elements.length) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (element) {
                element.classList.add(
                    "visible"
                );
            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "visible"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12
            }
        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================
   NUMBER COUNTER
   ========================================= */

function tlmCounters() {

    document.querySelectorAll(
        "[data-counter]"
    ).forEach(function (element) {

        const target =
            Number(
                element.dataset.counter
            );

        if (
            !Number.isFinite(target)
        ) {
            return;
        }

        let current = 0;

        const duration = 900;

        const stepTime =
            Math.max(
                15,
                Math.floor(
                    duration /
                    Math.max(target, 1)
                )
            );

        const timer =
            setInterval(
                function () {

                    current +=
                        Math.ceil(
                            target / 40
                        );

                    if (
                        current >= target
                    ) {

                        current =
                            target;

                        clearInterval(
                            timer
                        );

                    }

                    element.textContent =
                        current.toLocaleString(
                            "en-IN"
                        );

                },
                stepTime
            );

    });

}


/* =========================================
   ONLINE / OFFLINE STATUS
   ========================================= */

function tlmNetworkStatus() {

    const statusElements =
        document.querySelectorAll(
            "[data-network-status]"
        );

    if (!statusElements.length) {
        return;
    }


    function updateStatus() {

        const online =
            navigator.onLine;

        statusElements.forEach(
            function (element) {

                element.textContent =
                    online
                        ? "Online"
                        : "Offline";

                element.classList.toggle(
                    "online",
                    online
                );

                element.classList.toggle(
                    "offline",
                    !online
                );

            }
        );

    }


    window.addEventListener(
        "online",
        updateStatus
    );

    window.addEventListener(
        "offline",
        updateStatus
    );

    updateStatus();

}


/* =========================================
   INITIALIZE PART 6
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmLoadSettings();

        tlmFontSize();

        tlmContrast();

        tlmShare();

        tlmPrint();

        tlmBackButton();

        tlmPageLinks();

        tlmKeyboardAccessibility();

        tlmRevealOnScroll();

        tlmCounters();

        tlmNetworkStatus();

    }
);


/* =========================================
   END — PART 6
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 7
   RESOURCE LIBRARY + FILTER + SORT
   ========================================= */

"use strict";


/* =========================================
   RESOURCE SEARCH
   ========================================= */

function tlmResourceSearch() {

    const input =
        document.querySelector(
            "#resourceSearch, [data-resource-search]"
        );

    const resources =
        document.querySelectorAll(
            "[data-resource-card]"
        );

    if (!input || !resources.length) {
        return;
    }

    input.addEventListener(
        "input",
        function () {

            const query =
                input.value
                    .trim()
                    .toLowerCase();

            resources.forEach(
                function (resource) {

                    const text =
                        (
                            resource.dataset.search ||
                            resource.textContent ||
                            ""
                        ).toLowerCase();

                    resource.style.display =
                        !query ||
                        text.includes(query)
                            ? ""
                            : "none";

                }
            );

        }
    );

}


/* =========================================
   RESOURCE CATEGORY FILTER
   ========================================= */

function tlmResourceFilter() {

    const buttons =
        document.querySelectorAll(
            "[data-resource-filter]"
        );

    const resources =
        document.querySelectorAll(
            "[data-resource-card]"
        );

    if (!buttons.length || !resources.length) {
        return;
    }

    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const filter =
                        button.dataset.resourceFilter;

                    buttons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );

                    button.classList.add(
                        "active"
                    );

                    resources.forEach(
                        function (resource) {

                            const category =
                                resource.dataset.category;

                            resource.style.display =
                                filter === "all" ||
                                filter === category
                                    ? ""
                                    : "none";

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   CLASS FILTER
   ========================================= */

function tlmClassFilter() {

    const buttons =
        document.querySelectorAll(
            "[data-resource-class]"
        );

    const resources =
        document.querySelectorAll(
            "[data-resource-card]"
        );

    if (!buttons.length || !resources.length) {
        return;
    }

    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const selected =
                        button.dataset.resourceClass;

                    buttons.forEach(
                        function (item) {

                            item.classList.remove(
                                "active"
                            );

                        }
                    );

                    button.classList.add(
                        "active"
                    );

                    resources.forEach(
                        function (resource) {

                            const className =
                                resource.dataset.class;

                            resource.style.display =
                                selected === "all" ||
                                className === selected
                                    ? ""
                                    : "none";

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   RESOURCE SORT
   ========================================= */

function tlmResourceSort() {

    const select =
        document.querySelector(
            "#resourceSort, [data-resource-sort]"
        );

    const container =
        document.querySelector(
            "[data-resource-container]"
        );

    if (!select || !container) {
        return;
    }

    select.addEventListener(
        "change",
        function () {

            const cards =
                Array.from(
                    container.querySelectorAll(
                        "[data-resource-card]"
                    )
                );

            const mode =
                select.value;

            cards.sort(
                function (a, b) {

                    if (mode === "name") {

                        return (
                            (
                                a.dataset.title ||
                                a.textContent
                            ).localeCompare(
                                b.dataset.title ||
                                b.textContent
                            )
                        );

                    }

                    if (mode === "newest") {

                        return (
                            Number(
                                b.dataset.date || 0
                            ) -
                            Number(
                                a.dataset.date || 0
                            )
                        );

                    }

                    return 0;

                }
            );

            cards.forEach(
                function (card) {
                    container.appendChild(card);
                }
            );

        }
    );

}


/* =========================================
   RESOURCE COUNTER
   ========================================= */

function tlmResourceCounter() {

    const counter =
        document.querySelector(
            "[data-resource-count]"
        );

    if (!counter) {
        return;
    }

    function updateCount() {

        const visible =
            Array.from(
                document.querySelectorAll(
                    "[data-resource-card]"
                )
            ).filter(
                function (card) {
                    return (
                        card.style.display !==
                        "none"
                    );
                }
            ).length;

        counter.textContent =
            visible.toLocaleString("en-IN");

    }

    updateCount();

    document.querySelectorAll(
        "[data-resource-filter], [data-resource-class]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    setTimeout(
                        updateCount,
                        0
                    );

                }
            );

        }
    );

}


/* =========================================
   RESOURCE CARD OPEN
   ========================================= */

function tlmResourceOpen() {

    document.querySelectorAll(
        "[data-resource-open]"
    ).forEach(
        function (card) {

            card.addEventListener(
                "click",
                function (event) {

                    if (
                        event.target.closest(
                            "a, button"
                        )
                    ) {
                        return;
                    }

                    const url =
                        card.dataset.resourceOpen;

                    if (url) {
                        window.location.href =
                            url;
                    }

                }
            );

        }
    );

}


/* =========================================
   RESOURCE TYPE ICON
   ========================================= */

function tlmResourceIcons() {

    document.querySelectorAll(
        "[data-resource-type]"
    ).forEach(
        function (element) {

            const type =
                (
                    element.dataset.resourceType ||
                    ""
                ).toLowerCase();

            const icons = {
                pdf: "📄",
                ppt: "📊",
                video: "🎬",
                worksheet: "📝",
                quiz: "❓",
                lesson: "📚",
                notes: "📖",
                project: "🎯"
            };

            element.textContent =
                icons[type] || "📚";

        }
    );

}


/* =========================================
   LAZY LOAD IMAGES
   ========================================= */

function tlmLazyImages() {

    const images =
        document.querySelectorAll(
            "img[data-src]"
        );

    if (!images.length) {
        return;
    }

    if (
        !("IntersectionObserver" in window)
    ) {

        images.forEach(
            function (image) {

                image.src =
                    image.dataset.src;

                image.removeAttribute(
                    "data-src"
                );

            }
        );

        return;

    }

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const image =
                            entry.target;

                        image.src =
                            image.dataset.src;

                        image.removeAttribute(
                            "data-src"
                        );

                        observer.unobserve(
                            image
                        );

                    }
                );

            },
            {
                rootMargin: "150px"
            }
        );

    images.forEach(
        function (image) {

            observer.observe(
                image
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 7
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmResourceSearch();

        tlmResourceFilter();

        tlmClassFilter();

        tlmResourceSort();

        tlmResourceCounter();

        tlmResourceOpen();

        tlmResourceIcons();

        tlmLazyImages();

    }
);


/* =========================================
   END — PART 7
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 8
   AI CENTER + QUESTION PAPER GENERATOR
   ========================================= */

"use strict";


/* =========================================
   AI CENTER
   ========================================= */

function tlmAICenter() {

    const form =
        document.querySelector(
            "#aiQuestionForm, .ai-question-form"
        );

    if (!form) {
        return;
    }

    const result =
        form.querySelector(
            ".ai-result, #aiResult"
        );

    const generateButton =
        form.querySelector(
            "[type='submit'], .ai-generate"
        );


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const classInput =
                form.querySelector(
                    "[name='class'], #aiClass"
                );

            const subjectInput =
                form.querySelector(
                    "[name='subject'], #aiSubject"
                );

            const chapterInput =
                form.querySelector(
                    "[name='chapter'], #aiChapter"
                );

            const typeInput =
                form.querySelector(
                    "[name='paperType'], #aiPaperType"
                );

            const languageInput =
                form.querySelector(
                    "[name='language'], #aiLanguage"
                );


            const className =
                classInput
                    ? classInput.value
                    : "";

            const subject =
                subjectInput
                    ? subjectInput.value
                    : "";

            const chapter =
                chapterInput
                    ? chapterInput.value
                    : "";

            const paperType =
                typeInput
                    ? typeInput.value
                    : "Practice Paper";

            const language =
                languageInput
                    ? languageInput.value
                    : "English";


            if (!className || !subject) {

                tlmToast(
                    "Please select Class and Subject"
                );

                return;

            }


            if (generateButton) {

                generateButton.disabled =
                    true;

                generateButton.dataset.originalText =
                    generateButton.textContent;

                generateButton.textContent =
                    "Generating...";

            }


            if (result) {

                result.classList.add(
                    "loading"
                );

                result.innerHTML =
                    `
                    <div class="ai-loading">
                        <span>🤖</span>
                        <strong>Preparing your question paper...</strong>
                        <small>
                            TLM FOR ALL AI Center
                        </small>
                    </div>
                    `;

            }


            setTimeout(
                function () {

                    const paper =
                        tlmBuildQuestionPaper({
                            className,
                            subject,
                            chapter,
                            paperType,
                            language
                        });


                    if (result) {

                        result.classList.remove(
                            "loading"
                        );

                        result.innerHTML =
                            paper;

                    }


                    if (generateButton) {

                        generateButton.disabled =
                            false;

                        generateButton.textContent =
                            generateButton.dataset.originalText ||
                            "Generate Question Paper";

                    }

                    tlmToast(
                        "Question paper generated ✓"
                    );

                },
                700
            );

        }
    );

}


/* =========================================
   QUESTION PAPER BUILDER
   ========================================= */

function tlmBuildQuestionPaper(data) {

    const language =
        data.language || "English";

    const className =
        data.className || "";

    const subject =
        data.subject || "";

    const chapter =
        data.chapter || "All Chapters";

    const paperType =
        data.paperType ||
        "Practice Paper";


    let heading =
        "TLM FOR ALL — Question Paper";

    let instructions =
        "Answer all questions carefully.";


    if (language === "Hindi") {

        heading =
            "TLM FOR ALL — प्रश्न पत्र";

        instructions =
            "सभी प्रश्नों के उत्तर ध्यानपूर्वक दीजिए।";

    }


    if (language === "Telugu") {

        heading =
            "TLM FOR ALL — ప్రశ్నాపత్రం";

        instructions =
            "అన్ని ప్రశ్నలకు జాగ్రత్తగా సమాధానాలు ఇవ్వండి.";

    }


    return `
        <div class="generated-paper">

            <div class="paper-header">

                <div class="paper-logo">
                    📚
                </div>

                <div>
                    <h2>${heading}</h2>

                    <p>
                        Class ${tlmEscape(className)}
                        •
                        ${tlmEscape(subject)}
                    </p>
                </div>

            </div>


            <div class="paper-info">

                <span>
                    <strong>Chapter:</strong>
                    ${tlmEscape(chapter)}
                </span>

                <span>
                    <strong>Type:</strong>
                    ${tlmEscape(paperType)}
                </span>

            </div>


            <div class="paper-instructions">
                ${instructions}
            </div>


            <div class="paper-section">

                <h3>
                    Section A — Objective Questions
                </h3>

                <ol>

                    <li>
                        Choose the correct answer.
                    </li>

                    <li>
                        Fill in the blanks.
                    </li>

                    <li>
                        Match the following.
                    </li>

                    <li>
                        Write True or False.
                    </li>

                </ol>

            </div>


            <div class="paper-section">

                <h3>
                    Section B — Short Answer Questions
                </h3>

                <ol>

                    <li>
                        Explain the main idea of the chapter.
                    </li>

                    <li>
                        Write two important points.
                    </li>

                    <li>
                        Give one suitable example.
                    </li>

                    <li>
                        Explain the concept in your own words.
                    </li>

                </ol>

            </div>


            <div class="paper-section">

                <h3>
                    Section C — Application / Project
                </h3>

                <ol>

                    <li>
                        Connect the lesson with a real-life situation.
                    </li>

                    <li>
                        Prepare a small classroom activity or project.
                    </li>

                </ol>

            </div>


            <div class="paper-footer">

                <span>
                    TLM FOR ALL
                </span>

                <span>
                    NEP 2020 • CCE
                </span>

            </div>

        </div>
    `;

}


/* =========================================
   ESCAPE HTML
   ========================================= */

function tlmEscape(value) {

    return String(value)
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


/* =========================================
   AI TOOL CARDS
   ========================================= */

function tlmAIToolCards() {

    document.querySelectorAll(
        "[data-ai-tool]"
    ).forEach(
        function (card) {

            card.addEventListener(
                "click",
                function () {

                    const target =
                        card.dataset.aiTool;

                    if (!target) {
                        return;
                    }

                    document.querySelectorAll(
                        ".ai-tool-panel"
                    ).forEach(
                        function (panel) {

                            panel.classList.remove(
                                "active"
                            );

                        }
                    );

                    const panel =
                        document.getElementById(
                            target
                        );

                    if (panel) {

                        panel.classList.add(
                            "active"
                        );

                        panel.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );

}


/* =========================================
   QUESTION PAPER PRINT
   ========================================= */

function tlmQuestionPaperPrint() {

    document.querySelectorAll(
        "[data-print-paper]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const paper =
                        document.querySelector(
                            ".generated-paper"
                        );

                    if (!paper) {

                        tlmToast(
                            "Generate a paper first"
                        );

                        return;

                    }

                    window.print();

                }
            );

        }
    );

}


/* =========================================
   QUESTION PAPER CLEAR
   ========================================= */

function tlmQuestionPaperClear() {

    document.querySelectorAll(
        "[data-clear-paper]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const result =
                        document.querySelector(
                            ".ai-result, #aiResult"
                        );

                    if (result) {
                        result.innerHTML = "";
                    }

                    tlmToast(
                        "Paper cleared"
                    );

                }
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 8
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmAICenter();

        tlmAIToolCards();

        tlmQuestionPaperPrint();

        tlmQuestionPaperClear();

    }
);


/* =========================================
   END — PART 8
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 9
   ANNOUNCEMENTS + EVENTS + DAILY CONTENT
   ========================================= */

"use strict";


/* =========================================
   ANNOUNCEMENT BAR
   ========================================= */

function tlmAnnouncement() {

    const bar =
        document.querySelector(
            "[data-announcement]"
        );

    if (!bar) {
        return;
    }

    const close =
        bar.querySelector(
            "[data-announcement-close]"
        );

    const key =
        bar.dataset.announcementKey ||
        "default";

    const hidden =
        localStorage.getItem(
            "tlm-announcement-" + key
        );

    if (hidden === "hidden") {

        bar.style.display = "none";

        return;

    }

    if (close) {

        close.addEventListener(
            "click",
            function () {

                bar.style.display = "none";

                localStorage.setItem(
                    "tlm-announcement-" + key,
                    "hidden"
                );

            }
        );

    }

}


/* =========================================
   DAILY EVENT
   ========================================= */

function tlmDailyEvent() {

    const element =
        document.querySelector(
            "[data-daily-event]"
        );

    if (!element) {
        return;
    }

    const events = [

        {
            month: 1,
            day: 12,
            title: "National Youth Day",
            icon: "🌱"
        },

        {
            month: 1,
            day: 26,
            title: "Republic Day",
            icon: "🇮🇳"
        },

        {
            month: 4,
            day: 22,
            title: "Earth Day",
            icon: "🌍"
        },

        {
            month: 5,
            day: 1,
            title: "Labour Day",
            icon: "👩‍🏫"
        },

        {
            month: 6,
            day: 5,
            title: "World Environment Day",
            icon: "🌿"
        },

        {
            month: 8,
            day: 15,
            title: "Independence Day",
            icon: "🇮🇳"
        },

        {
            month: 9,
            day: 5,
            title: "Teachers' Day",
            icon: "📚"
        },

        {
            month: 11,
            day: 14,
            title: "Children's Day",
            icon: "🎈"
        },

        {
            month: 11,
            day: 26,
            title: "Constitution Day",
            icon: "📜"
        }

    ];

    const today =
        new Date();

    const month =
        today.getMonth() + 1;

    const day =
        today.getDate();

    const event =
        events.find(
            function (item) {

                return (
                    item.month === month &&
                    item.day === day
                );

            }
        );

    if (event) {

        element.innerHTML =
            `
            <span class="event-icon">
                ${event.icon}
            </span>

            <span>
                ${event.title}
            </span>
            `;

        element.classList.add(
            "event-active"
        );

    } else {

        element.innerHTML =
            `
            <span class="event-icon">
                📅
            </span>

            <span>
                Today's Learning Day
            </span>
            `;

    }

}


/* =========================================
   RESOURCE OF THE DAY
   ========================================= */

function tlmResourceOfDay() {

    const container =
        document.querySelector(
            "[data-resource-of-day]"
        );

    if (!container) {
        return;
    }

    const resources =
        container.querySelectorAll(
            "[data-daily-resource]"
        );

    if (!resources.length) {
        return;
    }

    const day =
        new Date().getDate();

    const index =
        day % resources.length;

    resources.forEach(
        function (resource, i) {

            resource.style.display =
                i === index
                    ? ""
                    : "none";

        }
    );

}


/* =========================================
   TODAY'S LEARNING TIP
   ========================================= */

function tlmLearningTip() {

    const element =
        document.querySelector(
            "[data-learning-tip]"
        );

    if (!element) {
        return;
    }

    const tips = [

        "Use one real-life example while teaching a new concept.",

        "Ask students to explain an idea in their own words.",

        "Use pictures, activities and questions together.",

        "Give students time to think before answering.",

        "Connect classroom learning with everyday life.",

        "Encourage curiosity instead of memorization only.",

        "Use formative assessment during the lesson."

    ];

    const day =
        new Date().getDate();

    element.textContent =
        tips[day % tips.length];

}


/* =========================================
   ANNOUNCEMENT ROTATOR
   ========================================= */

function tlmAnnouncementRotator() {

    const element =
        document.querySelector(
            "[data-announcement-rotator]"
        );

    if (!element) {
        return;
    }

    const messages = [

        "📚 Explore TLM FOR ALL",

        "🎯 Learn • Practice • Create",

        "🤖 Explore AI-powered learning tools",

        "🌍 Learning resources for everyone",

        "👩‍🏫 Teacher-friendly resources",

        "🎓 Student practice made simple"

    ];

    let index = 0;

    function showMessage() {

        element.classList.remove(
            "announcement-visible"
        );

        setTimeout(
            function () {

                element.textContent =
                    messages[index];

                element.classList.add(
                    "announcement-visible"
                );

                index =
                    (index + 1) %
                    messages.length;

            },
            200
        );

    }

    showMessage();

    setInterval(
        showMessage,
        4000
    );

}


/* =========================================
   NEW UPDATE BADGE
   ========================================= */

function tlmNewBadges() {

    document.querySelectorAll(
        "[data-new-date]"
    ).forEach(
        function (element) {

            const dateValue =
                element.dataset.newDate;

            if (!dateValue) {
                return;
            }

            const created =
                new Date(dateValue);

            if (
                Number.isNaN(
                    created.getTime()
                )
            ) {
                return;
            }

            const now =
                new Date();

            const difference =
                now.getTime() -
                created.getTime();

            const days =
                difference /
                (1000 * 60 * 60 * 24);

            if (days <= 7) {

                element.classList.add(
                    "is-new"
                );

                const badge =
                    document.createElement(
                        "span"
                    );

                badge.className =
                    "new-badge";

                badge.textContent =
                    "NEW";

                element.appendChild(
                    badge
                );

            }

        }
    );

}


/* =========================================
   NOTIFICATION COUNT
   ========================================= */

function tlmNotificationCount() {

    const badge =
        document.querySelector(
            "[data-notification-count]"
        );

    if (!badge) {
        return;
    }

    const count =
        Number(
            localStorage.getItem(
                "tlm-notification-count"
            )
        ) || 0;

    badge.textContent =
        count > 99
            ? "99+"
            : String(count);

    badge.style.display =
        count > 0
            ? "inline-flex"
            : "none";

}


/* =========================================
   MARK NOTIFICATIONS READ
   ========================================= */

function tlmMarkNotificationsRead() {

    document.querySelectorAll(
        "[data-notifications]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    localStorage.setItem(
                        "tlm-notification-count",
                        "0"
                    );

                    tlmNotificationCount();

                }
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 9
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmAnnouncement();

        tlmDailyEvent();

        tlmResourceOfDay();

        tlmLearningTip();

        tlmAnnouncementRotator();

        tlmNewBadges();

        tlmNotificationCount();

        tlmMarkNotificationsRead();

    }
);


/* =========================================
   END — PART 9
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 10
   LANGUAGE SELECTOR + MULTILINGUAL UI
   ========================================= */

"use strict";


/* =========================================
   LANGUAGE DATA
   ========================================= */

const TLM_LANGUAGES = {

    en: {
        name: "English",

        home: "Home",
        classes: "Classes",
        teachers: "Teachers",
        students: "Students",
        aiTools: "AI Tools",
        library: "Library",
        about: "About",

        search: "Search",
        quickAccess: "Quick Access",
        featuredLessons: "Featured Lessons",
        latestUpdates: "Latest Updates",

        learnMore: "Learn More",
        explore: "Explore",
        startLearning: "Start Learning",

        teacherResources: "Teacher Resources",
        studentPractice: "Student Practice",
        projectWork: "Project Work",
        questionPaper: "Question Paper Generator",

        languageChanged:
            "Language changed successfully ✓"
    },

    hi: {
        name: "हिन्दी",

        home: "होम",
        classes: "कक्षाएँ",
        teachers: "शिक्षक",
        students: "विद्यार्थी",
        aiTools: "AI टूल्स",
        library: "लाइब्रेरी",
        about: "हमारे बारे में",

        search: "खोजें",
        quickAccess: "त्वरित पहुँच",
        featuredLessons: "विशेष पाठ",
        latestUpdates: "नवीनतम अपडेट",

        learnMore: "और जानें",
        explore: "देखें",
        startLearning: "सीखना शुरू करें",

        teacherResources: "शिक्षक संसाधन",
        studentPractice: "विद्यार्थी अभ्यास",
        projectWork: "प्रोजेक्ट कार्य",
        questionPaper: "प्रश्न पत्र जनरेटर",

        languageChanged:
            "भाषा सफलतापूर्वक बदल गई ✓"
    },

    te: {
        name: "తెలుగు",

        home: "హోమ్",
        classes: "తరగతులు",
        teachers: "ఉపాధ్యాయులు",
        students: "విద్యార్థులు",
        aiTools: "AI టూల్స్",
        library: "లైబ్రరీ",
        about: "మా గురించి",

        search: "వెతకండి",
        quickAccess: "త్వరిత ప్రాప్యత",
        featuredLessons: "ప్రత్యేక పాఠాలు",
        latestUpdates: "తాజా నవీకరణలు",

        learnMore: "మరింత తెలుసుకోండి",
        explore: "చూడండి",
        startLearning: "అభ్యాసం ప్రారంభించండి",

        teacherResources: "ఉపాధ్యాయ వనరులు",
        studentPractice: "విద్యార్థి అభ్యాసం",
        projectWork: "ప్రాజెక్ట్ పని",
        questionPaper: "ప్రశ్నాపత్రం జనరేటర్",

        languageChanged:
            "భాష విజయవంతంగా మార్చబడింది ✓"
    }

};


/* =========================================
   GET CURRENT LANGUAGE
   ========================================= */

function tlmGetLanguage() {

    try {

        const language =
            localStorage.getItem(
                "tlm-language"
            );

        if (
            language &&
            TLM_LANGUAGES[language]
        ) {
            return language;
        }

    } catch (error) {}

    return "en";

}


/* =========================================
   SAVE LANGUAGE
   ========================================= */

function tlmSetLanguage(language) {

    if (
        !TLM_LANGUAGES[language]
    ) {
        return;
    }

    try {

        localStorage.setItem(
            "tlm-language",
            language
        );

    } catch (error) {}

    document.documentElement.lang =
        language === "te"
            ? "te"
            : language === "hi"
                ? "hi"
                : "en";

    tlmTranslatePage(
        language
    );

    tlmUpdateLanguageButtons();

    tlmDailyQuote();

    tlmToast(
        TLM_LANGUAGES[language]
            .languageChanged
    );

}


/* =========================================
   TRANSLATE PAGE
   ========================================= */

function tlmTranslatePage(language) {

    const dictionary =
        TLM_LANGUAGES[language];

    if (!dictionary) {
        return;
    }

    document.querySelectorAll(
        "[data-i18n]"
    ).forEach(
        function (element) {

            const key =
                element.dataset.i18n;

            if (
                dictionary[key] !== undefined
            ) {

                element.textContent =
                    dictionary[key];

            }

        }
    );


    document.querySelectorAll(
        "[data-i18n-placeholder]"
    ).forEach(
        function (element) {

            const key =
                element.dataset.i18nPlaceholder;

            if (
                dictionary[key] !== undefined
            ) {

                element.placeholder =
                    dictionary[key];

            }

        }
    );


    document.querySelectorAll(
        "[data-i18n-title]"
    ).forEach(
        function (element) {

            const key =
                element.dataset.i18nTitle;

            if (
                dictionary[key] !== undefined
            ) {

                element.title =
                    dictionary[key];

            }

        }
    );

}


/* =========================================
   LANGUAGE BUTTONS
   ========================================= */

function tlmLanguageSelector() {

    document.querySelectorAll(
        "[data-language]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const language =
                        button.dataset.language;

                    tlmSetLanguage(
                        language
                    );

                }
            );

        }
    );

}


/* =========================================
   UPDATE ACTIVE LANGUAGE
   ========================================= */

function tlmUpdateLanguageButtons() {

    const current =
        tlmGetLanguage();

    document.querySelectorAll(
        "[data-language]"
    ).forEach(
        function (button) {

            const active =
                button.dataset.language ===
                current;

            button.classList.toggle(
                "active",
                active
            );

            button.setAttribute(
                "aria-selected",
                active
                    ? "true"
                    : "false"
            );

        }
    );

}


/* =========================================
   LANGUAGE DROPDOWN
   ========================================= */

function tlmLanguageDropdown() {

    const select =
        document.querySelector(
            "#languageSelect, [data-language-select]"
        );

    if (!select) {
        return;
    }

    select.value =
        tlmGetLanguage();

    select.addEventListener(
        "change",
        function () {

            tlmSetLanguage(
                select.value
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 10
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        const language =
            tlmGetLanguage();

        document.documentElement.lang =
            language;

        tlmLanguageSelector();

        tlmLanguageDropdown();

        tlmTranslatePage(
            language
        );

        tlmUpdateLanguageButtons();

    }
);


/* =========================================
   END — PART 10
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 11
   USER PROFILE + LOGIN-READY UI
   ========================================= */

"use strict";


/* =========================================
   USER PROFILE STORAGE
   ========================================= */

function tlmGetUserProfile() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "tlm-user-profile"
            )
        ) || {
            name: "",
            role: "Student"
        };

    } catch (error) {

        return {
            name: "",
            role: "Student"
        };

    }

}


function tlmSaveUserProfile(profile) {

    try {

        localStorage.setItem(
            "tlm-user-profile",
            JSON.stringify(profile)
        );

    } catch (error) {

        console.warn(
            "TLM profile could not be saved."
        );

    }

}


/* =========================================
   PROFILE FORM
   ========================================= */

function tlmProfileForm() {

    const form =
        document.querySelector(
            "#profileForm, .profile-form"
        );

    if (!form) {
        return;
    }

    const nameInput =
        form.querySelector(
            "[name='name'], #profileName"
        );

    const roleInput =
        form.querySelector(
            "[name='role'], #profileRole"
        );

    const profile =
        tlmGetUserProfile();

    if (nameInput) {
        nameInput.value =
            profile.name || "";
    }

    if (roleInput) {
        roleInput.value =
            profile.role || "Student";
    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            const name =
                nameInput
                    ? nameInput.value.trim()
                    : "";

            const role =
                roleInput
                    ? roleInput.value
                    : "Student";

            if (!name) {

                tlmToast(
                    "Please enter your name"
                );

                return;

            }

            tlmSaveUserProfile({
                name: name,
                role: role
            });

            tlmUpdateProfileUI();

            tlmToast(
                "Profile saved ✓"
            );

        }
    );

}


/* =========================================
   PROFILE UI
   ========================================= */

function tlmUpdateProfileUI() {

    const profile =
        tlmGetUserProfile();

    document.querySelectorAll(
        "[data-user-name]"
    ).forEach(
        function (element) {

            element.textContent =
                profile.name ||
                "Learner";

        }
    );


    document.querySelectorAll(
        "[data-user-role]"
    ).forEach(
        function (element) {

            element.textContent =
                profile.role ||
                "Student";

        }
    );


    document.querySelectorAll(
        "[data-user-initial]"
    ).forEach(
        function (element) {

            const name =
                profile.name ||
                "T";

            element.textContent =
                name
                    .charAt(0)
                    .toUpperCase();

        }
    );


    document.querySelectorAll(
        "[data-personal-greeting]"
    ).forEach(
        function (element) {

            const name =
                profile.name;

            if (name) {

                element.textContent =
                    "Welcome, " +
                    name +
                    " 👋";

            } else {

                element.textContent =
                    "Welcome to TLM FOR ALL 👋";

            }

        }
    );

}


/* =========================================
   PROFILE MODAL
   ========================================= */

function tlmProfileModal() {

    document.querySelectorAll(
        "[data-profile-open]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const modal =
                        document.querySelector(
                            "[data-profile-modal]"
                        );

                    if (!modal) {
                        return;
                    }

                    modal.classList.add(
                        "active"
                    );

                    document.body.classList.add(
                        "modal-open"
                    );

                }
            );

        }
    );


    document.querySelectorAll(
        "[data-profile-close]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const modal =
                        button.closest(
                            "[data-profile-modal]"
                        );

                    if (modal) {

                        modal.classList.remove(
                            "active"
                        );

                    }

                    document.body.classList.remove(
                        "modal-open"
                    );

                }
            );

        }
    );

}


/* =========================================
   ROLE SWITCHER
   ========================================= */

function tlmRoleSwitcher() {

    document.querySelectorAll(
        "[data-role]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const role =
                        button.dataset.role;

                    if (!role) {
                        return;
                    }

                    const profile =
                        tlmGetUserProfile();

                    profile.role =
                        role;

                    tlmSaveUserProfile(
                        profile
                    );

                    document.querySelectorAll(
                        "[data-role]"
                    ).forEach(
                        function (item) {

                            item.classList.toggle(
                                "active",
                                item.dataset.role ===
                                role
                            );

                        }
                    );

                    tlmUpdateProfileUI();

                    tlmToast(
                        role +
                        " mode selected ✓"
                    );

                }
            );

        }
    );

}


/* =========================================
   LOGOUT / RESET PROFILE
   ========================================= */

function tlmProfileReset() {

    document.querySelectorAll(
        "[data-profile-reset]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    localStorage.removeItem(
                        "tlm-user-profile"
                    );

                    tlmUpdateProfileUI();

                    tlmToast(
                        "Profile reset"
                    );

                }
            );

        }
    );

}


/* =========================================
   DASHBOARD STATISTICS
   ========================================= */

function tlmDashboardStats() {

    const progress =
        tlmGetProgress();

    const values =
        Object.values(progress);

    const completed =
        values.filter(
            function (value) {
                return Number(value) >= 100;
            }
        ).length;

    const total =
        values.length;

    const average =
        total
            ? Math.round(
                values.reduce(
                    function (sum, value) {
                        return (
                            sum +
                            Number(value)
                        );
                    },
                    0
                ) / total
            )
            : 0;


    document.querySelectorAll(
        "[data-stat-completed]"
    ).forEach(
        function (element) {

            element.textContent =
                completed;

        }
    );


    document.querySelectorAll(
        "[data-stat-total]"
    ).forEach(
        function (element) {

            element.textContent =
                total;

        }
    );


    document.querySelectorAll(
        "[data-stat-average]"
    ).forEach(
        function (element) {

            element.textContent =
                average + "%";

        }
    );

}


/* =========================================
   INITIALIZE PART 11
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmProfileForm();

        tlmUpdateProfileUI();

        tlmProfileModal();

        tlmRoleSwitcher();

        tlmProfileReset();

        tlmDashboardStats();

    }
);


/* =========================================
   END — PART 11
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 12
   MOBILE MENU + NAVIGATION
   ========================================= */

"use strict";


/* =========================================
   MOBILE MENU
   ========================================= */

function tlmMobileMenu() {

    const menu =
        document.querySelector(
            "#mobileMenu, .mobile-menu, [data-mobile-menu]"
        );

    const toggle =
        document.querySelector(
            "#menuToggle, .menu-toggle, [data-menu-toggle]"
        );

    const overlay =
        document.querySelector(
            ".menu-overlay, [data-menu-overlay]"
        );

    if (!menu || !toggle) {
        return;
    }


    function openMenu() {

        menu.classList.add("active");

        toggle.classList.add("active");

        document.body.classList.add(
            "menu-open"
        );

        if (overlay) {
            overlay.classList.add("active");
        }

        toggle.setAttribute(
            "aria-expanded",
            "true"
        );

    }


    function closeMenu() {

        menu.classList.remove("active");

        toggle.classList.remove("active");

        document.body.classList.remove(
            "menu-open"
        );

        if (overlay) {
            overlay.classList.remove("active");
        }

        toggle.setAttribute(
            "aria-expanded",
            "false"
        );

    }


    toggle.addEventListener(
        "click",
        function () {

            if (
                menu.classList.contains("active")
            ) {
                closeMenu();
            } else {
                openMenu();
            }

        }
    );


    if (overlay) {

        overlay.addEventListener(
            "click",
            closeMenu
        );

    }


    menu.querySelectorAll("a").forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    closeMenu();

                }
            );

        }
    );


    document.addEventListener(
        "keydown",
        function (event) {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );

}


/* =========================================
   DROPDOWN NAVIGATION
   ========================================= */

function tlmNavDropdowns() {

    document.querySelectorAll(
        "[data-nav-dropdown]"
    ).forEach(
        function (dropdown) {

            const button =
                dropdown.querySelector(
                    "[data-nav-dropdown-button]"
                );

            if (!button) {
                return;
            }

            button.addEventListener(
                "click",
                function (event) {

                    event.preventDefault();

                    const isOpen =
                        dropdown.classList.contains(
                            "open"
                        );

                    document
                        .querySelectorAll(
                            "[data-nav-dropdown].open"
                        )
                        .forEach(
                            function (item) {

                                if (
                                    item !== dropdown
                                ) {

                                    item.classList.remove(
                                        "open"
                                    );

                                }

                            }
                        );

                    dropdown.classList.toggle(
                        "open",
                        !isOpen
                    );

                    button.setAttribute(
                        "aria-expanded",
                        !isOpen
                    );

                }
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.closest(
                    "[data-nav-dropdown]"
                )
            ) {

                document
                    .querySelectorAll(
                        "[data-nav-dropdown].open"
                    )
                    .forEach(
                        function (dropdown) {

                            dropdown.classList.remove(
                                "open"
                            );

                        }
                    );

            }

        }
    );

}


/* =========================================
   ACTIVE NAVIGATION
   ========================================= */

function tlmActiveNavigation() {

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() ||
        "index.html";

    document.querySelectorAll(
        "nav a, .main-nav a, .mobile-nav a"
    ).forEach(
        function (link) {

            const href =
                link.getAttribute("href");

            if (!href) {
                return;
            }

            const linkPage =
                href.split("/")
                    .pop()
                    .split("#")[0];

            const active =
                linkPage === currentPage;

            link.classList.toggle(
                "active",
                active
            );

        }
    );

}


/* =========================================
   SMOOTH ANCHOR SCROLL
   ========================================= */

function tlmSmoothAnchors() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const id =
                        link.getAttribute("href");

                    if (
                        !id ||
                        id === "#"
                    ) {
                        return;
                    }

                    const target =
                        document.querySelector(id);

                    if (!target) {
                        return;
                    }

                    event.preventDefault();

                    target.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });

                    history.replaceState(
                        null,
                        "",
                        id
                    );

                }
            );

        }
    );

}


/* =========================================
   SCROLL TO TOP
   ========================================= */

function tlmScrollTop() {

    const button =
        document.querySelector(
            "#scrollTop, .scroll-top, [data-scroll-top]"
        );

    if (!button) {
        return;
    }


    function updateButton() {

        button.classList.toggle(
            "visible",
            window.scrollY > 400
        );

    }


    window.addEventListener(
        "scroll",
        updateButton,
        {
            passive: true
        }
    );


    button.addEventListener(
        "click",
        function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        }
    );


    updateButton();

}


/* =========================================
   STICKY HEADER
   ========================================= */

function tlmStickyHeader() {

    const header =
        document.querySelector(
            "header, .site-header, [data-header]"
        );

    if (!header) {
        return;
    }


    function updateHeader() {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    }


    window.addEventListener(
        "scroll",
        updateHeader,
        {
            passive: true
        }
    );


    updateHeader();

}


/* =========================================
   NETWORK MESSAGE
   ========================================= */

function tlmNetworkMessage() {

    window.addEventListener(
        "offline",
        function () {

            tlmToast(
                "You are offline. Some online features may not work."
            );

        }
    );


    window.addEventListener(
        "online",
        function () {

            tlmToast(
                "Internet connection restored ✓"
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 12
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmMobileMenu();

        tlmNavDropdowns();

        tlmActiveNavigation();

        tlmSmoothAnchors();

        tlmScrollTop();

        tlmStickyHeader();

        tlmNetworkMessage();

    }
);


/* =========================================
   END — PART 12
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 13
   DARK / LIGHT MODE + THEME SYSTEM
   ========================================= */

"use strict";


/* =========================================
   GET SAVED THEME
   ========================================= */

function tlmGetTheme() {

    try {

        return (
            localStorage.getItem(
                "tlm-theme"
            ) || "light"
        );

    } catch (error) {

        return "light";

    }

}


/* =========================================
   APPLY THEME
   ========================================= */

function tlmApplyTheme(theme) {

    if (
        theme !== "dark" &&
        theme !== "light"
    ) {
        theme = "light";
    }

    document.documentElement.dataset.theme =
        theme;

    document.body.dataset.theme =
        theme;

    try {

        localStorage.setItem(
            "tlm-theme",
            theme
        );

    } catch (error) {}

    tlmUpdateThemeButtons();

}


/* =========================================
   THEME TOGGLE
   ========================================= */

function tlmThemeToggle() {

    document.querySelectorAll(
        "[data-theme-toggle], #themeToggle, .theme-toggle"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const current =
                        tlmGetTheme();

                    const next =
                        current === "dark"
                            ? "light"
                            : "dark";

                    tlmApplyTheme(
                        next
                    );

                    tlmToast(
                        next === "dark"
                            ? "Dark mode enabled 🌙"
                            : "Light mode enabled ☀️"
                    );

                }
            );

        }
    );

}


/* =========================================
   THEME BUTTON STATUS
   ========================================= */

function tlmUpdateThemeButtons() {

    const theme =
        tlmGetTheme();

    document.querySelectorAll(
        "[data-theme-toggle], #themeToggle, .theme-toggle"
    ).forEach(
        function (button) {

            button.classList.toggle(
                "active",
                theme === "dark"
            );

            button.setAttribute(
                "aria-pressed",
                theme === "dark"
                    ? "true"
                    : "false"
            );

            const icon =
                button.querySelector(
                    "[data-theme-icon]"
                );

            if (icon) {

                icon.textContent =
                    theme === "dark"
                        ? "☀️"
                        : "🌙";

            }

        }
    );

}


/* =========================================
   LIGHT / DARK TEXT
   ========================================= */

function tlmThemeLabels() {

    document.querySelectorAll(
        "[data-theme-label]"
    ).forEach(
        function (element) {

            const theme =
                tlmGetTheme();

            element.textContent =
                theme === "dark"
                    ? "Light Mode"
                    : "Dark Mode";

        }
    );

}


/* =========================================
   SYSTEM THEME DETECTION
   ========================================= */

function tlmSystemTheme() {

    const saved =
        localStorage.getItem(
            "tlm-theme"
        );

    if (saved) {
        return;
    }

    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    ) {

        document.documentElement.dataset.theme =
            "dark";

        document.body.dataset.theme =
            "dark";

    } else {

        document.documentElement.dataset.theme =
            "light";

        document.body.dataset.theme =
            "light";

    }

}


/* =========================================
   SYSTEM THEME CHANGE
   ========================================= */

function tlmSystemThemeListener() {

    if (!window.matchMedia) {
        return;
    }

    const media =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );

    media.addEventListener(
        "change",
        function (event) {

            if (
                localStorage.getItem(
                    "tlm-theme"
                )
            ) {
                return;
            }

            const theme =
                event.matches
                    ? "dark"
                    : "light";

            document.documentElement.dataset.theme =
                theme;

            document.body.dataset.theme =
                theme;

        }
    );

}


/* =========================================
   THEME TRANSITION
   ========================================= */

function tlmThemeTransition() {

    document.documentElement.classList.add(
        "theme-transition"
    );

    setTimeout(
        function () {

            document.documentElement.classList.remove(
                "theme-transition"
            );

        },
        400
    );

}


/* =========================================
   THEME KEYBOARD SHORTCUT
   ========================================= */

function tlmThemeKeyboard() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key.toLowerCase() === "d" &&
                event.ctrlKey
            ) {

                event.preventDefault();

                const current =
                    tlmGetTheme();

                tlmApplyTheme(
                    current === "dark"
                        ? "light"
                        : "dark"
                );

            }

        }
    );

}


/* =========================================
   INITIALIZE PART 13
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmSystemTheme();

        tlmApplyTheme(
            tlmGetTheme()
        );

        tlmThemeToggle();

        tlmThemeLabels();

        tlmSystemThemeListener();

        tlmThemeKeyboard();

        tlmThemeTransition();

    }
);


/* =========================================
   END — PART 13
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 14
   DYNAMIC CONTENT + JSON RESOURCE LOADER
   ========================================= */

"use strict";


/* =========================================
   JSON RESOURCE LOADER
   ========================================= */

async function tlmLoadJSON(url) {

    try {

        const response =
            await fetch(url);

        if (!response.ok) {
            throw new Error(
                "HTTP " + response.status
            );
        }

        return await response.json();

    } catch (error) {

        console.error(
            "TLM JSON loading error:",
            error
        );

        return null;

    }

}


/* =========================================
   DYNAMIC RESOURCE CARDS
   ========================================= */

function tlmRenderResources(
    resources,
    container
) {

    if (
        !Array.isArray(resources) ||
        !container
    ) {
        return;
    }

    container.innerHTML = "";

    resources.forEach(
        function (resource) {

            const card =
                document.createElement("article");

            card.className =
                "resource-card";

            card.dataset.resourceCard =
                "";

            card.dataset.category =
                resource.category || "lesson";

            card.dataset.class =
                resource.class || "";

            card.dataset.title =
                resource.title || "";

            card.dataset.search =
                [
                    resource.title,
                    resource.subject,
                    resource.chapter,
                    resource.category
                ]
                    .filter(Boolean)
                    .join(" ");


            card.innerHTML = `
                <div class="resource-icon">
                    ${resource.icon || "📚"}
                </div>

                <div class="resource-content">

                    <span class="resource-category">
                        ${tlmEscape(
                            resource.category ||
                            "Learning"
                        )}
                    </span>

                    <h3>
                        ${tlmEscape(
                            resource.title ||
                            "Learning Resource"
                        )}
                    </h3>

                    <p>
                        ${tlmEscape(
                            resource.description ||
                            ""
                        )}
                    </p>

                    <div class="resource-meta">

                        <span>
                            ${tlmEscape(
                                resource.class ||
                                ""
                            )}
                        </span>

                        <span>
                            ${tlmEscape(
                                resource.subject ||
                                ""
                            )}
                        </span>

                    </div>

                </div>
            `;


            if (resource.url) {

                card.style.cursor =
                    "pointer";

                card.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            resource.url;

                    }
                );

            }


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================
   LOAD RESOURCE LIBRARY
   ========================================= */

async function tlmLoadResourceLibrary() {

    const containers =
        document.querySelectorAll(
            "[data-json-resources]"
        );

    if (!containers.length) {
        return;
    }

    for (
        const container of containers
    ) {

        const url =
            container.dataset.jsonResources;

        if (!url) {
            continue;
        }

        const data =
            await tlmLoadJSON(url);

        if (!data) {
            continue;
        }

        const resources =
            Array.isArray(data)
                ? data
                : data.resources;

        tlmRenderResources(
            resources || [],
            container
        );

    }

}


/* =========================================
   DYNAMIC CLASS CARDS
   ========================================= */

function tlmRenderClasses(
    classes,
    container
) {

    if (
        !Array.isArray(classes) ||
        !container
    ) {
        return;
    }

    container.innerHTML = "";

    classes.forEach(
        function (item) {

            const card =
                document.createElement("div");

            card.className =
                "class-card";

            card.dataset.class =
                item.id || item.name || "";


            card.innerHTML = `
                <div class="class-icon">
                    ${item.icon || "🎓"}
                </div>

                <h3>
                    ${tlmEscape(
                        item.name || ""
                    )}
                </h3>

                <p>
                    ${tlmEscape(
                        item.description || ""
                    )}
                </p>
            `;


            if (item.url) {

                card.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            item.url;

                    }
                );

            }


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================
   LOAD CLASSES
   ========================================= */

async function tlmLoadClasses() {

    const container =
        document.querySelector(
            "[data-json-classes]"
        );

    if (!container) {
        return;
    }

    const url =
        container.dataset.jsonClasses;

    if (!url) {
        return;
    }

    const data =
        await tlmLoadJSON(url);

    if (!data) {
        return;
    }

    const classes =
        Array.isArray(data)
            ? data
            : data.classes;

    tlmRenderClasses(
        classes || [],
        container
    );

}


/* =========================================
   DYNAMIC SUBJECT CARDS
   ========================================= */

function tlmRenderSubjects(
    subjects,
    container
) {

    if (
        !Array.isArray(subjects) ||
        !container
    ) {
        return;
    }

    container.innerHTML = "";

    subjects.forEach(
        function (item) {

            const card =
                document.createElement("div");

            card.className =
                "subject-card";

            card.dataset.subject =
                item.id || item.name || "";


            card.innerHTML = `
                <div class="subject-icon">
                    ${item.icon || "📘"}
                </div>

                <h3>
                    ${tlmEscape(
                        item.name || ""
                    )}
                </h3>

                <p>
                    ${tlmEscape(
                        item.description || ""
                    )}
                </p>
            `;


            if (item.url) {

                card.addEventListener(
                    "click",
                    function () {

                        window.location.href =
                            item.url;

                    }
                );

            }


            container.appendChild(
                card
            );

        }
    );

}


/* =========================================
   LOAD SUBJECTS
   ========================================= */

async function tlmLoadSubjects() {

    const container =
        document.querySelector(
            "[data-json-subjects]"
        );

    if (!container) {
        return;
    }

    const url =
        container.dataset.jsonSubjects;

    if (!url) {
        return;
    }

    const data =
        await tlmLoadJSON(url);

    if (!data) {
        return;
    }

    const subjects =
        Array.isArray(data)
            ? data
            : data.subjects;

    tlmRenderSubjects(
        subjects || [],
        container
    );

}


/* =========================================
   DYNAMIC LATEST UPDATES
   ========================================= */

function tlmRenderUpdates(
    updates,
    container
) {

    if (
        !Array.isArray(updates) ||
        !container
    ) {
        return;
    }

    container.innerHTML = "";

    updates.forEach(
        function (item) {

            const article =
                document.createElement("article");

            article.className =
                "update-card";


            article.innerHTML = `
                <span class="update-icon">
                    ${item.icon || "📢"}
                </span>

                <div>

                    <h3>
                        ${tlmEscape(
                            item.title || ""
                        )}
                    </h3>

                    <p>
                        ${tlmEscape(
                            item.description || ""
                        )}
                    </p>

                    ${
                        item.date
                            ? `
                            <small>
                                ${tlmEscape(
                                    item.date
                                )}
                            </small>
                            `
                            : ""
                    }

                </div>
            `;


            container.appendChild(
                article
            );

        }
    );

}


/* =========================================
   LOAD UPDATES
   ========================================= */

async function tlmLoadUpdates() {

    const container =
        document.querySelector(
            "[data-json-updates]"
        );

    if (!container) {
        return;
    }

    const url =
        container.dataset.jsonUpdates;

    if (!url) {
        return;
    }

    const data =
        await tlmLoadJSON(url);

    if (!data) {
        return;
    }

    const updates =
        Array.isArray(data)
            ? data
            : data.updates;

    tlmRenderUpdates(
        updates || [],
        container
    );

}


/* =========================================
   INITIALIZE PART 14
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmLoadResourceLibrary();

        tlmLoadClasses();

        tlmLoadSubjects();

        tlmLoadUpdates();

    }
);


/* =========================================
   END — PART 14
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 15
   PERFORMANCE + PAGE VISIBILITY + AUTO SAVE
   ========================================= */

"use strict";


/* =========================================
   PAGE VISIBILITY
   ========================================= */

function tlmPageVisibility() {

    document.addEventListener(
        "visibilitychange",
        function () {

            if (document.hidden) {

                document.body.classList.add(
                    "page-hidden"
                );

                tlmSaveSessionState();

            } else {

                document.body.classList.remove(
                    "page-hidden"
                );

            }

        }
    );

}


/* =========================================
   SESSION STATE
   ========================================= */

function tlmSaveSessionState() {

    const state = {

        page:
            window.location.pathname,

        scroll:
            window.scrollY,

        language:
            typeof tlmGetLanguage === "function"
                ? tlmGetLanguage()
                : "en",

        theme:
            typeof tlmGetTheme === "function"
                ? tlmGetTheme()
                : "light",

        savedAt:
            Date.now()

    };

    try {

        sessionStorage.setItem(
            "tlm-session-state",
            JSON.stringify(state)
        );

    } catch (error) {}

}


/* =========================================
   RESTORE SCROLL POSITION
   ========================================= */

function tlmRestoreScroll() {

    let saved;

    try {

        saved =
            JSON.parse(
                sessionStorage.getItem(
                    "tlm-session-state"
                )
            );

    } catch (error) {

        saved = null;

    }

    if (
        !saved ||
        saved.page !==
        window.location.pathname
    ) {
        return;
    }

    if (
        typeof saved.scroll !==
        "number"
    ) {
        return;
    }

    setTimeout(
        function () {

            window.scrollTo({
                top: saved.scroll,
                behavior: "instant"
            });

        },
        150
    );

}


/* =========================================
   AUTO SAVE
   ========================================= */

function tlmAutoSave() {

    let timer = null;

    function save() {

        tlmSaveSessionState();

    }

    window.addEventListener(
        "scroll",
        function () {

            clearTimeout(timer);

            timer =
                setTimeout(
                    save,
                    500
                );

        },
        {
            passive: true
        }
    );


    window.addEventListener(
        "pagehide",
        save
    );

}


/* =========================================
   IMAGE ERROR HANDLER
   ========================================= */

function tlmImageFallback() {

    document.querySelectorAll(
        "img"
    ).forEach(
        function (image) {

            image.addEventListener(
                "error",
                function () {

                    image.classList.add(
                        "image-error"
                    );

                    image.alt =
                        image.alt ||
                        "TLM FOR ALL resource";

                }
            );

        }
    );

}


/* =========================================
   PREVENT EMPTY LINKS
   ========================================= */

function tlmSafeLinks() {

    document.querySelectorAll(
        'a[href=""], a[href="#"]'
    ).forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        href === "" ||
                        href === "#"
                    ) {

                        event.preventDefault();

                    }

                }
            );

        }
    );

}


/* =========================================
   PAGE LOADING INDICATOR
   ========================================= */

function tlmPageLoader() {

    const loader =
        document.querySelector(
            "#pageLoader, .page-loader, [data-page-loader]"
        );

    if (!loader) {
        return;
    }

    window.addEventListener(
        "load",
        function () {

            loader.classList.add(
                "loaded"
            );

            setTimeout(
                function () {

                    loader.style.display =
                        "none";

                },
                450
            );

        }
    );

}


/* =========================================
   CONNECTION-AWARE MESSAGE
   ========================================= */

function tlmConnectionAware() {

    const elements =
        document.querySelectorAll(
            "[data-connection-message]"
        );

    if (!elements.length) {
        return;
    }


    function update() {

        const online =
            navigator.onLine;

        elements.forEach(
            function (element) {

                element.textContent =
                    online
                        ? "Connected"
                        : "Offline";

                element.classList.toggle(
                    "online",
                    online
                );

                element.classList.toggle(
                    "offline",
                    !online
                );

            }
        );

    }


    window.addEventListener(
        "online",
        update
    );

    window.addEventListener(
        "offline",
        update
    );

    update();

}


/* =========================================
   REDUCE MOTION SUPPORT
   ========================================= */

function tlmReducedMotion() {

    if (!window.matchMedia) {
        return;
    }

    const media =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        );


    function update() {

        document.documentElement.classList.toggle(
            "reduced-motion",
            media.matches
        );

    }


    update();

    if (
        media.addEventListener
    ) {

        media.addEventListener(
            "change",
            update
        );

    }

}


/* =========================================
   DOCUMENT READY PERFORMANCE
   ========================================= */

function tlmPerformanceReady() {

    document.documentElement.classList.add(
        "js-ready"
    );

    document.body.classList.add(
        "tlm-ready"
    );

}


/* =========================================
   INITIALIZE PART 15
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmPageVisibility();

        tlmRestoreScroll();

        tlmAutoSave();

        tlmImageFallback();

        tlmSafeLinks();

        tlmPageLoader();

        tlmConnectionAware();

        tlmReducedMotion();

        tlmPerformanceReady();

    }
);


/* =========================================
   END — PART 15
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 16
   NOTIFICATIONS + TOASTS + UI HELPERS
   ========================================= */

"use strict";


/* =========================================
   TOAST SYSTEM
   ========================================= */

function tlmToast(message, duration = 3000) {

    if (!message) {
        return;
    }

    let container =
        document.querySelector(
            "#tlmToastContainer"
        );

    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "tlmToastContainer";

        container.className =
            "tlm-toast-container";

        document.body.appendChild(
            container
        );

    }

    const toast =
        document.createElement("div");

    toast.className =
        "tlm-toast";

    toast.textContent =
        message;

    container.appendChild(
        toast
    );

    requestAnimationFrame(
        function () {

            toast.classList.add(
                "show"
            );

        }
    );

    setTimeout(
        function () {

            toast.classList.remove(
                "show"
            );

            setTimeout(
                function () {

                    toast.remove();

                },
                300
            );

        },
        duration
    );

}


/* =========================================
   NOTIFICATION PANEL
   ========================================= */

function tlmNotificationPanel() {

    const toggle =
        document.querySelector(
            "[data-notification-toggle]"
        );

    const panel =
        document.querySelector(
            "[data-notification-panel]"
        );

    if (!toggle || !panel) {
        return;
    }

    toggle.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            const open =
                panel.classList.contains(
                    "active"
                );

            panel.classList.toggle(
                "active",
                !open
            );

            toggle.setAttribute(
                "aria-expanded",
                !open
            );

        }
    );


    document.addEventListener(
        "click",
        function (event) {

            if (
                !event.target.closest(
                    "[data-notification-panel]"
                ) &&
                !event.target.closest(
                    "[data-notification-toggle]"
                )
            ) {

                panel.classList.remove(
                    "active"
                );

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }

        }
    );

}


/* =========================================
   NOTIFICATION ITEMS
   ========================================= */

function tlmNotificationItems() {

    document.querySelectorAll(
        "[data-notification-item]"
    ).forEach(
        function (item) {

            item.addEventListener(
                "click",
                function () {

                    item.classList.remove(
                        "unread"
                    );

                    const unread =
                        document.querySelectorAll(
                            "[data-notification-item].unread"
                        ).length;

                    document.querySelectorAll(
                        "[data-notification-count]"
                    ).forEach(
                        function (badge) {

                            badge.textContent =
                                unread > 99
                                    ? "99+"
                                    : String(unread);

                            badge.style.display =
                                unread
                                    ? "inline-flex"
                                    : "none";

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   CONFIRM ACTION
   ========================================= */

function tlmConfirmActions() {

    document.querySelectorAll(
        "[data-confirm]"
    ).forEach(
        function (element) {

            element.addEventListener(
                "click",
                function (event) {

                    const message =
                        element.dataset.confirm ||
                        "Are you sure?";

                    if (
                        !window.confirm(
                            message
                        )
                    ) {

                        event.preventDefault();

                    }

                }
            );

        }
    );

}


/* =========================================
   COPY TO CLIPBOARD
   ========================================= */

async function tlmCopyText(text) {

    if (!text) {
        return false;
    }

    try {

        if (
            navigator.clipboard &&
            window.isSecureContext
        ) {

            await navigator.clipboard.writeText(
                text
            );

        } else {

            const textarea =
                document.createElement(
                    "textarea"
                );

            textarea.value =
                text;

            textarea.style.position =
                "fixed";

            textarea.style.opacity =
                "0";

            document.body.appendChild(
                textarea
            );

            textarea.focus();

            textarea.select();

            document.execCommand(
                "copy"
            );

            textarea.remove();

        }

        return true;

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );

        return false;

    }

}


/* =========================================
   COPY BUTTONS
   ========================================= */

function tlmCopyButtons() {

    document.querySelectorAll(
        "[data-copy]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                async function () {

                    const selector =
                        button.dataset.copy;

                    let text = "";

                    const target =
                        document.querySelector(
                            selector
                        );

                    if (target) {

                        text =
                            target.value ||
                            target.textContent ||
                            "";

                    } else {

                        text =
                            button.dataset.copyText ||
                            "";

                    }

                    const copied =
                        await tlmCopyText(
                            text
                        );

                    if (copied) {

                        const original =
                            button.textContent;

                        button.textContent =
                            "✓ Copied";

                        tlmToast(
                            "Copied to clipboard ✓"
                        );

                        setTimeout(
                            function () {

                                button.textContent =
                                    original;

                            },
                            1500
                        );

                    } else {

                        tlmToast(
                            "Unable to copy"
                        );

                    }

                }
            );

        }
    );

}


/* =========================================
   TOOLTIP SYSTEM
   ========================================= */

function tlmTooltips() {

    document.querySelectorAll(
        "[data-tooltip]"
    ).forEach(
        function (element) {

            element.addEventListener(
                "mouseenter",
                function () {

                    const text =
                        element.dataset.tooltip;

                    if (!text) {
                        return;
                    }

                    element.setAttribute(
                        "aria-label",
                        text
                    );

                }
            );

        }
    );

}


/* =========================================
   LOADING BUTTON
   ========================================= */

function tlmLoadingButtons() {

    document.querySelectorAll(
        "[data-loading-button]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    if (
                        button.disabled
                    ) {
                        return;
                    }

                    button.disabled =
                        true;

                    button.classList.add(
                        "loading"
                    );

                    button.dataset.originalText =
                        button.textContent;

                    button.textContent =
                        "Please wait...";

                    setTimeout(
                        function () {

                            button.disabled =
                                false;

                            button.classList.remove(
                                "loading"
                            );

                            button.textContent =
                                button.dataset.originalText ||
                                "Continue";

                        },
                        Number(
                            button.dataset.loadingTime
                        ) || 1200
                    );

                }
            );

        }
    );

}


/* =========================================
   EMPTY SEARCH MESSAGE
   ========================================= */

function tlmEmptySearchMessage() {

    const searchInputs =
        document.querySelectorAll(
            "[data-empty-search]"
        );

    searchInputs.forEach(
        function (input) {

            input.addEventListener(
                "input",
                function () {

                    const query =
                        input.value
                            .trim()
                            .toLowerCase();

                    const target =
                        document.querySelector(
                            input.dataset.emptySearch
                        );

                    if (!target) {
                        return;
                    }

                    const items =
                        target.querySelectorAll(
                            "[data-resource-card], " +
                            ".search-item"
                        );

                    let visible = 0;

                    items.forEach(
                        function (item) {

                            const text =
                                item.textContent
                                    .toLowerCase();

                            const match =
                                !query ||
                                text.includes(query);

                            item.style.display =
                                match
                                    ? ""
                                    : "none";

                            if (match) {
                                visible++;
                            }

                        }
                    );


                    let empty =
                        target.querySelector(
                            ".tlm-empty-search"
                        );

                    if (!visible) {

                        if (!empty) {

                            empty =
                                document.createElement(
                                    "div"
                                );

                            empty.className =
                                "tlm-empty-search";

                            empty.textContent =
                                "No resources found.";

                            target.appendChild(
                                empty
                            );

                        }

                        empty.style.display =
                            "block";

                    } else if (empty) {

                        empty.style.display =
                            "none";

                    }

                }
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 16
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmNotificationPanel();

        tlmNotificationItems();

        tlmConfirmActions();

        tlmCopyButtons();

        tlmTooltips();

        tlmLoadingButtons();

        tlmEmptySearchMessage();

    }
);


/* =========================================
   END — PART 16
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 17
   SCROLL REVEAL + COUNTERS + ANIMATIONS
   ========================================= */

"use strict";


/* =========================================
   SCROLL REVEAL
   ========================================= */

function tlmScrollReveal() {

    const elements =
        document.querySelectorAll(
            "[data-reveal], .reveal-on-scroll"
        );

    if (!elements.length) {
        return;
    }


    /* Fallback for older browsers */

    if (
        !("IntersectionObserver" in window)
    ) {

        elements.forEach(
            function (element) {

                element.classList.add(
                    "revealed"
                );

            }
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            entry.target.classList.add(
                                "revealed"
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.12,
                rootMargin:
                    "0px 0px -40px 0px"
            }
        );


    elements.forEach(
        function (element) {

            observer.observe(
                element
            );

        }
    );

}


/* =========================================
   STAGGER CARD ANIMATION
   ========================================= */

function tlmStaggerCards() {

    document.querySelectorAll(
        "[data-stagger]"
    ).forEach(
        function (container) {

            const cards =
                container.querySelectorAll(
                    ".card, " +
                    ".resource-card, " +
                    ".class-card, " +
                    ".subject-card, " +
                    ".feature-card"
                );

            cards.forEach(
                function (card, index) {

                    card.style.setProperty(
                        "--reveal-delay",
                        (index * 70) + "ms"
                    );

                    card.classList.add(
                        "stagger-item"
                    );

                }
            );

        }
    );

}


/* =========================================
   NUMBER COUNTER
   ========================================= */

function tlmNumberCounters() {

    const counters =
        document.querySelectorAll(
            "[data-counter]"
        );

    if (!counters.length) {
        return;
    }


    function animateCounter(
        element
    ) {

        const target =
            Number(
                element.dataset.counter
            );

        if (
            !Number.isFinite(target)
        ) {
            return;
        }

        const duration =
            Number(
                element.dataset.counterDuration
            ) || 1200;

        const start =
            performance.now();


        function update(
            currentTime
        ) {

            const elapsed =
                currentTime - start;

            const progress =
                Math.min(
                    elapsed / duration,
                    1
                );

            const eased =
                1 -
                Math.pow(
                    1 - progress,
                    3
                );

            const value =
                Math.round(
                    target * eased
                );

            element.textContent =
                value.toLocaleString();

            if (
                progress < 1
            ) {

                requestAnimationFrame(
                    update
                );

            }

        }


        requestAnimationFrame(
            update
        );

    }


    if (
        !("IntersectionObserver" in window)
    ) {

        counters.forEach(
            animateCounter
        );

        return;

    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            entry.isIntersecting
                        ) {

                            animateCounter(
                                entry.target
                            );

                            observer.unobserve(
                                entry.target
                            );

                        }

                    }
                );

            },
            {
                threshold: 0.5
            }
        );


    counters.forEach(
        function (counter) {

            observer.observe(
                counter
            );

        }
    );

}


/* =========================================
   HERO ENTRANCE
   ========================================= */

function tlmHeroEntrance() {

    const hero =
        document.querySelector(
            ".hero, [data-hero]"
        );

    if (!hero) {
        return;
    }

    setTimeout(
        function () {

            hero.classList.add(
                "hero-visible"
            );

        },
        100
    );

}


/* =========================================
   ACTIVE SECTION
   ========================================= */

function tlmActiveSection() {

    const sections =
        document.querySelectorAll(
            "section[id]"
        );

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    if (
        !sections.length ||
        !links.length
    ) {
        return;
    }


    if (
        !("IntersectionObserver" in window)
    ) {
        return;
    }


    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(
                    function (entry) {

                        if (
                            !entry.isIntersecting
                        ) {
                            return;
                        }

                        const id =
                            entry.target.id;

                        links.forEach(
                            function (link) {

                                const active =
                                    link.getAttribute(
                                        "href"
                                    ) ===
                                    "#" + id;

                                link.classList.toggle(
                                    "section-active",
                                    active
                                );

                            }
                        );

                    }
                );

            },
            {
                rootMargin:
                    "-25% 0px -65% 0px"
            }
        );


    sections.forEach(
        function (section) {

            observer.observe(
                section
            );

        }
    );

}


/* =========================================
   PARALLAX-LIKE HERO EFFECT
   ========================================= */

function tlmHeroMotion() {

    const hero =
        document.querySelector(
            ".hero, [data-hero]"
        );

    if (!hero) {
        return;
    }

    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {
        return;
    }


    let ticking = false;


    function update() {

        const scroll =
            window.scrollY;

        if (
            scroll > window.innerHeight
        ) {
            ticking = false;
            return;
        }

        const content =
            hero.querySelector(
                ".hero-content, [data-hero-content]"
            );

        if (content) {

            content.style.transform =
                "translateY(" +
                (scroll * 0.08) +
                "px)";

        }

        ticking = false;

    }


    window.addEventListener(
        "scroll",
        function () {

            if (!ticking) {

                window.requestAnimationFrame(
                    update
                );

                ticking = true;

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================
   INITIALIZE PART 17
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmScrollReveal();

        tlmStaggerCards();

        tlmNumberCounters();

        tlmHeroEntrance();

        tlmActiveSection();

        tlmHeroMotion();

    }
);


/* =========================================
   END — PART 17
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 18
   PAGE INITIALIZATION + ERROR PROTECTION
   ========================================= */

"use strict";


/* =========================================
   GLOBAL ERROR HANDLER
   ========================================= */

function tlmGlobalErrors() {

    window.addEventListener(
        "error",
        function (event) {

            console.error(
                "TLM FOR ALL Error:",
                event.error || event.message
            );

        }
    );


    window.addEventListener(
        "unhandledrejection",
        function (event) {

            console.error(
                "TLM FOR ALL Promise Error:",
                event.reason
            );

        }
    );

}


/* =========================================
   PAGE TYPE DETECTION
   ========================================= */

function tlmDetectPage() {

    const path =
        window.location.pathname
            .toLowerCase();

    let page =
        "home";

    if (
        path.includes("classes")
    ) {
        page = "classes";

    } else if (
        path.includes("teacher")
    ) {
        page = "teacher";

    } else if (
        path.includes("student")
    ) {
        page = "student";

    } else if (
        path.includes("ai")
    ) {
        page = "ai";

    } else if (
        path.includes("library")
    ) {
        page = "library";

    } else if (
        path.includes("about")
    ) {
        page = "about";
    }

    document.body.dataset.page =
        page;

}


/* =========================================
   PAGE TITLE
   ========================================= */

function tlmPageTitle() {

    const page =
        document.body.dataset.page;

    const titles = {

        home:
            "TLM FOR ALL — Learning for Everyone",

        classes:
            "Classes 1–10 — TLM FOR ALL",

        teacher:
            "Teacher Resources — TLM FOR ALL",

        student:
            "Student Practice — TLM FOR ALL",

        ai:
            "AI Center — TLM FOR ALL",

        library:
            "Resource Library — TLM FOR ALL",

        about:
            "About — TLM FOR ALL"

    };

    if (
        titles[page]
    ) {

        document.title =
            titles[page];

    }

}


/* =========================================
   PAGE READY STATE
   ========================================= */

function tlmPageReady() {

    document.body.classList.add(
        "page-ready"
    );

    document.documentElement.classList.add(
        "page-ready"
    );

}


/* =========================================
   EXTERNAL LINKS
   ========================================= */

function tlmExternalLinks() {

    document.querySelectorAll(
        "a[href]"
    ).forEach(
        function (link) {

            const href =
                link.getAttribute(
                    "href"
                );

            if (!href) {
                return;
            }

            const isExternal =
                /^https?:\/\//i.test(
                    href
                ) &&
                !href.includes(
                    window.location.hostname
                );

            if (isExternal) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );

            }

        }
    );

}


/* =========================================
   CURRENT YEAR
   ========================================= */

function tlmCurrentYear() {

    const year =
        new Date().getFullYear();

    document.querySelectorAll(
        "[data-current-year]"
    ).forEach(
        function (element) {

            element.textContent =
                year;

        }
    );

}


/* =========================================
   BACK TO TOP FALLBACK
   ========================================= */

function tlmBackToTopFallback() {

    document.querySelectorAll(
        "[data-back-top]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }
    );

}


/* =========================================
   FINAL PAGE STARTUP
   ========================================= */

function tlmFinalStartup() {

    tlmDetectPage();

    tlmPageTitle();

    tlmPageReady();

    tlmExternalLinks();

    tlmCurrentYear();

    tlmBackToTopFallback();

}


/* =========================================
   SAFE INITIALIZATION
   ========================================= */

function tlmInitializeApplication() {

    try {

        tlmFinalStartup();

        console.log(
            "TLM FOR ALL initialized successfully."
        );

    } catch (error) {

        console.error(
            "TLM FOR ALL initialization error:",
            error
        );

    }

}


/* =========================================
   START APPLICATION
   ========================================= */

if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        tlmInitializeApplication
    );

} else {

    tlmInitializeApplication();

}


/* =========================================
   GLOBAL ERROR PROTECTION
   ========================================= */

tlmGlobalErrors();


/* =========================================
   END — PART 18
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 19
   SMART SEARCH + FILTER SYSTEM
   ========================================= */

"use strict";


/* =========================================
   SEARCH ENGINE
   ========================================= */

function tlmSmartSearch() {

    const inputs =
        document.querySelectorAll(
            "[data-smart-search]"
        );

    if (!inputs.length) {
        return;
    }

    inputs.forEach(
        function (input) {

            const targetSelector =
                input.dataset.smartSearch;

            const target =
                document.querySelector(
                    targetSelector
                );

            if (!target) {
                return;
            }


            const items =
                target.querySelectorAll(
                    "[data-search-item], " +
                    ".resource-card, " +
                    ".class-card, " +
                    ".subject-card"
                );


            input.addEventListener(
                "input",
                function () {

                    const query =
                        input.value
                            .trim()
                            .toLowerCase();

                    let visibleCount = 0;


                    items.forEach(
                        function (item) {

                            const searchableText =
                                (
                                    item.dataset.search ||
                                    item.textContent ||
                                    ""
                                )
                                    .toLowerCase();

                            const matched =
                                !query ||
                                searchableText.includes(
                                    query
                                );

                            item.style.display =
                                matched
                                    ? ""
                                    : "none";

                            if (matched) {
                                visibleCount++;
                            }

                        }
                    );


                    tlmSearchResultCount(
                        target,
                        visibleCount
                    );

                    tlmSearchEmptyState(
                        target,
                        visibleCount,
                        query
                    );

                }
            );

        }
    );

}


/* =========================================
   RESULT COUNT
   ========================================= */

function tlmSearchResultCount(
    container,
    count
) {

    container
        .querySelectorAll(
            "[data-search-count]"
        )
        .forEach(
            function (element) {

                element.textContent =
                    count;

            }
        );

}


/* =========================================
   EMPTY SEARCH STATE
   ========================================= */

function tlmSearchEmptyState(
    container,
    count,
    query
) {

    let empty =
        container.querySelector(
            "[data-search-empty]"
        );

    if (count > 0 || !query) {

        if (empty) {
            empty.remove();
        }

        return;
    }


    if (!empty) {

        empty =
            document.createElement(
                "div"
            );

        empty.dataset.searchEmpty =
            "";

        empty.className =
            "search-empty-state";

        empty.innerHTML = `
            <div class="empty-icon">🔍</div>

            <h3>
                No results found
            </h3>

            <p>
                Try another keyword or search term.
            </p>
        `;

        container.appendChild(
            empty
        );

    }

}


/* =========================================
   CATEGORY FILTER
   ========================================= */

function tlmCategoryFilters() {

    document.querySelectorAll(
        "[data-filter-group]"
    ).forEach(
        function (group) {

            const buttons =
                group.querySelectorAll(
                    "[data-filter]"
                );

            const targetSelector =
                group.dataset.filterTarget;

            const target =
                document.querySelector(
                    targetSelector
                );

            if (!target) {
                return;
            }


            const items =
                target.querySelectorAll(
                    "[data-filter-item]"
                );


            buttons.forEach(
                function (button) {

                    button.addEventListener(
                        "click",
                        function () {

                            const filter =
                                button.dataset.filter;

                            buttons.forEach(
                                function (item) {

                                    item.classList.toggle(
                                        "active",
                                        item === button
                                    );

                                }
                            );


                            let count = 0;


                            items.forEach(
                                function (item) {

                                    const category =
                                        item.dataset.category ||
                                        item.dataset.subject ||
                                        item.dataset.class ||
                                        "";

                                    const matched =
                                        filter === "all" ||
                                        category
                                            .toLowerCase()
                                            .includes(
                                                filter.toLowerCase()
                                            );

                                    item.style.display =
                                        matched
                                            ? ""
                                            : "none";

                                    if (matched) {
                                        count++;
                                    }

                                }
                            );


                            tlmSearchResultCount(
                                target,
                                count
                            );

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   CLASS FILTER
   ========================================= */

function tlmClassFilter() {

    document.querySelectorAll(
        "[data-class-filter]"
    ).forEach(
        function (select) {

            const targetSelector =
                select.dataset.classFilter;

            const target =
                document.querySelector(
                    targetSelector
                );

            if (!target) {
                return;
            }


            const items =
                target.querySelectorAll(
                    "[data-filter-item], " +
                    ".resource-card"
                );


            select.addEventListener(
                "change",
                function () {

                    const selected =
                        select.value
                            .toLowerCase();


                    items.forEach(
                        function (item) {

                            const itemClass =
                                (
                                    item.dataset.class ||
                                    ""
                                )
                                    .toLowerCase();

                            const matched =
                                !selected ||
                                selected === "all" ||
                                itemClass === selected;

                            item.style.display =
                                matched
                                    ? ""
                                    : "none";

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   SUBJECT FILTER
   ========================================= */

function tlmSubjectFilter() {

    document.querySelectorAll(
        "[data-subject-filter]"
    ).forEach(
        function (select) {

            const targetSelector =
                select.dataset.subjectFilter;

            const target =
                document.querySelector(
                    targetSelector
                );

            if (!target) {
                return;
            }


            const items =
                target.querySelectorAll(
                    "[data-filter-item], " +
                    ".resource-card"
                );


            select.addEventListener(
                "change",
                function () {

                    const selected =
                        select.value
                            .toLowerCase();


                    items.forEach(
                        function (item) {

                            const subject =
                                (
                                    item.dataset.subject ||
                                    ""
                                )
                                    .toLowerCase();

                            const matched =
                                !selected ||
                                selected === "all" ||
                                subject === selected;

                            item.style.display =
                                matched
                                    ? ""
                                    : "none";

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   CLEAR SEARCH
   ========================================= */

function tlmClearSearch() {

    document.querySelectorAll(
        "[data-clear-search]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const selector =
                        button.dataset.clearSearch;

                    const input =
                        document.querySelector(
                            selector
                        );

                    if (!input) {
                        return;
                    }

                    input.value = "";

                    input.dispatchEvent(
                        new Event("input")
                    );

                    input.focus();

                }
            );

        }
    );

}


/* =========================================
   KEYBOARD SEARCH SHORTCUT
   ========================================= */

function tlmSearchShortcut() {

    document.addEventListener(
        "keydown",
        function (event) {

            const active =
                document.activeElement;

            const typing =
                active &&
                (
                    active.tagName === "INPUT" ||
                    active.tagName === "TEXTAREA" ||
                    active.isContentEditable
                );


            if (
                event.key === "/" &&
                !typing
            ) {

                event.preventDefault();

                const input =
                    document.querySelector(
                        "[data-smart-search]"
                    );

                if (input) {
                    input.focus();
                }

            }


            if (
                event.key === "Escape"
            ) {

                const input =
                    document.querySelector(
                        "[data-smart-search]"
                    );

                if (
                    input &&
                    document.activeElement === input
                ) {

                    input.value = "";

                    input.dispatchEvent(
                        new Event("input")
                    );

                    input.blur();

                }

            }

        }
    );

}


/* =========================================
   INITIALIZE PART 19
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmSmartSearch();

        tlmCategoryFilters();

        tlmClassFilter();

        tlmSubjectFilter();

        tlmClearSearch();

        tlmSearchShortcut();

    }
);


/* =========================================
   END — PART 19
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 20
   FAVORITES + BOOKMARKS + RECENTLY VIEWED
   ========================================= */

"use strict";


/* =========================================
   STORAGE HELPERS
   ========================================= */

function tlmGetStoredList(key) {

    try {

        return JSON.parse(
            localStorage.getItem(key)
        ) || [];

    } catch (error) {

        return [];

    }

}


function tlmSaveStoredList(
    key,
    list
) {

    try {

        localStorage.setItem(
            key,
            JSON.stringify(list)
        );

    } catch (error) {

        console.warn(
            "TLM storage error:",
            error
        );

    }

}


/* =========================================
   FAVORITE TOGGLE
   ========================================= */

function tlmFavoriteSystem() {

    document.querySelectorAll(
        "[data-favorite]"
    ).forEach(
        function (button) {

            const id =
                button.dataset.favorite;

            if (!id) {
                return;
            }


            let favorites =
                tlmGetStoredList(
                    "tlm-favorites"
                );


            function updateButton() {

                favorites =
                    tlmGetStoredList(
                        "tlm-favorites"
                    );

                const active =
                    favorites.includes(id);

                button.classList.toggle(
                    "active",
                    active
                );

                button.setAttribute(
                    "aria-pressed",
                    active
                        ? "true"
                        : "false"
                );

                const label =
                    button.querySelector(
                        "[data-favorite-label]"
                    );

                if (label) {

                    label.textContent =
                        active
                            ? "Saved"
                            : "Save";

                }

            }


            button.addEventListener(
                "click",
                function () {

                    favorites =
                        tlmGetStoredList(
                            "tlm-favorites"
                        );


                    const index =
                        favorites.indexOf(id);


                    if (index === -1) {

                        favorites.push(id);

                        tlmToast(
                            "Added to favorites ⭐"
                        );

                    } else {

                        favorites.splice(
                            index,
                            1
                        );

                        tlmToast(
                            "Removed from favorites"
                        );

                    }


                    tlmSaveStoredList(
                        "tlm-favorites",
                        favorites
                    );


                    updateButton();

                }
            );


            updateButton();

        }
    );

}


/* =========================================
   BOOKMARK SYSTEM
   ========================================= */

function tlmBookmarkSystem() {

    document.querySelectorAll(
        "[data-bookmark]"
    ).forEach(
        function (button) {

            const id =
                button.dataset.bookmark;

            if (!id) {
                return;
            }


            function updateButton() {

                const bookmarks =
                    tlmGetStoredList(
                        "tlm-bookmarks"
                    );

                const active =
                    bookmarks.includes(id);

                button.classList.toggle(
                    "active",
                    active
                );

                button.setAttribute(
                    "aria-pressed",
                    active
                        ? "true"
                        : "false"
                );

            }


            button.addEventListener(
                "click",
                function () {

                    let bookmarks =
                        tlmGetStoredList(
                            "tlm-bookmarks"
                        );


                    const index =
                        bookmarks.indexOf(id);


                    if (index === -1) {

                        bookmarks.push(id);

                        tlmToast(
                            "Chapter bookmarked 🔖"
                        );

                    } else {

                        bookmarks.splice(
                            index,
                            1
                        );

                        tlmToast(
                            "Bookmark removed"
                        );

                    }


                    tlmSaveStoredList(
                        "tlm-bookmarks",
                        bookmarks
                    );


                    updateButton();

                }
            );


            updateButton();

        }
    );

}


/* =========================================
   RECENTLY VIEWED
   ========================================= */

function tlmRecentlyViewed() {

    const items =
        document.querySelectorAll(
            "[data-recent-id]"
        );

    if (!items.length) {
        return;
    }


    items.forEach(
        function (item) {

            const id =
                item.dataset.recentId;

            if (!id) {
                return;
            }


            const title =
                item.dataset.recentTitle ||
                item.textContent.trim();


            const url =
                item.dataset.recentUrl ||
                window.location.href;


            item.addEventListener(
                "click",
                function () {

                    let recent =
                        tlmGetStoredList(
                            "tlm-recent"
                        );


                    recent =
                        recent.filter(
                            function (entry) {

                                return (
                                    entry.id !==
                                    id
                                );

                            }
                        );


                    recent.unshift({

                        id: id,

                        title: title,

                        url: url,

                        time:
                            Date.now()

                    });


                    recent =
                        recent.slice(
                            0,
                            10
                        );


                    tlmSaveStoredList(
                        "tlm-recent",
                        recent
                    );

                }
            );

        }
    );

}


/* =========================================
   RENDER RECENT ITEMS
   ========================================= */

function tlmRenderRecentlyViewed() {

    document.querySelectorAll(
        "[data-recent-list]"
    ).forEach(
        function (container) {

            const recent =
                tlmGetStoredList(
                    "tlm-recent"
                );


            container.innerHTML = "";


            if (!recent.length) {

                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📚</div>
                        <p>No recently viewed resources.</p>
                    </div>
                `;

                return;

            }


            recent.forEach(
                function (item) {

                    const link =
                        document.createElement(
                            "a"
                        );

                    link.className =
                        "recent-item";

                    link.href =
                        item.url || "#";


                    link.innerHTML = `
                        <span class="recent-icon">
                            📖
                        </span>

                        <span class="recent-title">
                            ${tlmEscape(
                                item.title ||
                                "Learning Resource"
                            )}
                        </span>
                    `;


                    container.appendChild(
                        link
                    );

                }
            );

        }
    );

}


/* =========================================
   CLEAR RECENTLY VIEWED
   ========================================= */

function tlmClearRecentlyViewed() {

    document.querySelectorAll(
        "[data-clear-recent]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    tlmSaveStoredList(
                        "tlm-recent",
                        []
                    );

                    tlmRenderRecentlyViewed();

                    tlmToast(
                        "Recently viewed list cleared"
                    );

                }
            );

        }
    );

}


/* =========================================
   FAVORITE COUNT
   ========================================= */

function tlmFavoriteCount() {

    const favorites =
        tlmGetStoredList(
            "tlm-favorites"
        );


    document.querySelectorAll(
        "[data-favorite-count]"
    ).forEach(
        function (element) {

            element.textContent =
                favorites.length;

        }
    );

}


/* =========================================
   BOOKMARK COUNT
   ========================================= */

function tlmBookmarkCount() {

    const bookmarks =
        tlmGetStoredList(
            "tlm-bookmarks"
        );


    document.querySelectorAll(
        "[data-bookmark-count]"
    ).forEach(
        function (element) {

            element.textContent =
                bookmarks.length;

        }
    );

}


/* =========================================
   STORAGE SYNC
   ========================================= */

function tlmStorageSync() {

    window.addEventListener(
        "storage",
        function (event) {

            if (
                event.key ===
                "tlm-favorites" ||
                event.key ===
                "tlm-bookmarks" ||
                event.key ===
                "tlm-recent"
            ) {

                tlmFavoriteCount();

                tlmBookmarkCount();

                tlmRenderRecentlyViewed();

            }

        }
    );

}


/* =========================================
   INITIALIZE PART 20
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmFavoriteSystem();

        tlmBookmarkSystem();

        tlmRecentlyViewed();

        tlmRenderRecentlyViewed();

        tlmClearRecentlyViewed();

        tlmFavoriteCount();

        tlmBookmarkCount();

        tlmStorageSync();

    }
);


/* =========================================
   END — PART 20
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 21
   PROGRESS TRACKING + LEARNING STREAK
   ========================================= */

"use strict";


/* =========================================
   GET PROGRESS
   ========================================= */

function tlmGetProgress() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "tlm-progress"
            )
        ) || {};

    } catch (error) {

        return {};

    }

}


/* =========================================
   SAVE PROGRESS
   ========================================= */

function tlmSaveProgress(progress) {

    try {

        localStorage.setItem(
            "tlm-progress",
            JSON.stringify(progress)
        );

    } catch (error) {

        console.warn(
            "TLM progress could not be saved."
        );

    }

}


/* =========================================
   SET RESOURCE PROGRESS
   ========================================= */

function tlmSetProgress(
    resourceId,
    value
) {

    if (!resourceId) {
        return;
    }

    let progress =
        tlmGetProgress();

    let percentage =
        Number(value);

    if (
        !Number.isFinite(percentage)
    ) {
        percentage = 0;
    }

    percentage =
        Math.max(
            0,
            Math.min(
                100,
                Math.round(percentage)
            )
        );

    progress[resourceId] =
        percentage;

    tlmSaveProgress(
        progress
    );

    tlmUpdateProgressUI(
        resourceId,
        percentage
    );

    tlmUpdateOverallProgress();

}


/* =========================================
   UPDATE PROGRESS UI
   ========================================= */

function tlmUpdateProgressUI(
    resourceId,
    percentage
) {

    document.querySelectorAll(
        "[data-progress-id='" +
        CSS.escape(resourceId) +
        "']"
    ).forEach(
        function (element) {

            const bar =
                element.querySelector(
                    "[data-progress-bar]"
                );

            const value =
                element.querySelector(
                    "[data-progress-value]"
                );


            if (bar) {

                bar.style.width =
                    percentage + "%";

                bar.setAttribute(
                    "aria-valuenow",
                    percentage
                );

            }


            if (value) {

                value.textContent =
                    percentage + "%";

            }

        }
    );

}


/* =========================================
   LOAD SAVED PROGRESS
   ========================================= */

function tlmLoadProgressUI() {

    const progress =
        tlmGetProgress();

    Object.keys(
        progress
    ).forEach(
        function (resourceId) {

            tlmUpdateProgressUI(
                resourceId,
                progress[resourceId]
            );

        }
    );

}


/* =========================================
   PROGRESS BUTTONS
   ========================================= */

function tlmProgressButtons() {

    document.querySelectorAll(
        "[data-progress-action]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const id =
                        button.dataset.progressId;

                    const value =
                        button.dataset.progressValue ||
                        "100";

                    tlmSetProgress(
                        id,
                        value
                    );

                    if (
                        Number(value) >= 100
                    ) {

                        tlmToast(
                            "Lesson completed ✓"
                        );

                        tlmRecordLearningDay();

                    }

                }
            );

        }
    );

}


/* =========================================
   OVERALL PROGRESS
   ========================================= */

function tlmUpdateOverallProgress() {

    const progress =
        tlmGetProgress();

    const values =
        Object.values(
            progress
        ).map(
            Number
        );


    if (!values.length) {

        document.querySelectorAll(
            "[data-overall-progress]"
        ).forEach(
            function (element) {

                element.textContent =
                    "0%";

            }
        );

        return;

    }


    const total =
        values.reduce(
            function (sum, value) {

                return sum + value;

            },
            0
        );


    const average =
        Math.round(
            total / values.length
        );


    document.querySelectorAll(
        "[data-overall-progress]"
    ).forEach(
        function (element) {

            element.textContent =
                average + "%";

        }
    );


    document.querySelectorAll(
        "[data-overall-progress-bar]"
    ).forEach(
        function (bar) {

            bar.style.width =
                average + "%";

        }
    );

}


/* =========================================
   LEARNING DAY
   ========================================= */

function tlmRecordLearningDay() {

    const today =
        new Date()
            .toISOString()
            .slice(
                0,
                10
            );


    let days;

    try {

        days =
            JSON.parse(
                localStorage.getItem(
                    "tlm-learning-days"
                )
            ) || [];

    } catch (error) {

        days = [];

    }


    if (
        !days.includes(today)
    ) {

        days.push(today);

    }


    days =
        days.slice(
            -365
        );


    try {

        localStorage.setItem(
            "tlm-learning-days",
            JSON.stringify(days)
        );

    } catch (error) {}

}


/* =========================================
   LEARNING STREAK
   ========================================= */

function tlmCalculateStreak() {

    let days;

    try {

        days =
            JSON.parse(
                localStorage.getItem(
                    "tlm-learning-days"
                )
            ) || [];

    } catch (error) {

        days = [];

    }


    if (!days.length) {
        return 0;
    }


    const uniqueDays =
        [...new Set(days)]
            .sort()
            .reverse();


    let streak = 0;

    let current =
        new Date();


    current.setHours(
        0,
        0,
        0,
        0
    );


    for (
        let i = 0;
        i < uniqueDays.length;
        i++
    ) {

        const expected =
            new Date(current);

        expected.setDate(
            expected.getDate() -
            i
        );


        const expectedString =
            expected
                .toISOString()
                .slice(
                    0,
                    10
                );


        if (
            uniqueDays[i] ===
            expectedString
        ) {

            streak++;

        } else {

            break;

        }

    }


    return streak;

}


/* =========================================
   STREAK UI
   ========================================= */

function tlmUpdateStreakUI() {

    const streak =
        tlmCalculateStreak();


    document.querySelectorAll(
        "[data-learning-streak]"
    ).forEach(
        function (element) {

            element.textContent =
                streak;

        }
    );


    document.querySelectorAll(
        "[data-streak-message]"
    ).forEach(
        function (element) {

            if (streak === 0) {

                element.textContent =
                    "Start your learning journey today! 🚀";

            } else if (
                streak === 1
            ) {

                element.textContent =
                    "Great start! Keep learning tomorrow. 🌟";

            } else {

                element.textContent =
                    streak +
                    " day learning streak! 🔥";

            }

        }
    );

}


/* =========================================
   INITIALIZE PART 21
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmLoadProgressUI();

        tlmProgressButtons();

        tlmUpdateOverallProgress();

        tlmUpdateStreakUI();

    }
);


/* =========================================
   END — PART 21
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 22
   STUDENT DASHBOARD + SAVED RESOURCES
   ========================================= */

"use strict";


/* =========================================
   DASHBOARD SUMMARY
   ========================================= */

function tlmDashboardSummary() {

    const progress =
        tlmGetProgress();

    const favorites =
        tlmGetStoredList(
            "tlm-favorites"
        );

    const bookmarks =
        tlmGetStoredList(
            "tlm-bookmarks"
        );

    const recent =
        tlmGetStoredList(
            "tlm-recent"
        );

    const values =
        Object.values(
            progress
        ).map(Number);


    let overall = 0;

    if (values.length) {

        overall =
            Math.round(
                values.reduce(
                    function (sum, value) {
                        return sum + value;
                    },
                    0
                ) / values.length
            );

    }


    document.querySelectorAll(
        "[data-dashboard-progress]"
    ).forEach(
        function (element) {

            element.textContent =
                overall + "%";

        }
    );


    document.querySelectorAll(
        "[data-dashboard-favorites]"
    ).forEach(
        function (element) {

            element.textContent =
                favorites.length;

        }
    );


    document.querySelectorAll(
        "[data-dashboard-bookmarks]"
    ).forEach(
        function (element) {

            element.textContent =
                bookmarks.length;

        }
    );


    document.querySelectorAll(
        "[data-dashboard-recent]"
    ).forEach(
        function (element) {

            element.textContent =
                recent.length;

        }
    );


    document.querySelectorAll(
        "[data-dashboard-streak]"
    ).forEach(
        function (element) {

            element.textContent =
                tlmCalculateStreak();

        }
    );

}


/* =========================================
   SAVED FAVORITES LIST
   ========================================= */

function tlmRenderFavorites() {

    document.querySelectorAll(
        "[data-favorites-list]"
    ).forEach(
        function (container) {

            const favorites =
                tlmGetStoredList(
                    "tlm-favorites"
                );


            container.innerHTML = "";


            if (!favorites.length) {

                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">⭐</div>
                        <h3>No saved resources</h3>
                        <p>
                            Add resources to favorites
                            to see them here.
                        </p>
                    </div>
                `;

                return;

            }


            favorites.forEach(
                function (id) {

                    const item =
                        document.querySelector(
                            "[data-favorite-card='" +
                            CSS.escape(id) +
                            "']"
                        );


                    if (!item) {
                        return;
                    }


                    const clone =
                        item.cloneNode(true);

                    clone.removeAttribute(
                        "data-favorite-card"
                    );

                    container.appendChild(
                        clone
                    );

                }
            );

        }
    );

}


/* =========================================
   SAVED BOOKMARK LIST
   ========================================= */

function tlmRenderBookmarks() {

    document.querySelectorAll(
        "[data-bookmarks-list]"
    ).forEach(
        function (container) {

            const bookmarks =
                tlmGetStoredList(
                    "tlm-bookmarks"
                );


            container.innerHTML = "";


            if (!bookmarks.length) {

                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">🔖</div>
                        <h3>No bookmarks yet</h3>
                        <p>
                            Bookmark chapters for
                            quick access.
                        </p>
                    </div>
                `;

                return;

            }


            bookmarks.forEach(
                function (id) {

                    const item =
                        document.querySelector(
                            "[data-bookmark-card='" +
                            CSS.escape(id) +
                            "']"
                        );


                    if (!item) {
                        return;
                    }


                    const clone =
                        item.cloneNode(true);

                    clone.removeAttribute(
                        "data-bookmark-card"
                    );

                    container.appendChild(
                        clone
                    );

                }
            );

        }
    );

}


/* =========================================
   DASHBOARD REFRESH
   ========================================= */

function tlmRefreshDashboard() {

    tlmDashboardSummary();

    tlmRenderFavorites();

    tlmRenderBookmarks();

    tlmRenderRecentlyViewed();

    tlmUpdateOverallProgress();

    tlmUpdateStreakUI();

}


/* =========================================
   CLEAR ALL PERSONAL DATA
   ========================================= */

function tlmClearPersonalData() {

    document.querySelectorAll(
        "[data-clear-personal-data]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const confirmed =
                        window.confirm(
                            "Clear your saved TLM FOR ALL data?"
                        );


                    if (!confirmed) {
                        return;
                    }


                    const keys = [

                        "tlm-favorites",

                        "tlm-bookmarks",

                        "tlm-recent",

                        "tlm-progress",

                        "tlm-learning-days"

                    ];


                    keys.forEach(
                        function (key) {

                            try {

                                localStorage.removeItem(
                                    key
                                );

                            } catch (error) {}

                        }
                    );


                    tlmRefreshDashboard();


                    tlmToast(
                        "Saved learning data cleared."
                    );

                }
            );

        }
    );

}


/* =========================================
   DASHBOARD AUTO REFRESH
   ========================================= */

function tlmDashboardStorageRefresh() {

    window.addEventListener(
        "storage",
        function () {

            tlmRefreshDashboard();

        }
    );

}


/* =========================================
   INITIALIZE PART 22
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmRefreshDashboard();

        tlmClearPersonalData();

        tlmDashboardStorageRefresh();

    }
);


/* =========================================
   END — PART 22
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 23
   TEACHER DASHBOARD + RESOURCE MANAGEMENT
   ========================================= */

"use strict";


/* =========================================
   TEACHER DASHBOARD SUMMARY
   ========================================= */

function tlmTeacherDashboard() {

    const resources =
        document.querySelectorAll(
            ".resource-card, [data-resource-card]"
        );

    const classes =
        document.querySelectorAll(
            ".class-card, [data-class-card]"
        );

    const subjects =
        document.querySelectorAll(
            ".subject-card, [data-subject-card]"
        );


    document.querySelectorAll(
        "[data-teacher-resource-count]"
    ).forEach(
        function (element) {

            element.textContent =
                resources.length;

        }
    );


    document.querySelectorAll(
        "[data-teacher-class-count]"
    ).forEach(
        function (element) {

            element.textContent =
                classes.length;

        }
    );


    document.querySelectorAll(
        "[data-teacher-subject-count]"
    ).forEach(
        function (element) {

            element.textContent =
                subjects.length;

        }
    );

}


/* =========================================
   TEACHING PLAN STORAGE
   ========================================= */

function tlmGetTeachingPlans() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "tlm-teaching-plans"
            )
        ) || [];

    } catch (error) {

        return [];

    }

}


function tlmSaveTeachingPlans(
    plans
) {

    try {

        localStorage.setItem(
            "tlm-teaching-plans",
            JSON.stringify(plans)
        );

    } catch (error) {

        console.warn(
            "Teaching plan could not be saved."
        );

    }

}


/* =========================================
   ADD TEACHING PLAN
   ========================================= */

function tlmTeachingPlanForm() {

    document.querySelectorAll(
        "[data-teaching-plan-form]"
    ).forEach(
        function (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const title =
                        form.querySelector(
                            "[name='title']"
                        )?.value.trim() || "";


                    const className =
                        form.querySelector(
                            "[name='class']"
                        )?.value.trim() || "";


                    const subject =
                        form.querySelector(
                            "[name='subject']"
                        )?.value.trim() || "";


                    const date =
                        form.querySelector(
                            "[name='date']"
                        )?.value || "";


                    if (
                        !title ||
                        !className ||
                        !subject
                    ) {

                        tlmToast(
                            "Please fill all required fields."
                        );

                        return;

                    }


                    const plans =
                        tlmGetTeachingPlans();


                    plans.unshift({

                        id:
                            "plan-" +
                            Date.now(),

                        title:

                            title,

                        className:

                            className,

                        subject:

                            subject,

                        date:

                            date,

                        createdAt:

                            Date.now()

                    });


                    tlmSaveTeachingPlans(
                        plans
                    );


                    form.reset();


                    tlmRenderTeachingPlans();


                    tlmToast(
                        "Teaching plan saved ✓"
                    );

                }
            );

        }
    );

}


/* =========================================
   RENDER TEACHING PLANS
   ========================================= */

function tlmRenderTeachingPlans() {

    document.querySelectorAll(
        "[data-teaching-plan-list]"
    ).forEach(
        function (container) {

            const plans =
                tlmGetTeachingPlans();


            container.innerHTML = "";


            if (!plans.length) {

                container.innerHTML = `
                    <div class="empty-state">
                        <div class="empty-icon">📋</div>
                        <h3>No teaching plans</h3>
                        <p>
                            Create your first teaching plan.
                        </p>
                    </div>
                `;

                return;

            }


            plans.forEach(
                function (plan) {

                    const card =
                        document.createElement(
                            "article"
                        );

                    card.className =
                        "teaching-plan-card";


                    card.innerHTML = `
                        <div class="plan-icon">
                            📋
                        </div>

                        <div class="plan-content">

                            <h3>
                                ${tlmEscape(
                                    plan.title
                                )}
                            </h3>

                            <p>
                                Class:
                                ${tlmEscape(
                                    plan.className
                                )}
                            </p>

                            <p>
                                Subject:
                                ${tlmEscape(
                                    plan.subject
                                )}
                            </p>

                            ${
                                plan.date
                                    ? `
                                    <small>
                                        ${tlmEscape(
                                            plan.date
                                        )}
                                    </small>
                                    `
                                    : ""
                            }

                        </div>

                        <button
                            type="button"
                            class="delete-plan"
                            data-delete-plan="${tlmEscape(
                                plan.id
                            )}"
                        >
                            Delete
                        </button>
                    `;


                    container.appendChild(
                        card
                    );

                }
            );


            container
                .querySelectorAll(
                    "[data-delete-plan]"
                )
                .forEach(
                    function (button) {

                        button.addEventListener(
                            "click",
                            function () {

                                const id =
                                    button.dataset.deletePlan;


                                const plans =
                                    tlmGetTeachingPlans()
                                        .filter(
                                            function (plan) {

                                                return (
                                                    plan.id !==
                                                    id
                                                );

                                            }
                                        );


                                tlmSaveTeachingPlans(
                                    plans
                                );


                                tlmRenderTeachingPlans();


                                tlmToast(
                                    "Teaching plan deleted."
                                );

                            }
                        );

                    }
                );

        }
    );

}


/* =========================================
   TEACHER RESOURCE QUICK ACTIONS
   ========================================= */

function tlmTeacherQuickActions() {

    document.querySelectorAll(
        "[data-teacher-action]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        button.dataset.teacherAction;


                    if (
                        action ===
                        "plan"
                    ) {

                        document.querySelector(
                            "[data-teaching-plan-form]"
                        )?.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }


                    if (
                        action ===
                        "library"
                    ) {

                        document.querySelector(
                            "[data-resource-library]"
                        )?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }


                    if (
                        action ===
                        "question-paper"
                    ) {

                        window.location.href =
                            "pages/ai-center.html";

                    }

                }
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 23
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmTeacherDashboard();

        tlmTeachingPlanForm();

        tlmRenderTeachingPlans();

        tlmTeacherQuickActions();

    }
);


/* =========================================
   END — PART 23
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 24
   AI CENTER + QUESTION PAPER FOUNDATION
   ========================================= */

"use strict";


/* =========================================
   AI CENTER OPEN
   ========================================= */

function tlmAICenter() {

    document.querySelectorAll(
        "[data-ai-action]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const action =
                        button.dataset.aiAction;


                    if (
                        action === "question-paper"
                    ) {

                        document.querySelector(
                            "[data-question-paper-form]"
                        )?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }


                    if (
                        action === "lesson"
                    ) {

                        document.querySelector(
                            "[data-ai-lesson-form]"
                        )?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }


                    if (
                        action === "quiz"
                    ) {

                        document.querySelector(
                            "[data-ai-quiz-form]"
                        )?.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );

}


/* =========================================
   QUESTION PAPER FORM
   ========================================= */

function tlmQuestionPaperForm() {

    document.querySelectorAll(
        "[data-question-paper-form]"
    ).forEach(
        function (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const className =
                        form.querySelector(
                            "[name='class']"
                        )?.value || "";


                    const subject =
                        form.querySelector(
                            "[name='subject']"
                        )?.value || "";


                    const chapter =
                        form.querySelector(
                            "[name='chapter']"
                        )?.value || "";


                    const marks =
                        form.querySelector(
                            "[name='marks']"
                        )?.value || "40";


                    const difficulty =
                        form.querySelector(
                            "[name='difficulty']"
                        )?.value || "mixed";


                    if (
                        !className ||
                        !subject
                    ) {

                        tlmToast(
                            "Please select class and subject."
                        );

                        return;

                    }


                    const result =
                        document.querySelector(
                            "[data-question-paper-result]"
                        );


                    if (!result) {
                        return;
                    }


                    result.innerHTML = `
                        <div class="ai-result-card">

                            <div class="ai-result-icon">
                                🤖
                            </div>

                            <h3>
                                AI Question Paper Setup
                            </h3>

                            <p>
                                Class:
                                ${tlmEscape(
                                    className
                                )}
                            </p>

                            <p>
                                Subject:
                                ${tlmEscape(
                                    subject
                                )}
                            </p>

                            ${
                                chapter
                                    ? `
                                    <p>
                                        Chapter:
                                        ${tlmEscape(
                                            chapter
                                        )}
                                    </p>
                                    `
                                    : ""
                            }

                            <p>
                                Marks:
                                ${tlmEscape(
                                    marks
                                )}
                            </p>

                            <p>
                                Difficulty:
                                ${tlmEscape(
                                    difficulty
                                )}
                            </p>

                            <div class="ai-notice">
                                Question generation
                                module is ready for
                                AI/API connection.
                            </div>

                        </div>
                    `;


                    result.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    tlmToast(
                        "Question paper settings saved ✓"
                    );

                }
            );

        }
    );

}


/* =========================================
   AI LESSON FORM
   ========================================= */

function tlmAILessonForm() {

    document.querySelectorAll(
        "[data-ai-lesson-form]"
    ).forEach(
        function (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const topic =
                        form.querySelector(
                            "[name='topic']"
                        )?.value.trim() || "";


                    const language =
                        form.querySelector(
                            "[name='language']"
                        )?.value || "English";


                    if (!topic) {

                        tlmToast(
                            "Enter a lesson topic."
                        );

                        return;

                    }


                    const result =
                        document.querySelector(
                            "[data-ai-lesson-result]"
                        );


                    if (!result) {
                        return;
                    }


                    result.innerHTML = `
                        <div class="ai-result-card">

                            <div class="ai-result-icon">
                                💡
                            </div>

                            <h3>
                                Lesson Request
                            </h3>

                            <p>
                                Topic:
                                ${tlmEscape(
                                    topic
                                )}
                            </p>

                            <p>
                                Language:
                                ${tlmEscape(
                                    language
                                )}
                            </p>

                            <div class="ai-notice">
                                AI lesson generation
                                can be connected here.
                            </div>

                        </div>
                    `;


                    result.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    tlmToast(
                        "AI lesson request prepared ✓"
                    );

                }
            );

        }
    );

}


/* =========================================
   AI QUIZ FORM
   ========================================= */

function tlmAIQuizForm() {

    document.querySelectorAll(
        "[data-ai-quiz-form]"
    ).forEach(
        function (form) {

            form.addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();


                    const topic =
                        form.querySelector(
                            "[name='topic']"
                        )?.value.trim() || "";


                    const questions =
                        form.querySelector(
                            "[name='questions']"
                        )?.value || "10";


                    if (!topic) {

                        tlmToast(
                            "Enter a quiz topic."
                        );

                        return;

                    }


                    const result =
                        document.querySelector(
                            "[data-ai-quiz-result]"
                        );


                    if (!result) {
                        return;
                    }


                    result.innerHTML = `
                        <div class="ai-result-card">

                            <div class="ai-result-icon">
                                🧠
                            </div>

                            <h3>
                                AI Quiz
                            </h3>

                            <p>
                                Topic:
                                ${tlmEscape(
                                    topic
                                )}
                            </p>

                            <p>
                                Questions:
                                ${tlmEscape(
                                    questions
                                )}
                            </p>

                            <div class="ai-notice">
                                Quiz generation
                                module is ready
                                for AI/API connection.
                            </div>

                        </div>
                    `;


                    result.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });


                    tlmToast(
                        "AI quiz request prepared ✓"
                    );

                }
            );

        }
    );

}


/* =========================================
   AI CENTER STATUS
   ========================================= */

function tlmAIStatus() {

    document.querySelectorAll(
        "[data-ai-status]"
    ).forEach(
        function (element) {

            element.textContent =
                "AI Center Ready";

            element.classList.add(
                "ready"
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 24
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmAICenter();

        tlmQuestionPaperForm();

        tlmAILessonForm();

        tlmAIQuizForm();

        tlmAIStatus();

    }
);


/* =========================================
   END — PART 24
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 25
   LANGUAGE SELECTOR
   తెలుగు | हिन्दी | English
   ========================================= */

"use strict";


/* =========================================
   LANGUAGE STORAGE
   ========================================= */

function tlmGetLanguage() {

    try {

        return (
            localStorage.getItem(
                "tlm-language"
            ) || "en"
        );

    } catch (error) {

        return "en";

    }

}


/* =========================================
   SAVE LANGUAGE
   ========================================= */

function tlmSaveLanguage(
    language
) {

    try {

        localStorage.setItem(
            "tlm-language",
            language
        );

    } catch (error) {}

}


/* =========================================
   LANGUAGE DICTIONARY
   ========================================= */

const tlmLanguages = {

    en: {

        home: "Home",

        classes: "Classes",

        teacher: "Teacher",

        student: "Student",

        ai: "AI Center",

        library: "Resource Library",

        search:
            "Search learning resources...",

        latest:
            "Latest Updates",

        featured:
            "Featured Lessons",

        resources:
            "Learning Resources",

        practice:
            "Student Practice",

        project:
            "Project Work",

        about:
            "About TLM FOR ALL",

        contact:
            "Contact",

        save:
            "Save",

        saved:
            "Saved",

        bookmark:
            "Bookmark",

        start:
            "Start Learning",

        view:
            "View Resource"

    },


    hi: {

        home: "होम",

        classes: "कक्षाएँ",

        teacher: "शिक्षक",

        student: "विद्यार्थी",

        ai: "AI सेंटर",

        library: "संसाधन पुस्तकालय",

        search:
            "शैक्षणिक संसाधन खोजें...",

        latest:
            "नवीनतम अपडेट",

        featured:
            "विशेष पाठ",

        resources:
            "शैक्षणिक संसाधन",

        practice:
            "विद्यार्थी अभ्यास",

        project:
            "प्रोजेक्ट कार्य",

        about:
            "TLM FOR ALL के बारे में",

        contact:
            "संपर्क",

        save:
            "सेव करें",

        saved:
            "सेव किया गया",

        bookmark:
            "बुकमार्क",

        start:
            "सीखना शुरू करें",

        view:
            "संसाधन देखें"

    },


    te: {

        home: "హోమ్",

        classes: "తరగతులు",

        teacher: "ఉపాధ్యాయుడు",

        student: "విద్యార్థి",

        ai: "AI సెంటర్",

        library: "వనరుల లైబ్రరీ",

        search:
            "విద్యా వనరులను వెతకండి...",

        latest:
            "తాజా అప్‌డేట్స్",

        featured:
            "ప్రత్యేక పాఠాలు",

        resources:
            "విద్యా వనరులు",

        practice:
            "విద్యార్థి అభ్యాసం",

        project:
            "ప్రాజెక్ట్ పని",

        about:
            "TLM FOR ALL గురించి",

        contact:
            "సంప్రదించండి",

        save:
            "సేవ్ చేయండి",

        saved:
            "సేవ్ చేయబడింది",

        bookmark:
            "బుక్‌మార్క్",

        start:
            "నేర్చుకోవడం ప్రారంభించండి",

        view:
            "వనరును చూడండి"

    }

};


/* =========================================
   APPLY LANGUAGE
   ========================================= */

function tlmApplyLanguage(
    language
) {

    if (
        !tlmLanguages[language]
    ) {

        language = "en";

    }


    const dictionary =
        tlmLanguages[language];


    document.documentElement.lang =
        language;


    document.body.dataset.language =
        language;


    document.querySelectorAll(
        "[data-i18n]"
    ).forEach(
        function (element) {

            const key =
                element.dataset.i18n;

            if (
                dictionary[key]
            ) {

                element.textContent =
                    dictionary[key];

            }

        }
    );


    document.querySelectorAll(
        "[data-i18n-placeholder]"
    ).forEach(
        function (element) {

            const key =
                element.dataset.i18nPlaceholder;

            if (
                dictionary[key]
            ) {

                element.placeholder =
                    dictionary[key];

            }

        }
    );


    document.querySelectorAll(
        "[data-language]"
    ).forEach(
        function (button) {

            button.classList.toggle(
                "active",
                button.dataset.language ===
                language
            );

        }
    );


    tlmSaveLanguage(
        language
    );

}


/* =========================================
   LANGUAGE SELECTOR
   ========================================= */

function tlmLanguageSelector() {

    document.querySelectorAll(
        "[data-language]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const language =
                        button.dataset.language;

                    if (
                        !tlmLanguages[language]
                    ) {
                        return;
                    }


                    tlmApplyLanguage(
                        language
                    );


                    const names = {

                        en:
                            "English",

                        hi:
                            "हिन्दी",

                        te:
                            "తెలుగు"

                    };


                    tlmToast(
                        "Language: " +
                        names[language]
                    );

                }
            );

        }
    );

}


/* =========================================
   INITIALIZE LANGUAGE
   ========================================= */

function tlmInitializeLanguage() {

    const language =
        tlmGetLanguage();

    tlmApplyLanguage(
        language
    );

}


/* =========================================
   INITIALIZE PART 25
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmInitializeLanguage();

        tlmLanguageSelector();

    }
);


/* =========================================
   END — PART 25
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 26
   DARK / LIGHT MODE + THEME MEMORY
   ========================================= */

"use strict";


/* =========================================
   GET SAVED THEME
   ========================================= */

function tlmGetTheme() {

    try {

        const saved =
            localStorage.getItem(
                "tlm-theme"
            );

        if (
            saved === "dark" ||
            saved === "light"
        ) {
            return saved;
        }

    } catch (error) {}

    /* Browser preference */

    if (
        window.matchMedia &&
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        ).matches
    ) {
        return "dark";
    }

    return "light";

}


/* =========================================
   SAVE THEME
   ========================================= */

function tlmSaveTheme(
    theme
) {

    try {

        localStorage.setItem(
            "tlm-theme",
            theme
        );

    } catch (error) {

        console.warn(
            "TLM theme could not be saved."
        );

    }

}


/* =========================================
   APPLY THEME
   ========================================= */

function tlmApplyTheme(
    theme
) {

    if (
        theme !== "dark" &&
        theme !== "light"
    ) {
        theme = "light";
    }


    document.documentElement.dataset.theme =
        theme;

    document.body.dataset.theme =
        theme;


    document.documentElement.classList.toggle(
        "dark-mode",
        theme === "dark"
    );

    document.documentElement.classList.toggle(
        "light-mode",
        theme === "light"
    );


    document.querySelectorAll(
        "[data-theme-toggle]"
    ).forEach(
        function (button) {

            const dark =
                theme === "dark";


            button.setAttribute(
                "aria-pressed",
                dark
                    ? "true"
                    : "false"
            );


            const icon =
                button.querySelector(
                    "[data-theme-icon]"
                );

            if (icon) {

                icon.textContent =
                    dark
                        ? "☀️"
                        : "🌙";

            }


            const label =
                button.querySelector(
                    "[data-theme-label]"
                );

            if (label) {

                label.textContent =
                    dark
                        ? "Light Mode"
                        : "Dark Mode";

            }

        }
    );


    tlmSaveTheme(
        theme
    );

}


/* =========================================
   THEME TOGGLE
   ========================================= */

function tlmThemeToggle() {

    document.querySelectorAll(
        "[data-theme-toggle]"
    ).forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const current =
                        document.documentElement
                            .dataset.theme ||
                        tlmGetTheme();


                    const next =
                        current === "dark"
                            ? "light"
                            : "dark";


                    tlmApplyTheme(
                        next
                    );


                    tlmToast(
                        next === "dark"
                            ? "Dark Mode enabled 🌙"
                            : "Light Mode enabled ☀️"
                    );

                }
            );

        }
    );

}


/* =========================================
   SYSTEM THEME CHANGES
   ========================================= */

function tlmSystemThemeChange() {

    if (!window.matchMedia) {
        return;
    }


    const media =
        window.matchMedia(
            "(prefers-color-scheme: dark)"
        );


    function update() {

        let saved = null;

        try {

            saved =
                localStorage.getItem(
                    "tlm-theme"
                );

        } catch (error) {}


        /*
         * Only follow the browser
         * when user has not selected
         * a manual theme.
         */

        if (
            saved !== "dark" &&
            saved !== "light"
        ) {

            tlmApplyTheme(
                media.matches
                    ? "dark"
                    : "light"
            );

        }

    }


    if (
        media.addEventListener
    ) {

        media.addEventListener(
            "change",
            update
        );

    } else if (
        media.addListener
    ) {

        media.addListener(
            update
        );

    }

}


/* =========================================
   THEME INITIALIZATION
   ========================================= */

function tlmInitializeTheme() {

    const theme =
        tlmGetTheme();

    tlmApplyTheme(
        theme
    );

}


/* =========================================
   INITIALIZE PART 26
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmInitializeTheme();

        tlmThemeToggle();

        tlmSystemThemeChange();

    }
);


/* =========================================
   END — PART 26
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 27
   MOBILE MENU + RESPONSIVE NAVIGATION
   ========================================= */

"use strict";


/* =========================================
   MOBILE MENU
   ========================================= */

function tlmMobileMenu() {

    const toggles =
        document.querySelectorAll(
            "[data-mobile-menu-toggle]"
        );

    toggles.forEach(
        function (toggle) {

            const targetSelector =
                toggle.dataset.mobileMenuToggle;

            const menu =
                document.querySelector(
                    targetSelector
                );

            if (!menu) {
                return;
            }


            toggle.addEventListener(
                "click",
                function () {

                    const isOpen =
                        menu.classList.contains(
                            "active"
                        );


                    menu.classList.toggle(
                        "active",
                        !isOpen
                    );


                    toggle.classList.toggle(
                        "active",
                        !isOpen
                    );


                    toggle.setAttribute(
                        "aria-expanded",
                        isOpen
                            ? "false"
                            : "true"
                    );


                    document.body.classList.toggle(
                        "mobile-menu-open",
                        !isOpen
                    );

                }
            );

        }
    );

}


/* =========================================
   CLOSE MENU AFTER LINK CLICK
   ========================================= */

function tlmCloseMenuAfterLink() {

    document.querySelectorAll(
        "[data-mobile-menu] a"
    ).forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    const menu =
                        link.closest(
                            "[data-mobile-menu]"
                        );

                    if (!menu) {
                        return;
                    }


                    menu.classList.remove(
                        "active"
                    );


                    document.body.classList.remove(
                        "mobile-menu-open"
                    );


                    document.querySelectorAll(
                        "[data-mobile-menu-toggle]"
                    ).forEach(
                        function (toggle) {

                            toggle.classList.remove(
                                "active"
                            );

                            toggle.setAttribute(
                                "aria-expanded",
                                "false"
                            );

                        }
                    );

                }
            );

        }
    );

}


/* =========================================
   CLOSE MENU OUTSIDE
   ========================================= */

function tlmCloseMenuOutside() {

    document.addEventListener(
        "click",
        function (event) {

            const menu =
                document.querySelector(
                    "[data-mobile-menu]"
                );

            const toggle =
                event.target.closest(
                    "[data-mobile-menu-toggle]"
                );

            if (!menu) {
                return;
            }


            if (
                menu.contains(event.target) ||
                toggle
            ) {
                return;
            }


            menu.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "mobile-menu-open"
            );


            document.querySelectorAll(
                "[data-mobile-menu-toggle]"
            ).forEach(
                function (button) {

                    button.classList.remove(
                        "active"
                    );

                    button.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


/* =========================================
   ESCAPE KEY
   ========================================= */

function tlmMobileMenuEscape() {

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key !== "Escape"
            ) {
                return;
            }


            const menu =
                document.querySelector(
                    "[data-mobile-menu]"
                );

            if (!menu) {
                return;
            }


            menu.classList.remove(
                "active"
            );


            document.body.classList.remove(
                "mobile-menu-open"
            );


            document.querySelectorAll(
                "[data-mobile-menu-toggle]"
            ).forEach(
                function (toggle) {

                    toggle.classList.remove(
                        "active"
                    );

                    toggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                }
            );

        }
    );

}


/* =========================================
   RESPONSIVE RESET
   ========================================= */

function tlmResponsiveReset() {

    const media =
        window.matchMedia
            ? window.matchMedia(
                "(min-width: 769px)"
            )
            : null;


    function reset() {

        if (
            !media ||
            !media.matches
        ) {
            return;
        }


        document.querySelectorAll(
            "[data-mobile-menu]"
        ).forEach(
            function (menu) {

                menu.classList.remove(
                    "active"
                );

            }
        );


        document.querySelectorAll(
            "[data-mobile-menu-toggle]"
        ).forEach(
            function (toggle) {

                toggle.classList.remove(
                    "active"
                );

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }
        );


        document.body.classList.remove(
            "mobile-menu-open"
        );

    }


    if (media) {

        if (
            media.addEventListener
        ) {

            media.addEventListener(
                "change",
                reset
            );

        } else if (
            media.addListener
        ) {

            media.addListener(
                reset
            );

        }

    }

}


/* =========================================
   MOBILE MENU ACCESSIBILITY
   ========================================= */

function tlmMobileMenuAccessibility() {

    document.querySelectorAll(
        "[data-mobile-menu-toggle]"
    ).forEach(
        function (toggle) {

            if (
                !toggle.hasAttribute(
                    "aria-expanded"
                )
            ) {

                toggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

            }


            if (
                !toggle.hasAttribute(
                    "aria-label"
                )
            ) {

                toggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

            }

        }
    );

}


/* =========================================
   INITIALIZE PART 27
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmMobileMenu();

        tlmCloseMenuAfterLink();

        tlmCloseMenuOutside();

        tlmMobileMenuEscape();

        tlmResponsiveReset();

        tlmMobileMenuAccessibility();

    }
);


/* =========================================
   END — PART 27
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 28
   SMOOTH NAVIGATION + ACTIVE MENU
   + BACK TO TOP
   ========================================= */

"use strict";


/* =========================================
   SMOOTH ANCHOR NAVIGATION
   ========================================= */

function tlmSmoothNavigation() {

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const href =
                        link.getAttribute(
                            "href"
                        );

                    if (
                        !href ||
                        href === "#"
                    ) {
                        return;
                    }


                    const target =
                        document.querySelector(
                            href
                        );

                    if (!target) {
                        return;
                    }


                    event.preventDefault();


                    const header =
                        document.querySelector(
                            "header, .site-header, [data-header]"
                        );


                    const headerHeight =
                        header
                            ? header.offsetHeight
                            : 0;


                    const position =
                        target.getBoundingClientRect()
                            .top +
                        window.scrollY -
                        headerHeight -
                        12;


                    window.scrollTo({
                        top:
                            Math.max(
                                position,
                                0
                            ),
                        behavior:
                            "smooth"
                    });


                    history.replaceState(
                        null,
                        "",
                        href
                    );

                }
            );

        }
    );

}


/* =========================================
   ACTIVE NAVIGATION
   ========================================= */

function tlmActiveNavigation() {

    const sections =
        document.querySelectorAll(
            "section[id], main[id]"
        );

    const links =
        document.querySelectorAll(
            'nav a[href^="#"], ' +
            '[data-main-navigation] a[href^="#"]'
        );


    if (
        !sections.length ||
        !links.length
    ) {
        return;
    }


    function setActive(id) {

        links.forEach(
            function (link) {

                const href =
                    link.getAttribute(
                        "href"
                    );

                const active =
                    href ===
                    "#" + id;


                link.classList.toggle(
                    "active",
                    active
                );

                link.setAttribute(
                    "aria-current",
                    active
                        ? "page"
                        : "false"
                );

            }
        );

    }


    if (
        "IntersectionObserver"
        in window
    ) {

        const observer =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(
                        function (entry) {

                            if (
                                entry.isIntersecting
                            ) {

                                setActive(
                                    entry.target.id
                                );

                            }

                        }
                    );

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px",
                    threshold: 0
                }
            );


        sections.forEach(
            function (section) {

                observer.observe(
                    section
                );

            }
        );

    }

}


/* =========================================
   BACK TO TOP BUTTON
   ========================================= */

function tlmBackToTopButton() {

    const buttons =
        document.querySelectorAll(
            "[data-back-to-top]"
        );


    if (!buttons.length) {
        return;
    }


    function update() {

        const visible =
            window.scrollY >
            450;


        buttons.forEach(
            function (button) {

                button.classList.toggle(
                    "visible",
                    visible
                );

                button.setAttribute(
                    "aria-hidden",
                    visible
                        ? "false"
                        : "true"
                );

            }
        );

    }


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    buttons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    window.scrollTo({
                        top: 0,
                        behavior: "smooth"
                    });

                }
            );

        }
    );


    update();

}


/* =========================================
   HEADER SCROLL EFFECT
   ========================================= */

function tlmHeaderScrollEffect() {

    const header =
        document.querySelector(
            "header, .site-header, [data-header]"
        );


    if (!header) {
        return;
    }


    function update() {

        header.classList.toggle(
            "scrolled",
            window.scrollY > 20
        );

    }


    window.addEventListener(
        "scroll",
        update,
        {
            passive: true
        }
    );


    update();

}


/* =========================================
   HASH ON PAGE LOAD
   ========================================= */

function tlmOpenHashTarget() {

    const hash =
        window.location.hash;


    if (!hash) {
        return;
    }


    const target =
        document.querySelector(
            hash
        );


    if (!target) {
        return;
    }


    setTimeout(
        function () {

            const header =
                document.querySelector(
                    "header, .site-header, [data-header]"
                );


            const offset =
                header
                    ? header.offsetHeight
                    : 0;


            window.scrollTo({
                top:
                    target.getBoundingClientRect()
                        .top +
                    window.scrollY -
                    offset -
                    12,
                behavior: "smooth"
            });

        },
        200
    );

}


/* =========================================
   INITIALIZE PART 28
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmSmoothNavigation();

        tlmActiveNavigation();

        tlmBackToTopButton();

        tlmHeaderScrollEffect();

        tlmOpenHashTarget();

    }
);


/* =========================================
   END — PART 28
   ========================================= */
/* =========================================
   TLM FOR ALL — js/script.js
   PART 29
   ONLINE / OFFLINE STATUS
   ========================================= */

"use strict";


/* =========================================
   UPDATE CONNECTION STATUS
   ========================================= */

function tlmConnectionStatus() {

    const online =
        navigator.onLine;


    document.documentElement.classList.toggle(
        "is-online",
        online
    );

    document.documentElement.classList.toggle(
        "is-offline",
        !online
    );


    document.body.dataset.connection =
        online
            ? "online"
            : "offline";


    document.querySelectorAll(
        "[data-connection-status]"
    ).forEach(
        function (element) {

            element.textContent =
                online
                    ? "Online"
                    : "Offline";

            element.classList.toggle(
                "online",
                online
            );

            element.classList.toggle(
                "offline",
                !online
            );

        }
    );


    document.querySelectorAll(
        "[data-connection-icon]"
    ).forEach(
        function (element) {

            element.textContent =
                online
                    ? "🟢"
                    : "🔴";

        }
    );


    document.querySelectorAll(
        "[data-connection-message]"
    ).forEach(
        function (element) {

            element.textContent =
                online
                    ? "You are connected to the internet."
                    : "You are offline. Saved resources remain available.";

        }
    );

}


/* =========================================
   CONNECTION NOTIFICATION
   ========================================= */

function tlmConnectionNotification(
    online
) {

    if (
        typeof tlmToast !== "function"
    ) {
        return;
    }


    if (online) {

        tlmToast(
            "Internet connection restored ✓"
        );

    } else {

        tlmToast(
            "You are offline. Some online features may not work."
        );

    }

}


/* =========================================
   LISTEN FOR NETWORK CHANGES
   ========================================= */

function tlmNetworkEvents() {

    window.addEventListener(
        "online",
        function () {

            tlmConnectionStatus();

            tlmConnectionNotification(
                true
            );

        }
    );


    window.addEventListener(
        "offline",
        function () {

            tlmConnectionStatus();

            tlmConnectionNotification(
                false
            );

        }
    );

}


/* =========================================
   OFFLINE FRIENDLY MESSAGE
   ========================================= */

function tlmOfflineMessage() {

    document.querySelectorAll(
        "[data-requires-online]"
    ).forEach(
        function (element) {

            const update =
                function () {

                    const online =
                        navigator.onLine;

                    element.classList.toggle(
                        "disabled",
                        !online
                    );


                    if (!online) {

                        element.setAttribute(
                            "aria-disabled",
                            "true"
                        );

                        element.title =
                            "Internet connection required.";

                    } else {

                        element.removeAttribute(
                            "aria-disabled"
                        );

                        element.removeAttribute(
                            "title"
                        );

                    }

                };


            update();


            window.addEventListener(
                "online",
                update
            );

            window.addEventListener(
                "offline",
                update
            );

        }
    );

}


/* =========================================
   INITIALIZE PART 29
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function () {

        tlmConnectionStatus();

        tlmNetworkEvents();

        tlmOfflineMessage();

    }
);


/* =========================================
   END — PART 29
   ========================================= */
