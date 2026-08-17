/* =========================================================
   SOHAIL AHMED PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   SECTION CONFIGURATION
   =========================================================

   IMPORTANT:

   The Stats section has been intentionally removed.

   Do NOT add "stats" to this list unless a stats.html
   section is created again.

   ========================================================= */

const sections = [

    {
        name: "navbar",
        file: "sections/navbar.html",
        container: "navbar-container"
    },

    {
        name: "hero",
        file: "sections/hero.html",
        container: "hero-container"
    },

    {
        name: "about",
        file: "sections/about.html",
        container: "about-container"
    },

    {
        name: "skills",
        file: "sections/skills.html",
        container: "skills-container"
    },

    {
        name: "education",
        file: "sections/education.html",
        container: "education-container"
    },

    {
        name: "experience",
        file: "sections/experience.html",
        container: "experience-container"
    },

    {
        name: "projects",
        file: "sections/projects.html",
        container: "projects-container"
    },

    {
        name: "contact",
        file: "sections/contact.html",
        container: "contact-container"
    },

    {
        name: "footer",
        file: "sections/footer.html",
        container: "footer-container"
    }

];


/* =========================================================
   LOAD SECTION
   ========================================================= */

async function loadSection(section) {

    const container =
        document.getElementById(section.container);


    /*
     * Make sure the container exists
     */

    if (!container) {

        console.error(
            `Container not found: ${section.container}`
        );

        return;

    }


    try {

        /*
         * Request the HTML file
         */

        const response =
            await fetch(section.file);


        /*
         * Check whether the file actually exists
         */

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status} - ${section.file}`
            );

        }


        /*
         * Read the HTML
         */

        const html =
            await response.text();


        /*
         * Insert HTML into the container
         */

        container.innerHTML = html;


        console.log(
            `Loaded section: ${section.name}`
        );


    } catch (error) {

        /*
         * Log the error to the browser console.

         * We deliberately do NOT insert the error
         * message into the website itself.
         *
         * This prevents a failed section from displaying
         * ugly NOT_FOUND text on the portfolio.
         */

        console.error(
            `Failed to load ${section.name}:`,
            error
        );

    }

}


/* =========================================================
   LOAD ALL SECTIONS
   ========================================================= */

async function loadAllSections() {

    for (const section of sections) {

        await loadSection(section);

    }

}


/* =========================================================
   MOBILE NAVIGATION
   ========================================================= */

function initializeMobileNavigation() {

    /*
     * Find the mobile menu button
     */

    const menuButton =
        document.querySelector(
            ".nav-toggle"
        );


    /*
     * Find the navigation menu
     */

    const navMenu =
        document.querySelector(
            ".nav-menu"
        );


    /*
     * If either element does not exist,
     * simply stop.
     */

    if (!menuButton || !navMenu) {

        return;

    }


    /*
     * Mobile menu button
     */

    menuButton.addEventListener(
        "click",
        function () {

            navMenu.classList.toggle(
                "active"
            );

            menuButton.classList.toggle(
                "active"
            );

        }
    );


    /*
     * Close mobile menu after
     * clicking a navigation link.
     */

    const navLinks =
        navMenu.querySelectorAll(
            "a"
        );


    navLinks.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function () {

                    navMenu.classList.remove(
                        "active"
                    );

                    menuButton.classList.remove(
                        "active"
                    );

                }
            );

        }
    );

}


/* =========================================================
   SMOOTH SCROLL
   ========================================================= */

function initializeSmoothScroll() {

    const links =
        document.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(
        function (link) {

            link.addEventListener(
                "click",
                function (event) {

                    const targetId =
                        this.getAttribute(
                            "href"
                        );


                    /*
                     * Ignore empty anchors
                     */

                    if (
                        !targetId ||
                        targetId === "#"
                    ) {

                        return;

                    }


                    const target =
                        document.querySelector(
                            targetId
                        );


                    /*
                     * Scroll to the target section
                     */

                    if (target) {

                        event.preventDefault();

                        target.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );

}


/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

async function initializeWebsite() {

    /*
     * First load all HTML sections.
     */

    await loadAllSections();


    /*
     * Then initialize navigation.
     *
     * This is important because navbar.html
     * does not exist in the DOM until after
     * loadAllSections() finishes.
     */

    initializeMobileNavigation();


    /*
     * Initialize smooth scrolling.
     */

    initializeSmoothScroll();


    console.log(
        "Sohail Ahmed portfolio loaded successfully."
    );

}


/* =========================================================
   START WEBSITE
   ========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    initializeWebsite
);