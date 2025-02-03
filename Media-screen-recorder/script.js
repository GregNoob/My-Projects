const startBtn = document.getElementById("btn");
const downloadLink = document.getElementById("link");
const videoElement = document.getElementById("video");
const countdownElement = document.getElementById("countdown");

let blob = null,
    videoStream = null,
    audioStream = null;

startBtn.addEventListener("click", startScreenCapturing);

async function startScreenCapturing() {
    if (!navigator.mediaDevices.getDisplayMedia) {
        alert("Screen capturing is not supported in your browser.");
        return;
    }

    // Stop previous streams if active
    if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
    }
    if (audioStream) {
        audioStream.getTracks().forEach(track => track.stop());
    }

    try {
        videoStream = await navigator.mediaDevices.getDisplayMedia({
            video: true,
            audio: true,
        });

        try {
            audioStream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100,
                },
            });
            const audioTrack = audioStream.getTracks()[0];
            videoStream.addTrack(audioTrack);
        } catch (error) {
            console.warn("No audio stream available:", error);
        }

        // Update button state
        startBtn.textContent = "Recording...";
        startBtn.disabled = true;

        await recordStream(videoStream);
    } catch (error) {
        console.error("Screen capture failed:", error);
        startBtn.textContent = "Record";
        startBtn.disabled = false;
    }
}

function countdown(seconds = 3) {
    return new Promise((resolve) => {
        let counter = seconds;
        countdownElement.style.visibility = "visible"; // Show countdown UI
        countdownElement.textContent = counter; // Initialize countdown display

        const interval = setInterval(() => {
            counter--;
            countdownElement.textContent = counter; // Update countdown display

            if (counter < 0) {
                clearInterval(interval);
                countdownElement.style.visibility = "hidden"; // Hide countdown
                resolve();
            }
        }, 1000);
    });
}

function showRecordedVideo() {
    if (!blob) {
        console.error("No recorded video available.");
        return;
    }

    // Revoke previous object URL to prevent memory leaks
    if (videoElement.src) {
        URL.revokeObjectURL(videoElement.src);
    }

    // Set video source and display
    videoElement.src = URL.createObjectURL(blob);
    videoElement.style.display = "block";

    // Enable the download link
    downloadLink.href = videoElement.src;
    downloadLink.download = "screen-recording.webm";
    downloadLink.style.display = "inline-block"; // Show download link

    // Reset button state
    startBtn.textContent = "Record";
    startBtn.disabled = false;
}

async function recordStream(stream) {
    await countdown(); // Wait for countdown to finish

    const supportedMimeType = MediaRecorder.isTypeSupported("video/webm; codecs=vp8,opus")
        ? "video/webm; codecs=vp8,opus"
        : "video/webm"; // Fallback to a more widely supported MIME type

    const mediaRecorder = new MediaRecorder(stream, {
        mimeType: supportedMimeType,
    });
    const recordedChunks = [];

    mediaRecorder.addEventListener("dataavailable", (e) => recordedChunks.push(e.data));

    const videoTrack = stream.getVideoTracks()[0];
    if (videoTrack) {
        videoTrack.addEventListener("ended", () => mediaRecorder.stop());
    }

    mediaRecorder.addEventListener("stop", () => {
        if (recordedChunks.length === 0) {
            console.error("No recorded video available.");
            return;
        }

        blob = new Blob(recordedChunks, { type: recordedChunks[0].type });
        showRecordedVideo();
    });

    mediaRecorder.start(); // Start recording after countdown
}