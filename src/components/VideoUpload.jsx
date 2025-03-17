import React, { useState } from "react";
import videoLogo from "../assets/upload.png";
import { Button, Card, TextInput, Label, Textarea,Progress ,Alert } from "flowbite-react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';


const VideoUpload = () => {
  const [meta, setMeta] = useState({
    title: "",
    description: "",
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");

  const handleFileChange = (event) => {
    console.log(event.target.files[0].name);
    setSelectedFile(event.target.files[0])
   
  };

  const formFieldChange = (event) => {
    // console.log(event.target.name)
    // console.log(event.target.value)
    setMeta({
      ...meta,
      [event.target.name]: event.target.value,
    });
  };
  const handleForm = (formEvent) => {
    formEvent.preventDefault();

    // submit the file to server:
    if (!selectedFile) {
        alert("Select File");
        return;
      }
  
      saveVideoToServer(selectedFile, meta);
  };
const resetForm = () =>{
    setMeta({
        title :"",
        description :""
    })
    setSelectedFile(null)
    setUploading(false)
    
}
  const saveVideoToServer = async (video, videoMetaData) => {
    setUploading(true);

    //api call
    try {
      let formaData = new FormData();
      formaData.append("title", videoMetaData.title);
      formaData.append("description", videoMetaData.description);
      formaData.append("file", selectedFile);

      let response = await axios.post(
        `http://localhost:8080/api/v1/videos`,
        formaData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            console.log(`Upload Progress: ${percentCompleted}%`);
            console.log(percentCompleted);
            setProgress(percentCompleted)
    






          },
        }
      );
      console.log(response);
      setMessage("File Uploaded");
      setUploading(false)
      toast.success("File Uploaded")
      resetForm()
    } catch (error) {
      console.log("DEUG: Video Upload to server faied with error :", error);
      setMessage("Erro in Uploading file")
      setUploading(false)
      toast.error("Failed to Upload")
    }
  };

  return (
    <div className="text-white">
      <Card className="flex flex-col items-center">
        <h1>Upload Video</h1>

        <div>
          <form noValidate onSubmit={handleForm} className="space-y-5">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="file-upload" value=" video title" />
              </div>
              <TextInput
                onChange={formFieldChange}
                value={meta.title}
                name="title"
                id="file-upload"
                placeholder="Enter title"
              />
            </div>

            {/* Text Area fort Description */}
            <div className="max-w-md">
              <div className="mb-2 block">
                <Label htmlFor="comment" value="Video Description" />
              </div>
              <Textarea
                onChange={formFieldChange}
                value={meta.description}
                name="description"
                id="comment"
                placeholder="Write video description"
                required
                rows={4}
              />
            </div>

            <div className="flex items-center space-x-5 justify-center">
              <div class="shrink-0">
                <img
                  class="h-16 w-16 object-cover"
                  src={videoLogo}
                  alt="Current profile photo"
                />
              </div>
              <label class="block">
                <span class="sr-only">Choose profile photo</span>
                <input
               
                  name="file"
                  onChange={handleFileChange}
                  type="file"
                  className="block w-full text-sm text-slate-500
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-violet-50 file:text-violet-700
      hover:file:bg-violet-100
    "
                />
              </label>
            </div>
            <div>
            <Progress
             hidden ={!uploading}
      progress={progress}
     color= {progress<25?"teal" :progress>50?"green":"lime"}
      progressLabelPosition="inside"
      textLabel=""
      textLabelPosition="inside"
      size="lg"
      labelProgress
      labelText
    />
  


            </div>
            {
        message &&
        <div>

<Alert hidden ={uploading} color="success">
    
      <span className="font-medium">Success ! </span>
      {message}
    </Alert>
</div>
    }



            <div className="flex justify-center">
              <Button disabled ={uploading} type="submit">Submit</Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default VideoUpload;
