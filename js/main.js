/* =========================================================
   SOHAIL AHMED PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   SECTION CONFIGURATION
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
   LOAD ONE SECTION
   ========================================================= */

async function loadSection(section) {

    const container =
        document.getElementById(section.container);


    /* Make sure the container exists */

    if (!container) {

        console.error(
            "Container not found:",
            section.container
        );

        return false;

    }


    try {

        const response =
            await fetch(section.file);


        /* Check if file exists */

        if (!response.ok) {

            throw new Error(
                `HTTP ${response.status}: ${section.file}`
            );

        }


        const html =
            await response.text();


        /* Insert section HTML */

        container.innerHTML = html;


        console.log(
            `Loaded: ${section.file}`
        );


        return true;


    } catch (error) {

        console.error(
            `Failed to load ${section.file}`,
            error
        );


        return false;

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
   NAVIGATION TARGET MAP
   =========================================================

   The links use:

       #about
       #skills
       #education
       #experience
       #projects
       #contact

   But the actual containers are:

       #about-container
       #skills-container
       #education-container
       #experience-container
       #projects-container
       #contact-container

   This map connects the two.
   ========================================================= */

const navigationTargets = {

    home: "hero-container",

    about: "about-container",

    skills: "skills-container",

    education: "education-container",

    experience: "experience-container",

    projects: "projects-container",

    contact: "contact-container"

};


/* =========================================================
   SCROLL TO SECTION
   ========================================================= */

function scrollToSection(sectionName) {

    const containerId =
        navigationTargets[sectionName];


    /* If the target isn't in our map, stop */

    if (!containerId) {

        return false;

    }


    const target =
        document.getElementById(containerId);


    /* Make sure target exists */

    if (!target) {

        console.error(
            "Navigation target not found:",
            containerId
        );

        return false;

    }


    /*
     * Get navbar height.
     *
     * This prevents the section heading from being
     * hidden underneath a fixed/sticky navbar.
     */

    const navbar =
        document.querySelector(".navbar");


    const navbarHeight =
        navbar
            ? navbar.offsetHeight
            : 0;


    const targetPosition =
        target.getBoundingClientRect().top
        + window.scrollY
        - navbarHeight
        - 10;


    window.scrollTo({

        top: Math.max(targetPosition, 0),

        behavior: "smooth"

    });


    return true;

}


/* =========================================================
   NAVIGATION CLICK HANDLER
   =========================================================

   Event delegation is used because the navbar is loaded
   dynamically by JavaScript.
   ========================================================= */

function initializeNavigation() {

    document.addEventListener(
        "click",
        function (event) {

            /*
             * Find the closest link that has an href.
             */

            const link =
                event.target.closest(
                    "a[href]"
                );


            /*
             * Ignore clicks that aren't links.
             */

            if (!link) {

                return;

            }


            const href =
                link.getAttribute("href");


            /*
             * Ignore external links.
             *
             * Examples:
             *
             * https://...
             * mailto:...
             * tel:...
             */

            if (
                !href ||
                href.startsWith("http://") ||
                href.startsWith("https://") ||
                href.startsWith("mailto:") ||
                href.startsWith("tel:")
            ) {

                return;

            }


            /*
             * Only process anchor links.
             */

            if (!href.startsWith("#")) {

                return;

            }


            /*
             * Remove the # symbol.
             */

            const sectionName =
                href.substring(1);


            /*
             * Check whether this is one of our
             * portfolio navigation targets.
             */

            if (
                !navigationTargets[
                    sectionName
                ]
            ) {

                return;

            }


            /*
             * Prevent the browser's default jump.
             */

            event.preventDefault();


            /*
             * Scroll to the correct section.
             */

            const didScroll =
                scrollToSection(
                    sectionName
                );


            /*
             * Close mobile menu.
             */

            if (didScroll) {

                closeMobileMenu();

            }


            /*
             * Update URL without reloading
             * the page.
             */

            if (
                window.history &&
                window.history.pushState
            ) {

                window.history.pushState(
                    null,
                    "",
                    `#${sectionName}`
                );

            }

        }
    );

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function initializeMobileNavigation() {

    /*
     * Event delegation is used here too.
     *
     * This works even though navbar.html is loaded
     * dynamically.
     */

    document.addEventListener(
        "click",
        function (event) {

            const menuButton =
                event.target.closest(
                    ".nav-toggle"
                );


            if (!menuButton) {

                return;

            }


            const navMenu =
                document.querySelector(
                    ".nav-menu"
                );


            if (!navMenu) {

                console.error(
                    "Mobile navigation menu not found."
                );

                return;

            }


            navMenu.classList.toggle(
                "active"
            );


            menuButton.classList.toggle(
                "active"
            );

        }
    );

}


/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const navMenu =
        document.querySelector(
            ".nav-menu"
        );


    const menuButton =
        document.querySelector(
            ".nav-toggle"
        );


    if (navMenu) {

        navMenu.classList.remove(
            "active"
        );

    }


    if (menuButton) {

        menuButton.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   HANDLE INITIAL URL HASH
   =========================================================

   Example:

       kappa.vercel.app/#projects

   The page will automatically scroll to Projects.
   ========================================================= */

function handleInitialHash() {

    const hash =
        window.location.hash;


    if (!hash) {

        return;

    }


    const sectionName =
        hash.substring(1);


    if (
        navigationTargets[
            sectionName
        ]
    ) {

        /*
         * Small delay gives the dynamically loaded
         * sections time to render.
         */

        setTimeout(
            function () {

                scrollToSection(
                    sectionName
                );

            },
            200
        );

    }

}


/* =========================================================
   INITIALIZE WEBSITE
   ========================================================= */

async function initializeWebsite() {

    console.log(
        "Starting Sohail Ahmed portfolio..."
    );


    /*
     * Load all HTML sections first.
     */

    await loadAllSections();


    /*
     * Initialize navigation.
     */

    initializeNavigation();


    /*
     * Initialize mobile menu.
     */

    initializeMobileNavigation();


    /*
     * Handle URL hash if present.
     */

    handleInitialHash();


    console.log(
        "Sohail Ahmed portfolio loaded successfully."
    );

}


/* =========================================================
   START
   ========================================================= */

if (
    document.readyState === "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initializeWebsite
    );

} else {

    initializeWebsite();

}