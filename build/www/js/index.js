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
        let countdown_button = document.getElementById('countdown_button');
        countdown_button.addEventListener('click', this.startCountdown);
    },

    startCountdown: function () {
        let countdown_number = document.getElementById('countdown_number');

        // Iniciamos los valores del contador
        let pomo_minutes = 25;
        let pomo_seconds = 60;

        // Restamos 1 a los minutos para que empiecen donde tocan
        pomo_minutes -= 1;

        function counter() {
            // Si los segundos son 0, restamos un minuto y hacemos que
            // los segundos vuelvan a ser 60
            if (parseInt(pomo_seconds) === 0) {
                // Si los minutos son 0 acabamos el contador
                if (parseInt(pomo_minutes) === 0) {
                    clearInterval(x);
                    return;
                }
                pomo_minutes -= 1;
                pomo_seconds = 60;
            }
            // Esto se ejecuta si ninguna de las 2 situaciones anteriores sucede
            pomo_seconds -= 1;
            pomo_minutes = pomo_minutes.toLocaleString(undefined, {minimumIntegerDigits:2, useGrouping:false});
            pomo_seconds = pomo_seconds.toLocaleString(undefined, {minimumIntegerDigits:2, useGrouping:false});
            countdown_number.innerHTML = `${pomo_minutes}:${pomo_seconds}`;
        }

        let x = setInterval(counter, 1000);
    }
};

app.initialize();

