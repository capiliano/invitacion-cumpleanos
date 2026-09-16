document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       ELEMENTOS
    ========================== */

    const welcome = document.getElementById("welcome");

    const invitation = document.getElementById("invitation");

    const openButton = document.getElementById("openInvitation");

    const music = document.getElementById("music");

    const musicButton = document.getElementById("musicButton");

    const days = document.getElementById("days");

    const hours = document.getElementById("hours");

    const minutes = document.getElementById("minutes");

    const seconds = document.getElementById("seconds");


    /* =========================
       ESTADO DE LA MÚSICA
    ========================== */

    let musicPlaying = false;


    /* =========================
       ABRIR INVITACIÓN
    ========================== */

    openButton.addEventListener("click", async () => {

        /*
         * Ocultamos la pantalla inicial.
         */

        welcome.style.display = "none";


        /*
         * Mostramos la invitación.
         */

        invitation.classList.add("active");


        /*
         * Mostramos el botón de música.
         */

        musicButton.classList.add("visible");


        /*
         * Llevamos al usuario al inicio
         * de la invitación.
         */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /*
         * IMPORTANTE:
         *
         * Como esta función ocurre después
         * de que el usuario presionó el botón,
         * el navegador permite iniciar el audio.
         */

        try {

            music.currentTime = 0;

            await music.play();

            musicPlaying = true;

            musicButton.textContent = "Ⅱ";

        } catch (error) {

            console.log(
                "El navegador no permitió iniciar la música:",
                error
            );

        }

    });


    /* =========================
       MÚSICA EN BUCLE
    ========================== */

    /*
     * El atributo "loop" del HTML hace que
     * la canción vuelva a comenzar automáticamente
     * cuando termina.
     *
     * Este evento también sirve como respaldo.
     */

    music.addEventListener("ended", () => {

        music.currentTime = 0;

        music.play().catch(() => {
            console.log("No se pudo reiniciar la música.");
        });

    });


    /* =========================
       BOTÓN DE MÚSICA
    ========================== */

    musicButton.addEventListener("click", async () => {

        if (musicPlaying) {

            /*
             * PAUSAR
             */

            music.pause();

            musicPlaying = false;

            musicButton.textContent = "♪";

        } else {

            /*
             * REANUDAR
             */

            try {

                await music.play();

                musicPlaying = true;

                musicButton.textContent = "Ⅱ";

            } catch (error) {

                console.log(
                    "No se pudo reproducir la música:",
                    error
                );

            }

        }

    });


    /* =========================
       CUENTA REGRESIVA
    ========================== */

    /*
     * Todavía no tenemos la fecha real
     * del cumpleaños.
     *
     * Por eso mostramos "--".
     */

    function countdownDisabled() {

        days.textContent = "--";

        hours.textContent = "--";

        minutes.textContent = "--";

        seconds.textContent = "--";

    }

    countdownDisabled();


    /* =========================
       EFECTO DE DOBLE CLICK
    ========================== */

    document.addEventListener("dblclick", () => {

        for (let i = 0; i < 12; i++) {

            const particle = document.createElement("div");

            particle.style.position = "fixed";

            particle.style.width = "6px";

            particle.style.height = "6px";

            particle.style.background = "#c9a657";

            particle.style.borderRadius = "50%";

            particle.style.left = "50%";

            particle.style.top = "50%";

            particle.style.zIndex = "9999";

            particle.style.pointerEvents = "none";


            const angle =
                Math.random() * Math.PI * 2;

            const distance =
                80 + Math.random() * 160;


            document.body.appendChild(particle);


            particle.animate(

                [
                    {
                        transform:
                            "translate(-50%, -50%) scale(1)",

                        opacity: 1
                    },

                    {
                        transform:
                            `translate(
                                calc(-50% + ${Math.cos(angle) * distance}px),
                                calc(-50% + ${Math.sin(angle) * distance}px)
                            ) scale(0)`,

                        opacity: 0
                    }
                ],

                {
                    duration: 900,

                    easing: "ease-out"
                }

            );


            setTimeout(() => {

                particle.remove();

            }, 900);

        }

    });

});
