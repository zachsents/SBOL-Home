import { useEffect } from 'react'
import { useOutletContext } from 'react-router-dom'

import { Grid, Space, Text, Title, Group, LoadingOverlay, useMantineTheme, Button } from '@mantine/core'

import FadedScrollArea from './FadedScrollArea'
import AnalysisForm from './AnalysisForm'
import EditableTitle from './EditableTitle'
import AnalysisMenu from './AnalysisMenu'
import { useCurrentAnalysis } from './AnalyzeView'
import EmptyTitlePrompt from './EmptyTitlePrompt'

import { MdAutoGraph } from 'react-icons/md'
import { ScaleLoader } from 'react-spinners'
import { useObserveRemoteDocument } from '../storage'
import LineChart from './LineChart'


export default function AnalysisContainer() {

    const { colors } = useMantineTheme()

    // provides context from Router outlet
    const [project] = useOutletContext()
    const [analysis, modifyAnalysis] = useCurrentAnalysis()

    // watch for updates on the remote document
    const [remoteDoc, stopObserving] = useObserveRemoteDocument(analysis.remoteDocument)

    useEffect(async () => {
        if (remoteDoc?.status == 'complete') {
            stopObserving()

            // TO DO: fetch result
            const response = await fetch(`http://localhost:3000/result/${analysis.remoteDocument}/data`)
            const json = await response.json()

            // handle errors
            if(json.error) {
                console.log('Results returned an error.')
                console.log(json)
            }

            // add results to analysis
            modifyAnalysis({
                running: false,
                result: json.error ? null : json
            })
        }
    }, [remoteDoc])

    // Handle title edit
    const editTitle = newTitle => {
        modifyAnalysis({ name: newTitle })
    }

    // Handle cancellation
    const cancel = () => {
        modifyAnalysis({ running: false })
        stopObserving()
        // TO DO: send something to server to indicate cancellation
    }

    return (
        <Grid gutter="xl">
            <Grid.Col span={5}>
                <Space h="lg" />
                <Group position='apart' >
                    <EditableTitle value={analysis.name} onChange={editTitle} sx={{ flexGrow: 1 }} />
                    {/* <Text>{project.name}</Text> */}
                    <AnalysisMenu />
                </Group>
                {/* <Space h={60} /> */}
                <FadedScrollArea stickToBottom fadeHeight={60} >
                    <AnalysisForm />
                </FadedScrollArea>
            </Grid.Col>
            <Grid.Col span={7}>
                <Title order={3} align="center" style={{ fontWeight: 600 }}>Analysis Results</Title>
                <Space h="xl" />
                {
                    analysis?.running ?
                        <EmptyTitlePrompt
                            icon={<ScaleLoader color={colors.gray[4]} height={24} />}
                            additionalContent={<Button variant='outline' color='red' onClick={cancel}>Cancel</Button>}
                        >
                            Analysis in progress...
                        </EmptyTitlePrompt>
                        :
                        analysis?.result ?
                            <FadedScrollArea stickToBottom >
                                <LineChart
                                    data={analysis.result?.slice(1)}
                                    labels={analysis.result?.[0]}
                                    showSeries={[4, 6, 7]}
                                    title="Mean"
                                />
                            </FadedScrollArea>
                            :
                            <EmptyTitlePrompt icon={<MdAutoGraph />}>
                                Run analysis to see results
                            </EmptyTitlePrompt>
                }
            </Grid.Col>
        </Grid>
    )
}