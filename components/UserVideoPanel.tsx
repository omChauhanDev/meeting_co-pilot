import { useEffect, useRef, useState } from "react"
import { User } from "lucide-react"

export function UserVideoPanel() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [hasVideo, setHasVideo] = useState(false)

  useEffect(() => {
    async function getVideo() {
      try {
        console.log("Attempting to access camera...")
        const stream = await navigator.mediaDevices.getUserMedia({ video: true })
        console.log("Camera access successful, setting up video stream")
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          videoRef.current.onloadedmetadata = () => {
            console.log("Video metadata loaded")
            videoRef.current?.play()
              .then(() => {
                console.log("Video playing, setting hasVideo to true")
                setHasVideo(true)
              })
              .catch(e => console.error("Error playing video:", e))
          }
        }
      } catch (err) {
        console.error("Error accessing webcam: ", err)
        setHasVideo(false)
      }
    }

    getVideo()

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  return (
    <div className="premium-panel h-full flex flex-col">
      <div className="premium-panel-header text-center">Client</div>
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full h-full rounded-lg overflow-hidden bg-black">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline
            muted
            className="w-full h-full object-cover rounded-lg" 
          />
        </div>
        {!hasVideo && (
          <div className="rounded-lg bg-[rgba(26,41,66,0.7)] flex items-center justify-center">
            <User size={270} className="text-[var(--accent)] opacity-50" />
          </div>
        )}
      </div>
    </div>
  )
}