import { useDispatch, useSelector } from 'react-redux'
import { onCloseModal, onOpenModal } from '../../store'

export const useModalStore = () => {

  const dispatch = useDispatch()
  const { isModalOpen, nameModal } = useSelector(state => state.modal)

  const openModal = (name) => {
    dispatch(onOpenModal(name));
  }

  const closeModal = () => {
    dispatch(onCloseModal())

  }

  return {
    //* Propiedades
    isModalOpen,
    nameModal,
    //* Metodos
    openModal,
    closeModal,

  }
}
