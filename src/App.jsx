import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import VideoUpload from './components/VideoUpload'
import  { Toaster } from 'react-hot-toast';

function App() {
  const [count, setCount] = useState(0)
  const [videoId,setVideoId]= useState("f5bc32b3-9412-40f1-8cdb-6dfd2ff6edbc")

  return (
 <>
    <Toaster/>
    <div className='mt-10  flex justify-center'>
    <h1 className="text-5xl font-extrabold text-gray-800 dark:text-gray-100 ">Welcome to video Streaming App</h1>

    </div>

    <div className='flex  justify-around mt-10 '>

    <div>

<video src={`http://localhost:8080/api/v1/videos/stream/${videoId}`} controls></video>
</div>
    <div className='flex flex-col items-center space-y-5 justify-center py-9'>
 
  <VideoUpload/>
 </div>

    </div>

 </>
  )
}

export default App
