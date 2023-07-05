$('.message a').click(function () {
    $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
});

document.querySelector("#submit-login")
    .addEventListener("click", function (e) {
        e.preventDefault()
        let user = document.querySelector("#user-login").value
        let passw = document.querySelector("#passw-login").value
        fetch('https://thiagosch.pythonanywhere.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ "name": user, passw: passw }),
            credentials: 'include'
        })
            .then(response => { console.log(response); return response.json(); })
            .then(response => {
                console.log(response)
                console.log(getCookieMap())

            })
    });


document.querySelector("#login-register")
    .addEventListener("click", function (e) {
        e.preventDefault()
        let user = document.querySelector("#user-register").value
        let passw = document.querySelector("#passw-register").value
        let mail = document.querySelector("#mail-register").value
        fetch('https://thiagosch.pythonanywhere.com/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "name": user, passw: passw, "mail": mail }),
            credentials: 'include'
        })
            .then(response => response.json())
            .then(response => {
                console.log(response)

            })
    });

const getCookieMap = () => {
    // Cookies are generally separated by a "; "
    // https://stackoverflow.com/a/4843598/2968465
    const cookieList = document.cookie.split('; ');

    // A key-value pair in the cookie list is separated by a "="
    // We pass a function to cookieList.map that will return
    // an array of tuples, like [key, value]
    const cookieToObjEntry = cookie => cookie.split('=')
    const cookieEntries = cookieList.map(cookieToObjEntry)

    // Such an array can be passed to Object.fromEntries to
    // obtain an object with all cookie key-value pairs as
    // the keys and values of an object
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries
    return Object.fromEntries(cookieEntries)

    // So, for a cookies stored as "c1=v1; c2=v2", you'll get
    // an object like `{c1: v1, c2: v2}`
}