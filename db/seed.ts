import { db, Profile } from 'astro:db';

// https://astro.build/db/seed
export default async function seed() {
	await db.insert(Profile).values([
		{
			picture: 'https://avatars.githubusercontent.com/u/20407133?v=4',
			name: 'Jed',
			role: 'Web Developer',
			yearCourse: '4th Year BSIT',
			verse: 'Philippians 4:13',
			bio: 'I am a web developer who loves to code.'
		},
		{
			picture: 'https://avatars.githubusercontent.com/u/20407133?v=4',
			name: 'Matt',
			role: 'Mobile Developer',
			yearCourse: '3rd Year',
			verse: 'Philippians 4:13',
			bio: 'I am a web developer who loves to code.'
		},
	])
}
