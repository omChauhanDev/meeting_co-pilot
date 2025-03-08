import type { AgentState } from "@livekit/components-react"
import { useRoomContext } from "@livekit/components-react"

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center h-6">
      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[var(--accent)]"></div>
    </div>
  )
}

export function StatusPanel({ agentState }: { agentState: AgentState }) {
  const room = useRoomContext()
  const isRoomConnected = room?.state === "connected"
  const isAgentConnected = agentState != "disconnected" && agentState != "connecting"

  return (
    <div className="premium-panel h-full pl-4 w-[400px]">
      <div className="premium-panel-header">Connection Status</div>
      <div className="p-4 grid grid-cols-2 gap-12">
        <div className="min-h-[52px]">
          <div className="text-xs text-[var(--accent)] opacity-70">Room Status</div>
          <div className="text-sm font-mono h-6 flex items-center">
            {room?.state !== undefined ? (
              <span className={isRoomConnected ? "text-green-500" : "text-red-500"}>
                {isRoomConnected ? "Connected" : "Disconnected"}
              </span>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
        <div className="min-h-[52px]">
          <div className="text-xs text-[var(--accent)] opacity-70">Agent Status</div>
          <div className="text-sm font-mono h-6 flex items-center">
            {agentState !== undefined ? (
              <span className={isAgentConnected ? "text-green-500" : "text-red-500"}>
                {isAgentConnected ? "Connected" : "Disconnected"}
              </span>
            ) : (
              <LoadingSpinner />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}