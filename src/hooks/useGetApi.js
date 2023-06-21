import axios from "axios"
import { useEffect, useState } from "react"

const useGetApi = (initUrl, initData) => {
    const [url, setUrl] = useState(initUrl)
    const [data, setData] = useState(initData)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setisError]= useState(false)
    useEffect(() => {
        setIsLoading(true)
        const fetchData = async () => {
            const {status, data} = await axios(url)
            if(status === 200) {
                setIsLoading(false)
                setData(data)
            } else {
                setisError(true)
            }
        }

        fetchData()
    }, [url])

    return [{isLoading, isError, data}, setUrl]
}

export default useGetApi
