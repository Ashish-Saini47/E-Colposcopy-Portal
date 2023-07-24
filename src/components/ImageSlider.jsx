import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft , faChevronRight} from "@fortawesome/free-solid-svg-icons";
import SlideImage from './SlideImage';
import {  onValue, ref } from 'firebase/database';
import { db } from '../googleSignIn/config';
import { useRef } from 'react';


class ImageSlider extends React.Component {
  constructor(){
    super();
    this.state={
      images:[],
      current:0,
      dateList:[],
      width : window.innerWidth,
      height : window.innerHeight
    };
    this.prev = this.prev.bind(this);
    this.next = this.next.bind(this);
  }
  
  componentDidMount(){
    console.log("screensize"+this.state.width)
    const imageRef = ref(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList/" + localStorage.getItem("currentPatientId") +"/Images")
    let date = []
    let imageUrl = []
    onValue(imageRef, (dateSnap)=>{
      dateSnap.forEach((dateChild)=>{
        date.push(dateChild.key)
        const dataRef = ref(db, "DoctorsList/"+localStorage.getItem("currentUserId")+"/PatientList/" + localStorage.getItem("currentPatientId") +"/Images/" + dateChild.key)
        onValue(dataRef, (valSanp)=>{
          valSanp.forEach((values)=>{
            imageUrl.push(valSanp.val()[values.key])
          })
        })
      
      this.setState({
        images: imageUrl,
        dateList: date
      })
      })
    })
  }
  
  prev (){
    if(this.state.current == 0){
      this.setState({
        current: this.state.images.length - 1
      })
    }
    else{
      this.setState({
        current: this.state.current-1
      })
      
    }
  }
  next(){
    if(this.state.current == this.state.images.length - 1){
      this.setState({
        current:0
      })
      
    }
    else{
      this.setState({
        current: this.state.current + 1
      })
      
    }
  }

  render(){
    return (
      <div className='bg-white w-full p-5 lg:p-10'>
          <h1 className='text-3xl font-medium lg:p-4 pb-4 lg:pb-0 text-gray-500'><span className='text-emerald-500'>L</span>ast <span className='text-emerald-500'>I</span>mage</h1>
          {
            this.state.images.length ==0 ? <div className='flex justify-center text-2xl text-gray-600 pb-10'> No Image Found For This Patient</div> :
            <div className='w-full flex gap-3 justify-center items-center lg:pl-14 lg:pr-14 lg:pt-10'>
              {this.state.images.length >3 ? <FontAwesomeIcon onClick={this.prev} className='active:scale-[.95] active:duration-75 hover:scale-[1.30] ease-in-out transition-all cursor-pointer' icon={faChevronLeft} size="2x" color="gray"></FontAwesomeIcon>:<></>}
          <div className='flex overflow-hidden' >
           <div className='flex gap-2 transition-transform ease-out duration-500' style={{transform :`translateX(-${this.state.current * (this.state.width <400 ? 103 : 33.95)}%)`}}>
           {
  
            this.state.images.reverse().map((item, index)=>{
              
              return(
                  <SlideImage showImage={this.props.showImage} imageUrl={item}/> 
              )
            })
            }
           </div>
           
          </div>
          {this.state.images.length >3 ? <FontAwesomeIcon onClick={this.next} className='active:scale-[.95] active:duration-75 hover:scale-[1.30] ease-in-out transition-all cursor-pointer' icon={faChevronRight} size="2x" color="gray" ></FontAwesomeIcon>:<></>}
          </div>
          }
          
          
      </div>
    )
  }

 
}

export default ImageSlider