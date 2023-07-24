import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
export default function EnlargeImage({ visible, closeImage }){
    if (!visible) return null;

    return (
      <div className='fixed inset-0 bg-black bg-opacity-90 backdrop-blur-sm flex justify-center items-center z-10 '>
         
          <FontAwesomeIcon onClick={closeImage} className='fixed top-2 right-2' icon={faWindowClose} size="3x" color="white"></FontAwesomeIcon>
        
        <img className="w-1/2" src={localStorage.getItem("openedImage")} alt='patientImage'></img>
        
      </div>
    )
}