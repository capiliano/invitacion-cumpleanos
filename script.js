/* =========================================
   CONFIGURACIÓN
========================================= */

/*
   CAMBIA ESTA FECHA.

   Formato:
   AÑO-MES-DÍA T HORA:MINUTO:SEGUNDO

   Ejemplo:
   "2026-12-25T20:00:00"
*/

const birthdayDate = new Date("2026-12-25T20:00:00");


/* =========================================
   ELEMENTOS
========================================= */

const welcomeScreen =
    document.getElementById("welcomeScreen");

const openInvitation =
    document.getElementById("openInvitation");

const mainContent =
    document.getElementById("mainContent");

const surpriseButton =
    document.getElementById("surpriseButton");

const surpriseContent =
    document.getElementById("surpriseContent");

const musicButton =
    document.getElementById("musicButton");

const backgroundMusic =
    document.getElementById("backgroundMusic");


/* =========================================
   ABRIR INVITACIÓN
========================================= */

openInvitation.addEventListener("click", () => {

    welcomeScreen.classList.add("hide");

    mainContent.classList.remove("hidden");

    document.body.style.overflow = "auto";

    createConfetti();

    /*
       Los navegadores suelen bloquear
       reproducción automática.

       Por eso intentamos reproducirla
       después del clic del usuario.
    */

    backgroundMusic.volume = 0.35;

    backgroundMusic.play()
        .then(() => {

            musicButton.textContent = "🔊";

        })
        .catch(() => {

            musicButton.textContent = "🔇";

        });

});


/* =========================================
   MÚSICA
========================================= */

musicButton.addEventListener("click", () => {

    if (backgroundMusic.paused) {

        backgroundMusic.play();

        musicButton.textContent = "🔊";

    } else {

        backgroundMusic.pause();

        musicButton.textContent = "🔇";

    }

});


/* =========================================
   CUENTA REGRESIVA
========================================= */

function updateCountdown() {

    const now = new Date();

    const difference =
        birthdayDate.getTime() - now.getTime();


    if (difference <= 0) {

        document.getElementById("days").textContent = "00";
        document.getElementById("hours").textContent = "00";
        document.getElementById("minutes").textContent = "00";
        document.getElementById("seconds").textContent = "00";

        return;

    }


    const days =
        Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );


    const hours =
        Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );


    const minutes =
        Math.floor(
            (difference / (1000 * 60)) % 60
        );


    const seconds =
        Math.floor(
            (difference / 1000) % 60
        );


    document.getElementById("days").textContent =
        String(days).padStart(2, "0");


    document.getElementById("hours").textContent =
        String(hours).padStart(2, "0");


    document.getElementById("minutes").textContent =
        String(minutes).padStart(2, "0");


    document.getElementById("seconds").textContent =
        String(seconds).padStart(2, "0");

}


updateCountdown();

setInterval(updateCountdown, 1000);


/* =========================================
   SORPRESA
========================================= */

surpriseButton.addEventListener("click", () => {

    const isVisible =
        surpriseContent.classList.contains("show");


    if (isVisible) {

        surpriseContent.classList.remove("show");

        surpriseButton.textContent =
            "✨ Abrir sorpresa";

    } else {

        surpriseContent.classList.add("show");

        surpriseButton.textContent =
            "🔒 Cerrar sorpresa";

        createConfetti();

    }

});


/* =========================================
   CONFETI
========================================= */

function createConfetti() {

    const confettiCount = 80;

    for (let i = 0; i < confettiCount; i++) {

        const piece =
            document.createElement("div");

        piece.style.position = "fixed";
        piece.style.left =
            Math.random() * 100 + "vw";

        piece.style.top = "-20px";

        piece.style.width =
            Math.random() * 8 + 5 + "px";

        piece.style.height =
            Math.random() * 14 + 8 + "px";

        piece.style.background =
            [
                "#d85d72",
                "#f2b7c3",
                "#241f20",
                "#f1d4c8",
                "#dca34a"
            ][
                Math.floor(Math.random() * 5)
            ];

        piece.style.zIndex = "2000";

        piece.style.borderRadius = "3px";

        piece.style.pointerEvents = "none";

        document.body.appendChild(piece);


        const duration =
            Math.random() * 3 + 2;

        const horizontalMovement =
            (Math.random() - 0.5) * 300;


        piece.animate(

            [
                {
                    transform:
                        "translate(0, 0) rotate(0deg)",
                    opacity: 1
                },

                {
                    transform:
                        `translate(${horizontalMovement}px, 110vh) rotate(720deg)`,
                    opacity: 0
                }
            ],

            {
                duration: duration * 1000,
                easing: "cubic-bezier(.2,.7,.3,1)"
            }

        );


        setTimeout(() => {

            piece.remove();

        }, duration * 1000);

    }

}


/* =========================================
   EVITAR SCROLL AL INICIO
========================================= */

document.body.style.overflow = "hidden";
