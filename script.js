document.addEventListener("DOMContentLoaded", () => {

    const button = document.getElementById("openInvitation");
    const welcome = document.getElementById("welcome");
    const invitation = document.getElementById("invitation");

    button.addEventListener("click", () => {

        welcome.style.display = "none";

        invitation.classList.add("active");

    });

});
