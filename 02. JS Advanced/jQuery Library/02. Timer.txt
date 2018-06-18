function timer() {
    let hours = $('#hours');
    let minutes = $('#minutes');
    let seconds = $('#seconds');

    let interval = null;
    let startTimer = $('#start-timer');

    startTimer.on('click', function () {
        if (interval) {
            clearInterval(interval);
        }
        interval = setInterval(updateTime, 1000);
    });
    $('#stop-timer').on('click', function () {
        clearInterval(interval);
    });

    function updateTime() {
        let sec = seconds.text();
        let mins = minutes.text();
        let hrs = hours.text();

        seconds.text(`0${+sec + 1}`.slice(-2));

        if (sec >= 59) {
            seconds.text('00');
            minutes.text(`0${+mins + 1}`.slice(-2));
            if (mins >= 59) {
                minutes.text('00');
                hours.text(`0${+hrs + 1}`.slice(-2));
            }
        }
    }
}