const btnOpenNav = document.querySelector("#OpenNav");
const nav = document.querySelector("#Nav");
const navUl = document.querySelector("#Nav-Ul");
let navOpened = false;

function toggleNav() {
  nav.classList.toggle("open");
  btnOpenNav.classList.toggle("active");
  navOpened = nav.classList.contains("open");
  fixTitle();
}
btnOpenNav.addEventListener("click", toggleNav);

window.addEventListener("click", function (e) {
  if (nav.classList.contains("open")) {
    if (!nav.contains(e.target) && !btnOpenNav.contains(e.target)) {
      nav.classList.remove("open");
      btnOpenNav.classList.remove("active");
      navOpened = false;
      fixTitle();
    }
  }
});

// --------------------------------------------

let title = document.querySelector("#Title-Container");
let main = document.querySelector("#Main");
let footer = document.querySelector("#Footer");
let scrollTimeout;
let minScrollHeight = title.scrollHeight;

const fixTitle = () => {
  if (window.scrollY < minScrollHeight) {
    clearTimeout(scrollTimeout);
    title.classList.remove("start-scroll");
    if (main && footer) {
      main.classList.remove("scroll-start");
      footer.classList.remove("scroll-start");
    }
    title.style.opacity = 1;
    title.style.pointerEvents = "auto";
    return;
  }
  title.classList.add("start-scroll");
  if (main && footer) {
    main.classList.add("scroll-start");
    footer.classList.add("scroll-start");
  }
  title.style.opacity = 1;
  title.style.pointerEvents = "auto";

  clearTimeout(scrollTimeout);

  if (navOpened === false) {
    scrollTimeout = setTimeout(() => {
      title.style.pointerEvents = "none";
      title.style.opacity = 0;
    }, 1000);
  }
};

window.addEventListener("scroll", fixTitle);

// Registra
if (localStorage.getItem("loggedin") === null) {
  localStorage.setItem("loggedin", "false");
}

let registraBtn = document.querySelector("#Registra-Btn");
const accediLink = document.querySelector("#Accedi-Link");
let eliminaAccountBtn = null;

document.addEventListener("DOMContentLoaded", () => {
  const loggedin = localStorage.getItem("loggedin");

  if (loggedin === "true") {
    registraBtn.textContent = "Disconnetti";
    accediLink.style.display = "none";
    eliminaBtn();
  } else {
    registraBtn.textContent = "Registra";
    accediLink.style.display = "inline";
    eliminaBtn();
  }

  const path = window.location.pathname;
  registraBtn.addEventListener("click", () => {
    const loggedin = localStorage.getItem("loggedin");
    const registeredAccounts = JSON.parse(
      localStorage.getItem("registeredAccounts"),
    );
    const loggedinAccName = localStorage.getItem("loggedinAccName");

    if (loggedin === "true") {
      registraBtn.textContent = "Disconnetti";
      accediLink.style.display = "none";
      eliminaBtn();
    } else if (loggedin === "false") {
      registraBtn.textContent = "Registra";
      accediLink.style.display = "inline";
      eliminaBtn();
    }

    // Reistrare o Disconnettere
    if (registraBtn.textContent === "Registra" && loggedin === "false") {
      if (path.endsWith("/") || path.endsWith("/index.html")) {
        window.location.href = "./html/registra.html";
      } else {
        window.location.href = "../html/registra.html";
      }
    } else if (
      registraBtn.textContent === "Disconnetti" &&
      loggedin === "true"
    ) {
      localStorage.setItem("loggedin", "false");
      registraBtn.textContent = "Registra";
      eliminaBtn();
      accediLink.style.display = "inline";
      registeredAccounts[loggedinAccName].loggedin = false;
      localStorage.setItem(
        "registeredAccounts",
        JSON.stringify(registeredAccounts),
      );
      localStorage.removeItem("loggedinAccName");
    }
  });

  // Eliminare pagina
  if (eliminaAccountBtn) {
    eliminaAccountBtn.addEventListener("click", () => {
      if (path.endsWith("/") || path.endsWith("/index.html")) {
        window.location.href = "./html/elimina_acc.html";
      } else {
        window.location.href = "../html/elimina_acc.html";
      }
    });
  } else {
    return;
  }
});

// async function encoding passwords
async function hash(text) {
  const encoder = new TextEncoder();
  const data = encoder.encode(text);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

console.log(window.innerWidth);

function eliminaBtn() {
  const isLogged = localStorage.getItem("loggedin") === "true";

  if (isLogged) {
    if (!eliminaAccountBtn) {
      eliminaAccountBtn = document.createElement("button");
      eliminaAccountBtn.id = "Elimina-Btn";
      eliminaAccountBtn.type = "button";
      eliminaAccountBtn.classList.add("btn", "btn-secondary");
      eliminaAccountBtn.textContent = "Elimina Account";

      navUl.appendChild(eliminaAccountBtn);
    }
  } else {
    if (eliminaAccountBtn) {
      eliminaAccountBtn.remove();
      eliminaAccountBtn = null;
    }
  }
}
