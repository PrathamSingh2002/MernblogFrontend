import React, { createContext, useState } from "react";
export const UserContext=createContext();
export function UserContextProvider({children}){
    const [user,changeuser]=useState(null)
    return (
        <UserContext.Provider value={{user,changeuser}}>
            {children}
        </UserContext.Provider>
    )
}