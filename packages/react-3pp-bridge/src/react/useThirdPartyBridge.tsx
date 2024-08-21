'use client';

import { useEffect } from 'react';
import mitt, { Emitter, EventType } from 'mitt';

declare global {
  interface Window {
    thirdpb: Emitter<Record<EventType, unknown>>;
  }
}

function useThirdPartyBridge(eventName: string): {
  pub: () => void;
  sub: (callback: (data?: any) => void) => void;
} {
  useEffect(() => {
    window.thirdpb = window.thirdpb || mitt();
  }, []);

  // Function to publish events
  const pub = (data?: any) => {
    window.thirdpb.emit(eventName, data);
  };

  // Function to subscribe to events
  const sub = (callback: (data?: any) => void) => {
    // Wrap the callback to ensure it’s only added once
    const wrappedCallback = (data: any) => {
      callback(data);
    };

    window.thirdpb.on(eventName, wrappedCallback);

    // Cleanup on unmount to remove the listener
    return () => {
      window.thirdpb.off(eventName, wrappedCallback);
    };
  };

  return { pub, sub };
}

export { useThirdPartyBridge };
