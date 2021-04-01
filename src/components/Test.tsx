import Cookies from "js-cookie"
import { useContext, useEffect, useState } from "react"
import { SidebarContext } from "../contexts/SidebarContext"

export function Test() {
    //const [activeAside, setActiveAside] = useState(false)
    //const { goHome, goLeaderbord, goSettings, goLogin } = useContext(SidebarContext)
//
    //useEffect(() => {
    //    let mounted = true
//
    //    Promise
    //    .resolve(Cookies.get('activeAside'))
    //    .then(resp => {
    //        if (mounted) {
    //            if (resp === 'disabled') {
    //                setActiveAside(false)
    //            } else {
    //                setActiveAside(true)
    //            }
    //        }
    //    })
    //    .catch(err => console.log(err))
//
    //    //fetchAPI.then(() => {
    //    //    if (mounted) {
    //    //        setActiveAside(false)
    //    //    }
    //    //})
//
    //    return function cleanup() {
    //        mounted = false
    //    }
    //}, [goHome, goLeaderbord, goSettings, goLogin, []])
    const activeAside = false || true

    return (
        <div>
            {activeAside ? (
                <h1 className={'float'}>ASIDE ATIVA</h1>
            ) : (
                <h1 className={'float'}>ASIDE DESATIVA!!!</h1>
            )}
        </div>
    )
}