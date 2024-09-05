import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase/client";
import { useEffect, useState } from "react";
import ProfileCard from "./ProfileCard";

export default function Profiles() {
  const [profiles, setProfiles] = useState<any[]>([]);

  const getProfiles = () => {
    const unsubscribe = onSnapshot(
      query(collection(db, "profiles")),
      (querySnapshot) => {
        const profiles: any[] = [];
        querySnapshot.forEach((doc) => {
          profiles.push({
            id: doc.id,
            ...doc.data()
          });
        });
        setProfiles(profiles);
      }
    );
    return unsubscribe;
  };

  useEffect(() => {
    return getProfiles();
  }, []);

  return (
    <>
      {profiles.map((profile) => (
        <ProfileCard
          key={profile.id}
          id={profile.id}
          picture={profile.picture}
          name={profile.name}
          role={profile.role}
          yearCourse={profile.yearCourse}
          verse={profile.verse}
          bio={profile.bio}
        />
      ))}
    </>
  );
}
