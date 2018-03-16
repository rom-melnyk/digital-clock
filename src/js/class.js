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
        this.charElems = [];
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
            const elem = _getDigitElem(idx, this.rootElem, this.charElems);
            const suffix = CHAR_SUFFIXES[ch] || ch;
            elem.className = `char ch-${suffix}`;
            this.text += ch;
        });

        // hiding extra chars
        for (let i = chars.length; i < this.charElems.length; i++) {
            const elem = _getDigitElem(i, this.rootElem, this.charElems);
            elem.className = `char hidden`;
        }
    }


}


function _getDigitElem(idx, rootElem, charElems) {
    if (idx >= charElems.length) {
        const charElem = document.createElement('div');
        charElem.className = 'char';

        for (let i = 0; i < 9; i++) {
            const li = document.createElement('li');
            charElem.appendChild(li);
        }

        rootElem.appendChild(charElem);
        charElems.push(charElem);
    }

    return this.charElems[idx];
}


module.exports = DigitalClock;