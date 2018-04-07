# Digital clock
A Digital clock in HTML/CSS with very little of JS.



## API specifications

#### Constructor `new DigitalClock(element, style)`
Constructor returning the instance of the clock. Accepts following params:
- `{string|HTMLElement} element` defines the clock container. Might be
   * either selector (the string to pass to `document.querySelector()`),
   * or the HTML element itself (e.g., received from `document.getElementById()`).
- optional `{object} style`. See `.setStyle()` for reference.

Mind that clock container element gets decorated with CSS class `.digital-clock` so pay extra attention if this class is not used anywhere else.

#### Constructor statics
- `{string} DigitalClock.SUPPORTED_CHARS` contains the list of all chars supported:
   - digits `0-9`,
   - hex digits `a-f`,
   - `p` (for am/am clock mark),
   - separators `.:-_` and space.

#### Clock instance
Provides following properties/methods:
- `.text` keeps the rendered text. Mind that it is not always equal to what was passed to `.setText()` because not all chars are currently supported.
- `.style` keeps actual style.
- `.setText(text)` renders given text omitting unsupported characters.
- `.setStyle({ color: string, fontSize: string })` defines basic styling of the indicator chars.



## How to...

#### ...use standalone minified files CSS/JS:
- pick `digital-clock.min.css` and `digital-clock.min.js` from `bin/` folder and include 'em in your HTML:
   ```html
   <link rel="stylesheet" type="text/css" href="digital-clock.min.css">
   <script type="application/javascript" src="digital-clock.min.js"></script>
   ```
- Do some Javascript:
   ```javascript
   const clock = new DigitalClock('.target-element', { color: '#dea' });
   clock.setText('12:34');
   ```

#### ...use the code with Webpack/Gulp or other project compiler:
- `npm install --save https://github.com/rom-melnyk/digital-clock`
- `const DigitalClock = require('digital-clock');` (or do `import` it);
- follow the API instructions.

#### ...build an actual clock:
```javascript
const clock = new DigitalClock('.target-element', { color: '#1a3' });

setInterval(() => {
    const date = new Date();
    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    const ms = Math.floor(date.getMilliseconds() / 100); // 1/10 of second

    const text = ( h < 10 ? `0${h}` : h ) + ':'
        + ( m < 10 ? `0${m}` : m )
        + ( s % 2 ? ':' : ' ' )
        + ( s < 10 ? `0${s}` : s ) + '.' + ms;
    clock.setText(text);
}, 100);
```



## Demo
Open `demo/demo.html` in browser. Or check out [https://melnyk.site/post/5].



## Development
`npm run dev` to run the watcher/complier; any change in `src/` folder forces re-compilation automatically.  
`npm run prod` generates production files (minified, map-less).

**Don't forget** to run `npm run prod` before pushing!



## Support
Modern browser with ES6/CSS3 support except IE (does not support `--css-variables`).



## Credits
Roman Melnyk <email.rom.melnyk@gmail.com>

