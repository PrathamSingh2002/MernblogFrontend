import React ,{useState}from "react"
import {Heading, Box, Button, FormControl, FormLabel, Input, Divider, Container,useToast, FormErrorMessage} from "@chakra-ui/react"
import { Link ,useNavigate} from "react-router-dom"
const Signup=()=>{
    const[iserror,changeerror]=useState(false)
    const[errmessage,changeerrormessage]=useState()
    const nav=useNavigate()
    const [name,changename]=useState("")
    const [pass,setpass]=useState("")
    const [cpass,csetpass]=useState("")
    const [email,changeemail]=useState("")
    const toast=useToast() 
    const login=async ()=>{
        try{
            const res=await fetch("https://mernblogtwo.onrender.com/login", {
            method: "POST",
            body: JSON.stringify({
                email: email,
                password: pass
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            ,credentials:'include',
            });
            if(res.ok===true){
                nav('/')
            }
            else{
                changeerror(true)
                changeerrormessage('Invalid credential')
            }
        }
        catch(e){
            
        }
    }
    const validate=()=>{
        if(name==="" || email==="" || cpass ===""|| pass ===""){
            changeerror(true)
            changeerrormessage("Fill all fields")
            return false
        }
        else if(pass.length<8){
            changeerror(true)
            changeerrormessage("Password must be of 8 characters minimum")
            return false
        }
        else if(pass!=cpass){
            changeerror(true)
            changeerrormessage("Password not macthing")
            return false
        }
        else{
            changeerror(false)
            return true
        }
    }    
    const signup=async ()=>{
        if(!validate()){
            return
        }
        try{
            const res=await fetch("https://mernblogtwo.onrender.com/signup", {
            method: "POST",
            body: JSON.stringify({
                name:name,
                email: email,
                password: pass
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
            });
            if(res.ok===true){
                toast({
                    title: 'Login Successfull.',
                    description: "Welcome to Blogger.",
                    status: 'success',
                    duration: 9000,
                    isClosable: true,
                })
                login()
            }
            else{
                changeerror(true)
                changeerrormessage("Email already Used")
            }
        }
        catch(e){
            alert("unusual error")
        }
    }
    return (
        <Container  border={"1px"}  padding={5} borderColor={'gray.300'} borderRadius={10}>
            <FormControl isRequired isInvalid={iserror} gap={5} display={'flex'} flexDir={'column'}>
                <Heading>Sign up</Heading>    
                <Box>
                    <FormLabel >Name</FormLabel>
                    <Input error variant={'outline'} isRequired={true} type='email' onChange={(e)=>{
                        changename(e.target.value)
                    }}/>
                    
                </Box>
                <Box>
                    <FormLabel >Email</FormLabel>
                    <Input variant='outline' isRequired={true} type='email' onChange={(e)=>{
                        changeemail(e.target.value)
                    }}/>
                    
                </Box>
                <Box>
                    <FormLabel>Password</FormLabel>
                    <Input variant={'outline'}  isRequired type='password' 
                    onChange={(e)=>{
                        setpass(e.target.value)
                    }}/>
                    
                </Box>
                <Box>
                    <FormLabel>Confirm Password</FormLabel>
                    <Input variant={'outline'}  isRequired type='password' 
                    onChange={(e)=>{
                        csetpass(e.target.value)
                    }}/>
                    
                    <FormErrorMessage>{errmessage}</FormErrorMessage>    
                </Box>

                <Button onClick={signup}>Sign up</Button>
            </FormControl>
        </Container>
    )    
}
export default Signup;