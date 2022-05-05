import { useState, useEffect } from 'react'


export default function SwitchingIcon({ children, period = 200 }) {

    const [intervalId, setIntervalId] = useState()
    const [currentIcon, setCurrentIcon] = useState(0)

    useEffect(() => {
        setIntervalId(setInterval(() => {
            setCurrentIcon(prev => prev >= children.length - 1 ? 0 : prev + 1)
        }, period))
        
        return () => clearInterval(intervalId)
    }, [])

    return children?.map ? children[currentIcon] : children
}
