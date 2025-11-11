"use server"

import { revalidatePath } from "next/cache"
import { deleteDayMarkById } from "@/app/services/dayMarks.services"

export const deleteDayActionForm = async (formData: FormData) => {
    const dayMarkId = formData.get("day-mark-id")?.toString() || ''

    await deleteDayMarkById(dayMarkId)

    revalidatePath("/home")
}