import React from 'react';
import MonoConnect from '@mono.co/connect.js';

export default function App() {
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Widget loaded successfully'),
      onSuccess: ({ code }) => console.log(`Linked successfully: ${code}`),
      key: "test_pk_4f5soJVmo31hCbKePbfo",
    })

    monoInstance.setup()
    
    return monoInstance;
  }, [])

  return (
    <div style={{height: '100vh'}}>
      <button style={{display: 'block', margin: 'auto', marginTop: '45vh', padding: '20px 55px'}} onClick={() => monoConnect.open()}>
        Link Your Financial Account
      </button>
    </div>
  )
}