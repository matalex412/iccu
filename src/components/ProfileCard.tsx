import { deleteDoc, doc } from "firebase/firestore"
import { deleteObject, getStorage, ref } from "firebase/storage"
import React, { type FC } from "react"

import { auth, db } from "../firebase/client"

const storage = getStorage()

type Profile = {
  profilePicture: string
  name: string
  role: string
  yearCourse: string
  verse: string
  bio: string
  pictureStoragePath: string
}

interface ProfileCardProps {
  id: string
  profile: Profile
}

const ProfileCard: FC<ProfileCardProps> = ({ id, profile }) => {
  const { profilePicture, name, role, yearCourse, verse, bio, pictureStoragePath } = profile

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this profile?")) {
      await deleteDoc(doc(db, "profiles", id))
      await deleteObject(ref(storage, pictureStoragePath))
    }
  }

  return (
    <div className="text-sm max-w-sm p-7 gap-3 flex flex-col items-center justify-around rounded-xl shadow-md bg-leaf-100 text-leaf-600">
      {profilePicture ? (
        <img src={profilePicture} alt="profile picture" className="rounded-full w-40 h-40 object-cover" />
      ) : (
        <div className="rounded-full w-40 h-40 bg-leaf-500"></div>
      )}
      <p className="uppercase font-semibold">{name}</p>
      <p>{role}</p>
      {yearCourse && <p>{yearCourse}</p>}
      <p>{verse}</p>
      <p>{bio}</p>
      {auth.currentUser && (
        <button
          className="bg-red-400 text-leaf-100 py-2 px-4 rounded-lg mt-4"
          onClick={handleDelete}
        >
          Delete Profile
        </button>
      )}
    </div>
  )
}

export default ProfileCard
