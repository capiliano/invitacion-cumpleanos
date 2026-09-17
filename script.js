document.addEventListener("DOMContentLoaded", () => {

    const welcome = document.getElementById("welcome");
    const invitation = document.getElementById("invitation");
    const openButton = document.getElementById("openInvitation");

    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");
    const seconds = document.getElementById("seconds");

    let musicPlaying = false;


    /* =========================
       ABRIR INVITACIÓN
    ========================== */

    openButton.addEventListener("click", async () => {

        welcome.style.display = "none";

        invitation.classList.add("active");

        musicButton.classList.add("visible");

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /* Intentar iniciar música */

        try {

            music.currentTime = 0;

            await music.play();

            musicPlaying = true;

            musicButton.textContent = "Ⅱ";

        } catch (error) {

            console.log(
                "El navegador no permitió iniciar la música automáticamente."
            );

            musicPlaying = false;

            musicButton.textContent = "♪";
        }

    });


    /* =========================
       CONTROL DE MÚSICA
    ========================== */

    musicButton.addEventListener("click", async () => {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.textContent = "♪";

        } else {

            try {

                await music.play();

                musicPlaying = true;

                musicButton.textContent = "Ⅱ";

            } catch (error) {

                console.log(
                    "No se pudo reproducir la música."
                );

            }

        }

    });


    /* =========================
       CUENTA REGRESIVA
    ========================== */

    const eventDate = new Date(
        "2026-10-05T00:00:00"
    );


    function updateCountdown() {

        const now = new Date();

        const difference =
            eventDate.getTime() - now.getTime();


        if (difference <= 0) {

            days.textContent = "00";
            hours.textContent = "00";
            minutes.textContent = "00";
            seconds.textContent = "00";

            return;
        }


        const totalSeconds =
            Math.floor(difference / 1000);

        const totalMinutes =
            Math.floor(totalSeconds / 60);

        const totalHours =
            Math.floor(totalMinutes / 60);

        const totalDays =
            Math.floor(totalHours / 24);


        const remainingHours =
            totalHours % 24;

        const remainingMinutes =
            totalMinutes % 60;

        const remainingSeconds =
            totalSeconds % 60;


        days.textContent =
            String(totalDays).padStart(2, "0");

        hours.textContent =
            String(remainingHours).padStart(2, "0");

        minutes.textContent =
            String(remainingMinutes).padStart(2, "0");

        seconds.textContent =
            String(remainingSeconds).padStart(2, "0");
    }


    updateCountdown();

    setInterval(updateCountdown, 1000);

});
