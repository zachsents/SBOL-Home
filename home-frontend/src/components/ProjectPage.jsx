import { Outlet, useParams } from 'react-router-dom'

import { AppShell } from '@mantine/core'
import { MdDesignServices } from 'react-icons/md'
import { IoAnalytics, IoReturnUpBack } from 'react-icons/io5'

import IconNav from './IconNav'
import { IconNavButton } from './IconNavButton'
import { useProject } from '../storage'


export default function ProjectPage() {

    const { id } = useParams()
    const projectHook = useProject(id)

    return (
        <AppShell
            padding={0}
            styles={shellStyles}
            navbar={
                <IconNav backButton={
                    <IconNavButton label="Projects" route="../../" tooltipLabel="Back to Projects" icon={<IoReturnUpBack />} />
                }>
                    <IconNavButton label="Design" route="./design" tooltipLabel="Design" icon={<MdDesignServices />} />
                    <IconNavButton label="Analyze" route="./analyze" tooltipLabel="Analyze" icon={<IoAnalytics />} />
                </IconNav>
            }
        >
            <Outlet context={projectHook} />
        </AppShell>
    )
}

const shellStyles = theme => ({
    main: {
        height: '100vh',
        overflowY: 'hidden',
        position: 'relative'
    }
})