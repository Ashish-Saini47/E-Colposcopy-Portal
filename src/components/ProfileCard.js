export default function PatientProfile(){
    return(
        <div className="bg-gray-100 p-5 ">
            {/* patients persnol info */}
            <div className="flex flex-col flex-col-reverse lg:flex-row bg-white w-full h-1/2 rounded-xl gap-2 border-2 border-gray-300">
                <div className="flex flex-col justify-center p-5 pl-8 lg:w-1/2 ">
                    <div className="flex gap-2">
                        <p className="text-lg lg:text-xl text-emerald-500 w-1/2 lg:w-1/3">Name :</p>
                        <p className="text-lg lg:text-xl text-gray-600">{localStorage.getItem("patientName")}</p>
                    </div>

                    <div className="flex gap-2">
                        <p className="text-lg lg:text-xl text-emerald-500 w-1/2 lg:w-1/3">Date Of Birth :</p>
                        <p className="text-lg lg:text-xl text-gray-600">{localStorage.getItem("patientDob")}</p>
                    </div>

                    <div className="flex gap-2">
                        <p className="text-lg lg:text-xl text-emerald-500 w-1/2 lg:w-1/3">Gender :</p>
                        <p className="text-lg lg:text-xl text-gray-600">Female</p>
                    </div>

                    <div className="flex gap-2">
                        <p className="text-lg lg:text-xl text-emerald-500 w-1/2 lg:w-1/3">Blood Group :</p>
                        <p className="text-lg lg:text-xl text-gray-600">{localStorage.getItem("patientBloodGroup")}</p>
                    </div>

                    <div className="flex gap-2">
                        <p className="text-lg lg:text-xl text-emerald-500 w-1/2 lg:w-1/3">Contact No. :</p>
                        <p className="text-lg lg:text-xl text-gray-600">{localStorage.getItem("patientContact")}</p>
                    </div>

                    <div className="flex gap-2">
                        <p className="text-lg lg:text-xl text-emerald-500 w-1/2 lg:w-1/3">Address :</p>
                        <p className="text-lg lg:text-xl text-gray-600">{localStorage.getItem("patientAddress")}</p>
                    </div>

                   

                </div>
                <div className="lg:w-1/2 p-5 flex justify-center">
                <img className="rounded-full border border-gray-100 shadow-sm w-1/2" src={localStorage.getItem("patientImageUrl")} alt="Patient Image" width="500" height="500" />
                </div>
            </div>
            <div className="w-full bg-white mt-4 rounded-xl">
               
            </div>
            </div>
    );

}