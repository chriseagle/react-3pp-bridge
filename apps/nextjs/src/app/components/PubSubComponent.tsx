"use client";

import { useEffect, useState } from "react";
import { useThirdPartyBridge } from "react-3pp-bridge";

declare global {
  interface Window {
    FauxThirdPartyScriptCb: any;
  }
}

const NAMESPACE = "FauxThirdPartyScriptCb";

const PubSubComponent = () => {
  const { pub, sub } = useThirdPartyBridge("init");

  useEffect(() => {
    window[NAMESPACE] = window[NAMESPACE] || [];
    window[NAMESPACE].push((dataFromThirdPartyEvent: any) => {
      console.log("PubSubComponent pub callback", dataFromThirdPartyEvent);
      pub();
    });

    const unsub = sub(() => {
      console.log("PubSubComponent sub callback");
    });

    return unsub;
  }, [pub, sub]);

  return <div>PubSubComponent</div>;
};

export { PubSubComponent };
