
const digitToNatoSpell = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'niner'
];

const digitToNormalSpell = [
    'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
];

const letterToNatoSpell = {
    0: 'zero', 1: 'one', 2: 'two', 3: 'three', 4: 'four', 5: 'five', 6: 'six', 7: 'seven', 8: 'eight', 9: 'niner',
    "-": "dash", ",": "comma", ".": "decimal",
    a: "alpha", b: "bravo", c: "charlie",
    d: "delta", e: "echo", f: "foxtrot",
    g: "golf", h: "hotel", i: "india",
    j: "juliette", k: "kilo", l: "lima",
    m: "mike", n: "november", o: "oscar",
    p: "papa", q: "quebec", r: "romeo",
    s: "sierra", t: "tango", u: "uniform",
    v: "victor", w: "whiskey", x: "x-ray",
    y: "yankee", z: "zulu"
}


function stringToNatoSpelling(str) {
    str = str.toLowerCase();
    let result = "";
    // Actual numbers
    for(let i=0; i<str.length; i++) {
        if(letterToNatoSpell[str[i]]) {
            result += letterToNatoSpell[str[i]] + " ";
        }
    }
    return result.trim();
}


function altitudeHundredsFeet(hundredsOfFeet) {
    let str = "";

    if(hundredsOfFeet >= 10) {
        str += `${digitToNormalSpell[Math.floor(hundredsOfFeet / 10)]} thousand `;
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
