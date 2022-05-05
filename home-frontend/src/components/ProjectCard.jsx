import React from 'react'
import { Link } from 'react-router-dom'

import { Card, Title, Text, useMantineTheme, Group, Badge, Button, Image } from '@mantine/core'


export default function ProjectCard({ project }) {

    const theme = useMantineTheme()

    return (
        <Card
            component={Link}
            to={`/project/${project?.id}/design`}
            sx={style}
            shadow='md'
            radius='md'
            padding='lg'
        >
            <Card.Section>
                {/* <Image
                    src='https://sbolstandard.org/media/SBOLVisualExamples/example1-1.jpg'
                    fit='contain'
                    alt='Design Preiew'
                /> */}
            </Card.Section>

            <Group position='apart' style={{ marginBottom: 5, marginTop: theme.spacing.sm }}>
                <Title order={3} weight={600}>{project?.name}</Title>
                <Badge color='gray' variant='light'>
                    {project?.source}
                </Badge>
            </Group>

            <Text size='sm'>
                {project?.description}
            </Text>

            <Button variant='default' color='gray' fullWidth style={{ marginTop: 14 }}>
                Open
            </Button>
        </Card>
    )
}

const style = theme => ({
    '&:hover': {
        // background: theme.colors.gray[1]
    }
})
