let interval;
let countdown_button = document.getElementById('countdown_button');
let forward_button = document.getElementById('forward_button');
let countdown_number = document.getElementById('countdown_number');
let countdown_menu = document.getElementById('countdown_menu');

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


        // Restamos 1 a los minutos para que empiecen donde tocan
        // si los minutos son mayores a 0, sino, restamos segundos.
        if (parseInt(pomo_minutes) > 0) {
            pomo_minutes -= 1;
        }

        function counter() {
            // Si los segundos son 0, restamos un minuto y hacemos que
            // los segundos vuelvan a ser 60
            if (parseInt(pomo_seconds) === 0) {
                // Si los minutos son 0 acabamos el contador
                if (parseInt(pomo_minutes) === 0) {
                    clearInterval(interval);
                    return;
                }
                pomo_minutes -= 1;
                pomo_seconds = 60;
            }
            // Esto se ejecuta si ninguna de las 2 situaciones anteriores sucede
            pomo_seconds -= 1;
            pomo_minutes = pomo_minutes.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
            pomo_seconds = pomo_seconds.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
            countdown_number.innerHTML = `${pomo_minutes}:${pomo_seconds}`;
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
        pomo_minutes = pomo_minutes.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
        pomo_seconds = pomo_seconds.toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
        countdown_number.innerHTML = `${pomo_minutes}:${pomo_seconds}`;
        countdown_button.innerHTML = 'Comenzar';
    },

    selectSessionOption: function (option_id) {
        let options = countdown_menu.getElementsByTagName('button');
        for (let option of options) {
            option.classList.remove('option--selected');
        }
        let option_selected = document.getElementById(option_id);
        option_selected.classList.add('option--selected');
    }
};

app.initialize();
