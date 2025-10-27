import '../App.css'
import List from './List/List'
import Input from "./Input/Input";
import Dialog from './Dialog/Dialog';
import Container from "./Container/Containers";
import Pagination from "./Pagination/Pagination";
import useRickAndMorty from "../hooks/useRickAndMorty";

export default function Home() {  
  
  const { 
    data,
    error,
    isLoading,
    handleOnChange,
    onChangePage,
    closeDialog,
    openDialog,
    dialogRef,
  } = useRickAndMorty()

  return (
    <section className='container mx-auto p-5'>
      <Dialog 
        ref={dialogRef}
        closeDialog={closeDialog}
      />
      <h1 className='text-3xl font-bold text-center'>
        Rick & Morty
      </h1>
      <Input onChange={handleOnChange}/>
      <Container
        error={error}
        data={data?.results}
        isLoading={isLoading}
      >
        <List 
          data={data?.results} 
          setShowDialog={openDialog} 
        />
      </Container>
      <Pagination
        prevPage={data?.info.prev}
        nextPage={data?.info.next}
        onChangeNextPage={() => onChangePage(data?.info.next)}
        onChangePrevPage={() => onChangePage(data?.info.prev)}
      />
    </section>
  )
}
