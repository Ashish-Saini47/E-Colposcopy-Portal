
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft , faChevronRight  } from "@fortawesome/free-solid-svg-icons";
import ImageCard from "./ImageCard";
export default function ReportCarusal(){
    return(
        <div className='flex gap-3 justify-center items-center p-5'>
            <div>
                <FontAwesomeIcon icon={faChevronLeft} size="2x" color="gray"></FontAwesomeIcon>
            </div>
            
              <div className='flex w-3/4 gap-5'>
              <ImageCard/>
              <ImageCard/>
              <ImageCard/>
              </div>
           
            <div>
                <FontAwesomeIcon icon={faChevronRight} size="2x" color="gray"></FontAwesomeIcon>
            </div>
        </div> 
    )
}