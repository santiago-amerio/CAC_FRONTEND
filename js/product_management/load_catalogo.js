const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let categorias
async function load_products(category) {
    let container = document.getElementById("catalogo")
    container.innerHTML = ""
    json = await get_product_list()
    for (let producto in json) {
        producto = json[producto]
        let template = document.createElement("div")
        if (category) {
            if (category != producto["categoria"]["id"]) {
                continue
            }
        }

        template.innerHTML = `
                    <div class="grid-item-catalogo">
                        <p class="tipo-prod">${producto["categoria"]["titulo"]}</p>
                        <p class="modelo-prod">${producto["modelo"]}</p>
                        <img class="img-prod" src="${producto["imagen"]}" alt="" />
                        <p class="caract-prod">Potencia bruta SAE j1995</p>
                        <p class="valor-caract-prod">${producto["pb"]}</p>
                        <p class="caract-prod">Capacidad de carga nominal</p>
                        <p class="valor-caract-prod">${producto["ccn"]}</p>
                        <p class="caract-prod">Peso de funcionamiento</p>
                        <p class="valor-caract-prod">${producto["pf"]}</p>

                        <input class="button" type="button" value="agregar al carrito" />
                    </div>
                `
        container.appendChild(template)

    }
}

async function load_categories() {

    categorias = await get_category_list()
    let container = document.getElementById("categorias")
    container.innerHTML = ""

    for (let category in categorias) {
        let template1 = document.createElement("a")
        category = categorias[category]
        console.log("cat", category)
        template1.innerHTML = `<a onclick="load_category(${category["id"]})">
                    <li class="filtro-maquinas">${category["titulo"]}</li>
                </a>`
        container.appendChild(template1)

    }

}

function load_category(category_id) {
    if (category_id == 0) {
        document.querySelector("#filtered-by").innerHTML = ""
        document.querySelector("#remove-filter").innerHTML = ""
        load_products()
    } else {
        category = categorias.find(obj => obj.id == category_id)
        document.querySelector("#filtered-by").innerHTML = category["titulo"]
        document.querySelector("#remove-filter").innerHTML = `<button onclick="load_category(0)">eliminar filtro</button>`
        load_products(category = category["id"])
    }
}



async function dropdown_prod_id_filler() {
    let json = await get_product_list(); // Await the function and capture the returned value
    let dropdown = document.querySelector("#pord-id")
    for (index in json) {
        let producto = json[index]
        let id = producto["id"]
        let modelo = producto["modelo"]

        let option = document.createElement("option")
        option.value = id
        option.innerHTML = modelo

        dropdown.append(option)
    }
}



async function dropdown_cat_filler() {
    let json = await get_category_list(); // Await the function and capture the returned value
    let dropdown = document.querySelector("#prod-cat")
    for (index in json) {
        let category = json[index]
        let title = category["titulo"]
        let id = category["id"]

        let option = document.createElement("option")
        option.value = id
        option.innerHTML = title

        dropdown.append(option)
    }
}



function toggle_editor_creator(e) {
    e.preventDefault();
    let toggler = document.querySelector("#edit_create_toggler")
    let id_selector = document.querySelector("#id_selector")
    let is_editor = id_selector.getAttribute("is_editor")
    let editor_title = document.querySelector("#editor_title")
    console.log(e)
    if (is_editor == "true") {
        id_selector.setAttribute("is_editor", "false")
        id_selector.innerHTML = `<select id="pord-id" placeholder="id">`
        toggler.innerHTML = "Crear nuevo"
        editor_title.innerHTML = "Estas editando un producto "
        dropdown_prod_id_filler()
    } else {
        id_selector.setAttribute("is_editor", "true")
        id_selector.innerHTML = ""
        toggler.innerHTML = "Editar"
        editor_title.innerHTML = "Estas creando un nuevo producto "
    }

}