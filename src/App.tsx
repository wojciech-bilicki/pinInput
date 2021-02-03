import React, { useState } from 'react';
import './App.css';
import PinInputGrid from './PinInputGrid';

const PIN_LENGTH = 4;

function App() {

  const [pin, setPin] = useState<Array<number | undefined>>(new Array(PIN_LENGTH))


  const onPinChanged = (pinEntry: number | undefined, index: number) => {
    const newPin = [...pin]
    newPin[index] = pinEntry
    setPin(newPin)
  }

  return (
    <div className="App">
      <PinInputGrid onPinChanged={onPinChanged} pin={pin} pinLength={PIN_LENGTH}  />
    </div>
  );
}

export default App;
