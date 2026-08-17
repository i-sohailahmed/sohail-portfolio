/* =========================================================
   SOHAIL AHMED PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */


/* =========================================================
   START WEBSITE
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /*
    Always start at the top of the website.

    This prevents the browser from reopening the page at
    the previous footer/section position.
    */

    window.scrollTo(0, 0);

    loadWebsite();

});


/* =========================================================
   LOAD ALL WEBSITE SECTIONS
   ========================================================= */

async function loadWebsite() {

    const page = document.getElementById("page");

    if (!page) {

        console.error(
            "ERROR: #page element was not found."
        );

        return;
    }


    /*
    ---------------------------------------------------------
    IMPORTANT

    These filenames exactly match your current folder.
    ---------------------------------------------------------
    */

    const sections = [

        "navbar.html",

        "hero.html",

        "about.html",

        "skills.html",

        "education.html",

        "experience.html",

        "projects.html",

        "contact.html",

        "footer.html"

    ];


    /*
    ---------------------------------------------------------
    Remove loading message
    ---------------------------------------------------------
    */

    page.innerHTML = "";


    /*
    ---------------------------------------------------------
    Load sections one by one
    ---------------------------------------------------------
    */

    for (const section of sections) {

        try {

            const response = await fetch(
                `sections/${section}`
            );


            /*
            Check whether the file actually exists
            */

            if (!response.ok) {

                throw new Error(
                    `${section} returned HTTP ${response.status}`
                );

            }


            const html = await response.text();


            /*
            Insert the section into the page
            */

            page.insertAdjacentHTML(
                "beforeend",
                html
            );


        } catch (error) {

            /*
            Do NOT stop the entire website if one section
            has a problem.

            The remaining sections will still load.
            */

            console.error(
                `Could not load ${section}:`,
                error
            );

        }

    }


    /*
    ---------------------------------------------------------
    Setup navigation AFTER all sections are loaded
    ---------------------------------------------------------
    */

    setupNavigation();


    /*
    ---------------------------------------------------------
    Setup mobile menu AFTER navbar is loaded
    ---------------------------------------------------------
    */

    setupMobileMenu();


    /*
    ---------------------------------------------------------
    Setup hero buttons and other internal links
    ---------------------------------------------------------
    */

    setupInternalLinks();


    /*
    ---------------------------------------------------------
    Make sure page remains at the top after loading
    ---------------------------------------------------------
    */

    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant"
    });

}


/* =========================================================
   NAVIGATION
   ========================================================= */

function setupNavigation() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    this.getAttribute("href");


                /*
                Ignore empty links
                */

                if (
                    !targetId ||
                    targetId === "#"
                ) {

                    return;

                }


                const target =
                    document.querySelector(targetId);


                /*
                If target does not exist, don't break
                the website.
                */

                if (!target) {

                    console.warn(
                        `Navigation target ${targetId} was not found.`
                    );

                    return;

                }


                event.preventDefault();


                /*
                Smoothly move to target section
                */

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });


                /*
                Update URL without causing the browser
                to jump unexpectedly.
                */

                if (
                    window.history &&
                    window.history.pushState
                ) {

                    window.history.pushState(
                        null,
                        "",
                        targetId
                    );

                }


                /*
                Close mobile menu after navigation
                */

                closeMobileMenu();

            }
        );

    });

}


/* =========================================================
   INTERNAL LINKS
   ========================================================= */

function setupInternalLinks() {

    const links = document.querySelectorAll(
        'a[href^="#"]'
    );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                /*
                This function intentionally remains simple.

                The actual scrolling is handled by
                setupNavigation().
                */

            }
        );

    });

}


/* =========================================================
   MOBILE MENU
   ========================================================= */

function setupMobileMenu() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    /*
    If the current navbar doesn't contain a mobile menu,
    simply skip this function.

    This allows us to build the navbar later without
    breaking the foundation.
    */

    if (
        !menuButton ||
        !navLinks
    ) {

        console.log(
            "Mobile menu controls not found yet."
        );

        return;

    }


    /*
    ---------------------------------------------------------
    Menu button click
    ---------------------------------------------------------
    */

    menuButton.addEventListener(
        "click",
        function () {

            navLinks.classList.toggle(
                "active"
            );

            menuButton.classList.toggle(
                "active"
            );


            /*
            Accessibility state
            */

            const expanded =
                menuButton.classList.contains(
                    "active"
                );


            menuButton.setAttribute(
                "aria-expanded",
                expanded
            );

        }
    );


    /*
    ---------------------------------------------------------
    Close menu when a navigation link is clicked
    ---------------------------------------------------------
    */

    const links =
        navLinks.querySelectorAll(
            'a[href^="#"]'
        );


    links.forEach(function (link) {

        link.addEventListener(
            "click",
            function () {

                closeMobileMenu();

            }
        );

    });

}


/* =========================================================
   CLOSE MOBILE MENU
   ========================================================= */

function closeMobileMenu() {

    const menuButton =
        document.querySelector(".menu-toggle");

    const navLinks =
        document.querySelector(".nav-links");


    if (navLinks) {

        navLinks.classList.remove(
            "active"
        );

    }


    if (menuButton) {

        menuButton.classList.remove(
            "active"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

    }

}


/* =========================================================
   ESCAPE KEY
   ========================================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (event.key === "Escape") {

            closeMobileMenu();

        }

    }
);


/* =========================================================
   PREVENT HASH FROM FORCING PAGE TO AN OLD SECTION
   ========================================================= */

if (
    window.location.hash &&
    performance.getEntriesByType("navigation")[0]
) {

    /*
    We intentionally do NOT automatically jump to an old
    section when the portfolio initially loads.

    The user should control navigation through the navbar.
    */

    history.replaceState(
        null,
        "",
        window.location.pathname +
        window.location.search
    );

}