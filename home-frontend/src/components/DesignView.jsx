
import { LoadingOverlay } from '@mantine/core'
import { useState, useEffect, useRef } from 'react'
import { useOutletContext } from 'react-router-dom'


export default function DesignView() {

    // provides context from Router outlet
    const [project, modifyProject] = useOutletContext()

    // iframe reference
    const iframeRef = useRef()

    // loading states
    const [iframeLoading, setIFrameLoading] = useState(true)
    const [showLoadingIcon, setShowLoadingIcon] = useState(true)

    // Handle incoming messages from iframe
    const messageListener = ({ data }) => {

        // Handle simple string messages
        if (typeof data === 'string') {
            switch (data) {
                case 'graphServiceLoadedSBOL':
                    setShowLoadingIcon(false)
                    break
                default:
                    break
            }
        }
        // handle messages with more data
        else {
            if (data?.sbol) {
                console.log('Received SBOL from child:', data.sbol.length)
                modifyProject({ sbol: data.sbol })
            }
        }
    }

    // On mount
    useEffect(() => {
        window.addEventListener('message', messageListener)
        return () => window.removeEventListener('message', messageListener)
    }, [])

    // On iframe load or project change
    useEffect(() => {
        // check if iframe and project are both loaded
        if (!iframeLoading) {
            // if project has SBOL content, send it
            // otherwise, send dummy message - need this so SBOLCanvas knows
            // its embedded
            iframeRef.current.contentWindow.postMessage(
                project?.sbol ?
                    { sbol: project.sbol } :
                    'you are embedded!',
                import.meta.env.VITE_SBOL_CANVAS_URL
            )

            // if project doesn't have SBOL content, don't wait up
            !project?.sbol && setShowLoadingIcon(false)
        }
    }, [iframeLoading, project.id])


    return (
        <>
            <LoadingOverlay visible={showLoadingIcon} />
            { /* For now, just embedding old SBOLCanvas as iFrame */}
            <iframe
                src={import.meta.env.VITE_SBOL_CANVAS_URL + '?ignoreHTTPErrors=true'}
                width="100%"
                height="100%"
                frameBorder="0"
                onLoad={() => setIFrameLoading(false)}
                loading="lazy"
                ref={iframeRef}
            />
        </>
    )
}