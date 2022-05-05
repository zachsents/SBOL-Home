import { useState, useEffect, createContext, useContext } from 'react'
import { useOutletContext } from 'react-router-dom'
import uuid from 'short-uuid'

import { Container, Space } from '@mantine/core'
import { VscGraph } from 'react-icons/vsc'

import AnalysisContainer from './AnalysisContainer'
import AnalysisSelector from './AnalysisSelector'
import EmptyTitlePrompt from './EmptyTitlePrompt'
import { useAnalysesFor, useAnalysis } from '../storage'
import { useSafeName } from '../hooks'


const AnalysisContext = createContext()

export default function AnalyzeView() {

    const [project] = useOutletContext()
    const [analyses, addAnalysis,, reloadAnalyses] = useAnalysesFor(project.id)
    const [analysis, modifyAnalysis, switchAnalysis, analysisId] = useAnalysis()
    
    // Handle analysis creation
    const createAnalysis = () => {
        const newAnalysis = {
            id: uuid.generate(),
            name: useSafeName('Untitled Analysis', analyses.map(a => a.name)),
            project: project.id,
        }

        addAnalysis(newAnalysis)

        // little hacky -- quick mutation to let us know which one to select
        // this won't get written to local storage
        // newAnalysis.justCreated = true
    }

    // Reload analysis list when analysis changes
    useEffect(() => {
        reloadAnalyses()
    }, [analysis])

    return (
        <AnalysisContext.Provider value={[analysis, modifyAnalysis, switchAnalysis, analysisId]}>
            <Space h="xl" />
            <Container size="xl">
                <AnalysisSelector
                    data={analyses.map(a => ({
                        label: a.name,
                        value: a.id,
                    }))}
                    create={createAnalysis}
                    selected={analysisId}
                    select={switchAnalysis}
                />
                {analysis ?
                    <AnalysisContainer />
                    :
                    <EmptyTitlePrompt icon={<VscGraph />} >
                        Select an analysis to get started
                    </EmptyTitlePrompt>
                }
            </Container>
        </AnalysisContext.Provider>
    )
}


export function useCurrentAnalysis() {
    return useContext(AnalysisContext)
}
