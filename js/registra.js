const formContainer = document.querySelector("#Form-Container");
const form = document.querySelector("#Form");
const inputs = form.querySelectorAll("input");
const nameInput = document.querySelector("#nameInput");
const emailInput = document.querySelector("#emailInput");
const passInput1 = document.querySelector("#passInput1");
const passInput2 = document.querySelector("#passInput2");

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
    });

    // Live validation
    inputs.forEach((input) => {
        const validate = () => {
            if (input.checkValidity()) {
                input.classList.add("is-valid");
                input.classList.remove("is-invalid");
            } else {
                input.classList.add("is-invalid");
                input.classList.remove("is-valid");
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
        const nameFormatted =
            nameInput.value.charAt(0).toUpperCase() +
            nameInput.value.slice(1).toLowerCase();
        console.log(nameFormatted);
        const hashedPass = await hash(passInput1.value);
        localStorage.setItem("name", nameFormatted);
        localStorage.setItem("email", emailInput.value);
        localStorage.setItem("password", hashedPass);
        localStorage.setItem("loggedin", "false");
        form.reset();
        window.location.href = "./login.html";
    } else if (passInput1.value !== passInput2.value) {
        alert("Passwords do not match!");
    } else {
        alert("Please fill in all fields!");
    }
});
