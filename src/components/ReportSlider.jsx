import React from 'react'

import {  onValue, ref } from 'firebase/database';
import { db } from '../googleSignIn/config';



class ReportSlider extends React.Component {
  constructor(){
    super();
    this.state={
      images:[],
      current:0,
      dateList:[],
      reportId:[],
    };
  }
  
  componentDidMount(){

    const imageRef = ref(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList/" + localStorage.getItem("currentPatientId") +"/report")
    let date = []
    let imageUrl = []
    let ids = []
    onValue(imageRef, (dateSnap)=>{
      dateSnap.forEach((dateChild)=>{
        // console.log(dateChild.key)
        
        const dataRef = ref(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList/" + localStorage.getItem("currentPatientId") +"/report/" + dateChild.key)
        onValue(dataRef, (valSanp)=>{
          valSanp.forEach((values)=>{
            // console.log(valSanp.val()[values.key])
            imageUrl.push(valSanp.val()[values.key])
            ids.push(values.key)
            date.push(dateChild.key)

          })
        })
      
      this.setState({
        images: imageUrl,
        dateList: date,
        reportId: ids
      })
      })
    })
  }
  
 

  render(){
    return (
      <div className='bg-white w-full p-10'>
        
                <h1 className='text-3xl font-medium text-gray-500'><span className='text-emerald-500'>L</span>ast <span className='text-emerald-500'>R</span>eports</h1>
          {
            this.state.images.length ==0 ? <div className='flex justify-center text-2xl text-gray-600 pb-10 mt-5 lg:mt-0'> No Report Found For This Patient</div> :
            <div className='grid lg:grid-cols-4 gap-2 pt-5 lg:p-10'>
           {
  
            this.state.reportId.map((item, index)=>{
              console.log(item)
              return(
                <div onClick={()=> window.open(this.state.images[index], '_blank', 'noopener,noreferrer')} className='bg-white border-gray-200 border-2 text-emerald-500 p-5 rounded-xl lg:text-xl shadow-lg active:scale-[.98] active:duration-75 hover:scale-[1.03] ease-in-out transition-all cursor-pointer'>
                  {item } / { this.state.dateList[index]}
                </div>
              )
            })
            }
          </div>

         
          }
          
          
      </div>
    )
  }

 
}

export default ReportSlider