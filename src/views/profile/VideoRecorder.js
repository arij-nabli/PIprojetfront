import { useState, useRef } from 'react'

export default function VideoRecorder() {
  const mimeType = 'video/webm'
  const [permission, setPermission] = useState(false)
  const mediaRecorder = useRef(null)
  const liveVideoFeed = useRef(null)
  const [recordingStatus, setRecordingStatus] = useState('inactive')
  const [stream, setStream] = useState(null)
  const [videoChunks, setVideoChunks] = useState([])
  const [recordedVideo, setRecordedVideo] = useState(null)
  const [isRecordingStopped, setIsRecordingStopped] = useState(false)

  const getCameraPermission = async () => {
    setRecordedVideo(null)
    if (
      'mediaDevices' in navigator &&
      'getUserMedia' in navigator.mediaDevices
    ) {
      try {
        const videoConstraints = { audio: false, video: true }
        const audioConstraints = { audio: true }

        const audioStream = await navigator.mediaDevices.getUserMedia(
          audioConstraints
        )
        const videoStream = await navigator.mediaDevices.getUserMedia(
          videoConstraints
        )

        setPermission(true)

        const combinedStream = new MediaStream([
          ...videoStream.getVideoTracks(),
          ...audioStream.getAudioTracks(),
        ])

        setStream(combinedStream)
        liveVideoFeed.current.srcObject = combinedStream
      } catch (err) {
        console.error(err)
        alert('Failed to get camera permission.')
      }
    } else {
      alert('getUserMedia is not supported in this browser.')
    }
  }

  const startRecording = () => {
    setRecordingStatus('recording')
    const media = new MediaRecorder(stream, { mimeType })
    mediaRecorder.current = media
    let localVideoChunks = []

    mediaRecorder.current.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        localVideoChunks.push(event.data)
      }
    }

    mediaRecorder.current.start()
    setVideoChunks(localVideoChunks)
  }

  const stopRecording = () => {
    setRecordingStatus('inactive')
    mediaRecorder.current.stop()
    stream.getTracks().forEach((track) => track.stop())
    liveVideoFeed.current.srcObject = null
    setIsRecordingStopped(true)

    mediaRecorder.current.onstop = () => {
      const videoBlob = new Blob(videoChunks, { type: mimeType })
      const videoUrl = URL.createObjectURL(videoBlob)
      setRecordedVideo(videoUrl)
      setVideoChunks([])
    }
  }

  const handleNewRecord = () => {
    window.location.reload()
  }

  return (
    <div className='flex  justify-center min-h-screen'>
      <div className='max-w-md w-full p-4 border rounded-lg shadow-lg bg-white'>
        <h2 className='text-2xl font-bold mb-4'>Video Recorder</h2>
        <div className='flex flex-col items-center'>
          {!permission ? (
            <button
              onClick={getCameraPermission}
              className={`btn-primary mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ${
                recordingStatus === 'recording' ? 'hidden' : ''
              }`}
              disabled={recordingStatus === 'recording'}>
              {recordingStatus === 'inactive' ? 'Enable Camera' : 'Enabling...'}
            </button>
          ) : null}
          {permission &&
          recordingStatus === 'inactive' &&
          !isRecordingStopped ? (
            <button
              onClick={startRecording}
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Start Recording
            </button>
          ) : null}
          {recordingStatus === 'recording' ? (
            <button onClick={stopRecording} className='btn-danger mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
              Stop Recording
            </button>
          ) : null}
          {recordedVideo && (
            <button onClick={handleNewRecord} className='btn-primary mb-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'>
              New Record
            </button>
          )}
        </div>
        {recordedVideo && (
          <div className='mt-4'>
            <video
              src={recordedVideo}
              controls
              className='w-full rounded-lg'
              style={{ maxWidth: '100%' }}
            />
            <a
              download='recorded_video.webm'
              href={recordedVideo}
              className='text-blue-500 block mt-2'>
              Download Recorded Video
            </a>
          </div>
        )}
        <video
          ref={liveVideoFeed}
          className={`mt-4 ${!permission ? 'hidden' : ''}`}
          style={{ width: '100%', maxWidth: '100%' }}
          autoPlay
        />
      </div>
    </div>
  )
}
