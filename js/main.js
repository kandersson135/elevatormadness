$(document).ready(function () {
    var secondsLabel = document.getElementById("floor");
    var totalSeconds = 0;
    var timer;

    $("#start-button").on("click", function () {
        timer = setInterval(setTime, 1000);
        $("#start-button").hide();

        // SPEECH RECOGNITION
        var recognition = new (webkitSpeechRecognition || SpeechRecognition)();
        recognition.lang = "sv-SE";
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognition.start();

        // Listening
        //$('#el').animate({top:'-=100px'},1000);

        // Animate elevator
        $("#elevator").animate({ top: "-=150px" }, 3000);
        $("#el").animate({ bottom: "-=150px" }, 1500);
        $("#el-container").animate({ bottom: "-=170px" }, 1500);
        //$('#el').fadeOut(3000);
        $("#el").delay(1000).fadeOut(400);
        $("#el-container").delay(1000).fadeOut(400);

        //setTimeout(function() { $("#el-container").hide(); }, 1000);

        //$('#el-container').fadeOut(3000);
        $("html").attr("style", "animation: 3s linear 0s normal none infinite animate");
        //floor = setInterval(setTime, 1000);

        // Done listening
        recognition.onend = function () {
            $("#elevator").stop();

            delayModal(1000);

            var score = $("#floor").text();
            $("#em-modal p span").text(score);

            //$('#el').animate({'bottom':'0'},1000);
            //$('#el').css("bottom", "0px");
            //$('#elevator').attr('style', 'bottom: 0px !important');
            $("html").attr("style", "animation: none");
            clearInterval(timer);
        };
    });

    // Timer function
    function setTime() {
        ++totalSeconds;
        secondsLabel.innerHTML = totalSeconds;
    }

    // Modal function
    function modalPopup() {
        var modal = document.getElementById("em-modal");
        modal.style.display = "block";
    }

    function delayModal(mileSeconds) {
        window.setTimeout(modalPopup, mileSeconds);
    }
});
