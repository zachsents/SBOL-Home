import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import uuid from 'short-uuid'

import { Modal, Button, Group, Title, TextInput, Space, Center } from '@mantine/core'

import ActionCard from './ActionCard'

import { AiOutlinePlus } from 'react-icons/ai'


export default function NewModal({ addProject }) {

    const navigate = useNavigate()
    const inputRef = useRef()
    const [opened, setOpened] = useState(false)

    // Create new project and navigate to it
    const createProject = () => {
        const newProject = {
            id: uuid.generate(),
            name: inputRef.current.value,
            source: 'local'
        }
        addProject(newProject)
        setOpened(false)
        // navigate(`/project/${newProject.id}/design`)
    }

    return (
        <>
            <ActionCard action={() => setOpened(true)} icon={<AiOutlinePlus />} color='red'>
                New
            </ActionCard>
            <Modal
                opened={opened}
                onClose={() => setOpened(false)}
                size='md'
                padding='xl'
                radius='lg'
            >
                {/* <TextInput placeholder='Name your project' size="xl" variant="unstyled" styles={inputStyles} /> */}
                <TextInput placeholder="Name your project" size="xl" ref={inputRef} styles={inputStyles} radius='md' />
                <Space h='xl' />
                <Center>
                    <Button onClick={createProject} gradient={{ from: "canvasBlue", to: "indigo" }} variant="gradient" radius="xl">Create</Button>
                </Center>
            </Modal>
        </>
    )
}

const inputStyles = theme => ({
    input: {
        fontWeight: 600
    }
})