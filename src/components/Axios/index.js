import  { useState, useEffect } from 'react';
import axios from 'axios';

const useAxios = (url, dependencies) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ response, setResponse ] = useState(null);
    const [ error, setError ] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios.get(url).then((res) => {
            setIsLoading(false);
            setResponse(res);
        }).catch(err => {
            setIsLoading(false);
            setError(err);
        })
    }, dependencies);
    return [isLoading, response, error];
}

export default useAxios;