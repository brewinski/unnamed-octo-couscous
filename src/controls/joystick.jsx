import React, {useEffect, useState} from 'react';
import { Joystick } from 'react-joystick-component';



const ReactJoystick = () => {
    const [currentDirection, setCurrentDirection ] = useState();

    const handleStop =  (data) => {
        window.dispatchEvent(new KeyboardEvent('keyup', {
            keyCode: currentDirection,
            which: currentDirection,
            repeat: false
        }));
        setCurrentDirection(null);
        console.log('stop',currentDirection)
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
        console.log('start',currentDirection)

    }

    useEffect(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', {
            keyCode: currentDirection,
            which: currentDirection,
            repeat: false
        }));
    }, 
    );
    

    return <div  style={{position: 'fixed', bottom: 20, left: 15, opacity: 0.5, touchAction: 'none',}}>
        <Joystick  size={100} baseColor="red" stickColor="blue" move={handleMove} stop={handleStop}></Joystick>
    </div>
}

export {
    ReactJoystick
}