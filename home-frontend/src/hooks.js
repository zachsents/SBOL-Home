import { useState, useEffect } from 'react'


export function useStateArray(initial = []) {
    const [state, setState] = useState(initial)
    return [
        state,
        (...items) => setState(prev => [...prev, ...items]),
        setState
    ]
}


export function useStateObject(initial) {
    const [state, setState] = useState(initial)
    return [
        state,
        changes => setState(prev => ({ ...prev, ...changes })),
        setState
    ]
}


export function useStateLocallyStored(key) {

    const [state, setState] = useState(
        () => window.localStorage.getItem(key)
    )

    return [
        state,
        newState => {
            window.localStorage.setItem(key, newState)
            setState(newState)
        }
    ]
}

export function useStateArrayLocallyStored(key) {

    const [state, addState, setState] = useStateArray(
        () => JSON.parse(window.localStorage.getItem(key) || '[]')
    )

    return [
        state,
        (...items) => {
            window.localStorage.setItem(key, JSON.stringify([
                ...state,
                ...items
            ]))
            addState(...items)
        },
        newState => {
            window.localStorage.setItem(key, JSON.stringify(newState))
            setState(newState)
        }
    ]
}


export function useStateObjectLocallyStored(key) {

    const [state, modifyState, setState] = useStateObject(
        () => JSON.parse(window.localStorage.getItem(key) || '{}')
    )

    return [
        state,
        changes => {
            window.localStorage.setItem(key, JSON.stringify({
                ...state,
                ...changes
            }))
            modifyState(changes)
        },
        newState => {
            window.localStorage.setItem(key, JSON.stringify(newState))
            setState(newState)
        }
    ]
}


export function useSafeName(name, existing) {
    let ind = 1
    let safeName
    do {
        safeName = '' + name + (ind == 1 ? '' : ' ' + ind)
        ind++
    }
    while (existing.find(ex => ex.toUpperCase() == safeName.toUpperCase()))

    return safeName
}