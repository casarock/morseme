(function(window) {
    function Morser() {
        // map inspired by https://github.com/jarofghosts/morse-codes/blob/master/index.js
        this.morseMap = {
            'A': '.-',
            'B': '-...',
            'C': '-.-.',
            'D': '-..',
            'E': '.',
            'F': '..-.',
            'G': '--.',
            'H': '....',
            'I': '..',
            'J': '.---',
            'K': '-.-',
            'L': '.-..',
            'M': '--',
            'N': '-.',
            'O': '---',
            'P': '.--.',
            'Q': '--.-',
            'R': '.-.',
            'S': '...',
            'T': '-',
            'U': '..-',
            'V': '...-',
            'W': '.--',
            'X': '-..-',
            'Y': '-.--',
            'Z': '--..',
            'Á': '.--.-', // A with acute accent
            'Ä': '.-.-',  // A with diaeresis
            'É': '..-..', // E with acute accent
            'Ñ': '--.--', // N with tilde
            'Ö': '---.',  // O with diaeresis
            'Ü': '..--',  // U with diaeresis
            '1': '.----',
            '2': '..---',
            '3': '...--',
            '4': '....-',
            '5': '.....',
            '6': '-....',
            '7': '--...',
            '8': '---..',
            '9': '----.',
            '0': '-----',
            ',': '--..--',  // comma
            '.': '.-.-.-',  // period
            '?': '..--..',  // question mark
            ';': '-.-.-',   // semicolon
            ':': '---...',  // colon
            '/': '-..-.',   // slash
            '-': '-....-',  // dash
            "'": '.----.',  // apostrophe
            '(': '-.--.',   // open parenthesis
            ')': '-.--.-',  // close parenthesis
            '_': '..--.-',  // underline
            '@': '.--.-.',
            ' ': '.-.-'  // not really correct, but I need a whitespace. Using New Line instead...
        };

        // create morse to ascii map.
        this.asciiMap = {};
        for (var key in this.morseMap) {
            if (this.morseMap.hasOwnProperty(key)) {
              this.asciiMap[this.morseMap[key]] = key;
            }
        }

        this.audioShort = null;
        this.audioLong = null;
        this.shortSound = 'short.wav';
        this.longSound = 'long.wav';
    }

    Morser.prototype.textToMorse = function(text) {
        // Split chars
        var characters = text.toUpperCase().split('');
        var resultCode = characters.map(function(char) {
            return this.morseMap.hasOwnProperty(char) ? this.morseMap[char] : '..--..';
        }.bind(this))

        return resultCode.join(' ');
    };

    Morser.prototype.morseToText = function(morseCode) {
        var codes = morseCode.split(' ');
        var resultText = codes.map(function(code) {
            return this.asciiMap.hasOwnProperty(code) ? this.asciiMap[code] : '\u25C7'
        }.bind(this));

        return resultText.join('');
    };

    Morser.prototype.playMorseCode = function (morseCode) {
        if (this.audioLong === null || this.audioLong === null) {
            this.audioLong = new Audio(this.longSound);
            this.audioShort = new Audio(this.shortSound);
        }

        var soundCoder = function(arr) {
            var toPause = 250;
            var beep = arr.shift();
            if (beep === ".") {
                this.audioShort.play();
            }

            if (beep === "-") {
                this.audioLong.play();
            }

            if (beep === " ") {
                toPause = 350;
            }

            if (arr.length > 0) {
                window.setTimeout(function() {
                    soundCoder(arr);
                }.bind(this), toPause);
            }
        }.bind(this);

        var codeArray = morseCode.split('');
        soundCoder(codeArray);
    };

    window.Morser = Morser;

})(typeof window !== "undefined" ? window : {});
