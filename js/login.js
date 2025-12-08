const formContainer = document.querySelector("#Form-Container");
const form = document.querySelector("#Form");
const inputs = form.querySelectorAll("input");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const passInput = document.querySelector("#passInput");
const risultato = document.querySelector("#Risultato");
(() => {
    "use strict";

    // Bootstrap validation setup
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        form.classList.add("was-validated");
    });

    form.addEventListener("reset", () => {
        form.classList.remove("was-validated");
        inputs.forEach((input) =>
            input.classList.remove("is-valid", "is-invalid")
        );
        risultato.textContent = "";
    });

    // Live validation
    inputs.forEach((input) => {
        const validate = () => {
            if (input.checkValidity()) {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
                risultato.textContent = "";
            } else {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
                risultato.textContent = "";
            }
        };

        input.addEventListener("input", validate);
        input.addEventListener("change", validate);
    });
})();

const loggedin = localStorage.getItem("loggedin");
if (loggedin === "true") {
    registraBtn.textContent = "Disconnetti";
    accediLink.style.display = "none";
} else {
    registraBtn.textContent = "Registra";
    accediLink.style.display = "inline";
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const registeredName = localStorage.getItem("name");
    const registeredEmail = localStorage.getItem("email");
    const registeredPass = localStorage.getItem("password");

    if (
        nameInput.value !== "" &&
        emailInput.value !== "" &&
        passInput.value !== ""
    ) {
        const nameFormatted =
            nameInput.value.charAt(0).toUpperCase() +
            nameInput.value.slice(1).toLowerCase();
        const hashedPass = await hash(passInput.value);
        console.log(hashedPass);
        console.log(registeredPass);
        if (nameFormatted !== registeredName) {
            risultato.textContent =
                "Il nome inserito non corrisponde a nessun account.";
            risultato.style.color = "#ff2a2a";
            return;
        } else if (
            emailInput.value !== registeredEmail ||
            hashedPass !== registeredPass
        ) {
            risultato.textContent = "Email o Password non corretti.";
            risultato.style.color = "#ff2a2a";
            return;
        } else {
            risultato.textContent = "Login effettuato con successo!";
            risultato.style.color = "#89f089";
            localStorage.setItem("loggedin", "true");
            registraBtn.textContent = "Disconnetti";
            accediLink.style.display = "none";
        }
    }
    setTimeout(() => {
        form.reset();
        window.location.href = "../index.html";
    }, 1000);
});
registraBtn.addEventListener("click", () => {
    const loggedin = localStorage.getItem("loggedin");

    if (loggedin === "true") {
        registraBtn.textContent = "Disconnetti";
        accediLink.style.display = "none";
    } else if (loggedin === "false") {
        registraBtn.textContent = "Registra";
        accediLink.style.display = "inline";
    }

    if (registraBtn.textContent === "Registra" && loggedin === "false") {
        if (loc.includes("index.html")) {
            window.location.href = "./html/registra.html";
        } else {
            window.location.href = "./registra.html";
        }
    } else if (
        registraBtn.textContent === "Disconnetti" &&
        loggedin === "true"
    ) {
        localStorage.setItem("loggedin", "false");
        registraBtn.textContent = "Registra";
        accediLink.style.display = "inline";
    }
});
