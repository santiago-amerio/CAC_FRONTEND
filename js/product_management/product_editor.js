async function add_producto(body) {
    try {
        const response = await fetch("https://thiagosch.pythonanywhere.com/product", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        // Handle error
        console.log(error);
        return { error: "Ocurrio un error inesperado." };
    }
}

async function remove_product(e, enable = true) {
    e.preventDefault();
    let id = document.querySelector("#prod-id").value;

    try {
        const response = await fetch("https://thiagosch.pythonanywhere.com/product", {
            method: "DELETE",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ id: id, active: enable }),
        });

        const json = await response.json();
        reload_things();

        return json;
    } catch (error) {
        // Handle error
        console.log(error);
        return { error: "Ocurrio un error inesperado." };
    }
}

async function edit_producto(body) {
    try {
        const response = await fetch("https://thiagosch.pythonanywhere.com/product", {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify(body),
        });

        const json = await response.json();
        return json;
    } catch (error) {
        // Handle error
        console.log(error);
        return { error: "Ocurrio un error inesperado." };
    }
}
async function add_or_edit_producto(e) {
    e.preventDefault();

    const container = document.getElementById("add_product");
    const inputs = Array.from(container.querySelectorAll("[id^='prod-']"));
    const error_container = document.querySelector("#error-pr");
    let json_body = {};

    inputs.forEach((input) => {
        json_body[input.id.replace("prod-", "")] = input.value;
    });

    json_body = removeEmpty(json_body);

    let response;

    if ("id" in json_body) {
        response = await edit_producto(json_body);
    } else {
        response = await add_producto(json_body);
    }
    reload_things();
    if ("error" in response) {
        if("producto ya existe." == response["error"]){
            error_container.innerHTML = "El modelo de este producto ya existe"
            return;
        }else if ("la categoria no existe" == response["error"]){
            error_container.innerHTML = "Crea la categoria antes de insertar el producto"
            return
        }else if ("missing-fields" in response["error"]) {
            error_container.innerHTML = "faltaron alguns campos: " + response["error"]["missing-fields"];
            return;
        }
        error_container.innerHTML = response["error"];
    }
}

if ("admin" in json && !passthrough) {
    button_submit.style.transition = "color .5s ease, background-color 1s ease";
    button_submit.style.color = "#ffffff00";
    button_submit.style.backgroundColor = "green";

    setTimeout(() => {
        button_submit.innerHTML = "Datos cambiados";
        button_submit.style.color = "#ffffff";
    }, 500);
    setTimeout(() => {
        button_submit.style.backgroundColor = "";
        button_submit.style.color = "#ffffff00";

        setTimeout(() => {
            button_submit.innerHTML = "Guardar cambios";
            button_submit.style.color = "#ffffff";
        }, 500);
    }, 3000);
}





function removeEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === "") {
                delete obj[key];
            }
            if (obj[key] == 0) {
                delete obj[key];
            }
        }
    }
    return obj;
}

function toggle_admin_tools(action) {
    if (document.querySelector("#modal_admin").style.display == "none") {
        document.querySelector("#modal_admin").style.display = "";
    } else {
        document.querySelector("#modal_admin").style.display = "none";
    }
}
