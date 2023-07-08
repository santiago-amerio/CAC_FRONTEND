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
            
            if("error" in response){
                console.log("deberia mostrar error al user")
            }else if("message" in response){
                if(response["message"] == "Login successful"){
                    window.location.replace("./");
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
