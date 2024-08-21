# react-3pp-bridge

A React hook that aims to make communication between React and Third Party scripts more straight forward.

### When to use

Implementing or hooking into third party platforms js can sometimes prove difficult to sync component state to events in the third party embedded code lifecycle. Often supplied code is legacy and offers few APIs to interface confidently.

`useThirdPartyBridge(eventKey)` hook aims to simplify this scenario with a fire-once approach to event based communcation, using [Mitt](https://github.com/developit/mitt).

https://github.com/chriseagle/react-3pp-bridge

### Usage

#### Installation

```bash
npm install react-3pp-bridge
```

#### Implementation

```javascript
"use client";

import { useEffect, useRef, useState } from "react";
import { useThirdPartyBridge } from "react-3pp-bridge";

declare global {
  interface Window {
    FauxThirdPartyScriptCb: any;
  }
}

const NAMESPACE = "FauxThirdPartyScriptCb";

const PubSubComponent = () => {
  const { pub, sub } = useThirdPartyBridge("init");
  const subscribed = useRef(false);

  useEffect(() => {
    if (!subscribed.current) {
      window[NAMESPACE] = window[NAMESPACE] || [];
      window[NAMESPACE].push((dataFromThirdPartyEvent: any) => {
        console.log("PubSubComponent pub callback", dataFromThirdPartyEvent);
        pub();
      });
      subscribed.current = true;
    }

    const unsub = sub(() => {
      console.log("PubSubComponent sub callback");
    });

    return unsub;
  }, [pub, sub]);

  return <div>PubSubComponent</div>;
};

export { PubSubComponent };
```

## License

[MIT License](https://opensource.org/licenses/MIT) © [Christopher Eagle](https://chriseagle.dev)
