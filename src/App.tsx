import './App.css'
import { useState, lazy, Suspense } from "react";
import debounce from "lodash/debounce"
import type { Response } from "./types";
import useFetch from './hooks/useFetch'
import Input from "./components/Input/Input";

const baseURL = "https://rickandmortyapi.com/api/character/"

const Table = lazy(() => import("./components/Table/Table"))
const Pagination = lazy(() => import("./components/Pagination/Pagination"))

export default function App() {
  
  const [url, setUrl] = useState<string>(baseURL)
  
  const { data, error, isLoading } = useFetch<Response>(url)
  
  const nextPage = data?.info.next
  
  const prevPage = data?.info.prev
  
  const debounceOnChange = debounce(handleOnChange, 1000)
  
  function handleOnChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUrl(`${baseURL}?${e.target.name}=${e.target.value}`)
  }

  function onChangeNextPage() {
    if (nextPage) setUrl(nextPage)
  }
  
  function onChangePrevPage() {
    if(prevPage) setUrl(prevPage)
  }

  if(error) return <p>Something was wrong, try again</p>
  if(isLoading) return <p>Loading...</p>

  return (
    <>
      <Input
        onChange={debounceOnChange}
      />
      <Suspense fallback={<div>Waiting...</div>}>
        <Table
          data={data?.results}
        />
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          onChangeNextPage={onChangeNextPage}
          onChangePrevPage={onChangePrevPage}
        />
      </Suspense>
    </>
  )
}
