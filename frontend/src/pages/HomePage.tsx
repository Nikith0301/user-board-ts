
// import { useState } from "react"
import { useAuthStore } from "../store/authUser";
import DataPage from "./DataPage.tsx";
import LoginPage from "./LoginPage.tsx";
export default function HomePage() {

  const { user } = useAuthStore();

  return (
  
    <>
    

    
   {user ? <DataPage/>: <LoginPage/> }
   
    </>
    
  
  )
}
