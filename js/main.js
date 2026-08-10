const sections = [
    "navbar",
    "hero",
    "stats",
    "about",
    "skills",
    "education",
    "experience",
    "projects",
    "contact",
    "footer"
];

sections.forEach(function(section) {
    fetch(`sections/${section}.html`)
        .then(response => response.text())
        .then(data => {
            document.getElementById(section).innerHTML = data;
        });
});