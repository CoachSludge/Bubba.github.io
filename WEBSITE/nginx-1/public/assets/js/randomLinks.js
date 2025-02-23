document.addEventListener("DOMContentLoaded", function () {
    const linkSites = [
        "https://www.bubba.industries/frank",
        "https://www.bubba.industries/alasdair",
        "https://www.bubba.industries/rob",
        "https://www.bubba.industries/coachsludge",
        "https://www.bubba.industries/dansker",
        "https://www.bubba.industries/poopstain"
    ];

    function getRandomSite() {
        return linkSites[Math.floor(Math.random() * linkSites.length)];
    }

    // Ensure the element exists before modifying it
    const randomLink = document.getElementById("randomLink");
    if (randomLink) {
        randomLink.setAttribute("href", getRandomSite());
    }
});
