import { useState, useRef, useEffect } from 'react'

export default function AudioRecorder() {
  const mimeType = 'audio/webm'
  const [permission, setPermission] = useState(false)
  const mediaRecorder = useRef(null)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [stream, setStream] = useState(null)
  const [audioChunks, setAudioChunks] = useState([])
  const [audio, setAudio] = useState(null)
  const [timer, setTimer] = useState(0)

  useEffect(() => {
    let intervalId

    if (recordingStatus === 'recording') {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1)
      }, 1000)
    }

    return () => clearInterval(intervalId)
  }, [recordingStatus])

  const getMicrophonePermission = async () => {
    if ('MediaRecorder' in window) {
      try {
        const streamData = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: false,
        })
        setPermission(true)
        setStream(streamData)
      } catch (err) {
        alert(err.message)
      }
    } else {
      alert('The MediaRecorder API is not supported in your browser.')
    }
  }

  const startRecording = async () => {
    setRecordingStatus('recording')
    setTimer(0)

    const media = new MediaRecorder(stream, { type: mimeType })
    mediaRecorder.current = media

    let localAudioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
      if (typeof event.data === 'undefined') return
      if (event.data.size === 0) return
      localAudioChunks.push(event.data)
    }

    mediaRecorder.current.start()
    setAudioChunks(localAudioChunks)
  }

  const stopRecording = () => {
    setRecordingStatus('inactive')
    mediaRecorder.current.stop()

    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, { type: mimeType })
      const audioUrl = URL.createObjectURL(audioBlob)
      setAudio(audioUrl)
      setAudioChunks([])
    }
  }

  return (
    <div className='flex  justify-center min-h-screen bg-white mt-6'>
      <div className='bg-white rounded-lg shadow-lg p-6'>
        <h2 className='text-2xl font-bold mb-4'>Audio Recorder</h2>
        <main>
          <div className='audio-controls mb-4'>
            {!permission ? (
              <button
                onClick={getMicrophonePermission}
                type='button'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Get Microphone
              </button>
            ) : null}
            {permission && recordingStatus === 'inactive' ? (
              <button
                onClick={startRecording}
                type='button'
                className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Start Recording
              </button>
            ) : null}
            {recordingStatus === 'recording' ? (
              <button
                onClick={stopRecording}
                type='button'
                className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'>
                Stop Recording
              </button>
            ) : null}
          </div>
          {recordingStatus === 'recording' ? (
            <div className='timer text-xl mb-4'>
              Recording Time: {timer} seconds
            </div>
          ) : null}
          {audio ? (
            <div className='audio-container'>
              <audio src={audio} controls className='mb-4'></audio>
              <a download href={audio} className='text-blue-500'>
                Download Recording
              </a>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}
