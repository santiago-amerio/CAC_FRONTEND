async function check_login() {
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

    return json;
}
async function run_if_logged_in(admin_level) {
    if (admin_level >= 0 && admin_level !== false) {
        const navigation = document.querySelector("#navigation");
        const a_tag = navigation.lastChild.previousSibling;
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
            location.reload();
        }
    } catch {
        console.error("logout error");
    }
}

async function functions_per_page() {
    const location = window.location.pathname;
    let admin_level = await check_login();
    run_if_logged_in(admin_level);
    if (admin_level !== false) {
        if (location == "/login.html") {
            document.querySelector(".login-form").style = "display:none;";
            document.querySelector(".logout-form").style = "";
            console.log(admin_level);
        }
    } else {
        console.log("not logged");
    }
}

functions_per_page();
