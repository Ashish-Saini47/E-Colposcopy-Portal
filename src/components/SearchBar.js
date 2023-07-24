import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass  } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
export default function SearchBar({navigatePage}){

    const navigate = useNavigate();
    const search=()=>{
        if(navigatePage == "searchPatient"){
            navigate('/patientSearch')
        }
        else{
            navigate('/referedPatientSearch')
        }
    }
    return(
        
            <div onClick = {search} className="p-2 m-2 lg:m-0 lg:p-3  mr-2 lg:mr-5 flex pl-5 gap-5 bg-white border-2 border-gray-300  rounded-xl lg:absolute right-0  top-16 lg:top-2">
            <FontAwesomeIcon  icon={faMagnifyingGlass}color="gray" size="xl"/>
            <p className="text-lg text-gray-400 pr-36 lg:pr-40">Search Patient</p>
            </div>
        
    );
}