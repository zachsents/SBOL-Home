import { useRef, useState, useEffect } from 'react'

import { ScrollArea } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'


export default function FadedScrollArea({ children, stickToBottom, height, fadeHeight = 0, ...props }) {

    const areaRef = useRef()
    const windowDimensions = useViewportSize()
    const [areaHeight, setAreaHeight] = useState(0)

    useEffect(() => {
        setAreaHeight(windowDimensions.height - areaRef.current.getBoundingClientRect().top)
    }, [areaRef, windowDimensions])

    return (
        <>
            <ScrollArea ref={areaRef} styles={scrollAreaStyles(stickToBottom ? areaHeight : height, fadeHeight)} {...props} >
                <div style={{ paddingRight: 20 }}>
                    {children}
                </div>
            </ScrollArea>
        </>
    )
}


const scrollAreaStyles = (height, fadeHeight) => theme => ({
    root: {
        height: height - fadeHeight,
        position: 'relative',
        flexGrow: 1,
        paddingBottom: fadeHeight,
        '&::after': {
            content: "''",
            display: 'block',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            background: 'linear-gradient(white, rgba(255, 255, 255, 0))',
            // background: 'rgba(255, 255, 255, 0.5)',
            // background: 'linear-gradient(rgba(255,0,0,0.2), rgba(0,0,255,0.2))', // for debugging
            height: fadeHeight
        }
    },
    viewport: {
        paddingTop: fadeHeight,
    }
})