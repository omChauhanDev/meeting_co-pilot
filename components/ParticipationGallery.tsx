import { useParticipants } from "@livekit/components-react"

export function ParticipantGallery() {
  const participants = useParticipants()

  const filteredParticipants = participants.filter((p) => p.identity !== "agent")

  return (
    <div className="premium-panel h-full">
      <div className="premium-panel-header">Participants</div>
      <div className="p-4 flex gap-3">
        {filteredParticipants.length > 0 ? (
          filteredParticipants.map((participant) => (
            <div key={participant.identity} className={`avatar ${participant.isSpeaking ? "active" : ""}`}>
              {participant.name?.[0] || participant.identity[0]}
              <div className="avatar-tooltip">{participant.name || participant.identity}</div>
            </div>
          ))
        ) : (
          <div className="text-sm text-[var(--accent)] opacity-70">No participants</div>
        )}
      </div>
    </div>
  )
}

