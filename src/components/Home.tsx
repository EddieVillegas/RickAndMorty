import { useState, lazy, Suspense, useCallback } from "react";
import { debounce } from "lodash";
import Input from "./Input/Input";
import Dialog from './Dialog/Dialog';
import useRickAndMorty from "../hooks/useRickAndMorty";
import '../App.css'
import LoadingSpinner from "./Loading/Loading";

const List = lazy(() => import("./List/List"))
const Pagination = lazy(() => import("./Pagination/Pagination"))

export default function Home() {
  
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const { handleUrl, url, data, error, isLoading } = useRickAndMorty()
  
  const onChangeNextPage = useCallback((next: string) => handleUrl(next), [])
  const onChangePrevPage = useCallback((prev: string) => handleUrl(prev), [])
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => handleUrl(`${url}?${e.target.name}=${e.target.value}`), [url])
  const debounceOnChange = debounce(handleOnChange, 1000)
  const handleDialog = useCallback((value: boolean) => setShowDialog(value), [])

  if(isLoading) return <LoadingSpinner/>
  if(error) return <p>Something was wrong, try again</p>
  if(!data) return <div>No data</div>
  
  const {results: characters, info: { next, prev }} = data
  

  return (
    <section className='container mx-auto p-5'>
      <Dialog
        showDialog={showDialog}
        setShowDialog={handleDialog}
      />
      <h1 className='text-3xl font-bold text-center'>Rick & Morty</h1>
      <Input onChange={debounceOnChange}/>
      <Suspense fallback={<div>Waiting...</div>}>
        <List
          data={characters}
          setShowDialog={handleDialog}
        />
        <Pagination
          prevPage={prev}
          nextPage={next}
          onChangeNextPage={() => onChangeNextPage(next)}
          onChangePrevPage={() => onChangePrevPage(prev)}
        />
      </Suspense>
    </section>
  )
}
