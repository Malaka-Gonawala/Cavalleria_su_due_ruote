let btnOpenNav = document.querySelector("#OpenNav");
let nav = document.querySelector("#Nav");
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
let scrollTimeout;
let minScrollHeight;
let loc = window.location.pathname;
console.log(loc)

if (loc.contains("/html/modelli.html") ||
    loc.contains("/html/modelli_focus.html")) {
  minScrollHeight = title.scrollHeight * 2;
} else {
  minScrollHeight = title.scrollHeight;
}

const fixTitle = () => {
  if (window.scrollY < minScrollHeight) {
    clearTimeout(scrollTimeout);
    title.classList.remove("start-scroll");
    title.style.opacity = 1;
    title.style.pointerEvents = "auto";
    return;
  }
  title.classList.add("start-scroll");
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
