// import React from 'react'
// import { useState } from "react"
// import SignupPage from "./SignUpPage.tsx";
import LoginPage from "./LoginPage.tsx";
export default function HomePage() {

// const [name,setName]=useState<string>("here");
// const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//     if (!isDarkMode) {
//       document.documentElement.classList.add('dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//     }
//   };

  return (
  
    <>
    
    {/* <h1>Input Component Example</h1>
     <Input 
       value={name} 
       onChange={setName} // This updates the state when the input changes
     />
     
     <p>Current Input Value: {name}</p> */}
    
    {/* <div className="bg-blue-500 text-white p-4">
     <h1 className="text-3xl font-bold">Hello, Tailwind with TypeScript!</h1>
    
     <button
       onClick={toggleDarkMode}
       className="p-2 text-sm text-white bg-blue-600 dark:bg-blue-800 rounded"
     >
       Toggle Dark Mode
     </button>
    </div> */}
    
    <h1>This is home page</h1>
    <LoginPage/>
    </>
    
  
  )
}
