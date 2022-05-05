import { useState } from 'react'

import { Menu, Text, Divider, Button, Modal, Group } from '@mantine/core'

import { BiExport, BiTrash } from 'react-icons/bi'
import { useLocalStorage } from '../storage'
import { useCurrentAnalysis } from './AnalyzeView'


export default function AnalysisMenu() {

    const [analysis, , switchAnalysis, analysisId] = useCurrentAnalysis()
    const database = useLocalStorage()

    const [deleteModalOpened, setDeleteModalOpened] = useState(false)

    const deleteAnalysis = () => {
        database.deleteRows('analyses', { id: analysisId })
        database.commit()
        switchAnalysis(null)
    }

    return (
        <>
            <Menu>
                {/* <Menu.Label>Application</Menu.Label> */}
                <Menu.Item icon={<BiExport />}>Export</Menu.Item>
                <Divider />
                {/* <Menu.Label>Danger zone</Menu.Label> */}
                <Menu.Item onClick={() => setDeleteModalOpened(true)} color="red" icon={<BiTrash />}>Delete Analysis</Menu.Item>
            </Menu>
            <Modal
                opened={deleteModalOpened}
                onClose={() => setDeleteModalOpened(false)}
                title="Are you sure?"
            >
                <Group position='apart'>
                    <Button variant="outline" onClick={() => setDeleteModalOpened(false)} >Cancel</Button>
                    <Button
                        variant="outline"
                        color="red"
                        leftIcon={<BiTrash />}
                        onClick={deleteAnalysis}
                    >
                        Delete
                    </Button>
                </Group>
            </Modal>
        </>
    )
}
