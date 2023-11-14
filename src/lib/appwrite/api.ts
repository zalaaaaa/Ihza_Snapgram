import { INewUser } from "@/types";
import {ID} from 'appwrite'
import { account, appwriteConfig, avatars, databases } from "./config";
import { error } from "console";

export async function createUserAccount(user:INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        )
        if (!newAccount) throw error;
        const avatarUrl = avatars.getInitials(user.name);
        const newUser = await saveUserToDB({
            accountId:newAccount.$id,
            name:newAccount.name,
            email:newAccount.email,
            username:user.username,
            imageUrl:avatarUrl,
        })
        return newAccount;
    } catch (error) {
        console.log(error);
        return error
        
    }
}

export async function saveUserToDB(user:{
    accountId: string,
    email:string,
    name:string,
    imageUrl:URL,
    username?:string,
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
    } catch (error) {
        console.log(error);
        
    }
    
}