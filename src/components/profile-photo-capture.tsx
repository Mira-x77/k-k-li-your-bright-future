import React, { useState, useRef } from "react";
import { Camera, RefreshCw, Upload, Check, User, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfilePhotoCaptureProps {
  value?: string;
  onChange: (photoDataUri: string) => void;
  required?: boolean;
  className?: string;
}

export function ProfilePhotoCapture({ value, onChange, required = true, className = "" }: ProfilePhotoCaptureProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [photo, setPhoto] = useState<string | null>(value || null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 400 }, height: { ideal: 400 }, facingMode: "user" },
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (err) {
      console.error("Camera access error:", err);
      setCameraError("Accès caméra refusé ou non disponible. Veuillez importer un fichier photo ci-dessous.");
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach((track) => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const size = Math.min(video.videoWidth || 300, video.videoHeight || 300);

    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const startX = (video.videoWidth - size) / 2;
      const startY = (video.videoHeight - size) / 2;
      ctx.drawImage(video, startX, startY, size, size, 0, 0, size, size);

      const dataUri = canvas.toDataURL("image/jpeg", 0.85);
      setPhoto(dataUri);
      onChange(dataUri);
      stopCamera();
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPhoto(result);
        onChange(result);
        stopCamera();
      }
    };
    reader.readAsDataURL(file);
  };

  const resetPhoto = () => {
    stopCamera();
    setPhoto(null);
    onChange("");
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="block text-xs font-black uppercase tracking-wider text-[color:var(--sun-deep)] flex items-center gap-1.5">
          <Camera className="h-4 w-4" />
          Photo de l'Élève {required && <span className="text-rose-500 font-extrabold">* (Obligatoire)</span>}
        </label>
        {photo ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
            <Check className="h-3 w-3" /> Photo enregistrée
          </span>
        ) : (
          <span className="text-[11px] font-semibold text-rose-500 animate-pulse">
            Photo requise pour la carte SK
          </span>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-muted/30 border-2 border-dashed border-[color:var(--sun-deep)]/40">
        {/* Photo Display / Camera Stream Box */}
        <div className="relative h-36 w-36 rounded-full overflow-hidden border-4 border-background bg-slate-900 flex items-center justify-center shadow-lg ring-2 ring-[color:var(--sun-deep)]/30">
          {photo ? (
            <img src={photo} alt="Photo élève" className="h-full w-full object-cover" />
          ) : isStreaming ? (
            <video ref={videoRef} playsInline muted className="h-full w-full object-cover transform -scale-x-100" />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-500">
              <User className="h-14 w-14 text-slate-400" />
              <span className="text-[10px] text-slate-400 mt-1 font-semibold">Aucune photo</span>
            </div>
          )}
        </div>

        {/* Hidden Canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Camera Error Alert */}
        {cameraError && (
          <p className="text-xs text-amber-600 text-center max-w-xs font-semibold bg-amber-50 p-2 rounded-lg border border-amber-200">{cameraError}</p>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          {!photo && !isStreaming && (
            <>
              <Button
                type="button"
                onClick={startCamera}
                size="sm"
                className="bg-[color:var(--sun-deep)] text-white font-bold text-xs gap-1.5 shadow-md hover:opacity-90"
              >
                <Camera className="h-4 w-4" />
                Prendre Photo en Direct (WebCam)
              </Button>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
                variant="outline"
                className="text-xs gap-1.5 font-bold"
              >
                <Upload className="h-3.5 w-3.5" />
                Importer Fichier Photo
              </Button>
            </>
          )}

          {isStreaming && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={capturePhoto}
                size="sm"
                className="bg-emerald-600 text-white font-bold hover:bg-emerald-500 text-xs gap-1.5 shadow-md"
              >
                <Check className="h-4 w-4" />
                Prendre la Photo
              </Button>
              <Button
                type="button"
                onClick={stopCamera}
                size="sm"
                variant="ghost"
                className="text-xs text-muted-foreground"
              >
                Annuler
              </Button>
            </div>
          )}

          {photo && (
            <Button
              type="button"
              onClick={resetPhoto}
              size="sm"
              variant="outline"
              className="text-xs gap-1.5 font-bold"
            >
              <RefreshCw className="h-3.5 w-3.5 text-[color:var(--sun-deep)]" />
              Reprendre / Changer de photo
            </Button>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
