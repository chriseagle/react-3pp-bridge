'use client';

import { useEffect, useState } from 'react';
import mitt, { Emitter, EventType } from 'mitt';

declare global {
  interface Window {
    _3pp_bridge: Emitter<Record<EventType, unknown>>;
  }
}

function useThirdPartyBridge(
  eventType: string,
  callback?: (data?: unknown) => void,
  logging: boolean = false
): [EventType[]] {
  const [eventLog, setEventLog] = useState<string[]>([]);

  useEffect(() => {
    window._3pp_bridge = window._3pp_bridge || mitt();
  }, []);

  useEffect(() => {
    if (callback && !eventLog.includes(eventType)) {
      if (logging) {
        console.log('React _3pp_bridge: subscribing to event', eventType);
      }
      window._3pp_bridge.on(eventType, () => {
        callback();
        setEventLog((prev) => [...prev, eventType]);
      });
      return () => {
        if (logging) {
          console.log('React _3pp_bridge: unsubscribing to event', eventType);
        }
        window._3pp_bridge.off(eventType);
      };
    }
  }, [eventType, callback, eventLog, logging]);

  return [eventLog];
}

export { useThirdPartyBridge };
