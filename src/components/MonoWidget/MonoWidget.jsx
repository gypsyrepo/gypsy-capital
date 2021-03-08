import React from 'react';
import MonoConnect from '@mono.co/connect.js';
import Button from '../Button/Button';

export default function Mono() {
  const monoConnect = React.useMemo(() => {
    const monoInstance = new MonoConnect({
      onClose: () => console.log('Widget closed'),
      onLoad: () => console.log('Widget loaded successfully'),
      onSuccess: ({ code }) => console.log(`Linked successfully: ${code}`),
      // key: "test_pk_4f5soJVmo31hCbKePbfo",
      key: "live_pk_PvDfizVtAJPsoplNU8r2"
    })

    monoInstance.setup()
    
    return monoInstance;
  }, [])

  return (
    <Button
      className="mt-2" 
      bgColor="#741763" 
      size="lg" 
      color="#EBEBEB"
      clicked={() => monoConnect.open()}
    >
      Link Your Financial Account
    </Button>
  )
}