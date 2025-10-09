export default function LoadingSpinner() {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-amber-300 flex items-center justify-center z-[9999] backdrop-blur-[4px]">
      <div className="flex flex-col items-center gap-1.5">
        <div className="w-64 h-64 border-4 border-amber-50 animate-spin"></div>
        <p className="text-white text-xl font-medium tracking-wide">Cargando personajes...</p>
      </div>
    </div>
  )
}