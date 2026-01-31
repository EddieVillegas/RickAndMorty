import '../App.css'
import List from './List/List'
import Input from "./Input/Input";
import Dialog from './Dialog/Dialog';
import Container from "./Container/Containers";
import Pagination from "./Pagination/Pagination";
import useRickAndMorty from "../hooks/useRickAndMorty";
import useDialog from '../hooks/useDialog';

export default function Home() {  
  
  const { 
    error,
    prevPage,
    nextPage,
    isLoading,
    characters,
    onChangePage,
    handleOnChange,
  } = useRickAndMorty()

  const {
    dialogRef,
    openDialog,
    closeDialog,
  } = useDialog()

  return (
    <section className='container mx-auto'>
      <Dialog
        ref={dialogRef}
        closeDialog={closeDialog}
      />
      <h1 className='text-3xl font-bold text-center'>
        Rick & Morty
      </h1>
      <nav className='flex m-2'>
        <Input onChange={handleOnChange} />
        <Pagination
          prevPage={prevPage}
          nextPage={nextPage}
          onChangeNextPage={() => onChangePage(nextPage)}
          onChangePrevPage={() => onChangePage(prevPage)}
        />
        <button className='rounded-full p-3 bg-white text-white cursor-pointer w-10 h-10 border text-4xl'>
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M3.32031 11.6835C3.32031 16.6541 7.34975 20.6835 12.3203 20.6835C16.1075 20.6835 19.3483 18.3443 20.6768 15.032C19.6402 15.4486 18.5059 15.6834 17.3203 15.6834C12.3497 15.6834 8.32031 11.654 8.32031 6.68342C8.32031 5.50338 8.55165 4.36259 8.96453 3.32996C5.65605 4.66028 3.32031 7.89912 3.32031 11.6835Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
        </button>
      </nav>
      <Container
        error={error}
        data={characters?.length}
        isLoading={isLoading}
      >
        <List 
          data={characters} 
          setShowDialog={openDialog} 
        />
      </Container>
    </section>
  )
}
