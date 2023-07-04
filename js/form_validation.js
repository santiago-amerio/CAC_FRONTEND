// constantes de los objetos del DOM
// son creadas al inicio del archivo para facil acceso
// son creadas fuera de cualquier funcion para que funcionen globalmente

const form = document.querySelector('.form');

const confirmation = document.querySelector("#gracias")

const mail_err = document.getElementById("mail-invalid");
const name_err = document.getElementById("name-invalid");
const text_err = document.getElementById("text-invalid");

const submit_button = document.getElementById("submit-button");
const name_input = document.getElementById("name");
const mail_input = document.getElementById("email");
const text_input = document.getElementById("message");




// checkea la input ingresada en el parametro 'input'
// input es el nombre que representa el input (mail, name o text),
// esta funcion devuelve 'error' siendo true cuando se encuentra un error en el valor de la input en el dom
// o false si no se encuentra un error en el valor de la input en el dom
function check_inputs(input) {
    error = false;
    switch (input) {
        case "mail":
            // ''.test(str) es una forma de chequear regex.
            // este test en especifico chequea el formatio del mail
            // (n letras/numeros + '@' + n letras/numeros + . + 2 o 3 letras [esto ultimo puede ser repetido cuantas veces necesite el usuario])
            if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail_input.value)) {
                display_error(input);
                error = true;
            } else {
                clear_error(input);
            }
            break;
        case "name":
            //  chequea que el input del DOM tiene valor y que al menos tiene un espacio
            // de esta forma confirmamos que el usuario puso nombre y apellido
            if (!name_input.value || name_input.value.indexOf(" ") == -1) {
                display_error(input);
                error = true;
            } else {
                clear_error(input);
            }
            break;
        case "text":
            // checkea que el input del DOM tenga valor
            if (!text_input.value) {
                display_error(input);
                error = true;
            } else {
                clear_error(input);
            }
            break;
    }
    return error;
}

// funcion encargada de mostrar los cambios en el DOM
// input es el nombre que representa el input (mail, name o text),
// de esta forma podemos individualizar las alertas por cada una de los errores
function display_error(input) {
    switch (input) {
        case "mail":
            mail_err.innerHTML = "Mail invalido";
            mail_input.classList.add("error");
            break;
        case "name":
            name_err.innerHTML = "Ingresa tu nombre y apellido";
            name_input.classList.add("error");
            break;
        case "text":
            text_err.innerHTML = "Ingresa tu consulta o comentario";
            text_input.classList.add("error");
            break;
        default:
        // code block
    }
}
// resetea los cambios hechos por display_erros() a los valores
// predeterminados, de esta manera elimina las alertas del DOM
function clear_error(input) {
    submit_button.classList.remove("error");
    switch (input) {
        case "mail":
            mail_err.innerHTML = "";
            mail_input.classList.remove("error");
            break;
        case "name":
            name_err.innerHTML = "";
            name_input.classList.remove("error");
            break;
        case "text":
            text_err.innerHTML = "";
            text_input.classList.remove("error");
            break;
        default:
        // code block
    }
}

// checkeo general al presionar 'enviar comentario'
// el if ejecuta check_inputs() con cada uno de los input
// si cualquiera de las funciones devuelve 'true' no se podra enviar la peticion
function check_all_inputs() {
    if (check_inputs("name") || check_inputs("text") || check_inputs("mail")) {
        // implementar finale error
        submit_button.classList.add("error");
        
        
    } else {
        // implementar envio exitante
        submit_button.classList.remove("error");
        form.classList.add("disabled1")
        setTimeout(() => {  
            form.classList.add("disabled2")
            confirmation.classList.add("enabled1")
            setTimeout(() => {  
                confirmation.classList.add("enabled2")
            }, 500);
        }, 500);
       
    }
}
