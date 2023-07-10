$(".message a").click(function () {
    $("form").animate({ height: "toggle", opacity: "toggle" }, "slow");
});

document.querySelector("#submit-login").addEventListener("click", function (e) {
    e.preventDefault();
    let user = document.querySelector("#user-login").value;
    let passw = document.querySelector("#passw-login").value;
    fetch("https://thiagosch.pythonanywhere.com/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: user, passw: passw }),
        credentials: "include",
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .then((response) => {
            if ("error" in response) {
                console.log("deberia mostrar error al user");
            } else if ("message" in response) {
                if (response["message"] == "Login successful") {
                    test = async () => {
                        await check_login();
                        window.location.replace("./");
                    };
                    test();
                }
            }
        });
});

document.querySelector("#submit-register").addEventListener("click", function (e) {
    e.preventDefault();
    let user = document.querySelector("#user-register").value;
    let passw = document.querySelector("#passw-register").value;
    let mail = document.querySelector("#mail-register").value;
    fetch("https://thiagosch.pythonanywhere.com/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: user, passw: passw, mail: mail }),
        credentials: "include",
    })
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
        });
});

async function user_modification_and_retrieval(e, passthrough = true) {
    if (!passthrough) {
        e.preventDefault();
    }

    const username_holder = document.querySelector("#username");
    const mail_input = document.querySelector("#change-mail");
    const button_submit = document.querySelector("#submit-changes");

    const container = document.getElementById("user-management");
    const inputs = Array.from(container.querySelectorAll("[id^='change-']"));
    let json_body = {};
    inputs.forEach((input) => {
        json_body[input.id.replace("change-", "")] = input.value;
    });

    json_body = removeEmpty(json_body);
    console.log(json_body);
    const response = await fetch("https://thiagosch.pythonanywhere.com/user_properties_change", {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(json_body),
    });
    const json = await response.json();
    try {
        username_holder.innerHTML = json["name"];
        mail_input.value = json["mail"];

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
    } catch (e) {
        console.error("server error", e);
    }
}

user_modification_and_retrieval();

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

async function logout(e) {
    try {
        e.preventDefault();
    } catch {}
    const container = document.getElementById("user-management");
    const button_logout = document.querySelector("#submit-logout");
    const response = await fetch("https://thiagosch.pythonanywhere.com/logout", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
    });
    const json = await response.json();
    console.log(button_logout)
    try {
        if (json["message"] == "logged out") {
            button_logout.innerHTML = "cerrando sesion...";
            container.style.opacity = "1"
            container.style.transition = "1s"
            container.style.opacity = "0"
            await check_login();
            setTimeout(() => {
                location.reload();
            }, 2000);
        }
    } catch (err){
        console.error("logout error",err);
    }
}

