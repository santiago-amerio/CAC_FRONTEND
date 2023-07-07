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

    const error_container = container.querySelector("#error");
    let json_body = {};

    inputs.forEach((input) => {
        json_body[input.id.replace("prod-", "")] = input.value;
    });
    json_body = removeEmpty(json_body);

    console.table(json_body);
    let response;
    if ("id" in json_body) {
        response = await edit_producto(json_body);
    } else {
        response = await add_producto(json_body);
    }
    console.info(response);
    reload_things()
    if ("error" in response) {
        if ("missing-fields" in response["error"]) {
            error_container.innerHTML = "faltaron alguns campos: " + response["error"]["missing-fields"];
            return;
        }
        error_container.innerHTML = response["error"];
    }
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
