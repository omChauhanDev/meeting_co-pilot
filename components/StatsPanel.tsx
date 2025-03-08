import { useRoomContext } from "@livekit/components-react"

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-6">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--accent)]"></div>
    </div>
  )
}

export function StatsPanel() {
  const room = useRoomContext()

  const extractSuffix = (fullId: string, prefix: string) => {
    if (!fullId) return null;
    const parts = fullId.split(prefix);
    return parts.length > 1 ? `${prefix}${parts[parts.length - 1]}` : fullId;
  };

  const formatRoomName = (name: string) => {
    if (!name) return null;
    if (name.includes("voice_assistant_room_")) {
      return extractSuffix(name, "room_");
    }
    return name;
  };

  const formatParticipantId = (id: string) => {
    if (!id) return null;
    if (id.includes("voice_assistant_user_")) {
      return extractSuffix(id, "user_");
    }
    return id;
  };

  return (
    <div className="premium-panel h-full pl-4 w-[400px]">
      <div className="premium-panel-header">Room Statistics</div>
      <div className="p-4 grid grid-cols-2 gap-12">
        <div className="min-h-[52px]">
          <div className="text-xs text-[var(--accent)] opacity-70">Room Name</div>
          <div className="text-sm font-mono h-6 flex items-center">
            {room?.name ? formatRoomName(room.name) : <LoadingSpinner />}
          </div>
        </div>
        <div className="min-h-[52px]">
          <div className="text-xs text-[var(--accent)] opacity-70">Participant ID</div>
          <div className="text-xs font-mono truncate h-6 flex items-center">
            {room?.localParticipant?.identity ? 
              formatParticipantId(room.localParticipant.identity) : <LoadingSpinner />}
          </div>
        </div>
        <div className="min-h-[52px]">
          <div className="text-[var(--accent)] opacity-70">Connection Quality</div>
          <div className="font-mono h-6 flex items-center">
            {room?.localParticipant?.connectionQuality !== undefined ? 
              room.localParticipant.connectionQuality : <LoadingSpinner />}
          </div>
        </div>
        <div className="min-h-[52px]">
          <div className="text-xs text-[var(--accent)] opacity-70">Participants</div>
          <div className="text-sm font-mono h-6 flex items-center">
            {room?.numParticipants !== undefined ? 
              room.numParticipants : <LoadingSpinner />}
          </div>
        </div>
      </div>
    </div>
  )
}