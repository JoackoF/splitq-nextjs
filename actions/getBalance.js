"use server"

import prisma from "@/db/prisma";
import { authUser } from "@/lib/authUser";
import { revalidatePath } from "next/cache";

export async function getBalance() {
    try {
        const { id } = await authUser();
        const user = await prisma.users.findFirst({
            where: {
                id
            },
            select: {
                id: true,
                balance: true
            }
        })
        revalidatePath("/")
        return user
    } catch (error) {
        console.log(error)
        return NaN
    }
}