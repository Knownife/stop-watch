import './index.css'
import {useState,useRef,useEffect} from "react";

function StopWatch(){

    const [isRunning, setIsRunning] = useState(false);
    const [elapsed, setElapsed] = useState(0);
    const intervalIdRef = useRef(null);
    const startTimeRef = useRef(null);

    useEffect(() => {
        if(isRunning){
            intervalIdRef.current = setInterval(()=>{
                setElapsed(Date.now()-startTimeRef.current)
            },10)
        }
        return ()=>{
            clearInterval(intervalIdRef.current)
        }
    }, [isRunning]);

    function startWatch(){
        setIsRunning(true)
        startTimeRef.current = Date.now() - elapsed;

    }
    function stopWatch(){
        setIsRunning(false)
    }
    function resetWatch(){
        setElapsed(0)
        setIsRunning(false)

    }
    function formatTime(){
        let hours = Math.floor(elapsed/(1000*60*60))
        let minutes = Math.floor(elapsed/(1000*60)%60)
        let seconds = Math.floor(elapsed/(1000)%60)
        let miliseconds = Math.floor((elapsed % 1000)/10 )
        hours = String(hours).padStart(2, '0')
        minutes = String(minutes).padStart(2, '0')
        seconds = String(seconds).padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`;
    }

    return <div className={'stop-watch'}>
        <div className={'display'}>{formatTime()} </div>
        <div className={'controls'}>
            <button onClick={startWatch} className={'start-button'}>Start</button>
            <button onClick={stopWatch} className={'stop-button'}>Stop</button>
            <button onClick={resetWatch} className={'reset-button'}>Reset</button>
        </div>
    </div>
}

export default StopWatch;