import React, { useEffect, useState } from "react";
import { Button, Card, Grid,Container, Heading,Text,Image, Img, CardBody, Flex,SimpleGrid, GridItem, Stack } from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router";
import { UserContext } from "../context";
import { useContext } from "react";
const Home=()=>{
    const nav=useNavigate()
    const {page} =useParams()
    const {user,changeuser}=useContext(UserContext)
    const [posts,setposts]=useState(null)
    const [totalposts,settotalposts]=useState([]);
    const gettotalposts=async ()=>{
        try{
            const res= await fetch('https://mernblogtwo.onrender.com/totalposts')
            const size=await res.json()
            const arr=[]
            for(let i=0;i<Math.ceil((await size+1)/6);i++){
                arr.push(i)
            }
            settotalposts(arr)
            
        }
        catch{
        }
    }
    const getposts=async ()=>{
        try{
            const res=await fetch(`https://mernblogtwo.onrender.com/getposts/${page}`)
            const data=await res.json()
            setposts(data)
        }    
        catch(e){
            
        }
    }
    
    useEffect(()=>{
        getposts()
        gettotalposts()
    },[page])
    return(
            posts?<Grid gap={10} templateColumns={'repeat(6,1fr)'}>
            <GridItem colSpan={'6'}>
                <Flex direction={'row'} gap={5} justifyContent={'center'} alignItems={'baseline'}>
                {/* <Heading>Welcome</Heading>
                <Text fontSize={'2xl'}>{user?user.name:'Guest'}</Text> */}
                </Flex>
            </GridItem>    
            {
                posts.map((i)=><GridItem colSpan={{base:6,md:3,lg:2}} ><Postcard info={i} /></GridItem>)
            }
            <GridItem colSpan={'6'} gap={1}>
                {totalposts.map(i=><Button onClick={()=>{nav(`/${i+1}`)}}>{i+1}</Button>)}
            </GridItem>
            </Grid>:<Heading>loading</Heading>
    )
}
const Postcard=(prop)=>{
    const nav=useNavigate()
    const gotopage=(id)=>{
        nav('/posts/'+`${(id)}`)
    }
    return(
        <Card overflowY={'clip'}  gap={3} padding={3} one onClick={()=>{
            gotopage(prop.info._id)
        }}> 
                <Image borderRadius={5} src={"https://mernblogtwo.onrender.com/uploads/"+prop.info.cover }/>
                <Heading fontSize={'2xl'}>{prop.info.title}</Heading>
                <Text fontWeight={'semibold'}>{(prop.info.createdAt).slice(0,10)}</Text>
                <Stack direction={'row'}>
                    <Text fontStyle={'italic'}>{`Created by`}</Text>
                    <Text fontWeight={'bold'} >{`${prop.info.author}`}</Text>    
                </Stack>
                <Text >{prop.info.summary}</Text>
                <Button variant={'ghost'} fontSize={'2xl'} fontFamily={'sans-serif'} color={'yellow.600'} >Learn More</Button>
            </Card>
        
    )
}
export default Home;