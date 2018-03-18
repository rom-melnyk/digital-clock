function runDemo() {
    const MODES = {
        // correspond to values on the radio input elements
        Random: 'random',
        Clock: 'clock',
        UserInput: 'user-input'
    };
    let currentMode;
    let intervalId = null;
    const SUPPORTED_CHARS = DigitalClock.SUPPORTED_CHARS;


    const clock = new DigitalClock('.digital-clock');
    const userInputElem = document.getElementById('user-input');
    userInputElem.addEventListener('input', () => {
        if (currentMode === MODES.UserInput) {
            clock.setText(userInputElem.value);
        }
    });


    function applyMode(mode) {
        currentMode = mode;

        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }

        switch (mode) {
            case 'random':
                return runRandomMode();
            case 'clock':
                return runClockMode();
            case 'user-input':
                return runUserInputMode();
            default:
        }
    }


    function runRandomMode() {
        intervalId = setInterval(() => {
            let text = '';
            for (let i = 0; i < 10; i++) {
                text += SUPPORTED_CHARS[ Math.round(Math.random() * SUPPORTED_CHARS.length) ];
            }
            clock.setText(text);
        }, 500);
    }


    function runClockMode() {
        function toTwoDigits(x) {
            return x < 10 ? `0${x}` : x;
        }

        intervalId = setInterval(() => {
            const date = new Date();
            const h = date.getHours();
            const m = date.getMinutes();
            const s = date.getSeconds();
            const ms = Math.floor(date.getMilliseconds() / 100); // 1/10 of second
            const s2secSeparator = s % 2 ? ':' : ' ';

            const text = toTwoDigits(h) + ':' + toTwoDigits(m) + s2secSeparator + toTwoDigits(s) + '.' + ms;
            clock.setText(text);
        }, 100);
    }


    function runUserInputMode() {
        clock.setText(userInputElem.value);
    }


    const modeSelectorElems = Array.from( document.getElementsByName('mode') );
    modeSelectorElems.forEach((modeSelector) => {
        modeSelector.addEventListener('click', (e) => {
            if (modeSelector.checked) {
                applyMode(modeSelector.value);
            }
        });

        if (modeSelector.checked) {
            applyMode(modeSelector.value);
        }
    });


    const fontSizeSelectorElem = document.querySelector('#font-size');
    fontSizeSelectorElem.addEventListener('input', () => {
        clock.setStyle({ fontSize: `${fontSizeSelectorElem.value}em` });
    });

    const colorSelectorElem = document.querySelector('#color');
    colorSelectorElem.addEventListener('input', () => {
        clock.setStyle({ color: colorSelectorElem.value });
    });
}
