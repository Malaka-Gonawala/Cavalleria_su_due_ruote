let container = document.querySelector(".bike-grid");
let choose = document.querySelector("#choose");

let currentBrand = null;
let currentCategory = null;

function loadBrands() {
    container.className = "bike-grid brands";

    container.innerHTML = "";
    currentBrand = null;
    currentCategory = null;

    for (const brand in bikeCatalog) {
        const br = bikeCatalog[brand];

        let card = document.createElement("div");
        card.classList.add("card", "brand-card");

        card.innerHTML = `
            <img 
                src="${br.logo}" 
                class="card-img-top" 
                alt="${brand} logo"
                data-brand="${brand}"
            >
        `;

        container.appendChild(card);

        card.addEventListener("click", () => {
            let img = card.querySelector("img");
            loadCategories(img);
        });
    }
}

function loadCategories(b) {
    container.className = "bike-grid categories";

    choose.textContent = "Scegli categoria";
    container.innerHTML = "";

    const brand = b.dataset.brand;
    currentBrand = brand;
    const br = bikeCatalog[brand];

    const backBtn = document.createElement("button");
    backBtn.textContent = "← Back to Brands";
    backBtn.classList.add("btn", "btn-secondary");
    backBtn.addEventListener("click", loadBrands);
    container.appendChild(backBtn);

    for (const category in br) {
        if (category.toLowerCase() === "logo") continue;

        let card = document.createElement("div");
        card.classList.add("card", "category-card");

        card.innerHTML = `
            <h1 style="color: black; text-transform: capitalize;" 
                data-brand="${brand}" 
                data-category="${category}">
                ${category}
            </h1>
        `;

        container.appendChild(card);

        card.addEventListener("click", () => {
            let h1 = card.querySelector("h1");
            loadBikes(h1);
        });
    }
}

function loadBikes(c) {
    container.className = "bike-grid bikes";

    choose.textContent = "\n";
    container.innerHTML = "";

    const brand = c.dataset.brand;
    const category = c.dataset.category;
    currentCategory = category;
    const ct = bikeCatalog[brand][category];

    const backBtn = document.createElement("button");
    backBtn.textContent = "← Back to Categories";
    backBtn.classList.add("btn", "btn-secondary");
    backBtn.addEventListener("click", () => {
        loadCategories({ dataset: { brand } });
    });
    container.appendChild(backBtn);

    for (const bike in ct) {
        let bi = ct[bike];
        let card = document.createElement("div");
        card.classList.add("card", "bike-card");

        if (bi.id === 39) {
            card.innerHTML = `
            <img src="${bi.img}" alt="${bi.name}" />
            <div class="card-body"style='padding-bottom: 5px;'>
                <h5 class="card-title" >${bi.name}</h5>
                
            </div>
            <p style='color: black; text-align:center; font-size:0.7rem;'>(foto ufficiale non disponibile, usata immagine Desmo450 MX)</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Prezzo: <span class='price'>${bi.prezzo}</span></li>
            </ul>
            <div class="card-body">
                <a href="./modelli_focus.html?id=${bi.id}" class="card-link">Vedi Dettagli</a>
                <a href="./prenota.html?id=${bi.id}" class="card-link">Prenota test drive</a>
            </div>
        `;
        } else {
            card.innerHTML = `
            <img src="${bi.img}" alt="${bi.name}" />
            <div class="card-body">
                <h5 class="card-title">${bi.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Prezzo: <span class='price'>${bi.prezzo}</span></li>
            </ul>
            <div class="card-body">
                <a href="./modelli_focus.html?id=${bi.id}" class="card-link">Vedi Dettagli</a>
                <a href="./prenota.html?id=${bi.id}" class="card-link">Prenota test drive</a>
            </div>
        `;
        }

        container.appendChild(card);
    }
}

window.addEventListener("load", loadBrands);
