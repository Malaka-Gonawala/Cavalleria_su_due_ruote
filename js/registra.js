const formContainer = document.querySelector("#Form-Container");
const form = document.querySelector("#Form");
const inputs = form.querySelectorAll("input");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const passInput1 = document.querySelector("#passInput1");
const passInput2 = document.querySelector("#passInput2");
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

form.addEventListener("submit", async () => {
    if (
        nameInput.value !== "" &&
        emailInput.value !== "" &&
        passInput1.value !== "" &&
        passInput2.value !== "" &&
        passInput1.value === passInput2.value
    ) {
        // const nameFormatted =
        //     nameInput.value.charAt(0).toUpperCase() +
        //     nameInput.value.slice(1).toLowerCase();

        const nameFormattedArr = String(nameInput.value).split(" ");
        for (let i = 0; i < nameFormattedArr.length; i++) {
            nameFormattedArr[i] =
                nameFormattedArr[i].charAt(0).toUpperCase() +
                nameFormattedArr[i].slice(1).toLowerCase();
        }

        const nameFormatted = nameFormattedArr.join(" ");

        const hashedPass = await hash(passInput1.value);

        const accoutDetails = {
            name: nameFormatted,
            email: emailInput.value,
            password: hashedPass,
            loggedin: false,
        };

        let registeredAccounts =
            JSON.parse(localStorage.getItem("registeredAccounts")) || {};

        registeredAccounts[nameFormatted] = accoutDetails;

        localStorage.setItem(
            "registeredAccounts",
            JSON.stringify(registeredAccounts)
        );
        form.reset();
        window.location.href = "./login.html";
    } else if (passInput1.value !== passInput2.value) {
        risultato.textContent = "Le password non corrispondono.";
        risultato.style.color = "#ff2a2a";
    } else {
        risultato.textContent = "È necessario compilare tutti i campi!";
        risultato.style.color = "#ff2a2a";
    }
});
