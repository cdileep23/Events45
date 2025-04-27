"use user"

import prisma from "@/lib/prisma"
import { auth, currentUser } from "@clerk/nextjs/server";


export async function syncUser(){
    try {
        const{userId}=await auth()
        const user=await currentUser();
        if(!user||!userId){
            return
        }
        const existingUser=await  prisma.user.findUnique({
            where:{
                clerkId:userId
            }
        })
        if(existingUser){
            return existingUser
        }
        console.log("User doestnt exists")

  const dbUser=await prisma.user.create({
    data:{
        clerkId:userId,
        firstName:user.firstName,
        lastName:user.lastName,
        username:user.username??user.emailAddresses[0].emailAddress.split("@")[0],
email:user.emailAddresses[0].emailAddress,
image:user.imageUrl,
    }
  })
  console.log("User Created Successfully")
  return dbUser

    } catch (error) {
        console.log("Error in SyncUser", error);
    }
}
export async function getDbUserId(){
    const{userId:clerkId}= await auth()
    if(!clerkId) return null
  
      const user=await getUserByClerkId(clerkId)
      if(!user) throw new Error("User not Found")
        return user.id
  }
  export async function getUserByClerkId(clerkId: string) {
    const userData = await prisma.user.findUnique({
     where:{
        clerkId
     }
   
    });
    return userData
  }