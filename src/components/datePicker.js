import { Calendar } from "react-date-range";
import { useEffect, useRef, useState } from "react";
import format from "date-fns/format";

import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'

const DatePickerComp = ()=>{
    const [calender, setCalendar] = useState(format(new Date(), "dd/MM/yyyy"));
    const [calenderDate, setDate]=useState(new Date())
    const [open, setOpen] = useState(false)
    const refClick = useRef(null)

    const handleSelect = (date) =>{
         console.log(format(date, "dd/MM/yyyy"))
         localStorage.setItem("dob", format(date, "dd/MM/yyyy"))
         localStorage.setItem("dateSelected", date)
         setCalendar(format(date, "dd/MM/yyyy"))
         setDate(date)
         setOpen(false)
    }


    const hideOnClickOutSide = (e)=>{
        console.log(refClick.current)
        console.log(e.target)
        if(refClick.current && ! refClick.current.contains(e.target)){
            setOpen(false)
        }
    }

    useEffect(()=>{
        setCalendar(format(new Date(), "dd/MM/yyyy"))
        localStorage.setItem("dateSelected", new Date())
        localStorage.setItem("dob", format(new Date(), "dd/MM/yyyy"))
        document.addEventListener("click", hideOnClickOutSide, true)
    },[])

    return(
        <div className=" relative ">
            <input
            value={calender}
            readOnly
            onClick={()=>setOpen(open => !open)}
            className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent cursor-pointer'
            />
            <div ref={refClick}>

                {open &&
                <Calendar
                date={ calenderDate}
                onChange={handleSelect}
                maxDate={new Date()}
                className="absolute left-1/4 top-10 border-2 border-gray-100 z-10 rounded-xl"
                />
                }
            </div>
        </div>
    );
}
export default DatePickerComp