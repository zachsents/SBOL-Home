import { createContext, useContext, useState, useEffect } from "react"
import localStorageDB from 'localstoragedb'
import { useStateArray, useStateObject } from "./hooks"


// React context
const LocalStorageContext = createContext()

// Local storage database instance
const database = new localStorageDB("canvas", localStorage)
window.db = database

// Database initialization
if (database.isNew()) {
    database.createTable('projects', [
        'id', 'name', 'sbol', 'lastModified', 'source'
    ])

    database.createTable('analyses', [
        'id', 'name', 'project', 'form', 'running', 'remoteDocument', 'result'
    ])

    database.commit()
}


// Hooks

export function useProjectList() {

    // maybe to do: change this to a function so it only executes once for speed
    const [projects, addProject, setProjects] = useStateArray(database.queryAll('projects'))

    // side-effect to write to database
    useEffect(() => {
        projects.forEach(project => {
            database.insertOrUpdate('projects', { id: project.id }, project)
        })
        database.commit()
    }, [projects])

    return [projects, addProject, setProjects]
}


export function useProject(id) {

    const [project, modifyProject, setProject] = useStateObject(
        database.queryAll('projects', { query: { id } })[0]
    )

    console.log('Current Project:', project.name, project.id)
    console.debug(project)

    useEffect(() => {
        database.insertOrUpdate('projects', { id: project.id }, project)
        database.commit()
    }, [project])

    return [project, modifyProject, setProject]
}


export function useAnalysesFor(project) {

    const query = () => database.queryAll('analyses', { query: { project } })

    const [analyses, addAnalysis, setAnalyses] = useStateArray(query)

    useEffect(() => {
        analyses.forEach(analysis => {
            database.insertOrUpdate('analyses', { id: analysis.id }, analysis)
        })
        database.commit()
    }, [analyses])

    return [analyses, addAnalysis, setAnalyses, () => setAnalyses(query())]
}


export function useAnalysis(initialId) {

    // state for analysis id
    const [id, setId] = useState(initialId)

    // function to find analysis in database
    const queryForAnalysis = () => id && database.queryAll('analyses', { query: { id } })[0]

    // state for actual analysis -- initially read from db
    const [analysis, modifyAnalysis, setAnalysis] = useStateObject(queryForAnalysis)

    if (analysis) {
        console.debug('Current Analysis:', analysis.name, analysis.id)
        console.debug(analysis)
    }

    // update analysis state when id changes
    useEffect(() => {
        setAnalysis(id ? queryForAnalysis() : null)
    }, [id])

    // write to database when analysis changes
    useEffect(() => {
        if (id && analysis) {
            database.insertOrUpdate('analyses', { id: analysis.id }, analysis)
            database.commit()
        }
    }, [analysis])

    return [analysis, modifyAnalysis, setId, id]
}


export function useObserveRemoteDocument(docId) {

    const [result, setResult] = useState()
    const [intervalId, setIntervalId] = useState()

    const getStatus = async () => {
        const response = await (await fetch(`http://localhost:3000/status/${docId}`)).json()
        setResult(response)
    }

    useEffect(() => {
        if (docId) {
            // check once now
            getStatus()

            // periodically check
            setIntervalId(
                setInterval(getStatus, 3000)
            )

            // cleanup
            return () => clearInterval(intervalId)
        }
    }, [docId])

    return [result, () => clearInterval(intervalId)]
}


// Provider

export function LocalStorageProvider({ children }) {

    return (
        <LocalStorageContext.Provider value={database}>
            {children}
        </LocalStorageContext.Provider>
    )
}

export function useLocalStorage() {
    return useContext(LocalStorageContext)
}