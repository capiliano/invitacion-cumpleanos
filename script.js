document.addEventListener("DOMContentLoaded", function () {

    const openButton = document.getElementById("openInvitation");
    const welcome = document.getElementById("welcome");
    const invitation = document.getElementById("invitation");
    const music = document.getElementById("music");
    const musicButton = document.getElementById("musicButton");

    let musicPlaying = false;

    openButton.addEventListener("click", function () {

        welcome.style.display = "none";

        invitation.classList.add("active");

        musicButton.classList.add("visible");

        window.scrollTo(0, 0);

        music.currentTime = 0;

        music.play()
            .then(function () {

                musicPlaying = true;

                musicButton.textContent = "Ⅱ";

            })
            .catch(function (error) {

                console.log("No se pudo iniciar la música:", error);

            });

    });


    musicButton.addEventListener("click", function () {

        if (musicPlaying) {

            music.pause();

            musicPlaying = false;

            musicButton.textContent = "♪";

        } else {

            music.play()
                .then(function () {

                    musicPlaying = true;

                    musicButton.textContent = "Ⅱ";

                })
                .catch(function (error) {

                    console.log("No se pudo reproducir la música:", error);

                });

        }

    });


    const eventDate = new Date("2026-10-05T00:00:00");


    function updateCountdown() {

        const now = new Date();

        const difference = eventDate - now;


        if (difference <= 0) {

            document.getElementById("days").textContent = "00";
            document.getElementById("hours").textContent = "00";
            document.getElementById("minutes").textContent = "00";
            document.getElementById("seconds").textContent = "00";

            return;

        }


        const totalSeconds =
            Math.floor(difference / 1000);


        const daysValue =
            Math.floor(totalSeconds / 86400);


        const hoursValue =
            Math.floor((totalSeconds % 86400) / 3600);


        const minutesValue =
            Math.floor((totalSeconds % 3600) / 60);


        const secondsValue =
            totalSeconds % 60;


        document.getElementById("days").textContent =
            String(daysValue).padStart(2, "0");


        document.getElementById("hours").textContent =
            String(hoursValue).padStart(2, "0");


        document.getElementById("minutes").textContent =
            String(minutesValue).padStart(2, "0");


        document.getElementById("seconds").textContent =
            String(secondsValue).padStart(2, "0");

    }


    updateCountdown();

    setInterval(updateCountdown, 1000);

});
