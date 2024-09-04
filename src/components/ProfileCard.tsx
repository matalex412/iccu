import React from 'react';

interface Props {
  picture: string;
  name: string;
  role: string;
  yearCourse?: string;
  verse: string;
  bio: string;
}

const ProfileCard: React.FC<Props> = ({ picture, name, role, yearCourse, verse, bio }) => {
  return (
    <div className="text-sm max-w-sm p-7 gap-3 flex flex-col items-center justify-around rounded-xl shadow-md bg-leaf-100 text-leaf-600">
      <div className="rounded-full w-40 h-40 bg-leaf-500" style={{ backgroundImage: `url(${picture})`, backgroundSize: 'cover' }}></div>
      <p className="uppercase font-semibold">{name}</p>
      <p>{role}</p>
      {yearCourse && <p>{yearCourse}</p>}
      <p>{verse}</p>
      <p>{bio}</p>
    </div>
  );
};

export default ProfileCard;
