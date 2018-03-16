const modeSelectorElems = Array.from( document.getElementsByName('mode') );
modeSelectorElems.forEach((modeSelector) => {
    modeSelector.addEventListener('change', );
});

const clock = new DigitalClock('.clock');
const userInputElem = document.getElementById('user-input');

function getMode() {
    for (let i = 0; i < modeSelectorElems.length; i++) {
        const modeSelectorElem = modeSelectorElems[i];
        if (modeSelectorElem.checked) {
            return modeSelectorElem.value;
        }
    }
    return null;
}

function applyMode(mode) {
    switch (mode) {
        case 'random':
            runRandomMode();
            break;
        case 'clock':
            runClockMode();
            break;
        case 'user-input':
            runUserInputMode();
            break;
        default:
    }
}

function runRandomMode() {

}
function runClockMode() {
    // const date = new Date().toDateString();
    // const hh = date.getHours();
}
function stopTimer() {

}
function runUserInputMode() {
    clock.setText(userInputElem.value);
}

function runApp() {
    console.info('It works!');

    let counter = 0;
    let intervalId = setInterval(() => {

        const text = Math.round(Math.random() * 1000);
        clock.setText(text);
        if (++counter >= 600) {
            clearInterval(intervalId);
        }
    }, 500);
}


