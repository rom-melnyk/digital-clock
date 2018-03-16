function runDemo() {
    const MODES = {
        // correspond to values on the radio input elements
        Random: 'random',
        Clock: 'clock',
        UserInput: 'user-input'
    };
    let currentMode;
    let intervalId = null;
    const AVAILABLE_CHARS = '0123456789-:ap';


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
                text += AVAILABLE_CHARS[ Math.round(Math.random() * AVAILABLE_CHARS.length) ];
            }
            clock.setText(text);
        }, 500);
    }


    function runClockMode() {
        intervalId = setInterval(() => {
            const date = new Date().toISOString() // E.g., 2018-03-16T14:34:50.517Z
                .substr(11, 10)
                .replace('.', '-');
            clock.setText(date);
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
        // modeSelector.addEventListener('focus', (e) => {
        //     if (modeSelector.checked) {
        //         applyMode(modeSelector.value);
        //     }
        // });

        if (modeSelector.checked) {
            applyMode(modeSelector.value);
        }
    });
}
