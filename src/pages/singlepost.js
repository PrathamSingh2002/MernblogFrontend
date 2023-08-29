import {Image, Flex, Heading, Stack,Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import Comments from "./comments";
const SinglePost=(prop)=>{
    const {id}=useParams()
    const [info,setinfo]=useState(null)
    useEffect(()=>{
        getpost()
    },[])
    const getpost=async ( )=>{
        try{
            const res=await fetch(`https://mernblogtwo.onrender.com/posts/${id}`)
            setinfo(await res.json())
        }    
        catch(e){

        }        
    }
    
    return(
        <Flex justifyContent={'center'} width={'100%'} pl={7} pr={7}>
            {

                info?<Stack gap={10}>  
                    <Heading fontSize={'6xl'} >{info.title}</Heading>
                    <Image borderRadius={10} src={`https://mernblogtwo.onrender.com/uploads/${info.cover}` }/>
                    <Stack direction={'row'}>
                        <Text fontStyle={'italic'}>{`Created by`}</Text>
                        <Text  fontWeight={'bold'} >{`${info.author}`}</Text>    
                    </Stack>
                    <Text fontWeight={'semibold'}>{(info.createdAt).slice(0,10)}</Text>
                    <Text fontSize={'2xl'} dangerouslySetInnerHTML={{__html:info.content}}></Text>
                    <Comments id={id}/>
                </Stack>:<Heading>Loading</Heading> 
            }
        </Flex>
    )
}
export default SinglePost;