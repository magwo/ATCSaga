
const digitToNatoSpell = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'niner'
];

const digitToNormalSpell = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
];


function numberStringToNatoSpelling(str) {
    let result = "";
    // Actual numbers
    for(let i=0; i<str.length; i++) {
        if(str[i] === ',' || str[i] === '.') {
            result += "decimal ";
        } else {
            result += digitToNatoSpell[parseInt(str[i])] + " ";
        }
    }
    return result.trim();
}


function numberToNatoSpelling(number, minDigits, minDecimals) {
    const str = number.toString();
    console.log("str is ", str);
    minDigits = minDigits || 0;
    const parsed = str.match(/^(\d+)[.,]?(\d*?)$/);
    console.log("parsed", parsed);
    const integerStr = parsed[1];
    const decimalStr = parsed[2];
    console.log(integerStr);
    let result = "";

    // Padding
    for(let i=0; i + integerStr.length < minDigits; i++) {
        result += digitToNatoSpell[0] + " ";
    }

    result += numberStringToNatoSpelling(str);

    // if(decimalStr) {
    //     // Padding
    //     for(let i=0; i + decimalStr.length < minDecimals; i++) {
    //         result += digitToNatoSpell[0] + " ";
    //     }
    // }

    return result.trim();
}


function altitudeHundredsFeet(hundredsOfFeet) {
    let str = "";

    if(hundredsOfFeet >= 10) {
        str += `${digitToNormalSpell[Math.round(hundredsOfFeet / 10)]} thousand `;
    }

    if(hundredsOfFeet % 10 !== 0) {
        str += `${digitToNormalSpell[hundredsOfFeet % 10]} hundred`;
    }

    return str.trim();
}


function getAllEnglishVoices(speechSynthesis) {
    const bannedVoices = ["Fred", "Veena", "Victoria", "Alex", "Samantha", "Tessa", "Fiona"];
    return speechSynthesis.getVoices().filter(function(voice) {
        return voice.lang.indexOf("en") === 0 && bannedVoices.indexOf(voice.name) < 0;
    });
}



function doSay(txt) {
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.voice = synth.getVoices()[Math.round(Math.random() * synth.getVoices().length)];

    synth.speak(utterThis);
}

