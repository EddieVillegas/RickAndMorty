import LoadingSpinner from "../Loading/Loading";

type Props = {
    data: any 
    error: any
    isLoading: boolean
}

export default function withLoadingAndError(
    Component: React.ComponentType
) {
    return (props: Props) => {
        
        const { isLoading, data, error, ...restOpts } = props
        
        if(isLoading) return <LoadingSpinner/>
        if(error) return <p>Something was wrong, try again</p>
        if(!data) return <div>No data</div>
    
        return <Component {...restOpts} data={data}/>
    } 
}