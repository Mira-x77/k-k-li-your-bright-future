import React, { useState, useRef } from "react";
import { Camera, RefreshCw, Upload, Check, User } from "lucide-react";
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
      setCameraError("Impossible d'accéder à la caméra. Utilisez l'option d'import de fichier.");
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
      // Draw centered square crop from video
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
      <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
        Photo de profil de l'élève (Optionnel)
      </label>

      <div className="flex flex-col items-center justify-center gap-3">
        {/* Photo Display / Camera Stream Box */}
        <div className="relative h-32 w-32 rounded-full overflow-hidden border-2 border-dashed border-slate-700 bg-slate-900 flex items-center justify-center shadow-md">
          {photo ? (
            <img src={photo} alt="Aperçu photo élève" className="h-full w-full object-cover" />
          ) : isStreaming ? (
            <video ref={videoRef} playsInline muted className="h-full w-full object-cover transform -scale-x-100" />
          ) : (
            <div className="flex flex-col items-center justify-center text-slate-500">
              <User className="h-12 w-12" />
            </div>
          )}
        </div>

        {/* Hidden Canvas for capture */}
        <canvas ref={canvasRef} className="hidden" />

        {/* Camera Error Alert */}
        {cameraError && (
          <p className="text-[11px] text-amber-400 text-center max-w-xs">{cameraError}</p>
        )}

        {/* Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {!photo && !isStreaming && (
            <>
              <Button
                type="button"
                onClick={startCamera}
                size="sm"
                variant="outline"
                className="text-xs gap-1.5 border-slate-700 bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white"
              >
                <Camera className="h-3.5 w-3.5 text-amber-400" />
                Prendre une photo (WebCam)
              </Button>
              <Button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                size="sm"
                variant="ghost"
                className="text-xs gap-1.5 text-slate-400 hover:text-white"
              >
                <Upload className="h-3.5 w-3.5" />
                Importer fichier
              </Button>
            </>
          )}

          {isStreaming && (
            <div className="flex items-center gap-2">
              <Button
                type="button"
                onClick={capturePhoto}
                size="sm"
                className="bg-amber-400 text-slate-950 font-bold hover:bg-amber-300 text-xs gap-1.5"
              >
                <Check className="h-3.5 w-3.5" />
                Capturer
              </Button>
              <Button
                type="button"
                onClick={stopCamera}
                size="sm"
                variant="ghost"
                className="text-xs text-slate-400 hover:text-white"
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
              className="text-xs gap-1.5 border-slate-700 bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              Changer de photo
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
