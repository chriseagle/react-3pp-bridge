"use client";

import { useEffect } from "react";
import { useThirdPartyBridge } from "react-3pp-bridge";

const SubComponent = () => {
  const { sub } = useThirdPartyBridge("init");

  useEffect(() => {
    const unsub = sub(() => {
      console.log("SubComponent sub callback");
    });

    return unsub;
  }, [sub]);

  return <div>SubComponent</div>;
};

export { SubComponent };
