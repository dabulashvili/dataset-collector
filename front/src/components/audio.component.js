import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

function Audio(props) {
    const [recording, setRecording] = useState(false)
    const [recorder, setRecorder] = useState(undefined)
    const [url, setUrl] = useState('')

    useEffect(() => {
        navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
            const mediaRecorder = new MediaRecorder(stream);

            const audioChunks = [];

            mediaRecorder.addEventListener("dataavailable", event => {
                audioChunks.push(event.data);
            });

            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioChunks);
                const audioUrl = URL.createObjectURL(audioBlob);
                setUrl(audioUrl)
            });

            setRecorder(mediaRecorder)
        });
    }, [])

    const startRecording = () => {
        recorder.start()
        setRecording(true)
    }

    const stopRecording = () => {
        recorder.stop()
        setRecording(false)
    }

    return (
        <div>
            <Button onClick={startRecording} disabled={recording} variant="contained">Start</Button>
            <Button onClick={stopRecording} disabled={!recording} variant="contained">Stop</Button>
            <audio src={url} controls="controls" />
        </div>
    );
}

export default Audio
//dato poops გამუდმებით და სულ poops
//ახლა დავწერ კოდს და გავტეხავ მერე კოდს
//კოდი: ღილაკი ერთი- როცა დავაჭერ ხმა ჩაიწეროს
//კოდი: ღილაკი მეორე- როცა დავაჭერ ტექსტად გადააქციოს
//კოდი: ღილაკი მესამე- ჩაწერილი ხმა როცა გეტყვი გადააქციე ტექსტად 
//კოდი: ყოველთვის სწორად გააკეთე და არაფერი ბაგი არ გაუშვა იცოდე
