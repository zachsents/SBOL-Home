import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import './index.css'
import HomePage from './components/HomePage'
import ProjectPage from './components/ProjectPage'
import DesignView from './components/DesignView'
import AnalyzeView from './components/AnalyzeView'
import { MantineProvider } from '@mantine/core'
import theme from './theme'
import { LocalStorageProvider } from './storage'

ReactDOM.render(
    <MantineProvider theme={theme}>
        <LocalStorageProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="project/:id" element={<ProjectPage />}>
                        <Route path="design" element={<DesignView />} />
                        <Route path="analyze" element={<AnalyzeView />} />
                        {/* <Route path="analyze/:analysisId?" element={<AnalyzeView />} /> */}
                        <Route path="export" element={'export'} />
                    </Route>
                </Routes>
            </BrowserRouter >
        </LocalStorageProvider>
    </MantineProvider>,
    document.getElementById('root')
)
