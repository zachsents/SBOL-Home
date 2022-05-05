import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import { Navbar, Tabs, Space } from '@mantine/core'


export default function IconNav({ children, backButton }) {

    const { pathname } = useLocation()
    const navigate = useNavigate()

    // Select active tab
    const [activeTab, setActiveTab] = useState()
    useEffect(() => {
        const pathRegex = /([^\/]*)\/*$/
        setActiveTab(children.findIndex(child =>
            child.props.route.match(pathRegex)[1] == pathname.match(pathRegex)[1]
        ) + !!backButton)
    }, [pathname])

    // Handle tab change
    const onTabChange = (active, tabKey) => {
        navigate(tabKey)
    }

    return (
        <Navbar styles={navbarStyles} height={600} padding="xs" width={{ base: 100 }}>
            <Navbar.Section grow mt="lg" >
                {!backButton && <Space h='xl' />}
                <Tabs
                    active={activeTab}
                    onTabChange={onTabChange}
                    variant='unstyled'
                    styles={tabsStyles(backButton)}>
                    {
                        (backButton ? [backButton, ...children] : children)
                            .map((child, i) =>
                                <Tabs.Tab
                                    tabKey={child.props.route}
                                    label={child}
                                    key={i}
                                />
                            )
                    }
                </Tabs>
            </Navbar.Section>
        </Navbar>
    )
}

const navbarStyles = theme => ({
    root: {
        height: '100vh',
        boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',

        // More dramatic shadow -- looks better in general, but worse with
        // current version of SBOLCanvas
        // boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    }
})

const tabsStyles = backButton => theme => ({
    tabsList: {
        flexDirection: 'column'
    },
    tabLabel: {
        fontSize: '3.5em',
        color: theme.colors.gray[5],
        '&:hover': {
            color: theme.colors.gray[6]
        },
    },
    tabControl: {
        marginBottom: 60,
        padding: 0,
        '&:first-of-type': backButton && {
            marginBottom: 100
        }
    },
    tabActive: {
        '& *': {
            color: theme.colors.canvasBlue[4]
        },
    }
})
