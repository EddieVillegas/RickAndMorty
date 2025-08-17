type Props = {
    showDialog?: boolean
    setShowDialog: (param: boolean) => void
}

export default function Dialog({ showDialog = false, setShowDialog }: Props){
    return(
        showDialog && <dialog open>
            <h1>Dialog</h1>
            <button onClick={() => setShowDialog(false)}>close</button>
        </dialog>
    )
}