import { useEffect, useState } from 'react'

import { createDisplay, prepareDisplay } from 'visbol'
import Visbol from 'visbol-react'

import { Card, Title, Image, Button, useMantineTheme } from '@mantine/core'
import { GoPencil } from 'react-icons/go'


export default function EditCard({ xml }) {

    const [visbolDisplay, setVisbolDisplay] = useState(null)

    useEffect(async () => {
        console.log(xml)
        if(xml) {
            // const display = await createDisplay(xml)
            console.log(await createDisplay(xml))
            console.log(display)
        }
        // const preparedDisplay = prepareDisplay(display)
        // setVisbolDisplay(preparedDisplay)
    }, [xml])

    return (
        <Card shadow='md' radius='md' padding='xl'>
            <Title order={3} align='center' sx={{ paddingBottom: '0.5em' }}>Module Design</Title>
            <Image src='sample_design.png' sx={imageStyle}  radius='md' ></Image>
            <Card.Section>
                <Button variant='subtle' fullWidth size='lg' leftIcon={
                    <GoPencil />
                }>Edit</Button>
            </Card.Section>
        </Card>
    )
}

const imageStyle = theme => ({
    border: `1px solid ${theme.colors.dark[0]}`
})