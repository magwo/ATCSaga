


function simpleRecognition(cb) {
    var recognition = new SpeechRecognition();
    var speechRecognitionList = new SpeechGrammarList();
    //speechRecognitionList.addFromString(grammar, 1);

    var colors = ['aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral'];
    //var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

    recognition.grammars = speechRecognitionList;
    recognition.continuous = true;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;


    recognition.onresult = function(event) {
        console.log("result", event);
        var last = event.results.length - 1;
        var transcript = event.results[last][0].transcript;
        var confidence = event.results[0][0].confidence;
        console.log('Result received: ' + transcript + '.');
        console.log('Confidence: ' + event.results[0][0].confidence);
        cb(transcript, confidence);
    }

    recognition.onspeechend = function() {
        console.log("end");
        recognition.stop();
    }

    recognition.start();

    return recognition;
}
