import { createContext, useContext, useState } from 'react'
const Context = createContext()

function ResulutionContext({ children }) {
    const [state, setState] = useState(window.localStorage.getItem('video_resolution') || '360p')

    const value = {
        state,
        setState
    }
    return (
        <Context.Provider value={value}>
            <Context.Consumer>
                {
                    ()=>children
                }
            </Context.Consumer>
        </Context.Provider>
    )
}

const useResolution =(setteronly)=>{
    const { state, setState } = useContext(Context)
    return setteronly ? [setState] :  [state, setState]
}

export {
    ResulutionContext,
    useResolution
}