document.addEventListener("DOMContentLoaded", () => {
    // feedback form
    const feedbackForm = document.getElementById("feedback-form");
    const feedbackThanks = document.getElementById("feedback-thanks");
    const feedbackIntro = document.getElementById("feedback-intro");
    if (feedbackForm && feedbackThanks) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault();
            // TODO: send to backend or Google Forms
            feedbackForm.style.display = "none";
            if (feedbackIntro) feedbackIntro.style.display = "none";
            feedbackThanks.style.display = "";
        });
    }
});