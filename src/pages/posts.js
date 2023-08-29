import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Button, FormControl, FormErrorMessage, FormLabel, Input, Stack, useToast } from "@chakra-ui/react"
const Posts=()=>{
    const toast=useToast()
    const [err,changeerr]=useState(false)
    const [title,settitle]=useState("")
    const [content,setcontent]=useState(null)
    const [summary,setsummary]=useState("")
    const [file,setfile]=useState(null)
    const modules = {
        toolbar: [
            ["blockquote", "code-block"], ["bold", "italic", "underline"],
        ]
    }
    const validate=()=>{
        if(title==="" || summary==="" || content===null || file===null ){
            changeerr(true)
            return false
        }
        changeerr(false)
        return true
    }
   const createpost=async ()=>{
        if(!validate())return
        const form =new FormData()
        form.set('title',title);
        form.set('content',content);
        form.set('summary',summary);
        form.set('file',file[0])
        try{
            const res=await fetch("https://mernblogtwo.onrender.com/upload", {
            method: "POST",
            body: form,
            credentials:'include'
            });
            toast({
                title: 'Post Created Successfull.',
                description: "Welcome to Blogger.",
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        }
        catch(e){
            alert("connectionn refused")
        }
        
   }
    return ( 
            <FormControl  isInvalid={err} display={'flex'} justifyContent={'center'} gap={5}>
                <Stack justifyContent={'center'} maxWidth={'lg'}>
                <FormLabel>Title</FormLabel>
                <Input type='text' value={title} onChange={(e)=>{settitle(e.target.value)}}></Input>
                <FormLabel>Summary</FormLabel>
                <Input type='text' value={summary} onChange={(e)=>{setsummary(e.target.value)}}></Input>
                <FormLabel>Cover Image</FormLabel>
                <Input p={1} type="file"  onChange={(e)=>{setfile(e.target.files)}}></Input>
                <FormErrorMessage>Fill all fields</FormErrorMessage>
                <FormLabel>Write Blog</FormLabel>
                <Stack>
                <Button  onClick={()=>{createpost()}}> Create Post</Button>
                <ReactQuill  theme="snow" value={content} onChange={(data)=>{setcontent(data)}}></ReactQuill>
                </Stack>
                </Stack>
            </FormControl>

    )
}
export default Posts;