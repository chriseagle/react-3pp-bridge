# react-3pp-bridge

A React hook that aims to make intercommunication between React and Third Party Platform (3pp) scripts more straight forward.

### When to use

Implementing or hooking into third party platforms SDK can sometimes prove difficult to sync component state to events in the third party embedded code lifecycle. Often supplied code is legacy and offers few APIs to interface confidently.

`useThirdPartyBridge(eventKey, callback, logging = false)` hook aims to simplify this scenario with a fire-once approach to event based communcation, using [Mitt](https://github.com/developit/mitt).

https://github.com/chriseagle/react-3pp-bridge

### Usage

#### Installation

```bash
npm install react-3pp-bridge
```

#### Implementation

```javascript
'use client';

import { useEffect } from 'react';

export const ExampleComponent = () => {
  const [eventLog] = useThirdPartyBridge('event-key', () => {
    console.log('callback fired when event-key is emitted');
  });

  useEffect(() => {
    if (typeof window.thirdPartyLibrary !== 'undefined') {
      window.thirdPartyLibrary?.callbacks?.push(() => {
        window._3pp.emit('event-key');
      });
    }
  }, []);

  useEffect(() => {
    if (eventLog.includes('event-key')) {
      // handle side effects
    }
  }, [eventLog]);

  return <div>Example Component</div>;
};
```

## License

[MIT License](https://opensource.org/licenses/MIT) © [Christopher Eagle](https://chriseagle.dev)
