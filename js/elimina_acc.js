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
    inputs.forEach((input) => input.classList.remove("is-valid", "is-invalid"));
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
    const nameFormattedArr = String(nameInput.value).split(" ");
    for (let i = 0; i < nameFormattedArr.length; i++) {
      nameFormattedArr[i] =
        nameFormattedArr[i].charAt(0).toUpperCase() +
        nameFormattedArr[i].slice(1).toLowerCase();
    }

    const nameFormatted = nameFormattedArr.join(" ");

    const hashedPass = await hash(passInput1.value);

    let registeredAccounts =
      JSON.parse(localStorage.getItem("registeredAccounts")) || {};

    const loggedinAccName = localStorage.getItem("loggedinAccName");

    const account = registeredAccounts[loggedinAccName];

    if (nameFormatted !== loggedinAccName) {
      risultato.textContent =
        "Il nome inserito non corrisponde all’account attuale.";
      risultato.style.color = "#ff2a2a";
      return;
    } else if (
      emailInput.value !== account.email ||
      hashedPass !== account.password
    ) {
      risultato.textContent = "Email o Password non corretti.";
      risultato.style.color = "#ff2a2a";
      return;
    } else {
      risultato.textContent = "Account eliminato con successo!";
      risultato.style.color = "#89f089";
      delete registeredAccounts[nameFormatted];
      for (const otherAcc in registeredAccounts) {
        if (otherAcc !== nameFormatted) {
          registeredAccounts[otherAcc].loggedin = false;
        }
      }

      // Save updated accounts
      localStorage.setItem(
        "registeredAccounts",
        JSON.stringify(registeredAccounts),
      );

      localStorage.setItem("loggedin", "false");
      localStorage.removeItem("loggedinAccName");

      setTimeout(() => {
        form.reset();
        window.location.href = "./registra.html";
      }, 1000);
    }
  }
});
