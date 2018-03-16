# Digital clock
A Digital clock in HTML/CSS with very little of JS.



## How to...

#### ...use standalone minified files CSS/JS:
- pick `digital-clock.min.css` and `digital-clock.min.js` from `bin/` folder and include 'em in your HTML:
   ```html
   <link rel="stylesheet" type="text/css" href="digital-clock.min.css">
   <script type="application/javascript" src="digital-clock.min.js"></script>
   ```
- Do dome Javascript:
   ```javascript
   const clock = new DigitalClock('.target-element');
   clock.setText('12:34');
   ```
   The `new DigitalClock()` constructor accepts one parameter:
   - either selector of the HTML element (the string to pass to `document.querySelector()`),
   - or the HTML element itself (e.g., received from `document.getElementById()`).

#### ...use the code with Webpack/Gulp or other project compiler:
- `npm install --save https://github.com/rom-melnyk/digital-clock`
- `const DigitalClock = require('digital-clock');` (or do `import` it);
- follow instructions from previous point.



## Demo
Open `demo/demo.html` in browser.



## Development
`npm run dev` to run the watcher/complier; any change in `src/` folder forces re-compilation automatically.  
`npm run prod` generates production files (minified, map-less).



## Support
Any browser with ES6/CSS3 support.



## Credits
Roman Melnyk <email.rom.melnyk@gmail.com>

