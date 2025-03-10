import React, { useEffect, useRef, useState } from 'react';
import { useRoomContext } from '@livekit/components-react';

export function AgentVideoDisplay({ participantIdentity }: { participantIdentity?: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const room = useRoomContext();
  const [debug, setDebug] = useState<string>('Initializing...');

  useEffect(() => {
    console.log('for debugging', debug);
  },[debug]);
  
  useEffect(() => {
    if (!room) {
      setDebug('No room available');
      return;
    }
    const participants = Array.from(room.remoteParticipants.values());
    const participantInfo = participants.map(p => ({
      identity: p.identity,
      tracks: Array.from(p.trackPublications.values()).map(t => ({
        source: t.source,
        kind: t.kind,
        sid: t.trackSid
      }))
    }));
    
    setDebug(`Found ${participants.length} participants: ${JSON.stringify(participantInfo, null, 2)}`);
    
    // Function to handle when tracks are subscribed
    const handleTrackSubscribed = (track: any) => {
      setDebug(prev => `${prev}\nTrack subscribed: ${track.kind} from ${track.participant?.identity}`);
      
      if (track.kind === 'video' && videoRef.current) {
        track.attach(videoRef.current);
        setDebug(prev => `${prev}\nVideo track attached to element`);
      }
    };
    
    participants.forEach(participant => {
      participant.on('trackSubscribed', handleTrackSubscribed);
    });
    room.on('participantConnected', (participant) => {
      setDebug(prev => `${prev}\nNew participant connected: ${participant.identity}`);
      participant.on('trackSubscribed', handleTrackSubscribed);
    });
    
    participants.forEach(participant => {
      const videoTracks = Array.from(participant.trackPublications.values())
        .filter(pub => pub.kind === 'video' && pub.track);
      
      if (videoTracks.length > 0) {
        setDebug(prev => `${prev}\nFound existing video tracks: ${videoTracks.length}`);
        
        // Trying to attach the first available video track
        if (videoRef.current && videoTracks[0].track) {
          videoTracks[0].track.attach(videoRef.current);
          setDebug(prev => `${prev}\nAttached existing video track from ${participant.identity}`);
        }
      }
    });
    
    return () => {
      participants.forEach(participant => {
        participant.off('trackSubscribed', handleTrackSubscribed);
      });
      
      
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, [room]);
  
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      <div className="w-full h-0 pb-[56.25%] relative rounded-lg overflow-hidden bg-black">
        <video ref={videoRef} autoPlay playsInline className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute bottom-6 left-6 bg-[rgba(26,41,66,0.7)] px-3 py-1.5 rounded-md text-sm font-medium">
          Presented by Co-pilot
        </div>
    </div>
    </div>
  );
}

