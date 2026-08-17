/* =========================================================
   SOHAIL AHMED PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   PREVENT BROWSER FROM RESTORING OLD SCROLL POSITION
   ========================================================= */

if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
}


/* =========================================================
   SECTIONS TO LOAD
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
   LOAD WEBSITE
   ========================================================= */

async function loadWebsite() {

    const page = document.getElementById("page");

    if (!page) {

        console.error(
            "ERROR: #page element was not found in index.html"
        );

        return;
    }


    /*
     * Keep the page at the top while sections load.
     */

    window.scrollTo(0, 0);


    /*
     * Load every section.
     */

    for (const section of sections) {

        try {

            const response = await fetch(
                `sections/${section}.html`
            );


            if (!response.ok) {

                console.error(
                    `ERROR loading sections/${section}.html`
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
                `ERROR loading ${section}.html:`,
                error
            );

        }

    }


    /*
     * All sections are now loaded.
     * Start at the top of the website.
     */

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });


    /*
     * Activate navigation.
     */

    setupNavigation();

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {


    /* -----------------------------------------------------
       NAV MENU
       ----------------------------------------------------- */

    const navMenu =
        document.querySelector(".nav-menu");


    /* -----------------------------------------------------
       MOBILE MENU BUTTON
       ----------------------------------------------------- */

    const navToggle =
        document.querySelector(".nav-toggle");


    /* -----------------------------------------------------
       NAVIGATION LINKS
       ----------------------------------------------------- */

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    /*
     * If navbar wasn't loaded, stop safely.
     */

    if (!links.length) {

        console.warn(
            "No navigation links found."
        );

    }


    /* -----------------------------------------------------
       HANDLE LINKS
       ----------------------------------------------------- */

    links.forEach(function(link) {

        link.addEventListener(
            "click",
            function(event) {

                const targetId =
                    this.getAttribute("href");


                /*
                 * Ignore empty # links.
                 */

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;
                }


                /*
                 * Find target section.
                 */

                const target =
                    document.querySelector(
                        targetId
                    );


                /*
                 * If target doesn't exist,
                 * don't break the website.
                 */

                if (!target) {

                    console.warn(
                        "Target not found:",
                        targetId
                    );

                    return;
                }


                /*
                 * Prevent default browser jump.
                 */

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
                 * Smooth scroll.
                 */

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                 * Update URL.
                 */

                history.pushState(
                    null,
                    "",
                    targetId
                );

            }
        );

    }


    /* -----------------------------------------------------
       MOBILE MENU
       ----------------------------------------------------- */

    if (
        navToggle &&
        navMenu
    ) {

        navToggle.addEventListener(
            "click",
            function() {

                const opened =
                    navMenu.classList.toggle(
                        "active"
                    );


                navToggle.setAttribute(
                    "aria-expanded",
                    opened
                        ? "true"
                        : "false"
                );

            }
        );

    }

}


/* =========================================================
   START
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        loadWebsite();

    }
);