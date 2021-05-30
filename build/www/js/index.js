let interval;
let countdown_button = document.getElementById('countdown_button');
let forward_button = document.getElementById('forward_button');
let countdown_number = document.getElementById('countdown_number');
let countdown_menu = document.getElementById('countdown_menu');
let app_wrapper = document.getElementById('app_wrapper');

let pomo_minutes = 1;
let pomo_seconds = 60;
let app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
        this.onDeviceReady();
    },
    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        this.receivedEvent('deviceready');
    },

    receivedEvent: function (id) {
        countdown_button.addEventListener('click', this.checkCountdown.bind(this));
        forward_button.addEventListener('click', this.stopCountdown.bind(this));
    },

    checkCountdown: function () {
        if (countdown_button.classList.contains('started')) {
            this.pauseCountdown();
        } else {
            this.startCountdown();
        }
    },
    startCountdown: function () {
        countdown_button.classList.add('started');
        forward_button.classList.remove('hidden');
        countdown_button.innerHTML = 'Detener';

        if (countdown_button.classList.contains('paused')) {
            countdown_button.classList.remove('paused');
        }
        if (countdown_button.classList.contains('stopped')) {
            pomo_minutes = 1;
            pomo_seconds = 60;
        }


        if (parseInt(pomo_minutes) > 0) {
            pomo_minutes -= 1;
        }

        function counter() {
            if (parseInt(pomo_seconds) === 0) {
                if (parseInt(pomo_minutes) === 0) {
                    clearInterval(interval);
                    return;
                }
                pomo_minutes -= 1;
                pomo_seconds = 60;
            }
            pomo_seconds -= 1;
            app.printCountdownNumbers(pomo_minutes, pomo_seconds);
        }

        interval = setInterval(counter, 1000);
    },
    pauseCountdown: function () {
        clearInterval(interval);
        countdown_button.innerHTML = 'Reanudar';
        countdown_button.classList.remove('started');
        countdown_button.classList.add('paused');
        forward_button.classList.add('hidden');
    },
    stopCountdown: function () {
        clearInterval(interval);
        forward_button.classList.add('hidden');
        countdown_button.classList.add('stopped');
        countdown_button.classList.remove('started');
        countdown_button.classList.remove('paused');
        pomo_minutes = 0;
        pomo_seconds = 0;

        this.printCountdownNumbers(pomo_minutes, pomo_seconds);
        countdown_button.innerHTML = 'Comenzar';
    },

    selectSessionOption: function (option_id) {
        let options = countdown_menu.getElementsByTagName('button');
        this.changeBackground(option_id);
        for (let option of options) {
            option.classList.remove('option--selected');
        }
        let option_selected = document.getElementById(option_id);
        option_selected.classList.add('option--selected');
    },

    changeBackground: function (option_id) {
        switch (option_id) {
            case 'option_pomodoro':
                app_wrapper.className = 'app-wrapper pomodoro--bg';
                pomo_minutes = 25;
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;

            case 'option_short-break':
                app_wrapper.className = 'app-wrapper short-break--bg';
                pomo_minutes = 5;
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;

            case 'option_long-break':
                app_wrapper.className = 'app-wrapper long-break--bg';
                pomo_minutes = 10;
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;
        }
    },
    printCountdownNumbers: function (pomo_minutes, pomo_seconds) {
        pomo_minutes = parseInt(pomo_minutes).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
        pomo_seconds = parseInt(pomo_seconds).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
        countdown_number.innerHTML = `${pomo_minutes}:${pomo_seconds}`;
    }
};

app.initialize();
