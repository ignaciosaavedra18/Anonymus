const zonasChile = {
    "Región Metropolitana": ["Santiago", "Maipú", "Providencia", "Las Condes", "Puente Alto"],
    "Valparaíso": ["Valparaíso", "Viña del Mar", "Quilpué", "Concón"],
    "Biobío": ["Concepción", "Talcahuano", "Los Ángeles", "Chillán"]
};

document.addEventListener("DOMContentLoaded", function () {
    const regionDropdown = document.getElementById("select-region");
    const comunaDropdown = document.getElementById("select-comuna");
    const formRegistro = document.getElementById("formulario-registro");

    if (regionDropdown) {
        Object.keys(zonasChile).forEach(region => {
            const opc = document.createElement("option");
            opc.value = region;
            opc.textContent = region;
            regionDropdown.appendChild(opc);
        });

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

    if (formRegistro) {
        formRegistro.addEventListener("submit", function (e) {
            e.preventDefault();

            const rutVal = document.getElementById("rut-usuario").value.trim();
            const emailVal = document.getElementById("email-usuario").value.trim();
            const txtRespuesta = document.getElementById("mensaje-respuesta");

            const regexRut = /^[0-9]{7,8}[0-9kK]{1}$/;
            if (!regexRut.test(rutVal)) {
                txtRespuesta.textContent = "El RUT debe ingresarse sin puntos ni guión (ej: 19876543K).";
                txtRespuesta.style.color = "red";
                txtRespuesta.classList.remove("oculto");
                return;
            }

            const regexEmail = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
            if (!regexEmail.test(emailVal)) {
                txtRespuesta.textContent = "El correo debe terminar en @duoc.cl, @profesor.duoc.cl o @gmail.com.";
                txtRespuesta.style.color = "red";
                txtRespuesta.classList.remove("oculto");
                return;
            }


            const nuevoUsuario = {
                rut: rutVal,
                email: emailVal,
                nombre: "Estudiante" // Nombre por defecto para que se vea en el Header
            };
            localStorage.setItem("usuarioRegistrado", JSON.stringify(nuevoUsuario));
            
            txtRespuesta.textContent = "Usuario registrado correctamente.";
            txtRespuesta.style.color = "green";
            txtRespuesta.classList.remove("oculto");
            formRegistro.reset();
            comunaDropdown.disabled = true;
        });
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const contactForm = document.getElementById("contactForm");
    const successAlert = document.getElementById("contactSuccessAlert");

    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault(); 
           
            if (successAlert) {
                successAlert.style.display = "block";
            }

            contactForm.reset();
            setTimeout(() => {
                if (successAlert) {
                    successAlert.style.display = "none";
                }
            }, 5000);
        });
    }
});