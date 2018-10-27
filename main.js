function doSay(atcItem) {
    var synth = window.speechSynthesis;

    var utterThis = new SpeechSynthesisUtterance(atcItem.speech);
    utterThis.voice = getRandomEnglishVoice();

    synth.speak(utterThis);

    return atcItem;
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

    return `${callsign}, climb ${altitudeHundredsFeet(altitudeHundreds)} feet`;
}

function randomTurn(callsign) {
    const controller = "Krymsk Control";

    const degrees = Math.ceil(Math.random() * 360 / 5) * 5;
    const degreesText = numeral(degrees).format("000");

    const direction = _.sample(["left", "right"]);

    const text = `${callsign}, ${controller}. Turn ${direction} heading ${degreesText}`;
    const speech = `${callsign}, ${controller}. Turn ${direction} heading ${stringToNatoSpelling(degreesText)}`;
    const expectedReadback = `turning ${direction} heading ${stringToNatoSpelling(degreesText)} ${callSign}`;

    return {
      text: text,
      speech: speech,
      expectedReadback: expectedReadback
    };
}


function randomTaxi(callsign) {
    const controller = "Krymsk Control";
    const taxiways = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "a2", "b2", "c2", "d2"];

    const taxiWaysToUse = _.sampleSize(taxiways, _.random(1, 4));
    const taxiWaysSpeech = taxiWaysToUse.map(stringToNatoSpelling).join(", ");
    const taxiWaysText = taxiWaysToUse.join(", ").toUpperCase();
    const runway = _.random(1, 36);
    const runwayText = numeral(runway).format("00");

    const text = `${callsign}, ${controller}. Cleared for taxi via ${taxiWaysText}. Hold short runway ${runwayText}.`;
    const speech = `${callsign}, ${controller}. Cleared for taxi via ${taxiWaysSpeech}. Hold short runway ${stringToNatoSpelling(runwayText)}.`;
    const expectedReadback = `cleared for taxi via ${taxiWaysSpeech} hold short runway ${stringToNatoSpelling(runwayText)} ${callSign}`;

    return {
      text: text,
      speech: speech,
      expectedReadback: expectedReadback
    };
}


function randomClearance(callsign) {
    const area = _.sample([["Krymsk tower", "Krymsk Control"], ["Al Dhafra tower", "Al Dhafra control"], ["Kobuletti tower", "Kobuletti control"], ["Anapa tower", "Anapa control"]]);
    const tower = area[0];
    const controller = area[1];
    const controlFreq = 120 + Math.round(Math.random() * 100) / 10;
    const controlFreqText = numeral(controlFreq).format("0.00");

    const initialAltitudeHundreds = Math.round(3 + Math.random() * 45);
    const initialAltitudeText = numeral(initialAltitudeHundreds * 100).format("0");
    const initialAltitudeSpeech = altitudeHundredsFeet(initialAltitudeHundreds);
    const angels = 7 + Math.round(Math.random() * 20);
    const angelsText = numeral(angels).format("0");
    const exit = _.sample(["north", "south", "west", "east"]);

    const greeting = Math.random() > 0.5 ? "Good morning!" : "";


    const text = `${callsign}, ${tower}. You are cleared as filed, exit ${exit}. Maintain ${initialAltitudeText}, expect angels ${angelsText}. After departure switch to frequency ${controlFreqText} for ${controller}. ${greeting}`;
    const speech = `${callsign}, ${tower}. You are cleared as filed, exit ${exit}. Maintain ${initialAltitudeSpeech}, expect angels ${stringToNatoSpelling(angelsText)}. After departure switch to frequency ${stringToNatoSpelling(controlFreqText)} for ${controller}. ${greeting}`;
    const expectedReadback = `cleared as filed exit ${exit}, maintain ${initialAltitudeSpeech}, expect angels ${angelsText}, after departure switch to frequency ${stringToNatoSpelling(controlFreqText)}, ${callSign}`;

    return {
      text: text,
      speech: speech,
      expectedReadback: expectedReadback
    };
}
