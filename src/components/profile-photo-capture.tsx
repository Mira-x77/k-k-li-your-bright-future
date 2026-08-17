import React, { useState, useRef, useEffect } from "react";
import { Camera, RefreshCw, Upload, Check, User, Trash2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProfilePhotoCaptureProps {
  value?: string;
  onChange: (photoDataUri: string) => void;
  className?: string;
}

export function ProfilePhotoCapture({ value, onChange, className = "" }: ProfilePhotoCaptureProps) {
  const [isStreaming, setIsStreaming] = useState(false);
  const [photo, setPhoto] = useState<string | null>(value || null);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Sync external value
  useEffect(() => {
    if (value !== undefined) {
      setPhoto(value || null);
    }
  }, [value]);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: { ideal: 600 }, height: { ideal: 600 }, facingMode: "user" },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        await videoRef.current.play();
      }
      setIsStreaming(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError("Impossible d'accéder à la caméra (accès refusé ou appareil non disponible). Vous pouvez importer une photo de votre fichier.");
      setIsStreaming(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setIsStreaming(false);
  };

  const capturePhoto = () => {
    if (!videoRef.current || !canvasRef.current) return;
    const video = videoRef.current;
    const canvas = canvasRef.current;

    const width = video.videoWidth || 400;
    const height = video.videoHeight || 400;
    const size = Math.min(width, height);

    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    if (ctx) {
      const startX = (width - size) / 2;
      const startY = (height - size) / 2;
      ctx.drawImage(video, startX, startY, size, size, 0, 0, size, size);

      const dataUri = canvas.toDataURL("image/jpeg", 0.9);
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

  const removePhoto = () => {
    stopCamera();
    setPhoto(null);
    onChange("");
  };

  // Clean up stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center justify-between">
        <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
          <Camera className="h-4 w-4 text-[color:var(--sun-deep)]" />
          Photo de l'élève <span className="text-slate-400 font-normal">(Optionnel)</span>
        </label>
        {photo ? (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
            <Check className="h-3.5 w-3.5" /> Photo ajoutée
          </span>
        ) : (
          <span className="text-[11px] text-muted-foreground">Facultatif</span>
        )}
      </div>

      <div className="flex flex-col items-center justify-center gap-4 p-5 rounded-2xl bg-muted/40 border border-border">
        {/* Profile Picture Display / WebCam Video Box */}
        <div className="relative h-40 w-40 rounded-full overflow-hidden border-4 border-card bg-slate-900 flex items-center justify-center shadow-md ring-2 ring-border">
          {/* Always rendered Video element for reliable ref binding */}
          <video
            ref={videoRef}
            playsInline
            muted
            className={`h-full w-full object-cover transform -scale-x-100 ${
              isStreaming && !photo ? "block" : "hidden"
            }`}
          />

          {/* Photo Preview if captured */}
          {photo && (
            <img src={photo} alt="Aperçu photo élève" className="h-full w-full object-cover" />
          )}

          {/* Default Placeholder when idle */}
          {!photo && !isStreaming && (
            <div className="flex flex-col items-center justify-center text-slate-400 p-2 text-center">
              <User className="h-14 w-14 text-slate-400" />
              <span className="text-[10px] font-semibold mt-1">Aucune photo</span>
            </div>
          )}
        </div>

        {/* Hidden Canvas for processing photo frame */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Camera Error Message */}
        {cameraError && (
          <p className="text-xs text-amber-600 dark:text-amber-400 text-center max-w-xs font-medium bg-amber-500/10 p-2.5 rounded-xl border border-amber-500/20">
            {cameraError}
          </p>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {!photo && !isStreaming && (
            <>
              <Button
                type="button"
                onClick={startCamera}
                size="sm"
                className="bg-primary text-primary-foreground font-bold text-xs gap-1.5 shadow-sm hover:opacity-90 cursor-pointer"
              >
                <Video className="h-4 w-4" />
                Prendre une photo (WebCam)
              </Button>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
                variant="outline"
                className="text-xs gap-1.5 font-semibold cursor-pointer"
              >
                <Upload className="h-3.5 w-3.5" />
                Choisir une image
              </Button>
            </>
          )}

          {isStreaming && !photo && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={capturePhoto}
                size="sm"
                className="bg-emerald-600 text-white font-bold hover:bg-emerald-500 text-xs gap-1.5 shadow-md cursor-pointer"
              >
                <Camera className="h-4 w-4" />
                Prendre la photo maintenant
              </Button>
              <Button
                type="button"
                onClick={stopCamera}
                size="sm"
                variant="ghost"
                className="text-xs text-muted-foreground cursor-pointer"
              >
                Annuler
              </Button>
            </div>
          )}

          {photo && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={() => {
                  setPhoto(null);
                  startCamera();
                }}
                size="sm"
                variant="outline"
                className="text-xs gap-1.5 font-bold cursor-pointer"
              >
                <RefreshCw className="h-3.5 w-3.5 text-[color:var(--sun-deep)]" />
                Reprendre une photo
              </Button>
              <Button
                type="button"
                onClick={removePhoto}
                size="sm"
                variant="ghost"
                className="text-xs text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 gap-1 cursor-pointer"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Retirer
              </Button>
            </div>
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
