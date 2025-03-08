"use client"

import { AnimatePresence, motion } from "framer-motion"
import {
  LiveKitRoom,
  useVoiceAssistant,
  BarVisualizer,
  RoomAudioRenderer,
  VoiceAssistantControlBar,
  type AgentState,
  DisconnectButton,
} from "@livekit/components-react"
import { useCallback, useEffect, useState } from "react"
import type { MediaDeviceFailure } from "livekit-client"
import type { ConnectionDetails } from "./api/connection-details/route"
import { NoAgentNotification } from "@/components/NoAgentNotification"
import { useKrispNoiseFilter } from "@livekit/components-react/krisp"
import { AgentVideoDisplay } from "@/components/AgentVideoDisplay"
import { Mic, Video, Settings, X, Play } from "lucide-react"
import { StatsPanel } from "@/components/StatsPanel"
import { ParticipantGallery } from "@/components/ParticipationGallery"
import { UserVideoPanel } from "@/components/UserVideoPanel"
import { StatusPanel } from "@/components/StatusPanel"

export default function Page() {
  const [connectionDetails, updateConnectionDetails] = useState<ConnectionDetails | undefined>(undefined)
  const [agentState, setAgentState] = useState<AgentState>("disconnected")

  const onConnectButtonClicked = useCallback(async () => {
    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ?? "/api/connection-details",
      window.location.origin,
    )
    const response = await fetch(url.toString())
    const connectionDetailsData = await response.json()
    updateConnectionDetails(connectionDetailsData)
  }, [])

  return (
    <main data-lk-theme="default" className="h-screen w-screen flex items-center justify-center bg-[var(--secondary)]">
      <LiveKitRoom
        token={connectionDetails?.participantToken}
        serverUrl={connectionDetails?.serverUrl}
        connect={connectionDetails !== undefined}
        audio={true}
        video={false}
        onMediaDeviceFailure={onDeviceFailure}
        onDisconnected={() => {
          updateConnectionDetails(undefined)
          setAgentState("disconnected")
        }}
        className="w-full h-full p-4 relative flex flex-col"
      >
      {connectionDetails === undefined && agentState === "disconnected" && (
        <motion.div
          className="flex flex-col items-center justify-center h-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative mb-8">
            <motion.div
              className="absolute -inset-4 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 0.9, 0.7],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            />
            <motion.button
              className="relative bg-gradient-to-r from-indigo-600 to-purple-600 w-28 h-28 rounded-full flex items-center justify-center shadow-xl hover:shadow-indigo-500/25"
              onClick={onConnectButtonClicked}
              whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(99, 102, 241, 0.4)" }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
            >
              <motion.div
                className="absolute inset-1 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-80"
                animate={{
                  boxShadow: ["0 0 0 0px rgba(139, 92, 246, 0.3)", "0 0 0 10px rgba(139, 92, 246, 0)"],
                }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeOut",
                }}
              />
              <Play size={42} className="text-white ml-2 z-10" />
            </motion.button>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-center space-y-3"
          >
            <h2 className="text-[var(--accent)] text-2xl font-semibold tracking-tight">Start Meeting with Co-pilot</h2>
            <p className="text-muted-foreground text-base max-w-md">
              Click the button to start a new conversation with your co-pilot
            </p>
          </motion.div>
        </motion.div>
      )}


        {/* Transition state overlays */}
        <AnimatePresence>
          {connectionDetails !== undefined && agentState === "connecting" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="absolute inset-0 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-sm flex items-center justify-center z-10"
            >
              <motion.div
                className="text-center max-w-md px-8 py-10"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                <motion.div
                  className="relative w-20 h-20 mx-auto mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-indigo-500/30"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  />
                  <motion.div
                    className="absolute inset-0 rounded-full border-4 border-t-indigo-600 border-r-transparent border-b-transparent border-l-transparent"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  <motion.div
                    className="absolute inset-2 rounded-full border-4 border-t-purple-600 border-r-transparent border-b-transparent border-l-transparent"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                </motion.div>
                <motion.h2
                  className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 mb-3"
                  animate={{
                    backgroundPosition: ["0% center", "100% center", "0% center"],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                >
                  Creating Your Room
                </motion.h2>
                <motion.p
                  className="text-indigo-200/70 text-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  Setting up a secure space for your conversation
                </motion.p>
                <motion.div
                  className="mt-6 flex justify-center gap-1.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className="w-2 h-2 rounded-full bg-indigo-400"
                      animate={{
                        y: [0, -6, 0],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.2,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
        )}

        {connectionDetails !== undefined && agentState === "initializing" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="absolute inset-0 bg-gradient-to-b from-black/95 to-black/90 backdrop-blur-sm flex items-center justify-center z-10"
          >
            <motion.div
              className="text-center max-w-md px-8 py-10"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <motion.div
                className="relative w-24 h-24 mx-auto mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full bg-purple-500 absolute"
                    style={{ top: 0, left: "50%", marginLeft: "-6px" }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-indigo-500 absolute"
                    style={{ bottom: 0, left: "50%", marginLeft: "-6px" }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-violet-500 absolute"
                    style={{ left: 0, top: "50%", marginTop: "-6px" }}
                  />
                  <motion.div
                    className="w-3 h-3 rounded-full bg-blue-500 absolute"
                    style={{ right: 0, top: "50%", marginTop: "-6px" }}
                  />
                </motion.div>
                <motion.div
                  className="absolute inset-4 rounded-full border-2 border-indigo-500/40"
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-purple-500/20"
                  animate={{ scale: [1.1, 1, 1.1] }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                />
              </motion.div>
              <motion.h2
                className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-200 to-purple-200 mb-3"
                animate={{
                  backgroundPosition: ["0% center", "100% center", "0% center"],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                Initializing Co-pilot
              </motion.h2>
              <motion.p
                className="text-indigo-200/70 text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                Your co-pilot is preparing to help you
              </motion.p>
              <motion.div
                className="mt-6 h-1 w-48 mx-auto bg-gray-800 rounded-full overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{
                    duration: 3.5,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
        </AnimatePresence>

        <div className="flex flex-1 gap-4 overflow-hidden">
          {/* Main content area - left side (70-75% width) */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 premium-panel overflow-hidden">
              <AnimatePresence>
                {agentState !== "disconnected" && agentState !== "connecting" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4, ease: [0.09, 1.04, 0.245, 1.055] }}
                    className="w-full h-full"
                  >
                    <AgentVideoDisplay />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Bottom left - Stats Panel */}
            <div className="h-[120px] flex gap-4 items-center justify-evenly">
              <StatsPanel />
              <StatusPanel agentState={agentState} />
            </div>
          </div>

          {/* Right side panels (25-30% width) */}
          <div className="w-[25%] flex flex-col gap-4">
            <div className="h-[300px] flex items-center justify-center">
              <SimpleVoiceAssistant onStateChange={setAgentState} />
            </div>

            {/* Middle right - User Video */}
            <div className="flex-1">
              <UserVideoPanel />
            </div>

            {/* Bottom right - Controls */}
            <div className="h-[120px] premium-panel p-4">
              <div className="premium-panel-header mb-2">My Controls</div>
              <div className="flex items-center justify-evenly">
                <button className="control-icon-button">
                  <Video size={20} />
                </button>
                <ControlBar onConnectButtonClicked={onConnectButtonClicked} agentState={agentState} />
              </div>
            </div>
          </div>
        </div>

        <RoomAudioRenderer />
        <NoAgentNotification state={agentState} />
      </LiveKitRoom>
    </main>
  )
}

function SimpleVoiceAssistant(props: {
  onStateChange: (state: AgentState) => void
}) {
  const { state, audioTrack } = useVoiceAssistant()
  useEffect(() => {
    props.onStateChange(state)
  }, [props, state])
  return (
    <div className="h-[200px] w-full flex items-center justify-center lkBar">
      <BarVisualizer trackRef={audioTrack} barCount={6} options={{ minHeight: 15 }} />
    </div>
  )
}

function ControlBar(props: {
  onConnectButtonClicked: () => void
  agentState: AgentState
}) {
  const krisp = useKrispNoiseFilter()
  useEffect(() => {
    krisp.setNoiseFilterEnabled(true)
  }, [])
  
  return (
    <div className="flex-1 flex items-center justify-center">
      <AnimatePresence>
        {props.agentState === "disconnected" && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.09, 1.04, 0.245, 1.055] }}
            className="premium-button"
            onClick={() => props.onConnectButtonClicked()}
          >
            Start a conversation
          </motion.button>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {props.agentState !== "disconnected" && props.agentState !== "connecting" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.09, 1.04, 0.245, 1.055] }}
            className="flex gap-2 items-center"
          >
            <div className="flex bg-[var(--primary)] rounded-full p-1">
              <VoiceAssistantControlBar controls={{ leave: false }} />
              <DisconnectButton>
                <div className="control-icon-button danger">
                  <X size={20} />
                </div>
              </DisconnectButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function onDeviceFailure(error?: MediaDeviceFailure) {
  console.error(error)
  alert(
    "Error acquiring camera or microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab",
  )
}