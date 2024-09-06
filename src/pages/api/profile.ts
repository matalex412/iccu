import type { APIRoute } from "astro";

import { app } from "../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const storage = getStorage();
const db = getFirestore(app);
const profileRef = db.collection("profiles");
// const storageRef = ref(storage, "profilePictures");

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const role = data.get("role");
  const yearCourse = data.get("yearCourse");
  const verse = data.get("verse");
  const bio = data.get("bio");
  const profilePicture = (data.get("profilePicture"))

//   if (profilePicture && (profilePicture as File).type.startsWith("image")) {
//     await uploadBytes(storageRef, profilePicture as File);
//   }

  await profileRef.add({
    name,
    role,
    yearCourse,
    verse,
    bio,
  });

  // Do something with the data, then return a success response
  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};