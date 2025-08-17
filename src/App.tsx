import './App.css'
import { useState, lazy, Suspense, Dispatch, SetStateAction } from "react";
import debounce from "lodash/debounce"
import type { Response } from "./types";
import useFetch from './hooks/useFetch'
import Input from "./components/Input/Input";
import Dialog from './components/Dialog/Dialog';

const baseURL = "https://rickandmortyapi.com/api/character/"

const Table = lazy(() => import("./components/Table/Table"))
const Pagination = lazy(() => import("./components/Pagination/Pagination"))


type RenderdataProps = {
  url: string;
  setUrl: Dispatch<SetStateAction<string>>;
  setShowDialog: Dispatch<SetStateAction<boolean>>;
}

function Renderdata({ url, setUrl, setShowDialog } : RenderdataProps) {
  
  const { data, error, isLoading } = useFetch<Response>(url)
  
  if(error) return <p>Something was wrong, try again</p>
  if(isLoading) return <p>Loading...</p>
  
  const characters = data?.results || []

  const nextPage = data?.info.next

  const prevPage = data?.info.prev
  
  function onChangeNextPage() {
    if (nextPage) setUrl(nextPage)
  }

  function onChangePrevPage() {
    if(prevPage) setUrl(prevPage)
  }

  return (
    <>
      <Table
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

export default function App() {

  const [url, setUrl] = useState<string>(baseURL)

  const [showDialog, setShowDialog] = useState<boolean>(false)

  const debounceOnChange = debounce(handleOnChange, 1000)


  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(`${baseURL}?${e.target.name}=${e.target.value}`)
  }

  return (
    <section className='container mx-auto'>
      <Dialog
        showDialog={showDialog}
        setShowDialog={setShowDialog}
      />
      <h1 className='text-3xl font-bold text-center'>Rick & Morty</h1>
      <Input
        onChange={debounceOnChange}
      />
      <Suspense fallback={<div>Waiting...</div>}>
        <Renderdata
          url={url}
          setUrl={setUrl}
          setShowDialog={setShowDialog}
        />
      </Suspense>
    </section>
  )
}
