import type { APIRoute } from "astro";

import { app } from "../../firebase/server";
import { getFirestore } from "firebase-admin/firestore";

const db = getFirestore(app);
const profileRef = db.collection("profiles");

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();
  const name = data.get("name");
  const date = data.get("date")!.toString();
  const repeats = Math.max(parseInt(data.get("repeat")!.toString()), 1);

  const db = getFirestore(app);
  for (let i = 0; i < repeats; i++) {
    const eventDate = new Date(date);
    eventDate.setDate(eventDate.getDate() + i * 7);
    await db.collection("events").add({
      title: name,
      date: eventDate,
    });
  }

  return new Response(
    JSON.stringify({
      message: "Success!"
    }),
    { status: 200 }
  );
};