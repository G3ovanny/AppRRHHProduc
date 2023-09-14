import { useDispatch, useSelector } from 'react-redux'
import { onCloseMenu, onOpenMenu, onOpenItem } from '../../store'
import { useEffect } from 'react'


export const useMenuStore = () => {

    const dispatch = useDispatch()
    const { isOpenMenu, openItem } = useSelector(state => state.menu)
    const openMenu = () => {
        dispatch(onOpenMenu())

    }
    const closeMenu = () => {
        dispatch(onCloseMenu())
    }
    const selectItem = (openItem) => {
        dispatch(onOpenItem({ openItem: [openItem] }))
    }
    const toogleMenu = () => {
        (isOpenMenu)
            ? openMenu()
            : closeMenu()
    }
    
    return {
        //*propiedades
        isOpenMenu,
        openItem,

        //*metodos
        closeMenu,
        openMenu,
        selectItem,
        toogleMenu
    }

}