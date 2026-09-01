// Base de datos local para los selectores dinámicos
const zonasChile = {
    "Región Metropolitana": ["Santiago", "Maipú", "Providencia", "Las Condes", "Puente Alto"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Concón"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
};

document.addEventListener("DOMContentLoaded", function () {
    const regionDropdown = document.getElementById("select-region");
    const comunaDropdown = document.getElementById("select-comuna");
    const formRegistro = document.getElementById("formulario-registro");

    // Cargar regiones en el primer select
    if (regionDropdown) {
        Object.keys(zonasChile).forEach(region => {
            const opc = document.createElement("option");
            opc.value = region;
            opc.textContent = region;
            regionDropdown.appendChild(opc);
        });

        // Evento cambio de región para desplegar comunas
        regionDropdown.addEventListener("change", function () {
            const seleccion = this.value;
            comunaDropdown.innerHTML = '<option value="">-- Selecciona una comuna --</option>';

            if (seleccion && zonasChile[seleccion]) {
                comunaDropdown.disabled = false;
                zonasChile[seleccion].forEach(comuna => {
                    const opc = document.createElement("option");
                    opc.value = comuna;
                    opc.textContent = comuna;
                    comunaDropdown.appendChild(opc);
                });
            } else {
                comunaDropdown.disabled = true;
            }
        });
    }

    // Procesar el envío del formulario
    if (formRegistro) {
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();

            const rutVal = document.getElementById("rut-usuario").value.trim();
            const emailVal = document.getElementById("email-usuario").value.trim();
            const txtRespuesta = document.getElementById("mensaje-respuesta");

            // Validar RUT (Entre 7 y 9 caracteres numéricos + K opcional al final)
            const regexRut = /^[0-9]{7,8}[0-9kK]{1}$/;
            if (!regexRut.test(rutVal)) {
                txtRespuesta.textContent = "El RUT debe ingresarse sin puntos ni guión (ej: 19876543K).";
                txtRespuesta.style.color = "red";
                txtRespuesta.classList.remove("oculto");
                return;
            }

            // Validar correo institucional o gmail
            const regexEmail = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
            if (!regexEmail.test(emailVal)) {
                txtRespuesta.textContent = "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.";
                txtRespuesta.style.color = "red";
                txtRespuesta.classList.remove("oculto");
                return;
            }

            // Éxito
            txtRespuesta.textContent = "Usuario registrado correctamente.";
            txtRespuesta.style.color = "green";
            txtRespuesta.classList.remove("oculto");
            formRegistro.reset();
            comunaDropdown.disabled = true;
        });
    }
});