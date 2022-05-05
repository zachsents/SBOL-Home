import React from 'react'
import { Link } from 'react-router-dom'

import { Card, Title, Text, Space, useMantineTheme } from '@mantine/core'


export default function ActionCard({ action, to, icon, color, children }) {

    return (
        <Card
            component={to && Link}
            to={to}
            sx={cardStyle(color)}
            shadow='md'
            radius='md'
            padding='lg'
            onClick={action}
        >
            <Title order={1} align='center' sx={titleStyle(color)} >{icon}</Title>
            <Space h='sm' />
            <Title order={3} align='center' sx={titleStyle(color)} >{children}</Title>
        </Card>
    )
}

const cardStyle = color => theme => ({
    // background: theme.colors[color][2],
    border: '4px solid ' + theme.colors[color][6],
    cursor: 'pointer',
    '&:hover': {
        background: theme.colors[color][1]
    }
})

const titleStyle = color => theme => ({
    color: theme.colors[color][6]
})