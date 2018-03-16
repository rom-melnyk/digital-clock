const DigitalClock = require('./class');


if (typeof window !== 'undefined') {
    window.DigitalClock = DigitalClock;
}

if (typeof module !== 'undefined') {
    module.exports = DigitalClock;
}
