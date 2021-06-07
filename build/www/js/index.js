let interval;
let countdown_button = document.getElementById('countdown_button');
let forward_button = document.getElementById('forward_button');
let countdown_number = document.getElementById('countdown_number');
let countdown_menu = document.getElementById('countdown_menu');
let app_wrapper = document.getElementById('app_wrapper');
var bellSound = new Audio('audio/one_bell.mp3');
let pomo_minutes = 1;
let pomo_seconds = 0;
let app = {
    // Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);

        // Descomentar para probar la app directamente en el navegador
        this.onDeviceReady();
    },
    onDeviceReady: function () {
        this.receivedEvent();
    },
    receivedEvent: function () {
        // Click en la opcion por defecto al momento de cargar la pagina
        document.getElementById('option_pomodoro').click();
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
        if (countdown_button.classList.contains('stopped')) {
            this.clearCountdown();
            this.updateStatusToSelectedOption();
        }
        countdown_button.classList.add('started');
        forward_button.classList.remove('hidden');
        countdown_button.innerHTML = 'Detener';

        if (countdown_button.classList.contains('paused')) {
            countdown_button.classList.remove('paused');
        }

        function counter() {
            if (parseInt(pomo_seconds) === 0) {
                if (parseInt(pomo_minutes) === 0) {
                    app.clearCountdown();
                    app.updateStatusToSelectedOption();
                    bellSound.play();
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
        this.clearCountdown();
        countdown_button.classList.add('paused');
        countdown_button.innerHTML = 'Reanudar';
    },
    stopCountdown: function () {
        this.clearCountdown();
        countdown_button.classList.add('stopped');
        pomo_minutes = 0;
        pomo_seconds = 0;
        this.printCountdownNumbers(pomo_minutes, pomo_seconds);
        countdown_button.innerHTML = 'Comenzar';
        this.updateStatusToSelectedOption();
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
    updateStatusToSelectedOption: function () {
        let options = countdown_menu.getElementsByClassName('countdown-menu__selector');
        let option_selected;
        for (let option of options) {
            if (option.classList.contains('option--selected')) {
                option_selected = option;
            }
        }
        option_selected.click();
    },
    customSessionTimes: function (option_id) {
        let input_minute;
        switch (option_id) {
            // LLamadas desde menu de opciones
            case 'option_pomodoro':
                input_minute = parseInt(document.getElementById('pomodoro_time').value);
                input_minute = this.checkCustomMinutes(input_minute);
                return input_minute;
            case 'option_short-break':
                input_minute = parseInt(document.getElementById('short-break_time').value);
                input_minute = this.checkCustomMinutes(input_minute);
                return input_minute;
            case 'option_long-break':
                input_minute = parseInt(document.getElementById('long-break_time').value);
                input_minute = this.checkCustomMinutes(input_minute);
                return input_minute;
            // LLamadas al cambiar los valores en los ajustes
            case 'pomodoro_time':
                input_minute = parseInt(document.getElementById(option_id).value);
                pomo_minutes = this.checkCustomMinutes(input_minute);
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;
            case 'short-break_time':
                input_minute = parseInt(document.getElementById(option_id).value);
                pomo_minutes = this.checkCustomMinutes(input_minute);
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;
            case 'long-break_time':
                input_minute = parseInt(document.getElementById(option_id).value);
                pomo_minutes = this.checkCustomMinutes(input_minute);
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;
        }
    },

    // Funciones auxiliares
    changeBackground: function (option_id) {
        switch (option_id) {
            case 'option_pomodoro':
                this.clearCountdown();
                this.changeAppColor('--pomo-color');
                pomo_minutes = this.customSessionTimes(option_id);
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;

            case 'option_short-break':
                this.clearCountdown();
                this.changeAppColor('--short-break-color');
                pomo_minutes = this.customSessionTimes(option_id);
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;

            case 'option_long-break':
                this.clearCountdown();
                this.changeAppColor('--long-break-color');
                pomo_minutes = this.customSessionTimes(option_id);
                pomo_seconds = 0;
                this.printCountdownNumbers(pomo_minutes, pomo_seconds);
                break;
        }
    },
    printCountdownNumbers: function (pomo_minutes, pomo_seconds) {
        pomo_minutes = parseInt(pomo_minutes).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
        pomo_seconds = parseInt(pomo_seconds).toLocaleString(undefined, {minimumIntegerDigits: 2, useGrouping: false});
        countdown_number.innerHTML = `${pomo_minutes}:${pomo_seconds}`;
    },
    clearCountdown: function () {
        clearInterval(interval);
        countdown_button.className = 'countdown-controller__button';
        forward_button.classList.add('hidden');
        countdown_button.innerHTML = 'Comenzar';
    },
    changeAppColor: function (css_variable) {
        let main_color = getComputedStyle(document.documentElement).getPropertyValue(css_variable);
        app_wrapper.style.setProperty('background-color', main_color);
        countdown_button.style.setProperty('color', main_color);
    },
    checkCustomMinutes: function (input_minute) {
        if (isNaN(input_minute)) {
            pomo_minutes = 0;
        } else {
            pomo_minutes = input_minute;
        }
        return pomo_minutes;
    },
	
};

app.initialize();
