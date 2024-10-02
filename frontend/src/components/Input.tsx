

import { useState } from "react";
import axios from "axios";
import { useAuthStore } from "../store/authUser";

export default function Input ()  {


const [value,setValue]=useState<string>("")
// Authenticated user from Zustand store
  const { user } = useAuthStore();
function handleChange(e:React.ChangeEvent<HTMLInputElement>){

  setValue(e.target.value)
}

async function addProject(){


try {
  const userId=user._id
  if(!userId){
    console.log("cant add as no userId")
  }
  const project={name:value}
const resp=await axios.post("http://localhost:5000/api/v1/search/add",{userId,project},{withCredentials:true})
console.log(resp)
} catch (error) {
  console.log(error)
}



}

    return (

      <>
       <input
        type="text"
        value={value}
        onChange={(e) => handleChange(e)}
        className="border p-2 bg-slate-500"
      />

      <button onClick={addProject}>Add project</button>
      </>
     



    );
  };
