"use server"
import prisma from "@/db/prisma"
import prismaDev from "@/db/prismaDev"
import { revalidatePath } from "next/cache"

export default async function modifyQuantityProduct(param, id, previusQuantity) {
    if (param == "add") {
        const quantity = await prismaDev.cartUserProducts.update({
            where: {
                id
            },
            data:{
                quantity:{increment: 1}
            }
        }
        )
    }
    if (param == "minus") {
        if(previusQuantity - 1 <= 0){
            const quantity = await prismaDev.cartUserProducts.delete({
                where: {id}
            })
            revalidatePath('/')
            return
        } 
        const quantity = await prismaDev.cartUserProducts.update({
            where: {
                id
            },
            data:{
                quantity:{decrement: 1}
            }
        }
        )
    }
    revalidatePath('/')
}