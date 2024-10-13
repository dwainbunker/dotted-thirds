var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
recognition.lang = 'en-AU';
recognition.interimResults = false;
recognition.maxAlternatives = 5;

document.addEventListener("DOMContentLoaded", (event) => {
    $("#textInput").hide();

    applyResult = (result) => {
        result = result[0].toUpperCase() + result.slice(1, result.length);

        var regex = /[\.\?\!]/gm;
        if (regex.test(result.split('').pop()) === false) {
            result += ".";
        }

        $("#output").text(result);
    };

    toggleButtons = (on) => {
        $("#listen").prop("disabled", on ? false : true);
        $("#type").prop("disabled", on ? false : true);
    };

    recognition.onresult = function(event) {
        applyResult(event.results[0][0].transcript);
        toggleButtons(true);
    };

    $("#listen").click((ev) => { 
        recognition.start();
        toggleButtons(false);
    });

    $("#type").click((ev) => {
        toggleButtons(false);
        $("#textInput").val("");
        $("#textInput").show().focus();
    });

    $("#textInput").on("keydown", (event) => {
        if (event.key == "Enter") {
            applyResult($("#textInput").val());
            $("#textInput").hide();

            toggleButtons(true);
        }
    });

    recognition.onaudioend = (event) => {
        console.log("audio end");
        toggleButtons(true);
        recognition.stop();
    };
});