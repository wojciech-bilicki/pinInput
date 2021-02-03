import React, { useRef } from 'react'


interface PinInputGridProps {
  pin: Array<number | undefined>;
  onPinChanged: (pinEntry: number | undefined, index: number) => void;
  pinLength: number;
}

const PIN_MIN_VALUE = 0;
const PIN_MAX_VALUE = 9;
const BACKSPACE_KEY = 'Backspace';


const PinInputGrid: React.FC<PinInputGridProps> = ({pinLength, pin, onPinChanged}) => {

  const inputRefs = useRef<HTMLInputElement[]>([])

  const changePinFocus = (pinIndex: number) => {
    const ref = inputRefs.current[pinIndex]
    if(ref) {
      ref.focus()
    }
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = event.target.value;
    const pinNumber = Number(value.trim());
    if(isNaN(pinNumber) || value.length === 0) {
      return 
    }
    
    if(pinNumber >= PIN_MIN_VALUE && pinNumber <= PIN_MAX_VALUE) {
      onPinChanged(pinNumber, index)
      if(index < pinLength - 1) {
        changePinFocus(index + 1)
      }
    }
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const keyboardKeyCode = event.nativeEvent.code;
    if(keyboardKeyCode !== BACKSPACE_KEY) {
      return
    }

    if(pin[index] === undefined) {
      changePinFocus(index - 1)
    } else {
      onPinChanged(undefined, index)
    }
  }

  return (
    <div>{
      Array.from({length: pinLength}, (_,index ) => (
        <input
          onKeyDown={(event) => onKeyDown(event, index)}
          key={index}
          ref={el => {
          if(el) {
            inputRefs.current[index] = el;
          }
        }} onChange={(event) => onChange(event, index)} value={pin[index] || ''}/>
      ) )
      }</div>
  )
}

export default PinInputGrid;