const formContainer = document.querySelector("#Form-Container");
const form = document.querySelector("#Form");
const inputs = form.querySelectorAll("input, select");
const nameInput = document.querySelector("#nameInput");
const tel = document.querySelector("#phoneInput");
const select = document.querySelector("#bikeSelect");
const choose = document.querySelector("#Choose");
const dateInput = document.querySelector("#dateInput");
const timeInput = document.querySelector("#timeInput");

const date = new Date();

const dayToday = String(date.getDate()).padStart(2, "0");
const monthToday = String(date.getMonth() + 1).padStart(2, "0");
const yearToday = String(date.getFullYear());
const today = `${yearToday}-${monthToday}-${dayToday}`;

const startTime = "09:00";
const endTime = "21:00";
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

    // Fill bike select
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get("id"));

    function findProductById(id) {
        for (const brand in bikeCatalog) {
            const categories = bikeCatalog[brand];
            for (const category in categories) {
                const bikes = categories[category];
                for (const key in bikes) {
                    const bike = bikes[key];
                    if (bike && typeof bike === "object" && bike.id === id) {
                        return bike;
                    }
                }
            }
        }
        return null;
    }

    const selectedBike = findProductById(id);

    function fillSelect() {
        for (const brand in bikeCatalog) {
            const categories = bikeCatalog[brand];
            for (const category in categories) {
                const bikes = categories[category];

                if (category === "logo") continue;

                const group = document.createElement("optgroup");
                group.label = `${brand} – ${category}`;

                for (const key in bikes) {
                    const bike = bikes[key];
                    if (!bike || typeof bike !== "object") continue;

                    const option = document.createElement("option");
                    option.textContent = bike.name;
                    option.value = bike.id ?? bike.name;

                    if (selectedBike && bike.id === selectedBike.id) {
                        option.selected = true;
                        select.classList.add("is-valid");
                    }

                    group.appendChild(option);
                }

                select.appendChild(group);
            }
        }
    }

    fillSelect();
    if (!selectedBike) choose.selected = true;
})();

let invalidDate = document.querySelector("#invalid-feedback-date");
invalidDate.textContent = `Inserisci una data successiva o uguale a ${dayToday}/${monthToday}/${yearToday}.`;
dateInput.setAttribute("min", today);
form.addEventListener("submit", () => {
    if (
        nameInput.value !== "" &&
        tel.value !== "" &&
        select.value !== choose.value &&
        dateInput.value >= today &&
        timeInput.value >= startTime &&
        timeInput.value < endTime
    ) {
        const nameFormatted =
            nameInput.value.charAt(0).toUpperCase() +
            nameInput.value.slice(1).toLowerCase();

        const un = localStorage.getItem("name");
        const loggedin = localStorage.getItem("loggedin");
        console.log(un, loggedin);
        let matched = false;
        for (const account in accounts) {
            a = accounts[account];
            if (
                (nameFormatted === un && loggedin === "true") ||
                nameFormatted === a.name
            ) {
                matched = true;
                formContainer.innerHTML = "";
                form.classList.remove("was-validated");
                inputs.forEach((input) =>
                    input.classList.remove("is-valid", "is-invalid")
                );

                formContainer.style.height = "50vh";
                formContainer.innerHTML = `<div class="success">
                                            <h2>Prenotazione effettuata!</h2>
                                            <p>Grazie per la tua richiesta ${nameFormatted}. Ti contatteremo presto.</p>
                                            <a href='prenota.html'>Effettua un’altra prenotazione</a>
                                           </div>`;

                form.reset();
                break;
            } else if (nameFormatted === un && loggedin === "false") {
                window.location.href = "./login.html";
                return;
            }
        }

        if (!matched) {
            window.location.href = "./registra.html";
        }
    }
});
