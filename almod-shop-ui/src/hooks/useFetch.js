import { useState,useEffect } from "react";

import axios from 'axios'
const useFetch=(url)=>{
     const [data,setData]=useState([])
     const [loading,setLoading]=useState(false)
     const [error,setError]=useState(false)


     useEffect(()=>{
      const fetchData=async ()=>{
          setLoading(true)

          try{
          const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}${url}`,{withCredentials:true})
          console.log(`${process.env.REACT_APP_API_BASE_URL}${url}`)
          setData(res.data)
          }catch(err){
             setError(true)
          }

          setLoading(false)

      }

     fetchData()
     },[url])

     const refetch=async()=>{
        setLoading(true)

        try{
            const res=await axios.get(`${process.env.REACT_APP_API_BASE_URL}${url}`)
            setData(res.data)
        }catch(err){
            setError(true)
        }

        setLoading(false)
     }


     return {data,loading,error,refetch}
}

export default useFetch