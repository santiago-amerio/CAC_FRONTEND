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
    // document.cookie = `admin_level=${json}, SameSite=None`;
    setCookie("admin_level",json)
    
    return json;
}

async function logout(e) {
    e.preventDefault();

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
            await check_login();
            location.reload();
        }
    } catch {
        console.error("logout error");
    }
}

async function global_logged_function() {
    functions_per_page();
    let admin_level = getCookie("admin_level");
    if (admin_level >= 0 && admin_level !== false) {
        const navigation = document.querySelector("#navigation");
        const a_tag = navigation.lastChild.previousSibling;
        a_tag.innerHTML = "<li>Cuenta</li>";
    }
    
}



async function functions_per_page() {
    let admin_level = getCookie("admin_level");
    // run_if_logged_in(admin_level);
    const location = window.location.pathname;
    if (admin_level >= 0 && admin_level !== false) {
        console.log(admin_level);
        if (location.includes("/login")) {
            login_page_logged();
        } else if (location.includes("/catalogo")) {
            catalog_page_logged(admin_level);
        }
    } else {
        console.log("not logged");
    }
    await check_login();
}

function login_page_logged() {
    document.querySelector(".login-form").style = "display:none;";
    document.querySelector(".account_container").style = "";
}
function catalog_page_logged(admin_level) {
    if (admin_level >= 1) {
        
        document.querySelector("#admin_box").style.display = "";
    }
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(";").shift();
}

function setCookie(cookieName, cookieValue) {
    document.cookie = cookieName + "=" + cookieValue + "; path=/; SameSite=Strict";
}


global_logged_function();