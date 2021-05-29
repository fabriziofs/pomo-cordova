let interval;
let countdown_button = document.getElementById('countdown_button');
let countdown_number = document.getElementById('countdown_number');
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
    },
    checkCountdown: function () {
        if (countdown_button.classList.contains('started')) {
            this.pauseCountdown();
        } else {
            this.startCountdown();
        }
    },
    startCountdown: function () {
        // Iniciamos los valores del contador
        let pomo_minutes = 1;
        let pomo_seconds = 60;
        countdown_button.classList.add('started');
        countdown_button.innerHTML = 'Detener';
        // Restamos 1 a los minutos para que empiecen donde tocan
        pomo_minutes -= 1;

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
    }
};

app.initialize();

