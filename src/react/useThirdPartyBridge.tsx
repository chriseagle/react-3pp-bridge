'use client';

import { useEffect, useState } from 'react';
import mitt, { Emitter, EventType } from 'mitt';

declare global {
  interface Window {
    _3pp: Emitter<Record<EventType, unknown>>;
  }
}

function useThirdPartyBridge(
  eventType: string,
  callback?: (data?: unknown) => void,
  logging: boolean = false
): [EventType[]] {
  const [eventLog, setEventLog] = useState<string[]>([]);

  useEffect(() => {
    window._3pp = window._3pp || mitt();
  }, []);

  useEffect(() => {
    if (callback && !eventLog.includes(eventType)) {
      if (logging) {
        console.log('React_3pp: subscribing to event', eventType);
      }
      window._3pp.on(eventType, () => {
        callback();
        setEventLog((prev) => [...prev, eventType]);
      });
      return () => {
        if (logging) {
          console.log('React_3pp: unsubscribing to event', eventType);
        }
        window._3pp.off(eventType);
      };
    }
  }, [eventType, callback, eventLog, logging]);

  return [eventLog];
}

export { useThirdPartyBridge };
