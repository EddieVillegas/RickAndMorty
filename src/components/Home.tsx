import { useState, lazy, Suspense, Dispatch, SetStateAction } from "react";
import { debounce } from "lodash";
import Input from "./Input/Input";
import Dialog from './Dialog/Dialog';
import useRickAndMorty from "../hooks/useRickAndMorty";
import '../App.css'

const List = lazy(() => import("./List/List"))
const Pagination = lazy(() => import("./Pagination/Pagination"))

type RenderdataProps = {
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

function Renderdata({ setShowDialog } : RenderdataProps) {

  const { data, error, isLoading, handleUrl } = useRickAndMorty()

  if(error) return <p>Something was wrong, try again</p>
  if(isLoading) return <p>Loading...</p>
  
  const characters = data?.results || []

  const nextPage = data?.info.next

  const prevPage = data?.info.prev
  
  function onChangeNextPage() {
    if (nextPage) handleUrl(nextPage)
  }

  function onChangePrevPage() {
    if(prevPage) handleUrl(prevPage)
  }

  return (
    <>
      <List
        data={characters}
        setShowDialog={setShowDialog}
      />
      <Pagination
        prevPage={prevPage}
        nextPage={nextPage}
        onChangeNextPage={onChangeNextPage}
        onChangePrevPage={onChangePrevPage}
      />
    </>
  )
}

export default function Home() {
  
  const { handleUrl, url } = useRickAndMorty()

  const [showDialog, setShowDialog] = useState<boolean>(false)

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => handleUrl(`${url}?${e.target.name}=${e.target.value}`)
  
  const debounceOnChange = debounce(handleOnChange, 1000)

  return (
    <section className='container mx-auto'>
      <Dialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <h1 className='text-3xl font-bold text-center'>Rick & Morty</h1>
      <Input onChange={debounceOnChange}/>
      <Suspense fallback={<div>Waiting...</div>}>
        <Renderdata
          setShowDialog={setShowDialog}
        />
      </Suspense>
    </section>
  )
}
