import type { APIRoute } from "astro"
import { randomBytes } from "crypto"
import { getFirestore } from "firebase-admin/firestore"
import { getStorage } from "firebase-admin/storage"

import { app } from "../../firebase/server"

const storage = getStorage(app)
const bucket = storage.bucket("gs://iccu-bcca7.appspot.com")
const db = getFirestore(app)
const profileRef = db.collection("profiles")

const MAX_FILE_SIZE = 1024 * 1024 * 5 // 5MB

const allowedImageTypes = ["image/png", "image/jpeg", "image/gif", "image/svg+xml"]

const getFileExtension = (file: File) => file.type.split("/")[1].split("+")[0]

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData()
  const name = data.get("name")
  const role = data.get("role")
  const yearCourse = data.get("yearCourse")
  const verse = data.get("verse")
  const bio = data.get("bio")
  const profilePicture = data.get("profilePicture")

  if (!name || !role || !verse || !bio || !profilePicture) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields. Every field is required except year/course.",
      }),
      { status: 400 }
    )
  }

  let pictureURL
  let filePath

  if (!(profilePicture instanceof File) || !allowedImageTypes.includes(profilePicture.type)) {
    return new Response(
      JSON.stringify({
        message: "Invalid file type",
      }),
      { status: 400 }
    )
  }

  if (profilePicture.size > MAX_FILE_SIZE) {
    return new Response(
      JSON.stringify({
        message: "File too large",
      }),
      { status: 400 }
    )
  }

  try {
    const randomString = randomBytes(8).toString("hex")
    const fileExtension = getFileExtension(profilePicture)
    filePath = `profilePictures/${randomString}.${fileExtension}`

    const file = bucket.file(filePath)
    const buffer = await (profilePicture as File).arrayBuffer()
    const bf = Buffer.from(buffer)
    await file.save(bf)
    await file.makePublic()
    pictureURL = file.publicUrl()
  } catch {
    return new Response(
      JSON.stringify({
        message: "Error uploading profile picture",
      }),
      { status: 500 }
    )
  }

  try {
    await profileRef.add({
      name,
      role,
      yearCourse,
      verse,
      bio,
      profilePicture: pictureURL,
      pictureStoragePath: filePath,
    })
  } catch {
    return new Response(
      JSON.stringify({
        message: "Error saving profile",
      }),
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
