function doSay(txt) {
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(txt);
    utterThis.voice = getRandomEnglishVoice();

    synth.speak(utterThis);

    return txt;
}


function getRandomEnglishVoice() {
    const voices = getAllEnglishVoices(window.speechSynthesis);

    const selectedVoice = voices[Math.floor(Math.random() * voices.length)];
    console.log("Voice is", selectedVoice.name);
    return selectedVoice;
}


function randomClimb(callsign) {
    const altitudeHundreds = Math.round(3 + Math.random() * 45);

    console.log("altitude", altitudeHundreds);

    return doSay(`${callsign}, climb ${altitudeHundredsFeet(altitudeHundreds)} feet`);
}

function randomTurn(callsign) {
    const controller = "Krymsk Control";

    const degrees = Math.ceil(Math.random() * 360 / 5) * 5;

    const direction = _.sample(["left", "right"]);

    return doSay(`${callsign}, ${controller}. Turn ${direction} heading ${numberToNatoSpelling(degrees, 3)}`);
}


function randomTaxi(callsign) {
    const controller = "Krymsk Control";
    const taxiways = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "a2", "a3", "b2", "b3"];

    const taxiWaysToUse = _.sampleSize(taxiways, _.random(1, 4)).map(stringToNatoSpelling).join(", ");

    const runway = _.random(1, 36);

    return doSay(`${callsign}, ${controller}. Cleared for taxi via ${taxiWaysToUse}. Hold short runway ${numberToNatoSpelling(runway, 2)}.`);
}


function randomClearance(callsign) {
    const area = _.sample([["Krymsk tower", "Krymsk Control"], ["Al Dhafra tower", "Al Dhafra control"], ["Kobuletti tower", "Kobuletti control"], ["Anapa tower", "Anapa control"]]);
    const tower = area[0];
    const controller = area[1];
    const controlFreq = 120 + Math.round(Math.random() * 100) / 10;
    
    const initialAltitudeHundreds = Math.round(3 + Math.random() * 45);
    const angels = 7 + Math.round(Math.random() * 20);
    const exit = _.sample(["north", "south", "west", "east"]);

    const greeting = Math.random() > 0.5 ? "Good morning!" : "";

    let clearance = `${callsign}, ${tower}. You are cleared as filed, exit ${exit}. Maintain ${altitudeHundredsFeet(initialAltitudeHundreds)}, expect angels ${numberToNatoSpelling(angels)}. After departure switch to frequency ${numberToNatoSpelling(controlFreq, 0, 2)} for ${controller}. ${greeting}`;

    return doSay(clearance);
}