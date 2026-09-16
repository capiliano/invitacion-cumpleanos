// ===============================
// CONFIGURACIÓN
// ===============================

// Cuando tengas la fecha real, cámbiala aquí.
// Formato: Año-Mes-DíaTHora:Minuto:Segundo
const birthdayDate = new Date("2026-12-25T20:00:00");


// ===============================
// ELEMENTOS
// ===============================

const welcomeScreen = document.getElementById("welcomeScreen");
const openInvitation = document.getElementById("openInvitation");
const invitation = document.getElementById("invitation");

const musicButton = document.getElementById("musicButton");
const backgroundMusic = document.getElementById("backgroundMusic");

const daysElement = document.getElementById("days");
const hoursElement = document.getElementById("hours");
const minutesElement = document.getElementById("minutes");
const secondsElement = document.getElementById("seconds");


// ===============================
// ABRIR INVITACIÓN
// ===============================

openInvitation.addEventListener("click", () => {

    welcomeScreen.classList.add("hide");
    invitation.classList.add("show");

    document.body.classList.remove("no-scroll");

    // Intentar iniciar música
    backgroundMusic.volume = 0.35;

    backgroundMusic.play()
        .then(() => {
            musicButton.classList.add("playing");
            musicButton.textContent = "♫";
        })
        .catch(() => {
            console.log("El navegador bloqueó el inicio automático de la música.");
        });

    lanzarConfeti();

    setTimeout(() => {
        welcomeScreen.style.display = "none";
    }, 1000);

});


// ===============================
// CUENTA REGRESIVA
// ===============================

function updateCountdown() {

    const now = new Date().getTime();
    const target = birthdayDate.getTime();

    const difference = target - now;

    if (difference <= 0) {

        daysElement.textContent = "00";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";

        return;
    }

    const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
    );

    const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
    );

    const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
    );

    const seconds = Math.floor(
        (difference / 1000) % 60
    );

    daysElement.textContent = String(days).padStart(2, "0");
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateCountdown();

setInterval(updateCountdown, 1000);


// ===============================
// MÚSICA
// ===============================

let musicPlaying = false;

musicButton.addEventListener("click", () => {

    if (musicPlaying) {

        backgroundMusic.pause();

        musicPlaying = false;

        musicButton.textContent = "♪";
        musicButton.classList.remove("playing");

    } else {

        backgroundMusic.play()
            .then(() => {

                musicPlaying = true;

                musicButton.textContent = "♫";
                musicButton.classList.add("playing");

            })
            .catch(() => {

                alert(
                    "No se pudo reproducir la música. " +
                    "Asegúrate de tener el archivo cumpleanos.mp3 dentro de la carpeta music."
                );

            });

    }

});


// ===============================
// ACTUALIZAR ESTADO DE MÚSICA
// ===============================

backgroundMusic.addEventListener("play", () => {

    musicPlaying = true;

    musicButton.textContent = "♫";
    musicButton.classList.add("playing");

});

backgroundMusic.addEventListener("pause", () => {

    musicPlaying = false;

    musicButton.textContent = "♪";
    musicButton.classList.remove("playing");

});


// ===============================
// CONFETI
// ===============================

function lanzarConfeti() {

    const cantidad = 100;

    for (let i = 0; i < cantidad; i++) {

        const confeti = document.createElement("div");

        confeti.className = "confeti";

        confeti.style.left = Math.random() * 100 + "vw";

        confeti.style.animationDuration =
            (Math.random() * 3 + 2) + "s";

        confeti.style.animationDelay =
            Math.random() * 1.5 + "s";

        confeti.style.transform =
            `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(confeti);

        setTimeout(() => {
            confeti.remove();
        }, 6000);

    }

}


// ===============================
// ANIMACIONES AL HACER SCROLL
// ===============================

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

            }

        });

    },
    {
        threshold: 0.15
    }
);


// Observar elementos
document.querySelectorAll(
    ".section, .detail-card, .photo, .age-section"
).forEach((element) => {

    element.classList.add("scroll-hidden");

    observer.observe(element);

});


// ===============================
// EFECTO PARALLAX SUAVE
// ===============================

window.addEventListener("scroll", () => {

    const hero = document.querySelector(".hero");

    if (!hero) return;

    const scrollPosition = window.scrollY;

    if (scrollPosition < window.innerHeight) {

        hero.style.backgroundPosition =
            `center ${scrollPosition * 0.25}px`;

    }

});


// ===============================
// PREVENIR SCROLL AL INICIO
// ===============================

document.body.classList.add("no-scroll");


// ===============================
// DOBLE CLICK PARA CONFETI
// ===============================

document.addEventListener("dblclick", () => {

    if (invitation.classList.contains("show")) {

        lanzarConfeti();

    }

});
