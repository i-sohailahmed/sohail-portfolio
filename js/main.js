/* =========================================================
   SOHAIL AHMED PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   SECTION LOADER
   ========================================================= */

const sections = [
    "navbar",
    "hero",
    "about",
    "skills",
    "education",
    "experience",
    "projects",
    "contact",
    "footer"
];


/* =========================================================
   LOAD ALL SECTIONS
   ========================================================= */

async function loadSections() {

    const page = document.getElementById("page");

    if (!page) {
        console.error("Element #page was not found.");
        return;
    }

    for (const section of sections) {

        try {

            const response = await fetch(
                `sections/${section}.html`
            );

            if (!response.ok) {
                console.error(
                    `Could not load ${section}.html`
                );

                continue;
            }

            const html = await response.text();

            page.insertAdjacentHTML(
                "beforeend",
                html
            );

        } catch (error) {

            console.error(
                `Error loading ${section}.html:`,
                error
            );

        }
    }


    /*
     * IMPORTANT
     * After all sections are loaded, always return
     * the user to the top of the website on first load.
     */

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto"
    });


    /*
     * Prevent browser from restoring an old
     * scroll position.
     */

    document.documentElement.style.scrollBehavior = "auto";


    /*
     * Initialize navigation after the HTML
     * sections have been loaded.
     */

    initializeNavigation();

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function initializeNavigation() {

    const navLinks =
        document.querySelectorAll(
            ".nav-menu a"
        );

    const navMenu =
        document.querySelector(
            ".nav-menu"
        );

    const navToggle =
        document.querySelector(
            ".nav-toggle"
        );


    /* -----------------------------------------------------
       NAVBAR LINKS
       ----------------------------------------------------- */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");


                /*
                 * Only handle internal section links.
                 */

                if (
                    !targetId ||
                    !targetId.startsWith("#")
                ) {
                    return;
                }


                const target =
                    document.querySelector(
                        targetId
                    );


                if (!target) {
                    return;
                }


                event.preventDefault();


                /*
                 * Close mobile menu.
                 */

                if (navMenu) {
                    navMenu.classList.remove(
                        "active"
                    );
                }


                if (navToggle) {
                    navToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }


                /*
                 * Scroll to requested section.
                 */

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                 * Update URL without causing
                 * another automatic browser jump.
                 */

                history.pushState(
                    null,
                    "",
                    targetId
                );

            }
        );

    });


    /* -----------------------------------------------------
       MOBILE MENU
       ----------------------------------------------------- */

    if (navToggle && navMenu) {

        navToggle.addEventListener(
            "click",
            function() {

                const isOpen =
                    navMenu.classList.toggle(
                        "active"
                    );


                navToggle.setAttribute(
                    "aria-expanded",
                    isOpen ? "true" : "false"
                );

            }
        );

    }


    /* -----------------------------------------------------
       CLOSE MOBILE MENU AFTER CLICK
       ----------------------------------------------------- */

    navLinks.forEach(link => {

        link.addEventListener(
            "click",
            function() {

                if (navMenu) {
                    navMenu.classList.remove(
                        "active"
                    );
                }

            }
        );

    });

}


/* =========================================================
   FORCE TOP POSITION ON INITIAL PAGE LOAD
   ========================================================= */

if ("scrollRestoration" in history) {

    history.scrollRestoration = "manual";

}


/*
 * Immediately force the browser to the top.
 */

window.scrollTo(
    0,
    0
);


/* =========================================================
   START WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        /*
         * Keep the page at the top while sections
         * are being loaded.
         */

        window.scrollTo(
            0,
            0
        );


        loadSections();

    }
);


/* =========================================================
   FINAL SAFETY CHECK
   ========================================================= */

window.addEventListener(
    "load",
    function() {

        /*
         * If the page was opened without an intentional
         * section command, start at the hero.
         */

        if (
            !window.location.hash ||
            window.location.hash === "#home"
        ) {

            window.scrollTo({
                top: 0,
                left: 0,
                behavior: "auto"
            });

        }

    }
);