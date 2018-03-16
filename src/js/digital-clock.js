const AVAILABLE_CHARS = /\d|[-:ap]/;
const CHAR_SUFFIXES = {
    '-': 'minus',
    ':': 'colon',
};


class DigitalClock {
    /**
     * @param {string|Element} elem         HTML element (or selector) to render the clock
     */
    constructor(elem) {
        this.rootElem = null;
        this.digitElems = [];
        this.text = '';

        if (typeof elem === 'string') {
            this.rootElem = document.querySelector(elem);
        } else if (elem instanceof Element) {
            this.rootElem = elem;
        }

        if (!this.rootElem) {
            throw new Error(`Cannot initialize Digital Clock on ${elem}`);
        }
        this.rootElem.innerHTML = '';
    }


    setText(text) {
        if (!this.rootElem) {
            throw new Error('Digital Clock is not initialized');
        }

        this.text = '';
        const chars = Array.from(`${text}`).filter(ch => AVAILABLE_CHARS.test(ch));
        chars.forEach((ch, idx) => {
            const elem = _getDigitElem(idx, this.rootElem, this.digitElems);
            const suffix = CHAR_SUFFIXES[ch] || ch;
            elem.className = `digit d-${suffix}`;
            this.text += ch;
        });

        // hiding extra digits
        for (let i = chars.length; i < this.digitElems.length; i++) {
            const elem = _getDigitElem(i, this.rootElem, this.digitElems);
            elem.className = `digit hidden`;
        }
    }


}


function _getDigitElem(idx, rootElem, digitElems) {
    if (idx >= digitElems.length) {
        const digitElem = document.createElement('div');
        digitElem.className = 'digit';

        for (let i = 0; i < 9; i++) {
            const li = document.createElement('li');
            digitElem.appendChild(li);
        }

        rootElem.appendChild(digitElem);
        digitElems.push(digitElem);
    }

    return this.digitElems[idx];
}


// -------------------------------------
if (typeof window !== 'undefined') {
    window.runApp = runApp;
}
if (typeof module !== 'undefined') {
    module.exports = DigitalClock;
}
