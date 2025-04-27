
import * as z from "zod";
export const formSchema = z.object({
    title:z.string().min(4,{
        message:"Title must be At least 3 Characters"
    }),
    description:z.string().min(30,{
        message:"Description must be At least 3 Characters"
    }).max(400,{message:"Description must less than 400 charcters"})
    ,
    location:z.string().min(3,{
        message:"location must be At least 3 Characters"
    }).max(200,{message:"Location must less than 400 charcters"}),
    thumbnail:z.string(),
    startDateTime:z.date(),
    endDateTime:z.date(),
    category:z.string(),
    price:z.string(),
    isFree:z.boolean(),
    url:z.string().url(),
    solts:z.string().min(2,{message:"Minimum 2 slots should be added"}).max(100,{message:"Maximum !00 Slots"})
});