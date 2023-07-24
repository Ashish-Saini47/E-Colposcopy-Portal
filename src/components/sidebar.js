import { useNavigate } from "react-router-dom"
import ceeri_logo from "../static/ceeri_logo.png"
import divine_logo from "../static/divine logo A.png"

export default function Sidebar(){

    const navigate = useNavigate();

    const Logout=()=>{
        localStorage.clear()
        // window.location.reload()
        navigate('/login')

    }

    const Patients=()=>{
        navigate('/patients')
    }


    const Home=()=>{
        navigate('/home')
    }

    const ReferedPatientsPage=()=>{
        navigate('/referedpatients')
    }

    
    return(
      <div>
          {/* <img className="w-1/12 h-1/12 m-2 fixed top-0" src={ceeri_logo} alt="Ceeri Logo"  /> */}
        <div className="flex px-5 flex-col h-screen gap-3 text-left justify-center font-semibold text-xl text-white bg-emerald-500">
            <p onClick = {Home} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Home</p>
            <p onClick = {Patients} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Patients</p>
            <p onClick = {ReferedPatientsPage} className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Refered Patients</p>
            <p onClick={Logout}className=" active:scale-[.98] active:duration-75 hover:scale-[1.01] ease-in-out transition-all cursor-pointer">Logout</p>
        </div>
        {/* <img className="w-1/6 fixed bottom-0 " src={divine_logo}  alt="Ceeri Logo"  /> */}
      </div>
    )
}