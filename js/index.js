const disclaimerContainer = document.querySelector(
    "#Disclaimer-Modal-Container"
);
const disclaimerModal = document.querySelector("#Disclaimer-Modal");
const btnRedirectDisclaimer = document.querySelector("#Redirect-Disclaimer");

window.addEventListener("load", () => {
    const hasSeenModal = localStorage.getItem("modalOpened");

    if (hasSeenModal !== "true") {
        disclaimerContainer.classList.add("disclaimer-opened");
        disclaimerModal.classList.add("disclaimer-opened");
        document.body.classList.add("disclaimer-opened-body");
    }
});

btnRedirectDisclaimer.addEventListener("click", () => {
    localStorage.setItem("modalOpened", "true");

    disclaimerContainer.classList.remove("disclaimer-opened");
    disclaimerModal.classList.remove("disclaimer-opened");
    document.body.classList.remove("disclaimer-opened-body");

    window.location.href = "./html/disclaimer.html";
});
