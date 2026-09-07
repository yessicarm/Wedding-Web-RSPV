// =========================================
// ELEMENTOS DE LA PORTADA
// =========================================

const sello = document.querySelector(".envelope-seal");
const envelope = document.querySelector("#envelope");
const musica = document.querySelector("#musicaBoda");
const botonMusica = document.querySelector("#botonMusica");


// =========================================
// MÚSICA
// =========================================

function iniciarMusica() {

    // Si no estamos en la portada, no hacemos nada
    if (!musica) {
        return;
    }

    if (!musica.paused) {
        return;
    }

    musica.volume = 0;

    musica.play().then(() => {

        let volumen = 0;

        const aumento = setInterval(() => {

            volumen += 0.01;

            if (volumen >= 0.15) {
                volumen = 0.15;
                clearInterval(aumento);
            }

            musica.volume = volumen;

        }, 300);

    }).catch(() => {
        // El navegador bloqueó el autoplay.
    });
}


// Intentar iniciar música después de cargar
if (musica) {

    window.addEventListener("load", () => {

        setTimeout(() => {
            iniciarMusica();
        }, 2000);

    });

    document.addEventListener("click", iniciarMusica, { once: true });
    document.addEventListener("touchstart", iniciarMusica, { once: true });

}


// =========================================
// BOTÓN DE MÚSICA
// =========================================

if (botonMusica && musica) {

    botonMusica.addEventListener("click", () => {

        musica.muted = !musica.muted;

        if (musica.muted) {

            botonMusica.textContent = "🔇";
            botonMusica.setAttribute(
                "aria-label",
                "Activar música"
            );

        } else {

            botonMusica.textContent = "🔊";
            botonMusica.setAttribute(
                "aria-label",
                "Silenciar música"
            );

        }

    });

}


// =========================================
// APERTURA DEL SOBRE
// =========================================

if (sello && envelope) {

    sello.addEventListener("click", () => {

        // Pequeño movimiento del sobre
        envelope.classList.add("sobre-zoom");


        // Desaparece el sello
        setTimeout(() => {

            sello.classList.add("sello-abierto");

        }, 450);


        // Se abre el sobre
        setTimeout(() => {

            envelope.classList.add("sobre-abierto");

        }, 600);


        // Ir a la invitación
        setTimeout(() => {

    const parametros =
        new URLSearchParams(window.location.search);

    const idInvitado =
        parametros.get("id");

    if (idInvitado) {

        window.location.href =
            `invitacion.html?id=${encodeURIComponent(idInvitado)}`;

    } else {

        window.location.href =
            "invitacion.html";

    }

}, 1700);

}


// =========================================
// APARICIÓN DE SECCIONES AL HACER SCROLL
// =========================================

document.addEventListener("DOMContentLoaded", () => {

    const seccionesAnimadas =
        document.querySelectorAll(".seccion-animada");


    // Si no hay secciones animadas, no hacemos nada
    if (!seccionesAnimadas.length) {
        return;
    }


    const observador = new IntersectionObserver(
        (entradas) => {

            entradas.forEach((entrada) => {

                if (entrada.isIntersecting) {

                    entrada.target.classList.add("visible");

                    // La animación ocurre una sola vez
                    observador.unobserve(entrada.target);

                }

            });

        },
        {
            threshold: 0.10
        }
    );


    seccionesAnimadas.forEach((seccion) => {

        observador.observe(seccion);

    });

});