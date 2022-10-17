import {createContext, useContext, useState} from "react";

const srcContext = createContext()
const useSrc = () => {
    return useContext(srcContext)
}
function SrcContext({children}){
    const [src, setSrc] = useState()

    return (
        <srcContext.Provider value={{src, setSrc}}>
            {children}
        </srcContext.Provider>
    )
}
export {useSrc, SrcContext}