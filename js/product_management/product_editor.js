function add_producto(body,error_container) {
    fetch("https://thiagosch.pythonanywhere.com/product", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((json) => {
            
        });
}

function edit_producto(body,error_container) {
    fetch("https://thiagosch.pythonanywhere.com/product", {
        method: "PATCH",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(body),
    })
        .then((response) => response.json())
        .then((json) => {
            
        });
}

function add_or_edit_producto(e) {
    e.preventDefault();
    const container = document.getElementById("add_product");

    const inputs = Array.from(container.querySelectorAll("input"));

    const error_container = container.querySelector("#error")
    let json_body = {};

    inputs.forEach((input) => {
        json_body[input.id.replace("prod-", "")] = input.value;
    });
    json_body = removeEmpty(json_body);

    if ("id" in json_body) {
        edit_producto(json_body,error_container);
    } else {
        add_producto(json_body,error_container);
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
