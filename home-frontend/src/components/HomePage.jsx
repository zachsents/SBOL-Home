import { Title, AppShell, Header, Grid, Navbar, Container } from '@mantine/core'
import { BiImport } from 'react-icons/bi'

import ProjectCard from './ProjectCard'
import ActionCard from './ActionCard'
import NewModal from './NewModal'
import { useProjectList } from '../storage'


export default function HomePage() {
    
    const [projects, addProject] = useProjectList()
    console.log('Project List:')
    console.log(projects)

    return (
        <AppShell
            padding="xl"
            header={
                <Header height={60} padding="xs">
                    <Title order={2} color='gray' sx={{ marginLeft: '40px' }}>SBOL Canvas</Title>
                </Header>
            }
            styles={shellStyles}
        >
            <Container size='md'>
                <Grid gutter='xl'>
                    <Grid.Col span={2}>
                        <NewModal addProject={addProject} />
                    </Grid.Col>
                    <Grid.Col span={2}>
                        <ActionCard icon={<BiImport />} color='blue'>
                            Import
                        </ActionCard>
                    </Grid.Col>
                    {projects.map(project =>
                        <Grid.Col span={4} key={project.id}>
                            <ProjectCard project={project} />
                        </Grid.Col>
                    )}
                </Grid>
            </Container>
        </AppShell>
    )
}

const shellStyles = theme => ({
    root: {
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
    },
    body: {
        flexGrow: 1
    },
    main: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0]
    },
})