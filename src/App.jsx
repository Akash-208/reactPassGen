import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [charallowd, setcharallowd] = useState(false)
  const [numallowed, setnumallowed] = useState(false)
  const [password,setpassword] = useState("")

// Call back hook 
  let genertepass = useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz"
    if(charallowd) str+="!@#$%^&*()_+|"
    if(numallowed) str+="1234567890"

    for(let i=1; i<=length; i++){
      let charindex = Math.floor(Math.random()*str.length + 1)
      pass+=str.charAt(charindex)
    }
    setpassword(pass)
  },[length,numallowed,charallowd,setpassword])

// Function for copy
let copyToClipboard = useCallback(()=>{
  passowrdref.current?.select()
  window.navigator.clipboard.writeText(password)
},[password])

  //use refhook
  const passowrdref = useRef(null)


  // use effect hook
  useEffect(() => {
    genertepass()
  }, [length, numallowed, charallowd,genertepass])

  return (
      <>
        <div className='w-[100vw] max-w-md bg-black p-4 border border-green-500 rounded-2xl'>
          <h2 className='text-2xl my-3 text-white font-serif'>Password generator</h2>
          <div className='flex overflow-hidden justify-center gap-x-1 mt-10'>
            <input className='text-lg px-2 rounded-xl outline-none text-red-500 w-52 bg-white' 
            type="text"
            value={password}
            placeholder='password'
            readOnly
            ref={passowrdref}
            />
            <button onClick={copyToClipboard} className='bg-blue-600 text-black rounded-xl hover:bg-blue-400 hover:text-white flex justify-center items-center'>copy</button>
          </div>
          <div className=' gap-x-5 justify-center flex mt-5'>
            {/* range button */}
              <div className='text-orange-500'>
                <input type="range" max={16} min={8} value={length} onChange={(e)=>{setlength(e.target.value)}} className='cursor-pointer'/> <label >length:{length}</label>
              </div>
              {/* checkbox */}
              <div className='text-orange-500'>
                <input type="checkbox" defaultChecked={charallowd} onChange={()=>{setcharallowd((prev)=>!prev)}} className='cursor-pointer'/> <label>SChar</label>
              </div>

              {/* checkbox */}
              <div className='text-orange-500'>
                <input type="checkbox" defaultChecked={numallowed} onChange={()=>{setnumallowed((prev)=>!prev)}} className='cursor-pointer'/> <label>Num</label>
              </div>
          </div>
        </div>
      </>
  )
}

export default App

