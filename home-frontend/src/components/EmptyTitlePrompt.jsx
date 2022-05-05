
import { Center, Title, Group } from '@mantine/core'


export default function EmptyTitlePrompt({ children, additionalContent, icon }) {
    return (
        <Center sx={theme => ({
            height: 400,
            flexDirection: 'column'
        })}>
            <Group spacing="xl" sx={wrapperStyle}>
                {icon}
                <Title order={2} sx={titleStyle}>
                    {children}
                </Title>
            </Group>
            {additionalContent}
        </Center>
    )
}

const titleStyle = theme => ({
    color: theme.colors.gray[4],
    fontWeight: 600,
})

const wrapperStyle = theme => ({
    padding: '30px 40px 34px',
    // border: '2px solid ' + theme.colors.gray[2],
    borderRadius: 10,
    fontSize: '2.5em',
    color: theme.colors.gray[4],

    '& svg': {
        marginTop: 8
    }
})