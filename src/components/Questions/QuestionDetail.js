import React, { useState } from "react";
import { MAX_RECORDING_TIME } from "../../data/data";

function QuestionDetail({ question, onStopRecording, recordedQuestion }) {
    const [recording, setRecording] = useState(null);
    const [timer, setTimer] = useState(null);
    const [recorder, setRecorder] = useState(null);
    const [mediaStream, setMediaStream] = useState(null);

    function startRecording() {
        navigator.mediaDevices
            .getUserMedia({ audio: true, video: true })
            .then((stream) => {
                const recordCurrent = new MediaRecorder(stream);
                const chunks = [];

                recordCurrent.ondataavailable = (event) => {
                    chunks.push(event.data);
                };

                recordCurrent.onstop = () => {
                    const blob = new Blob(chunks, { type: "video/webm" });
                    setRecording(blob);
                };

                setRecorder(recordCurrent);
                setRecording(null);
                recordCurrent.start();
                setTimer(setTimeout(() => recordCurrent.stop(), MAX_RECORDING_TIME * 1000));
            });
    }

    function stopRecording() {
        setTimer(null);
        setRecording(recorder ? recorder.getBlob() : null);
        onStopRecording(question, recording);
        mediaStream.getTracks().forEach((track) => track.stop());
        setMediaStream(null);
    }

    return (
        <div>
            <h2>{question.text}</h2>
            {question.recording ? (
                <video src={URL.createObjectURL(question.recording)} controls />
            ) : (
                <video src={recording && URL.createObjectURL(recording)} controls />
            )}
            {timer ? (
                <button onClick={stopRecording}>Detener</button>
            ) : (
                <>
                    {recordedQuestion && recordedQuestion.recording ? (
                        <button onClick={startRecording}>Regrabar</button>
                    ) : (
                        <button onClick={startRecording}>Grabar</button>
                    )}
                </>
            )}
        </div>
    );
}


export default QuestionDetail;
