document.addEventListener("DOMContentLoaded", () => {

    const welcome =
        document.getElementById("welcome");

    const invitation =
        document.getElementById("invitation");

    const openButton =
        document.getElementById("openInvitation");

    const transitionOverlay =
        document.getElementById("transitionOverlay");

    const music =
        document.getElementById("music");

    const musicButton =
        document.getElementById("musicButton");

    const days =
        document.getElementById("days");

    const hours =
        document.getElementById("hours");

    const minutes =
        document.getElementById("minutes");

    const seconds =
        document.getElementById("seconds");

    const mapButton =
        document.getElementById("mapButton");

    let musicPlaying = false;

    let invitationOpened = false;


    /* GOOGLE MAPS */

    const mapUrl =
        "https://maps.app.goo.gl/2pxHpF2r4CRKRbE3A?g_st=ic";

    if (mapUrl.trim() !== "") {

        mapButton.href = mapUrl;

        mapButton.hidden = false;

    }


    /* ABRIR INVITACIÓN */

    openButton.addEventListener("click", async () => {

        if (invitationOpened) {
            return;
        }

        invitationOpened = true;

        transitionOverlay.classList.add("active");


        /* MÚSICA */

        try {

            music.currentTime = 0;

            await music.play();

            musicPlaying = true;

            musicButton.textContent = "Ⅱ";

        } catch (error) {

            console.log(
                "El navegador no permitió iniciar la música."
            );

            musicPlaying = false;

            musicButton.textContent = "♪";

        }


        /* CAMBIO DE PANTALLA */

        setTimeout(() => {

            welcome.classList.add("leaving");

            invitation.classList.add("active");

            musicButton.classList.add("visible");

            window.scrollTo({
                top: 0,
                behavior: "instant"
            });

        }, 450);


        setTimeout(() => {

            welcome.style.display = "none";

            transitionOverlay.classList.remove("active");

        }, 1000);

    });


    /* CONTROL DE MÚSICA */

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


    /* CUENTA REGRESIVA
       3 OCTUBRE 2026
       14:00 ECUADOR
    */

    const eventDate =
        Date.UTC(
            2026,
            9,
            3,
            19,
            0,
            0
        );


    function updateCountdown() {

        const now =
            Date.now();

        const difference =
            eventDate - now;


        if (difference <= 0) {

            days.textContent = "00";

            hours.textContent = "00";

            minutes.textContent = "00";

            seconds.textContent = "00";

            return;

        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const totalMinutes =
            Math.floor(
                totalSeconds / 60
            );


        const totalHours =
            Math.floor(
                totalMinutes / 60
            );


        const totalDays =
            Math.floor(
                totalHours / 24
            );


        const remainingHours =
            totalHours % 24;


        const remainingMinutes =
            totalMinutes % 60;


        const remainingSeconds =
            totalSeconds % 60;


        days.textContent =
            String(totalDays)
                .padStart(2, "0");


        hours.textContent =
            String(remainingHours)
                .padStart(2, "0");


        minutes.textContent =
            String(remainingMinutes)
                .padStart(2, "0");


        seconds.textContent =
            String(remainingSeconds)
                .padStart(2, "0");

    }


    updateCountdown();


    setInterval(
        updateCountdown,
        1000
    );

});
