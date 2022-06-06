import React, {useState} from 'react';
import Axios from "axios"



const Contact = (props) => {





  /* ======= Styling ======== */
  const form = 'w-6/12 flex flex-col mx-auto  pt-5 mb-10 pb-8 bg-[#e5e5e5]  px-5 rounded-lg'
  const formInput = 'input rounded-xl h-10 w-7/12 mx-auto bg-white'
  const formButton = 'rounded-lg w-2/12 mx-auto   h-10 btn btn-lg bg-[#38bdf8] hover:bg-[#60a5fa]'
  const deleteInputField = 'btn btn-lg w-1/12 mx-2 mt-1 bg-[#ef4444] hover:bg-[#f87171] rounded-full text-white h-8 text-xl'
  const h1Input = 'pt-3 mb-1 mx-2 font-[sans-serif] text-[#262626] opacity-70 w-2/12 overflow-hidden '
  const inputMapDiv = 'flex flex-row justify-center justify-between mb-8'


  /* ======= States ======== */

  //set input from create field
  const [createInput, setcreateInput] = useState({
  nameData:"",

  })


  //store input from create field
  const [createData, setCreateData] = useState([{
    nameData:"symptoms",
    
  }])


  //store and handle input data from query field
  const [queryData, setqueryData] = useState({
    [createData[createData.length-1].nameData]:""
  })

  //check if query has been submitted
  const [submit, setSubmit] = useState(false)

  //set Create field Visibility
  const [showCreateField, setshowCreateField] = useState(false)



  /* ======= Functions ======== */

  // handle change for create field
  function handleCreateChange(event){
    const {name, value} = event.target
    setcreateInput((prevInput) => {return {...prevInput ,[name]:value}})
  }

  // handle submission of create field
  function handleCreateSubmit(event){
    setCreateData(prevData => {
      return [...prevData, createInput]}
    )
    setqueryData((prevData)=>{return{...prevData, [createInput.nameData]:""}})
    setshowCreateField(false)
    setcreateInput({ nameData:"", })
    event.preventDefault()
  }

  //handle changes in query field
  function handleQueryValueChange(event){
    const {name, value} = event.target
    setqueryData((prevInput) => {return {...prevInput ,[name]:value}})
  }

  // handle sumbission of query
  async function handleQuerySubmit(event){
    event.preventDefault()
    setSubmit(true)
    try{
      await Axios.post("http://localhost:5000/query", queryData)
    } 
    catch(error){
      console.log(error)
    }
  }

  // handle Deletion of query field
  function deleteQueryField(event){
    const name = event.target.id
    setCreateData(prevData=>{
    return(prevData.filter((item, index)=>{return item.nameData!==name})
    )})
    event.preventDefault()
  }

  /* ======= Props ======== */
  props.submitted(submit)

 
  {/* ======= Query Page ========== */}

  return (
    <section className='section bg-white'>
      <div className='container mx-auto xl:mt-10 2xl:mt-20'>
         
         {/* ======= Query Field========== */}
          <form 
            onSubmit={handleQuerySubmit} 
            className={form + ' pt-14'} >
      
            { 
              
              createData.map((item, indx)=> 
                { 
                  const {valueData} = queryData
                  return (
                    <div className={inputMapDiv} >
                      <h1 className={h1Input} >{item.nameData}</h1> 
                      <input  onChange={handleQueryValueChange} 
                              className={formInput} 
                              id={indx} name={item.nameData}  
                              type='text'  
                              value={valueData}/>

                      { (item.nameData !== "symptoms")? 
                        <button onClick={deleteQueryField}  
                                id={item.nameData} 
                                className={deleteInputField}
                        >x</button>: <div className='mx-2 w-1/12'></div> 
                      }          
                    </div> 
                  ) 
                } 
              )
           
            } 
            <button 
              type="submit" 
              className={formButton + ' mt-8'}
            >search</button>
          </form>
          
          {/* ======= Create Search Field ========*/}
          {showCreateField && 
            <form
              className={'space-y-8 '+form}>
              <div className='flex gap-6'>
                <input onChange={handleCreateChange} 
                      name="nameData"  
                      className={formInput} 
                      type='text' 
                      placeholder='name' 
                      value={createInput.nameData} />
              </div>

                <button onClick={handleCreateSubmit} 
                  type="submit" 
                  className={formButton + ' mt-8 text-sm'}
                >Add</button>
            </form> 
          }
          {/* ======= Open Create Search Field ===== */}
         
          {!showCreateField && 
            <button 
              onClick={((event)=>
                              {
                                event.preventDefault()
                                setshowCreateField(true)
                              }
                        )
                      }
              className={formButton +' text-base mt-10'}
            >Create New Field</button> 
          }
     
      </div>
    </section>
  )
}

export default Contact;
