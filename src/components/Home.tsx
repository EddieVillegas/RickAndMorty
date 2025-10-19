import { useState, useCallback } from "react";
import { debounce } from "lodash";
import Input from "./Input/Input";
import Dialog from './Dialog/Dialog';
import useRickAndMorty from "../hooks/useRickAndMorty";
import '../App.css'
import withLoadingAndError from "./withCharacters/withCharacters";
import List from './List/List'
import Pagination from "./Pagination/Pagination";

export default function Home() {
  
  const [showDialog, setShowDialog] = useState<boolean>(false)
  const { handleUrl, url, data, error, isLoading } = useRickAndMorty()
  
  const onChangeNextPage = useCallback((next: string) => handleUrl(next), [])
  const onChangePrevPage = useCallback((prev: string) => handleUrl(prev), [])
  const handleOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => handleUrl(`${url}?${e.target.name}=${e.target.value}`), [url])
  const debounceOnChange = debounce(handleOnChange, 1000)
  const handleDialog = useCallback((value: boolean) => setShowDialog(value), [])
  
  const CharactersWithLoadingAndError = withLoadingAndError(List)
  
  return (
    <section className='container mx-auto p-5'>
      <Dialog
        showDialog={showDialog}
        setShowDialog={handleDialog}
      />
      <h1 className='text-3xl font-bold text-center'>Rick & Morty</h1>
      <Input onChange={debounceOnChange}/>
        <CharactersWithLoadingAndError
          error={error} 
          data={data?.results}
          isLoading={isLoading}
          handleDialog={handleDialog}
        />
        <Pagination
          prevPage={data?.info.prev}
          nextPage={data?.info.next}
          onChangeNextPage={() => onChangeNextPage(data?.info.next)}
          onChangePrevPage={() => onChangePrevPage(data?.info.prev)}
        />
    </section>
  )
}
