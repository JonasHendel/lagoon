import { useContext } from 'react'
import { useState } from 'react'
import { DataContext } from '../store/GlobalState'

export default function Home() {
  const [title, setTitle] = useState()
  const {state, dispatch} = useContext(DataContext) 
  
  const handleClick = () => {
    dispatch({type: 'ADD_TITLE', payload: title})
  }

  return (
   <div className="min-h-screen">
     <input value={title} onChange={(e)=>{setTitle(e.target.value)}} />
     <button onClick={handleClick}>Test</button>
   </div>
  )
}
