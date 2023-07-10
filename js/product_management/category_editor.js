async function add_category(body, error_container) {
    try {
        const response = await fetch("https://thiagosch.pythonanywhere.com/category", {
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
        console.error(error);
        return { error: "Ocurrio un error inesperado." };
    }
}

async function edit_category(body, error_container) {
    try {
        const response = await fetch("https://thiagosch.pythonanywhere.com/category", {
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
        console.error(error);
        return { error: "Ocurrio un error inesperado." };
    }
}

async function add_or_edit_category(e) {
    e.preventDefault();

    const container = document.getElementById("add_category");
    const inputs = Array.from(container.querySelectorAll("[id^='cat-']"));
    const error_container = container.querySelector("#error");
    let json_body = {};
    
    inputs.forEach((input) => {
        json_body[input.id.replace("cat-", "")] = input.value;
    });
    console.table(json_body);
    json_body = removeEmpty(json_body);
    
    let response;
    if ("id" in json_body) {
        response = await edit_category(json_body);
    } else {
        response = await add_category(json_body);
    }
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
