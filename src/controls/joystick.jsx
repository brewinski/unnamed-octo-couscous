import React, {useEffect, useState} from 'react';
import { Joystick } from 'react-joystick-component';



const ReactJoystick = () => {
    const [currentDirection, setCurrentDirection ] = useState();

    const handleStop =  (data) => {
        window.dispatchEvent(new KeyboardEvent('keyup', {
            keyCode: currentDirection,
            which: currentDirection,

        }));
        setCurrentDirection(null);
    }

    const handleMove = (data) => {
        switch(data.direction) {
            case "FORWARD":
                setCurrentDirection(38)
                break;
            case "RIGHT":
                setCurrentDirection(39)
                break;
            case "LEFT":
                setCurrentDirection(37)
                break;
            case "BACKWARD":
                setCurrentDirection(40)
                break;
        }
        window.dispatchEvent(new KeyboardEvent('keydown', {
            keyCode: currentDirection,
            which: currentDirection,
        }));
    }

    return <div  style={{position: 'fixed', bottom: 20, left: 15, opacity: 0.5, touchAction: 'none',}}>
        <Joystick  size={100} baseColor="grey" stickColor="black" move={handleMove} stop={handleStop}></Joystick>
    </div>
}

export {
    ReactJoystick
}