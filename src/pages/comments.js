import { Button, FormLabel,Box, Input, Text,Stack, Heading, Flex, StackDivider, Divider } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";

const Comments=({id})=>{
    const [comments,setcomments]=useState(null)
    const [comm,changecomm]=useState("")
    useEffect(()=>{
        getcomments()
    },[])
    const getcomments=async()=>{
        try{
            const res=await fetch("https://mernblogtwo.onrender.com/getcomments", {
            method: "POST",
            body: JSON.stringify({
               id:id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            ,credentials:'include',
            });
            if(res.ok===true){
               setcomments(await res.json())
            }
            else{
            }
        }
        catch(e){
            
        }
    }
    const addcomments= async ()=>{
        if(comm.trim===""){
            alert("empty comment")
            return
        }
        try{
            const res=await  fetch("https://mernblogtwo.onrender.com/addcomments", {
                method: "POST",
                body: JSON.stringify({
                    comment:comm,
                    id:id
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
                ,credentials:'include',
                });
            if(res.ok){
                getcomments()
            }
            else{
                alert("Sign in first")
            }    
        }
        catch{
            alert('conection refused try again')
        }
    } 
    return(
        <Stack> 
            <Heading>Comments</Heading>
            <Stack> 
                {comments?comments.map((i)=>
                    <Single name={i.name} comment={i.comment} date={i.createdAt}/>
                ):<Text>LOADING</Text>}
            </Stack>
            <Stack>
                <FormLabel>Leave a reply</FormLabel>
                <Input  type='text' placeholder="Add your comments" onChange={(e)=>{changecomm(e.target.value)}}/>
                <Button onClick={()=>addcomments()}>Submit</Button>
            </Stack>
        </Stack>
    )
}
const Single=({name,comment,date})=>{
    return(
        <Box backgroundColor={'gray.100'}p={2}>
            <Flex Divider alignItems={'center'} gap={2}>
                <Text fontWeight={'medium'} >
                    {name}
                </Text>
                <Text fontSize={'xs'}>
                    {date.slice(0,10)}
                </Text>
            </Flex>
            
            <Flex alignItems={'center'} gap={2}>
                {comment}
            </Flex>
        </Box>
    )
}
export default Comments