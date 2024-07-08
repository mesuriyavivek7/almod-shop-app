import React, { useEffect } from 'react'

import { useContext,useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import useFetch from '../../hooks/useFetch'
import axios from 'axios'
import { TransContext } from '../../context/TransContext'


export default function AddressWindow({setAddressWindow,setPayWindow,setAddressCompleted}) {
  const baseURL=process.env.REACT_APP_API_BASE_URL
  const userObj=useContext(AuthContext)
  const user=userObj.user
  const userDispatch=userObj.dispatch
  const {dispatch}=useContext(TransContext)
  const {data,loading}=useFetch(`/user/getaddress/${user._id}`)
  const [addressAvailable,setAddressAvailable]=useState(!(Object.keys(data).length===0))
  const [addressObj,setAddressObj]=useState({addresstype:"home",state:"Gujarat"})
  //some temp data
  const [home,setHome]=useState(true)
  const [work,setWork]=useState(false)
  

  const [error,setError]=useState(null)

  useEffect(()=>{
    if(loading===false){
      setAddressAvailable(!(Object.keys(data).length===0))
      setAddressObj((prev)=>({...prev,...data.address}))
      setHome((!(Object.keys(data).length===0))?((data.address.addresstype==="home")?(true):(false)):(true))
      setWork((!(Object.keys(data).length===0))?((data.address.addresstype==="work")?(true):(false)):(false))
    }
 },[loading])


  const handleChange=(e)=>{
     if(e.target.id==='work'){
       setHome(false)
       setWork(true)
       setAddressObj((prev)=>({...prev,["addresstype"]:"work"}))
     }else if(e.target.id==='home'){
       setWork(false)
       setHome(true)
       setAddressObj((prev)=>({...prev,["addresstype"]:"home"}))
     }else{
      setAddressObj((prev)=>({...prev,[e.target.id]:e.target.value}))
     }
     
  }

 const changeWindow=()=>{
     setAddressCompleted(true)
     setAddressWindow(false)
     setPayWindow(true)
 }


  const saveaddresschanges= async ()=>{
     try{
       const res=await axios.post(`${baseURL}/user/updateaddress/${user._id}`,addressObj,{withCredentials:true})
       userDispatch({type:"LOGIN_SUCCESS",payload:res.data})
       changeWindow()
     }catch(err){
       setError("There is something wrong...!")
     }
  }

  const handleSubmit=()=>{
      if(addressObj.postcode.length!==6){
        setError("Please enter valid postcode....!")
      }else if(addressObj.locality.length<=2 || addressObj.locality===""){
        setError("Please enter valid locality...!")
      }else if(addressObj.city.length<=2 || addressObj.city===""){
        setError("Please enter valid city name..!")
      }else if(addressObj.state.length<=2 || addressObj.state===""){
        setError("Please enter valid state name..!")
      }else{
        setError(null)
        if(addressObj.state!=="Gujarat"){
            dispatch({type:"TRANS_SHIPPING",payload:{state:addressObj.state,charge:40}})
        }else{
          dispatch({type:null,charge:0})
        }
        saveaddresschanges()
      }
  }

 
  

  return (
    
      (loading)?("Loading please wait....."):(


      <div className='infoWindow addresswide'>
       <div className='addressHead'>
         <h4>Add New Address</h4>
         <span>*Mandatory Fields</span>
       </div>
      
       <form className='addressForm'>
         <div className='inputBoxContainer'>
           <div className='inputBox'>
             <span>Customer Name</span>
             <input type='text' value={`${user.first_name} ${user.last_name}`} readOnly></input>
          </div>
          <div className='inputBox'>
             <span>Mobile No</span>
             <input type='text' value={user.mobileno} readOnly></input>
          </div>
         </div>
         <div className='inputBoxContainer'>
           <div className='inputBox'>
             <span>Building Name </span>
             <input id='apartment' type='text' defaultValue={(addressAvailable)?(addressObj.apartment):("")} onChange={handleChange} placeholder='c4 building or "NA" '></input>
           </div>
         </div>
         
         <div className='inputBoxContainer'>
           <div className='inputBox'>
             <span>Flate No/House No</span>
             <input id='flateno' type='text' defaultValue={(addressAvailable)?(addressObj.flateno):("")} onChange={handleChange} placeholder='21-A or "NA'></input>
           </div>
           <div className='inputBox'>
             <span>Near By/Locality *</span>
             <input id='locality' type='text' defaultValue={(addressAvailable)?(addressObj.locality):("")} onChange={handleChange} placeholder='near by binory hotel' required></input>
           </div>
         </div>
         <div className='inputBoxContainer'>
           <div className='inputBox'>
             <span>City/Town *</span>
             <input id='city' type='text' defaultValue={(addressAvailable)?(addressObj.city):("")} onChange={handleChange} placeholder='Ahmedabad' required></input>
           </div>
           <div className='inputBox'>
            <span>Post Code *</span>
            <input id='postcode' type='text' defaultValue={(addressAvailable)?(addressObj.postcode):("")} onChange={handleChange} placeholder='380052' required></input>
           </div>
         </div>
         <div className='inputBoxContainer'>
           <div className='inputBox'>
             <span>State *</span>
             <select name="state" id="state" onChange={handleChange}  value={(addressAvailable)?(addressObj.state):("")}>
                     <option value="Gujarat">Gujarat</option>
                     <option value="Andhra Pradesh">Andhra Pradesh</option>
                     <option value="Andaman and Nicobar Islands">Andaman and Nicobar Islands</option>
                     <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                     <option value="Assam">Assam</option>
                     <option value="Bihar">Bihar</option>
                     <option value="Chandigarh">Chandigarh</option>
                     <option value="Chhattisgarh">Chhattisgarh</option>
                     <option value="Dadar and Nagar Haveli">Dadar and Nagar Haveli</option>
                     <option value="Daman and Diu">Daman and Diu</option>
                     <option value="Delhi">Delhi</option>
                     <option value="Lakshadweep">Lakshadweep</option>
                     <option value="Puducherry">Puducherry</option>
                     <option value="Goa">Goa</option>
                     <option value="Haryana">Haryana</option>
                     <option value="Himachal Pradesh">Himachal Pradesh</option>
                     <option value="Jammu and Kashmir">Jammu and Kashmir</option>
                     <option value="Jharkhand">Jharkhand</option>
                     <option value="Karnataka">Karnataka</option>
                     <option value="Kerala">Kerala</option>
                     <option value="Madhya Pradesh">Madhya Pradesh</option>
                     <option value="Maharashtra">Maharashtra</option>
                     <option value="Manipur">Manipur</option>
                     <option value="Meghalaya">Meghalaya</option>
                     <option value="Mizoram">Mizoram</option>
                     <option value="Nagaland">Nagaland</option>
                     <option value="Odisha">Odisha</option>
                     <option value="Punjab">Punjab</option>
                     <option value="Rajasthan">Rajasthan</option>
                     <option value="Sikkim">Sikkim</option>
                     <option value="Tamil Nadu">Tamil Nadu</option>
                     <option value="Telangana">Telangana</option>
                     <option value="Tripura">Tripura</option>
                     <option value="Uttar Pradesh">Uttar Pradesh</option>
                     <option value="Uttarakhand">Uttarakhand</option>
                     <option value="West Bengal">West Bengal</option>
                    </select>
           </div>
           <div className='inputBox'>
            <span>Country</span>
            <input type='text' value="India" readOnly></input>
           </div>
         </div>
         <div className='checkBoxContainer'>
           <span>select address type *</span>
           <div className='inputBoxContainer'>
            <div className='checkBox'>
              <input id='home' type='checkbox' checked={home} onChange={handleChange}></input>
              <span className='checkSpan'>Home</span>
            </div>
            <div className='checkBox'>
              <input id='work' type='checkbox' checked={work} onChange={handleChange}></input>
              <span className='checkSpan'>Work</span>
            </div>
          </div>
         </div>
       </form>

      <button className='addressContinueBtn' onClick={handleSubmit} disabled={(Object.keys(addressObj).length>=7)?(false):(true)}>Continue</button>
      <span className='errMsg'>{error}</span>
    </div>
      )
    
    
  )
}
