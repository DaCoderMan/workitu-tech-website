'use client';

import { useRef, useEffect, useState } from 'react';
import Image from 'next/image';

export default function VideoBackground({ videoSrc = '/videos/workitu-reloaded.mp4', imageSrc, className = '' }) {
  const videoRef = useRef(null);
  const [isVideoSupported, setIsVideoSupported] = useState(true);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);

  useEffect(() => {
    if (imageSrc) return; // Skip video logic if image is provided

    const video = videoRef.current;
    if (!video) return;

    // Check if video is supported
    const supportsVideo = video.canPlayType('video/mp4');
    if (!supportsVideo) {
      setIsVideoSupported(false);
      return;
    }

    // Configure video for all devices
    video.loop = true;
    video.muted = true;
    video.playsInline = true;
    video.autoplay = true;
    video.setAttribute('webkit-playsinline', 'true');
    video.setAttribute('playsinline', 'true');
    
    // Handle video loading
    const handleLoadedData = () => {
      video.play().catch(error => {
        console.log('Video autoplay failed:', error);
        // This is normal on mobile devices - they require user interaction
      });
    };

    const handleError = () => {
      console.log('Video failed to load');
      setIsVideoSupported(false);
    };

    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);

    // Cleanup
    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
    };
  }, [imageSrc]); // Removed empty dependency array to react to imageSrc changes if needed, though usually static

  // Handle user interaction to start video on mobile
  useEffect(() => {
    if (imageSrc || hasUserInteracted) return;

    const handleUserInteraction = () => {
      setHasUserInteracted(true);
      const video = videoRef.current;
      if (video && video.paused) {
        video.play().catch(console.log);
      }
      // Remove listeners after first interaction
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };

    // Add multiple event listeners for better mobile support
    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);
    document.addEventListener('scroll', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
      document.removeEventListener('scroll', handleUserInteraction);
    };
  }, [hasUserInteracted, imageSrc]);

  if (imageSrc) {
    return (
      <div className={`fixed inset-0 w-full h-full overflow-hidden z-0 ${className}`}>
        <Image
          src={imageSrc}
          alt="Background"
          fill
          priority
          className="object-cover"
          quality={100}
        />
        <div className="absolute inset-0 bg-black/40"></div>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 w-full h-full overflow-hidden z-0 ${className}`}>
      {isVideoSupported ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          loop
          muted
          playsInline
          autoPlay
          preload="metadata"
          webkit-playsinline="true"
          style={{
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)'
          }}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        // Fallback gradient background
        <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-black/80"></div>
      )}
      
      {/* Overlay for better text readability */}
      <div className="absolute inset-0 bg-black/70"></div>
      
      {/* Mobile-specific overlay for better performance */}
      <div className="absolute inset-0 bg-black/50 md:hidden"></div>
    </div>
  );
}
