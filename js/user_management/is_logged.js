async function check_login() {
    let cookies = document.cookie;
    console.log(cookies);
    const response = await fetch("https://thiagosch.pythonanywhere.com/is_logged", {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({}),
    });
    const json = await response.json();
    console.log(json);
    return json;
}

async function run_if_logged_in() {
    const is_logged = await check_login();
    if (is_logged >= 0 && is_logged !== false) {
        const navigation = document.querySelector("#navigation");
        const a_tag = navigation.lastChild.previousSibling;
        // navigation.lastChild.innerHTML = "logout";

        a_tag.innerHTML = "<li>Logout</li>";
    }
}

async function logout() {
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
    try {
        if (json["message"] == "logged out") {
            location. reload()
        }
    } catch {
        console.error("logout error")
    }
}

run_if_logged_in();
