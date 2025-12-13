function findProductById(id) {
    for (const brand in bikeCatalog) {
        const br = bikeCatalog[brand];
        for (const category in br) {
            const ct = br[category];
            for (const bike in ct) {
                const bi = ct[bike];
                if (bi.id === id) {
                    return bi;
                }
            }
        }
    }
}

const params = new URLSearchParams(window.location.search);
const id = parseInt(params.get("id"));

const bike = findProductById(id);
const container = document.querySelector(".bike-podium");
let breadCrumbActive = document.querySelector(".active");

if (bike) {
    document.title = bike.name;
    breadCrumbActive.textContent = bike.name;

    let card = document.createElement("div");
    card.classList.add("card", "bike-focus-card");

    if (bike.id === 39) {
        card.innerHTML = `
            <img src="${bike.img}" alt="${bike.name}" />
            <div class="card-body">
                <h5 class="card-title">${bike.name}</h5>
            </div>
            <p style='color: black; text-align:center; font-size:0.9rem;'>(foto ufficiale non disponibile, usata immagine Desmo450 MX)</p>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Cilindrata: ${bike.cilindrata}</li>
                <li class="list-group-item">Potenza: ${bike.potenza}</li>
                <li class="list-group-item">Prezzo: <span class='price'>${bike.prezzo}</span></li>
            </ul>
            <div class="card-body">
                <a href="./modelli.html" class="card-link">Torna A Modelli</a>
                <a href="./prenota.html?id=${bike.id}" class="card-link">Prenota test drive</a>
            </div>
        `;
    } else {
        card.innerHTML = `
            <img src="${bike.img}" alt="${bike.name}" />
            <div class="card-body">
                <h5 class="card-title">${bike.name}</h5>
            </div>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">Cilindrata: ${bike.cilindrata}</li>
                <li class="list-group-item">Potenza: ${bike.potenza}</li>
                <li class="list-group-item">Prezzo: <span class='price'>${bike.prezzo}</span></li>
            </ul>
            <div class="card-body">
                <a href="./modelli.html" class="card-link">Torna A Modelli</a>
                <a href="./prenota.html?id=${bike.id}" class="card-link">Prenota test drive</a>
            </div>
        `;
    }

    container.appendChild(card);
} else {
    containerp.innerHTML = "<p>Bike not found!</p>";
}
