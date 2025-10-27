import LoadingSpinner from "../Loading/Loading";

type Props = {
    data: any 
    error: any
    isLoading: boolean
}

export default function Containers(
    { data, error, isLoading, children }: React.PropsWithChildren<Props>
) {
        
    if(isLoading) return <LoadingSpinner/>
    if(error) return <p>Something was wrong, try again</p>
    if(!data) return <div>No data</div>
    
    return (
        <div>
            {children}
        </div>
    )
}