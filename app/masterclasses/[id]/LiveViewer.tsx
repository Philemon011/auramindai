"use client";

import { useEffect, useRef, useState } from "react";
import type { IAgoraRTCClient, IAgoraRTCRemoteUser } from "agora-rtc-sdk-ng";
import { motion } from "framer-motion";
import { Radio, Volume2, VolumeX, Maximize, Loader2, AlertCircle } from "lucide-react";

type ViewerState = "idle" | "connecting" | "watching" | "error" | "waiting-host";

export function LiveViewer({ masterclassId, title }: { masterclassId: string; title: string }) {
  const [state, setState] = useState<ViewerState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [muted, setMuted] = useState(false);
  const [viewerCount, setViewerCount] = useState(1);

  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const playerWrapperRef = useRef<HTMLDivElement>(null);

  async function joinLive() {
    setState("connecting");
    setError(null);

    try {
      const res = await fetch("/api/live/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ masterclassId }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Impossible de rejoindre le live.");
      }

      const { token, channelName, appId } = await res.json();

      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;
      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      client.setClientRole("audience");
      clientRef.current = client;

      client.on("user-published", async (remoteUser: IAgoraRTCRemoteUser, mediaType) => {
        await client.subscribe(remoteUser, mediaType);

        if (mediaType === "video" && videoContainerRef.current) {
          remoteUser.videoTrack?.play(videoContainerRef.current);
          setState("watching");
        }
        if (mediaType === "audio") {
          remoteUser.audioTrack?.play();
        }
      });

      client.on("user-unpublished", () => {
        setState("waiting-host");
      });

      client.on("user-joined", () => setViewerCount((c) => c + 1));
      client.on("user-left", () => setViewerCount((c) => Math.max(1, c - 1)));

      await client.join(appId, channelName, token, null);
      setState("waiting-host");
    } catch (err) {
      console.error("Erreur pour rejoindre le live:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setState("error");
    }
  }

  function toggleMute() {
    clientRef.current?.remoteUsers.forEach((u) => {
      if (muted) u.audioTrack?.play();
      else u.audioTrack?.stop();
    });
    setMuted(!muted);
  }

  function toggleFullscreen() {
    if (playerWrapperRef.current) {
      playerWrapperRef.current.requestFullscreen?.();
    }
  }

  useEffect(() => {
    return () => {
      clientRef.current?.leave();
    };
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-card-lg bg-[#0a0e17]"
    >
      {/* Badge live */}
      <div className="absolute left-4 top-4 z-10 flex items-center gap-2">
        <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
          <span className="font-body text-[11px] font-semibold text-white">EN DIRECT</span>
        </span>
        {state === "watching" && (
          <span className="rounded-full bg-black/50 px-3 py-1.5 font-body text-[11px] font-medium text-white backdrop-blur-sm">
            {viewerCount} en train de regarder
          </span>
        )}
      </div>

      <div ref={playerWrapperRef} className="relative aspect-video w-full">
        {state === "idle" && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
              <Radio className="h-6 w-6 text-accent" strokeWidth={1.75} />
            </span>
            <h3 className="mt-5 max-w-xs font-subheading text-lg font-semibold text-white">
              {title}
            </h3>
            <p className="mt-1.5 font-body text-[13px] text-white/50">Cette session est en direct maintenant</p>
            <button
              onClick={joinLive}
              className="mt-6 flex items-center gap-2 rounded-button bg-accent px-7 py-3.5 font-body text-[14px] font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              <Radio className="h-4 w-4" />
              Rejoindre le live
            </button>
          </div>
        )}

        {state === "connecting" && (
          <div className="flex h-full flex-col items-center justify-center">
            <Loader2 className="h-7 w-7 animate-spin text-accent" />
            <p className="mt-3 font-body text-[13px] text-white/50">Connexion en cours...</p>
          </div>
        )}

        {state === "waiting-host" && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <Loader2 className="h-7 w-7 animate-spin text-accent" />
            <p className="mt-3 max-w-xs font-body text-[13px] text-white/50">
              En attente de l&apos;intervenant, ça ne devrait plus tarder...
            </p>
          </div>
        )}

        {state === "error" && (
          <div className="flex h-full flex-col items-center justify-center text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/20">
              <AlertCircle className="h-5 w-5 text-red-400" />
            </span>
            <p className="mt-3 max-w-xs font-body text-[13px] text-white/60">{error}</p>
            <button
              onClick={joinLive}
              className="mt-5 rounded-button border border-white/20 px-5 py-2.5 font-body text-[13px] font-medium text-white"
            >
              Réessayer
            </button>
          </div>
        )}

        <div
          ref={videoContainerRef}
          className={`h-full w-full ${state === "watching" ? "block" : "hidden"}`}
        />

        {/* Contrôles spectateur */}
        {state === "watching" && (
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              onClick={toggleMute}
              aria-label={muted ? "Activer le son" : "Couper le son"}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/70"
            >
              {muted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
            </button>
            <button
              onClick={toggleFullscreen}
              aria-label="Plein écran"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur-sm transition-colors duration-200 hover:bg-black/70"
            >
              <Maximize className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
}