import React from 'react'
import {
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query'
import Home from './components/Home.tsx'
import RickAndMortyProvider from './provider/RickAndMorty.provider.tsx'

export default function App(){
  
  const queryClient = new QueryClient()
  const url = "https://rickandmortyapi.com/api/character/"
  
  return(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <RickAndMortyProvider url={url}>
          <Home />
        </RickAndMortyProvider>
      </QueryClientProvider>
  </React.StrictMode>    
  )
}