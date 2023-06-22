// Obtener elementos del DOM
const clickToConvertButton = document.getElementById('click_to_convert');
const convertTextArea = document.getElementById('convert_text');
const buttonText = clickToConvertButton.innerHTML;
let isRecording = false;
let recognition; // Variable para almacenar la instancia de SpeechRecognition

clickToConvertButton.addEventListener('click', function () {
    if (!isRecording) {
        isRecording = true;
        clickToConvertButton.style.backgroundColor = 'red';
        clickToConvertButton.innerHTML = 'Escuchando...';
        startRecording();
    } else {
        isRecording = false;
        clickToConvertButton.style.backgroundColor = '#0ea4da';
        clickToConvertButton.innerHTML = buttonText;
        stopRecording();
    }
});

function startRecording() {
    window.SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
    recognition = new SpeechRecognition();
    recognition.interimResults = true;

    recognition.addEventListener('result', function (e) {
        const transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('');

        convertTextArea.innerHTML = transcript;
    });

    recognition.start();
}

function stopRecording() {
    recognition.stop();
}
