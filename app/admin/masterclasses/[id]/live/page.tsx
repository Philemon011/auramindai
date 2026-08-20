"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import type { IAgoraRTCClient, ICameraVideoTrack, IMicrophoneAudioTrack } from "agora-rtc-sdk-ng";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  PhoneOff,
  Users,
  Radio,
  Loader2,
  AlertTriangle,
} from "lucide-react";

type LiveState = "idle" | "connecting" | "live" | "ending" | "error";

function formatElapsed(seconds: number) {
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function LiveControlRoomPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const [state, setState] = useState<LiveState>("idle");
  const [error, setError] = useState<string | null>(null);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);
  const [elapsed, setElapsed] = useState(0);
  const [confirmingEnd, setConfirmingEnd] = useState(false);

  const clientRef = useRef<IAgoraRTCClient | null>(null);
  const cameraTrackRef = useRef<ICameraVideoTrack | null>(null);
  const micTrackRef = useRef<IMicrophoneAudioTrack | null>(null);
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  async function startLive() {
    setState("connecting");
    setError(null);

    try {
      const res = await fetch("/api/live/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ masterclassId: id }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Impossible de démarrer le live.");
      }

      const { token, channelName, appId } = await res.json();

      // Import dynamique : le SDK Agora dépend du navigateur (WebRTC),
      // il ne doit jamais être chargé côté serveur.
      const AgoraRTC = (await import("agora-rtc-sdk-ng")).default;

      const client = AgoraRTC.createClient({ mode: "live", codec: "vp8" });
      client.setClientRole("host");
      clientRef.current = client;

      await client.join(appId, channelName, token, null);

      const [micTrack, cameraTrack] = await AgoraRTC.createMicrophoneAndCameraTracks();
      micTrackRef.current = micTrack;
      cameraTrackRef.current = cameraTrack;

      if (videoContainerRef.current) {
        cameraTrack.play(videoContainerRef.current);
      }

      await client.publish([micTrack, cameraTrack]);

      setState("live");
      timerRef.current = setInterval(() => setElapsed((e) => e + 1), 1000);
    } catch (err) {
      console.error("Erreur au démarrage du live:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue.");
      setState("error");
    }
  }

  async function endLive() {
    setState("ending");
    if (timerRef.current) clearInterval(timerRef.current);

    try {
      micTrackRef.current?.close();
      cameraTrackRef.current?.close();
      await clientRef.current?.leave();

      await fetch("/api/live/end", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ masterclassId: id }),
      });

      router.push("/admin/masterclasses");
    } catch (err) {
      console.error("Erreur à la fin du live:", err);
      router.push("/admin/masterclasses");
    }
  }

  function toggleMic() {
    if (!micTrackRef.current) return;
    micTrackRef.current.setEnabled(!micOn);
    setMicOn(!micOn);
  }

  function toggleCamera() {
    if (!cameraTrackRef.current) return;
    cameraTrackRef.current.setEnabled(!cameraOn);
    setCameraOn(!cameraOn);
  }

  // Nettoyage si l'utilisateur quitte la page sans cliquer "Terminer"
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      micTrackRef.current?.close();
      cameraTrackRef.current?.close();
      clientRef.current?.leave();
    };
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-[#0a0e17]">
      {/* Barre supérieure */}
      <div className="flex items-center justify-between border-b border-white/10 px-6 py-4">
        <div className="flex items-center gap-3">
          {state === "live" && (
            <span className="flex items-center gap-1.5 rounded-full bg-red-500 px-3 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              <span className="font-body text-[12px] font-semibold text-white">EN DIRECT</span>
            </span>
          )}
          {state === "live" && (
            <span className="font-body text-[13px] font-medium text-white/60" suppressHydrationWarning>
              {formatElapsed(elapsed)}
            </span>
          )}
        </div>

        <span className="font-heading text-[15px] font-semibold text-white">
          Auramind<span className="text-accent"> AI</span> · Régie
        </span>
      </div>

      {/* Zone vidéo */}
      <div className="relative flex flex-1 items-center justify-center p-6">
        {state === "idle" && (
          <div className="flex flex-col items-center text-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <Radio className="h-7 w-7 text-accent" strokeWidth={1.75} />
            </span>
            <h1 className="mt-6 font-heading text-2xl font-semibold text-white">
              Prêt à démarrer le live ?
            </h1>
            <p className="mt-2 max-w-sm font-body text-[14px] text-white/50">
              Ta caméra et ton micro seront activés dès que tu cliques sur
              &laquo;&nbsp;Démarrer&nbsp;&raquo;. Vérifie ton éclairage et ton audio avant de lancer.
            </p>
            <button
              onClick={startLive}
              className="mt-8 flex items-center gap-2 rounded-button bg-accent px-8 py-4 font-body text-[15px] font-medium text-white transition-transform duration-200 hover:scale-[1.02]"
            >
              <Radio className="h-4 w-4" />
              Démarrer le live
            </button>
          </div>
        )}

        {state === "connecting" && (
          <div className="flex flex-col items-center text-center">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <p className="mt-4 font-body text-[14px] text-white/60">Connexion en cours...</p>
          </div>
        )}

        {state === "error" && (
          <div className="flex flex-col items-center text-center">
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-red-500/20">
              <AlertTriangle className="h-6 w-6 text-red-400" />
            </span>
            <p className="mt-4 max-w-sm font-body text-[14px] text-white/60">{error}</p>
            <button
              onClick={startLive}
              className="mt-6 rounded-button border border-white/20 px-6 py-3 font-body text-[14px] font-medium text-white"
            >
              Réessayer
            </button>
          </div>
        )}

        {(state === "live" || state === "connecting" || state === "ending") && (
          <div
            ref={videoContainerRef}
            className={`aspect-video w-full max-w-4xl overflow-hidden rounded-card-lg bg-black ${
              state === "live" ? "block" : "hidden"
            }`}
          />
        )}
      </div>

      {/* Barre de contrôle */}
      {state === "live" && (
        <div className="flex items-center justify-center gap-4 border-t border-white/10 px-6 py-6">
          <button
            onClick={toggleMic}
            aria-label={micOn ? "Couper le micro" : "Activer le micro"}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 ${
              micOn ? "bg-white/10 text-white hover:bg-white/15" : "bg-red-500 text-white"
            }`}
          >
            {micOn ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
          </button>

          <button
            onClick={toggleCamera}
            aria-label={cameraOn ? "Couper la caméra" : "Activer la caméra"}
            className={`flex h-12 w-12 items-center justify-center rounded-full transition-colors duration-200 ${
              cameraOn ? "bg-white/10 text-white hover:bg-white/15" : "bg-red-500 text-white"
            }`}
          >
            {cameraOn ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setConfirmingEnd(true)}
            className="flex h-12 items-center gap-2 rounded-full bg-red-500 px-6 font-body text-[14px] font-medium text-white transition-colors duration-200 hover:bg-red-600"
          >
            <PhoneOff className="h-4 w-4" />
            Terminer le live
          </button>
        </div>
      )}

      {/* Confirmation de fin de live */}
      {confirmingEnd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="w-[92%] max-w-sm rounded-card-lg bg-[#10151f] p-6">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-red-500/20">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </span>
            <h3 className="mt-4 font-subheading text-[17px] font-semibold text-white">
              Terminer le live ?
            </h3>
            <p className="mt-1.5 font-body text-[14px] text-white/50">
              Tous les spectateurs seront déconnectés. Cette action est irréversible.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => setConfirmingEnd(false)}
                className="flex h-11 flex-1 items-center justify-center rounded-button border border-white/20 font-body text-[14px] font-medium text-white"
              >
                Annuler
              </button>
              <button
                onClick={endLive}
                disabled={state === "ending"}
                className="flex h-11 flex-1 items-center justify-center rounded-button bg-red-500 font-body text-[14px] font-medium text-white disabled:opacity-60"
              >
                {state === "ending" ? "..." : "Terminer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}