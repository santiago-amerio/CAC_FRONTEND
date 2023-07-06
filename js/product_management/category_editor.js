



function add_category(body, error_container) {
    fetch('https://thiagosch.pythonanywhere.com/category', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .then((json) => {
            error_container.innerHTML = JSON.stringify(json)
        });
}


function edit_category(body, error_container) {



    fetch('https://thiagosch.pythonanywhere.com/category', {
        method: 'PATCH',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(body)
    })
        .then((response) => response.json())
        .then((json) => {
            error_container.innerHTML = JSON.stringify(json)
        });
}

function add_or_edit_category(e) {
    e.preventDefault();

    const container = document.getElementById('add_category');

    const inputs = Array.from(container.querySelectorAll('input'));
    const error_container = container.querySelector("#error")
    let json_body = {};

    inputs.forEach(input => {
        json_body[input.id.replace("cat-", "")] = input.value;
    });
    json_body = removeEmpty(json_body)

    if ("id" in json_body) {
        edit_category(json_body, error_container)
    } else {
        add_category(json_body, error_container)
    }

}

function removeEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (obj[key] === "") {
                delete obj[key];
            }
            if (obj[key] == 0) {
                delete obj[key]
            }
        }
    }
    return obj;
}