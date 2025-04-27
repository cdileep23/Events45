"use server"

import { getDbUserId } from "./user.action"

export async function createEvent(title:String,description:string,thumbnail:string,isFree:boolean,price:string,startDateTime:string, endDateTime:string,location:string,category:string,url:string){
    try {
        const userId=getDbUserId();
        
        
    } catch (error) {
        
    }
}