import React, {useState, useEffect} from 'react';
import axios from 'axios';

function Result(props) {
    const[submit, setSubmit] = useState(true)
    const [queryData, setQueryData] = useState([])


    useEffect(()=>{
        axios.get("http://localhost:5000/result").then(res =>{setQueryData(res.data)}
        ).catch(err=>console.log(err))}, []
    )
    function handleClick(event){
        event.preventDefault()
        setSubmit(false)
    }

    props.goBack(submit)

    return (
        <div className='flex flex-col  items-center justify-center'>
    
        <h1 className='text-center text-black text-2xl pt-40 pb-10 opacity-70 font-[sans]'>Your Search Returned</h1>

        <div className='border-2 w-6/12'>
        
       {
           queryData.map((item, indx)=>{
               return (
                   <h1 className='text-black mb-1 opacity-90 font-[sans-serif] text-center lg:text-sm xl:text-base'>{item}</h1>               )
           })
       }
    
    </div> 
        <button onClick={handleClick} className="rounded-lg w-1/12 mx-auto  mt-8  h-10 btn btn-lg bg-[#38bdf8] hover:bg-[#60a5fa] text-sm">Go Back</button>
        </div>
    );
}

export default Result;