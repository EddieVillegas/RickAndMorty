import {useRef, RefObject} from 'react'

type Props = {
    openDialog: () => void
    closeDialog: () => void
    dialogRef: RefObject<HTMLDialogElement | null>
}

export default function useDialog(): Props {
    const dialogRef = useRef<HTMLDialogElement|null>(null)
    const closeDialog = () => dialogRef.current && dialogRef.current.close()
    const openDialog = () => dialogRef.current && dialogRef.current.showModal()
    return {
        dialogRef,
        closeDialog,
        openDialog
    }
}