const INDICATOR_EDGE_COUNT = 10;
const SUPPORTED_CHARS = '0123456789 -:_.abcdefp';
const CHAR_SUFFIXES = {
    '-': 'minus',
    ':': 'colon',
    ' ': 'space',
    '_': 'under',
    '.': 'dot',
};


class DigitalClock {
    static get SUPPORTED_CHARS() { return SUPPORTED_CHARS; }


    /**
     * @param {string|Element} elem         HTML element (or selector) to render the clock
     * @param {{ color: string, fontSize: string }} style
     */
    constructor(elem, style = {}) {
        this.rootElem = null;
        this.charElems = [];
        this.text = '';
        this.style = {};

        if (typeof elem === 'string') {
            this.rootElem = document.querySelector(elem);
        } else if (elem instanceof Element) {
            this.rootElem = elem;
        }

        if (!this.rootElem) {
            throw new Error(`Cannot initialize Digital Clock on ${elem}`);
        }

        this.rootElem.innerHTML = '';
        if (!this.rootElem.classList.contains('digital-clock')) {
            this.rootElem.classList.add('digital-clock');
        }

        this.setStyle(style);
    }


    /**
     * @param {string|number} text
     */
    setText(text) {
        if (!this.rootElem) {
            throw new Error('Digital Clock is not initialized');
        }

        this.text = '';
        const chars = Array.from(`${text}`).filter(ch => SUPPORTED_CHARS.includes(ch));
        chars.forEach((ch, idx) => {
            const elem = _getDigitElem(idx, this.charElems, this.rootElem);
            const suffix = CHAR_SUFFIXES[ch] || ch;
            elem.className = `char ch-${suffix}`;
            this.text += ch;
        });

        // hiding extra chars
        for (let i = chars.length; i < this.charElems.length; i++) {
            const elem = _getDigitElem(i, this.charElems, this.rootElem);
            elem.className = 'char hidden';
        }
    }


    /**
     * @param {{ [color]: string, [fontSize]: string }} style
     */
    setStyle(style) {
        this.style = Object.assign({ color: '#000', fontSize: '2em' }, this.style, style);
        const { color, fontSize } = this.style;
        this.rootElem.style.setProperty('--color', color);
        this.rootElem.style.setProperty('--font-size', fontSize);
    }
}


function _getDigitElem(idx, charElems, rootElem) {
    if (idx >= charElems.length) {
        const charElem = document.createElement('div');
        charElem.className = 'char';

        for (let i = 0; i < INDICATOR_EDGE_COUNT; i++) {
            const li = document.createElement('li');
            charElem.appendChild(li);
        }

        rootElem.appendChild(charElem);
        charElems.push(charElem);
    }

    return charElems[idx];
}


module.exports = DigitalClock;