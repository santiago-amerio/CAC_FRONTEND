const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
});
let categorias;
async function load_products(category) {
    let container = document.getElementById("catalogo");
    container.innerHTML = "";
    json = await get_product_list();
    for (let producto in json) {
        producto = json[producto];
        let template = document.createElement("div");
        if (category) {
            if (category != producto["categoria"]["id"]) {
                continue;
            }
        }
        if (!producto["active"]) {
            continue;
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
                    </div>
                `;
        container.appendChild(template);
    }
}

async function load_categories() {
    categorias = await get_category_list();
    let container = document.getElementById("categorias");
    container.innerHTML = "";

    for (let category in categorias) {
        let template1 = document.createElement("a");
        category = categorias[category];
        console.log("cat", category);
        template1.innerHTML = `<a onclick="load_category(${category["id"]})">
                    <li class="filtro-maquinas">${category["titulo"]}</li>
                </a>`;
        container.appendChild(template1);
    }
}

function load_category(category_id) {
    if (category_id == 0) {
        document.querySelector("#filtered-by").innerHTML = "";
        document.querySelector("#remove-filter").innerHTML = "";
        load_products();
    } else {
        category = categorias.find((obj) => obj.id == category_id);
        document.querySelector("#filtered-by").innerHTML = category["titulo"];
        document.querySelector(
            "#remove-filter"
        ).innerHTML = `<button onclick="load_category(0)">eliminar filtro</button>`;
        load_products((category = category["id"]));
    }
}

async function dropdown_prod_id_filler() {
    let json = await get_product_list(); // Await the function and capture the returned value
    let dropdown = document.querySelector("#prod-id");
    let option = document.createElement("option");
    dropdown.innerHTML = "";
    option.value = "0";
    option.innerHTML = "Crear nuevo";
    dropdown.append(option);
    for (index in json) {
        let producto = json[index];
        let prod_status = producto["active"] ? "" : "(desactivado)";
        let id = producto["id"];
        let modelo = producto["modelo"];
        let option = document.createElement("option");
        option.value = id;
        option.innerHTML = `${modelo} ${prod_status}`;

        dropdown.append(option);
    }
}
async function change_product(e) {
    let id_selected = "";
    try {
        id_selected = e.target.options[e.target.selectedIndex].value;
    } catch {
        id_selected = document.querySelector("#prod-id");
    }
    let product = await get_product_list();

    const filteredArray = product.filter((obj) => obj.id == id_selected)[0];
    let value = "";
    const button_delete = document.querySelector("#deactivate-pr");
    for (let key in filteredArray) {
        if (key == "active") {
            console.log(filteredArray["active"]);
            button_delete.innerHTML = filteredArray["active"] ? "Desactivar producto" : "Activar producto";
            button_delete.setAttribute(
                "onClick",
                `remove_product(event, ${filteredArray["active"] ? "false" : "true"})`
            );
            continue;
        }
        let element = document.getElementById("prod-" + key);
        if (key == "categoria") {
            value = filteredArray[key]["id"];
            element.value = value;
        } else {
            value = filteredArray[key];
            element.value = value;
        }
    }
}

async function dropdown_cat_filler() {
    let json = await get_category_list(); // Await the function and capture the returned value
    let dropdown_prod = document.querySelector("#prod-categoria");
    let dropdown_cat = document.querySelector("#cat-id");
    let option2 = document.createElement("option");
    dropdown_cat.innerHTML = "";
    dropdown_prod.innerHTML = "";
    option2.value = "0";
    option2.innerHTML = "Crear nueva";
    dropdown_cat.append(option2);

    for (let index in json) {
        let category = json[index];
        let title = category["titulo"];
        let id = category["id"];

        let option = document.createElement("option");
        let option2 = document.createElement("option");
        option.value = id;
        option.innerHTML = title;
        option2.value = id;
        option2.innerHTML = title;
        dropdown_prod.append(option);
        dropdown_cat.append(option2);
    }
}

function toggle_editor_creator_product(e) {
    e.preventDefault();
    let toggler = document.querySelector("#edit_create_toggler_producto");
    let id_selector = document.querySelector("#id_selector");
    let is_editor = id_selector.getAttribute("is_editor");
    let editor_title = document.querySelector("#editor_title");
    let select = document.querySelector("#prod-id");
    select.value = "0";

    if (is_editor == "true") {
        id_selector.setAttribute("is_editor", "false");
        // id_selector.innerHTML = `<select id="pord-id" placeholder="id">`
        id_selector.setAttribute("style", "");
        toggler.innerHTML = "Crear nuevo";
        editor_title.innerHTML = "Estas editando un producto ";
    } else {
        id_selector.setAttribute("is_editor", "true");
        id_selector.setAttribute("style", "display:none;");
        toggler.innerHTML = "Editar";
        editor_title.innerHTML = "Estas creando un nuevo producto ";
    }
}

function toggle_editor_creator_category(e) {
    e.preventDefault();
    let toggler = document.querySelector("#edit_create_toggler_category");
    let id_selector = document.querySelector("#id_selector");
    let is_editor = id_selector.getAttribute("is_editor");
    let editor_title = document.querySelector("#editor_title");
    let select = document.querySelector("#prod-id");
    select.value = "0";

    if (is_editor == "true") {
        id_selector.setAttribute("is_editor", "false");
        // id_selector.innerHTML = `<select id="pord-id" placeholder="id">`
        id_selector.setAttribute("style", "");
        toggler.innerHTML = "Crear nuevo";
        editor_title.innerHTML = "Estas editando un producto ";
    } else {
        id_selector.setAttribute("is_editor", "true");
        id_selector.setAttribute("style", "display:none;");
        toggler.innerHTML = "Editar";
        editor_title.innerHTML = "Estas creando un nuevo producto ";
    }
}

async function change_category(e) {
    let category = await get_category_list();

    let id_selected = e.target.options[e.target.selectedIndex].value;
    const filteredArray = category.filter((obj) => obj.id == id_selected)[0];
    let value = "";
    console.log(filteredArray);
    for (let key in filteredArray) {
        if (key == "active") continue;

        console.log(key);
        let element = document.getElementById("cat-" + key);

        value = filteredArray[key];
        element.value = value;
    }
}

function reload_things() {
    dropdown_cat_filler();
    dropdown_prod_id_filler();
    load_categories();
    load_products();
}
