import useRickAndMorty from "../../hooks/useRickAndMorty"

type Props = {
    ref: any
    closeDialog: () => void
}

export default function Dialog({ 
    ref, 
    closeDialog 
}: Props){

    const { selectedCharacter: character } = useRickAndMorty()

    return(
        <dialog
                onBlur={() => closeDialog()}
                ref={ref}
                className="backdrop:bg-black/60 backdrop:backdrop-blur-sm rounded-2xl p-6 max-w-lg w-full shadow-xl bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition-all mx-auto"
            >
                <div className="flex flex-col items-start justify-between gap-4">
                    <button
                        className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-200 text-neutral-600 transition hover:scale-105 hover:bg-neutral-50 active:scale-95 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-800"
                        aria-label="Cerrar modal"
                        onClick={() => closeDialog()}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <img className="rounded-full w-20 mx-auto" src={character?.image}/>
                    <h2 className="mx-auto">{character?.name}</h2>
                <table className="mx-auto">
                    <thead>
                        <tr>
                            <th></th>
                            <th></th>
                            <th></th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>status:</td>
                            <td>{character?.status}</td>
                        </tr>
                        <tr>
                            <td>species:</td>
                            <td>{character?.species}</td>
                        </tr>
                        <tr>
                            <td>types:</td>
                            <td>{character?.type}</td>
                        </tr>
                        <tr>
                            <td>gender:</td>
                            <td>{character?.gender}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </dialog>
    )
}