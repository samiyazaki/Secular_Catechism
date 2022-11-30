function startTimer(duration, display) {
    var timer = duration, seconds;
    setInterval(function () {
        seconds = parseInt(timer %60, 10);

        display.textContent = ":" = seconds;

        if (--timer < 0) {
            timer = duration;
        }
    }, 1000);
}

document.getElementById("get_krunk").addEventListener("click", () => {
    var thirtySeconds = 30,
        display = document.querySelector('#time');
    startTimer(thirtySeconds, display);
});