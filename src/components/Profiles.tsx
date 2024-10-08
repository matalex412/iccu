import { collection, onSnapshot, query } from "firebase/firestore"
import { useEffect, useState } from "react"

import { db } from "../firebase/client"
import ProfileCard from "./ProfileCard"

const Profiles = () => {
  const [profiles, setProfiles] = useState<any[]>([])

  const getProfiles = () => {
    const unsubscribe = onSnapshot(query(collection(db, "profiles")), (querySnapshot) => {
      const profiles: any[] = []
      querySnapshot.forEach((doc) => {
        profiles.push({
          id: doc.id,
          ...doc.data(),
        })
      })
      setProfiles(profiles)
    })
    return unsubscribe
  }

  useEffect(() => {
    return getProfiles()
  }, [])

  return (
    <>
      {profiles.map((profile) => (
        <ProfileCard key={profile.id} id={profile.id} profile={profile} />
      ))}
    </>
  )
}

export default Profiles
