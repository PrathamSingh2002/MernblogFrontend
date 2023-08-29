import { Card, Flex, Stack ,Text,Image,Heading, Button, Grid, GridItem} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import icon from '../logo.svg'
const ManagePosts=()=>{
    const [posts,setposts]=useState(null)
    useEffect(()=>{
        getposts()
    },[])
    
    const getposts=async ()=>{
        try{
            const res=await fetch("https://mernblogtwo.onrender.com/myposts",{
                method:"GET",
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                },
                credentials:'include'       
            })
            if(res.ok){
                setposts(await res.json())
            }   
        }
        catch{
            alert("connection refused")
        }
    }
    return (
        <Grid gap={1} templateColumns={"repeat(6 ,1fr)"} > 
            {posts?posts.map((i)=><Entity info={i} get={getposts}/>):<Heading>loading</Heading>}
        </Grid>
    )
}
const Entity=(prop)=>{
    const deletepost=async (postid)=>{
        try{
            const res=await fetch("https://mernblogtwo.onrender.com/deletepost",{
                method:"POST",
                body:JSON.stringify({
                    id:postid
                }),
                headers: { 
                    "Content-type": "application/json; charset=UTF-8"
                }   
            })
            if(res.ok){
                prop.get()
            }
        }
        catch{
            alert("connection refused")
        }
    }
    return(

        <GridItem colSpan={{base:6,md:3,lg:2}}>
            <Card p={1} pl={5} pr={5} justifyContent={"space-between"} alignItems={'center'} direction={'row'}>
                <Flex direction={'column'} alignItems={'baseline'} gap={2}>
                    <Heading fontWeight={'light'}>{prop.info.title}</Heading>
                    <Image borderRadius={2} src={"https://mernblogtwo.onrender.com/uploads/"+prop.info.cover }></Image>
                    <Button colorScheme='red' onClick={()=>{deletepost(prop.info._id)}}>Delete</Button>
                </Flex>
                
            </Card>
        </GridItem>
    )
}
export default ManagePosts;