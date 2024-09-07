import type { APIRoute } from "astro";

import { app } from "../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const storage = getStorage(app);
const bucket = storage.bucket("gs://iccu-bcca7.appspot.com");
const db = getFirestore(app);
const profileRef = db.collection("profiles");


export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const role = data.get("role");
  const yearCourse = data.get("yearCourse");
  const verse = data.get("verse");
  const bio = data.get("bio");
  const profilePicture = (data.get("profilePicture"))

  const file = bucket.file("profilePicture/1.png")
  if (profilePicture) {
    const buffer = await (profilePicture as File).arrayBuffer()
    const bf = Buffer.from(buffer)
    await file.save(bf)
  }

  await profileRef.add({
    name,
    role,
    yearCourse,
    verse,
    bio,
  });

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};