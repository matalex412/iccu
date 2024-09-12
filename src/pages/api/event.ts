import type { APIRoute } from "astro"
import { getFirestore } from "firebase-admin/firestore"

import { app } from "../../firebase/server"

const db = getFirestore(app)

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const name = data.get("name")
  const start = data.get("start")?.toString()
  const end = data.get("end")?.toString()
  const location = data.get("location")?.toString()
  const description = data.get("description")?.toString()
  const repeats = Math.max(parseInt(data.get("repeat")?.toString() ?? ""), 1)

  if (!name || !start || !end || !repeats) {
    return new Response(JSON.stringify({ message: "Please fill out all fields" }), { status: 400 })
  }

  try {
    for (let i = 0; i < repeats; i++) {
      const startDate = new Date(start)
      const endDate = new Date(end)
      startDate.setDate(startDate.getDate() + i * 7)
      endDate.setDate(endDate.getDate() + i * 7)
      await db.collection("events").add({
        title: name,
        start: startDate,
        end: endDate,
        location,
        description,
      })
    }
  } catch {
    return new Response(
      JSON.stringify({ message: "A database error occurred. Please try again later" }),
      { status: 500 }
    )
  }

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  )
}
