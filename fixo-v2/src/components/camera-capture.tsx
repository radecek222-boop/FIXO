"use client";

import * as React from "react";
import { Camera, SwitchCamera, X, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CameraCaptureProps {
  onCapture: (imageData: string) => void;
  onClose: () => void;
  className?: string;
}

type FacingMode = "user" | "environment";

export function CameraCapture({
  onCapture,
  onClose,
  className,
}: CameraCaptureProps) {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const streamRef = React.useRef<MediaStream | null>(null);

  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [facingMode, setFacingMode] = React.useState<FacingMode>("environment");
  const [capturedImage, setCapturedImage] = React.useState<string | null>(null);
  const [hasMultipleCameras, setHasMultipleCameras] = React.useState(false);

  // Check for multiple cameras
  React.useEffect(() => {
    async function checkCameras() {
      try {
        const devices = await navigator.mediaDevices.enumerateDevices();
        const cameras = devices.filter((d) => d.kind === "videoinput");
        setHasMultipleCameras(cameras.length > 1);
      } catch {
        // Ignore errors when checking cameras
      }
    }
    checkCameras();
  }, []);

  // Start camera stream
  React.useEffect(() => {
    async function startCamera() {
      setIsLoading(true);
      setError(null);

      // Stop any existing stream
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }

      try {
        // Check if getUserMedia is supported
        if (!navigator.mediaDevices?.getUserMedia) {
          throw new Error("Váš prohlížeč nepodporuje přístup ke kameře");
        }

        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode,
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: false,
        });

        streamRef.current = stream;

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
        }

        setIsLoading(false);
      } catch (err) {
        console.error("Camera error:", err);
        setIsLoading(false);

        if (err instanceof Error) {
          if (
            err.name === "NotAllowedError" ||
            err.name === "PermissionDeniedError"
          ) {
            setError(
              "Přístup ke kameře byl zamítnut. Povolte přístup v nastavení prohlížeče."
            );
          } else if (
            err.name === "NotFoundError" ||
            err.name === "DevicesNotFoundError"
          ) {
            setError("Kamera nebyla nalezena na tomto zařízení.");
          } else if (
            err.name === "NotReadableError" ||
            err.name === "TrackStartError"
          ) {
            setError("Kamera je používána jinou aplikací.");
          } else if (err.name === "OverconstrainedError") {
            // Try again without facing mode constraint
            try {
              const stream = await navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false,
              });
              streamRef.current = stream;
              if (videoRef.current) {
                videoRef.current.srcObject = stream;
                await videoRef.current.play();
              }
              setIsLoading(false);
              setError(null);
              return;
            } catch {
              setError("Nepodařilo se spustit kameru.");
            }
          } else {
            setError(err.message || "Nepodařilo se spustit kameru.");
          }
        } else {
          setError("Nepodařilo se spustit kameru.");
        }
      }
    }

    if (!capturedImage) {
      startCamera();
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [facingMode, capturedImage]);

  // Capture photo from video
  const capturePhoto = React.useCallback(() => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (!ctx) return;

    // Set canvas size to video size
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    ctx.drawImage(video, 0, 0);

    // Get image data as base64
    const imageData = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(imageData);

    // Stop the stream
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  }, []);

  // Retake photo
  const retakePhoto = React.useCallback(() => {
    setCapturedImage(null);
  }, []);

  // Confirm and use photo
  const confirmPhoto = React.useCallback(() => {
    if (capturedImage) {
      onCapture(capturedImage);
    }
  }, [capturedImage, onCapture]);

  // Switch camera
  const switchCamera = React.useCallback(() => {
    setFacingMode((prev) => (prev === "user" ? "environment" : "user"));
  }, []);

  // Handle close
  const handleClose = React.useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    onClose();
  }, [onClose]);

  return (
    <div
      className={cn(
        "fixed inset-0 z-50 bg-black flex flex-col",
        className
      )}
    >
      {/* Hidden canvas for capturing */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header */}
      <div className="flex items-center justify-between p-4 text-white">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleClose}
          className="text-white hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </Button>
        <span className="font-medium">
          {capturedImage ? "Náhled fotografie" : "Vyfotografujte závadu"}
        </span>
        <div className="w-10" /> {/* Spacer for centering */}
      </div>

      {/* Camera view / Captured image */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {error ? (
          <div className="text-center px-6">
            <Camera className="mx-auto h-16 w-16 text-white/50 mb-4" />
            <p className="text-white/90 mb-4">{error}</p>
            <Button variant="outline" onClick={handleClose}>
              Zavřít
            </Button>
          </div>
        ) : isLoading ? (
          <div className="text-center">
            <Loader2 className="mx-auto h-12 w-12 text-white animate-spin mb-4" />
            <p className="text-white/70">Spouštím kameru...</p>
          </div>
        ) : capturedImage ? (
          <img
            src={capturedImage}
            alt="Zachycená fotografie"
            className="max-w-full max-h-full object-contain"
          />
        ) : (
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="max-w-full max-h-full object-contain"
          />
        )}
      </div>

      {/* Controls */}
      <div className="p-6 pb-safe">
        {!error && !isLoading && (
          <div className="flex items-center justify-center gap-8">
            {capturedImage ? (
              <>
                <Button
                  variant="outline"
                  size="lg"
                  onClick={retakePhoto}
                  className="border-white text-white hover:bg-white/20"
                >
                  Znovu
                </Button>
                <Button
                  size="lg"
                  onClick={confirmPhoto}
                  className="bg-success hover:bg-success/90"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Použít
                </Button>
              </>
            ) : (
              <>
                {/* Switch camera button */}
                {hasMultipleCameras && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={switchCamera}
                    className="text-white hover:bg-white/20"
                  >
                    <SwitchCamera className="h-6 w-6" />
                  </Button>
                )}

                {/* Capture button */}
                <button
                  onClick={capturePhoto}
                  className="w-20 h-20 rounded-full border-4 border-white flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label="Vyfotografovat"
                >
                  <div className="w-14 h-14 rounded-full bg-white" />
                </button>

                {/* Spacer to balance the layout */}
                {hasMultipleCameras && <div className="w-10" />}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Hook to check camera availability
 */
export function useCameraAvailable() {
  const [available, setAvailable] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    async function check() {
      try {
        if (!navigator.mediaDevices?.getUserMedia) {
          setAvailable(false);
          return;
        }

        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some((d) => d.kind === "videoinput");
        setAvailable(hasCamera);
      } catch {
        setAvailable(false);
      }
    }
    check();
  }, []);

  return available;
}
