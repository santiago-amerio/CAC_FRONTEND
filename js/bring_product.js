const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});

async function bring_product_list(category = 1) {
    fetch('https://thiagosch.pythonanywhere.com/product', {
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then((response) => response.json())
        .then((json) => {
            console.log(params.ee)
            let container = document.getElementById("catalogo")

            for (let product in json) {
                product = json[product]
                let template = document.createElement("div")
                if (params.category) {
                    if (params.category != product["categoria"]) {
                        console.log(product["categoria"])
                        continue
                    }
                }
                
                template.innerHTML = `
                    <div class="grid-item-catalogo">
                        <p class="tipo-prod">${"category"}</p>
                        <p class="modelo-prod">${product["modelo"]}</p>
                        <img class="img-prod" src="${product["imagen"]}" alt="" />
                        <p class="caract-prod">Potencia bruta SAE j1995</p>
                        <p class="valor-caract-prod">${product["pb"]}</p>
                        <p class="caract-prod">Capacidad de carga nominal</p>
                        <p class="valor-caract-prod">${product["ccn"]}</p>
                        <p class="caract-prod">Peso de funcionamiento</p>
                        <p class="valor-caract-prod">${product["pf"]}</p>

                        <input class="button" type="button" value="agregar al carrito" />
                    </div>
                `
                container.appendChild(template)

            }


        });

}

