```javascript
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
         * Ocultar pantalla inicial.
         */

        welcome.style.display = "none";


        /*
         * Mostrar invitación.
         */

        invitation.classList.add("active");


        /*
         * Mostrar botón de música.
         */

        musicButton.classList.add("visible");


        /*
         * Llevar al usuario al inicio
         * de la invitación.
         */

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });


        /*
         * Iniciar música.
         *
         * Como sucede después del clic
         * del usuario, el navegador permite
         * reproducir el audio.
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

            musicPlaying = false;

            musicButton.textContent = "♪";

        }

    });


    /* =========================
       MÚSICA EN BUCLE
    ========================== */

    music.addEventListener("ended", () => {

        music.currentTime = 0;

        music.play().catch(() => {

            console.log(
                "No se pudo reiniciar la música."
            );

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
     * Fecha del evento:
     *
     * 5 de octubre de 2026
     *
     * Como todavía no tenemos la hora
     * del evento, el contador llega a cero
     * al comenzar el día 5 de octubre.
     */

    const eventDate = new Date(
        "2026-10-05T00:00:00"
    );


    function updateCountdown() {

        const now = new Date();

        const difference =
            eventDate.getTime() - now.getTime();


        /*
         * Si ya llegó la fecha:
         */

        if (difference <= 0) {

            days.textContent = "00";

            hours.textContent = "00";

            minutes.textContent = "00";

            seconds.textContent = "00";

            return;

        }


        /*
         * Cálculo del tiempo restante.
         */

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


        /*
         * Mostrar resultados.
         */

        days.textContent =
            String(totalDays).padStart(2, "0");


        hours.textContent =
            String(remainingHours).padStart(2, "0");


        minutes.textContent =
            String(remainingMinutes).padStart(2, "0");


        seconds.textContent =
            String(remainingSeconds).padStart(2, "0");

    }


    /*
     * Actualizar inmediatamente.
     */

    updateCountdown();


    /*
     * Actualizar cada segundo.
     */

    setInterval(
        updateCountdown,
        1000
    );


    /* =========================
       EFECTO DE DOBLE CLICK
    ========================== */

    document.addEventListener("dblclick", () => {

        for (let i = 0; i < 12; i++) {

            const particle =
                document.createElement("div");


            particle.style.position =
                "fixed";


            particle.style.width =
                "6px";


            particle.style.height =
                "6px";


            particle.style.background =
                "#c9a657";


            particle.style.borderRadius =
                "50%";


            particle.style.left =
                "50%";


            particle.style.top =
                "50%";


            particle.style.zIndex =
                "9999";


            particle.style.pointerEvents =
                "none";


            const angle =
                Math.random() *
                Math.PI *
                2;


            const distance =
                80 +
                Math.random() *
                160;


            document.body.appendChild(
                particle
            );


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
```
