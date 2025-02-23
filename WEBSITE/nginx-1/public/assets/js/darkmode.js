document.addEventListener("DOMContentLoaded", function () {
    const htmlElement = document.documentElement;
    const themeToggleButton = document.getElementById("themeToggle");
    const themeText = document.getElementById("themeText");

    function updateThemeText() {
        if (htmlElement.classList.contains("dark")) {
            themeText.textContent = "☀ Light Mode";
        } else {
            themeText.textContent = "🌙 Dark Mode";
        }
    }

    // Ensure the dark mode state persists
    if (localStorage.getItem("theme") === "dark") {
        htmlElement.classList.add("dark");
    } else {
        htmlElement.classList.remove("dark");
    }

    // Call updateThemeText() to set the correct text on load
    updateThemeText();

    // Attach event listener to the button
    if (themeToggleButton) {
        themeToggleButton.addEventListener("click", function () {
            htmlElement.classList.toggle("dark");

            // Save preference in localStorage
            localStorage.setItem("theme", htmlElement.classList.contains("dark") ? "dark" : "light");

            // Update button text
            updateThemeText();
        });
    }
});
