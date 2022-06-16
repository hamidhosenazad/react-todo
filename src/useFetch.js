import { useState, useEffect } from 'react';
const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true);
    const [error, setError] = useState(null);
    const [requestData, setRequestData] = useState(new Date());
    const [uncompleted, setUncompleted] = useState(false);
    const [tasksLength, setTasksLength] = useState(0);
    const [doneTasksLength,setDoneTasksLength] = useState(0);
    useEffect(() => {
        const abortCont = new AbortController();
        fetch(url, { signal: abortCont.signal }).then(res => {
            if (!res.ok) {
                throw Error('could not fetch the data for the that resource');
            }
            return res.json();
        }).then(data => {
            setData(data.slice().sort((a, b) => b.id - a.id));
            setIsPending(false);
            setError(null);
            setTasksLength(data.filter (({status}) => status === 'uncompleted').length);
            setDoneTasksLength(data.filter (({status}) => status === 'completed').length);
            console.log(data.filter (({status}) => status === 'completed').length);
        }).catch(err => {
            if (err.name !== 'AbortError') {
                setIsPending(false);
                setError(err.message);
            }
        })
        return () => abortCont.abort();
    }, [url, requestData]);
    return { data, isPending, error, setRequestData, setUncompleted, uncompleted, setTasksLength, tasksLength,setData,doneTasksLength,setDoneTasksLength }
}
export default useFetch;