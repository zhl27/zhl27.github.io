const URL = "https://zhl27.pythonanywhere.com/"
        
// Capturamos el evento de envío del formulario
document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault(); // Evitamos que se envie el form
    
    var submitButton = this.querySelector('button[type="submit"]');
    submitButton.disabled = true; // deshabilitar boton para evitar multiples envios

    password = document.getElementById('password').value;
    confirm_password = document.getElementById('confirm-password').value;
    if(password != confirm_password) {
        alert("Ambas contraseñas no coinciden.");
        submitButton.disabled = false; 
        return;
    }

    var formData = new FormData(this);

    // Realizamos la solicitud POST al servidor
    fetch(URL + 'register', {
        method: 'POST',
        body: formData
    })

    //Después de realizar la solicitud POST, se utiliza el método then() para manejar la respuesta del servidor.
    .then(function (response) {
        if (!response.ok) {
            // console.log(response.text().then((data) => {
            //     document.querySelector('html').innerHTML = data;
            // }));
            throw new Error(response.status+": "+response.statusText);
        } else {
            return response.json();
        }
    })

    //Respuesta OK, muestra una alerta informando que el producto se agregó correctamente y limpia los campos del formulario para que puedan ser utilizados para un nuevo producto.
    .then(function (data) {
        alert('Usuario registrado correctamente.');
    })

    // En caso de error, mostramos una alerta con un mensaje de error.
    .catch(function (error) {
        alert('Error al registrar nuevo usuario.\n'+error);
    })

    // Limpiar el formulario en ambos casos (éxito o error)
    .finally(function () {
        document.getElementById('username').value = "";
        document.getElementById('email').value = "";
        document.getElementById('password').value = "";
        document.getElementById('confirm-password').value = "";
    });
    
    submitButton.disabled = false; 
})