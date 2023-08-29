import { Box, Button, Container, Divider, FormControl, FormErrorMessage, FormLabel, Heading, Input } from "@chakra-ui/react"
import React, { useContext, useState } from "react"
import { Link, Navigate ,useNavigate} from "react-router-dom"
import { useToast } from "@chakra-ui/react"
import { UserContext } from "../context"
const Login=()=>{
    const{user,changeuser}=useContext(UserContext)
    const nav=useNavigate()
    const [pass,setpass]=useState("")
    const [email,changeemail]=useState("")
    const[iserror,changeerror]=useState(false)
    const[errmessage,changeerrormessage]=useState()
    const home=()=>{
        nav('/1')
    }
    const toast=useToast() 
    const validate=()=>{
        if(pass==="" || email===""){
            changeerror(true)
            changeerrormessage("Fill all fields")
            return false
        }
        else{
            changeerror(false)
            return true
        }
    }
    const login=async ()=>{
        if(!validate())return 
        try{
            const res=await fetch("https://mernblogtwo.onrender.com/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: pass
            }),
            headers: {
                "Content-type": "application/json"
            }
            ,credentials:'include',
            });
            if(res.ok===true){
                changeuser(await res.json()) 
                nav('/1')
                toast({
                    title: 'Login Successfull.',
                    description: "Welcome to Blogger.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
            }
            else{
                changeerror(true)
                changeerrormessage('Invalid credential')
            }
        }
        catch(e){
            changeerror(true)
            changeerrormessage('Unable to connect  credential')
        }
    }
    return (
            
            <Container border={"1px"}  padding={5} borderColor={'gray.300'} borderRadius={10}>
                <FormControl  isInvalid={iserror} isRequired gap={5} display={'flex'} flexDir={'column'}>
                    <Heading >Login</Heading>
                    <Box>
                        <FormLabel >Email</FormLabel>
                        <Input isInvalid={iserror}  variant='flushed' isRequired={true} type='email' onChange={(e)=>{
                            changeemail(e.target.value)
                        }}/>
                    </Box>
                    <Box>

                    <FormLabel  >Password Required</FormLabel>
                    <Input variant={'flushed'}  isRequired type='password' 
                    onChange={(e)=>{
                        setpass(e.target.value)
                    }}/>
                    <FormErrorMessage  >{errmessage}</FormErrorMessage>
                    </Box>
                    <Button onClick={login}>Login</Button>
                </FormControl>
            </Container>
    )
}
export default Login;