import { defineDb, defineTable, column } from 'astro:db';

const Profile = defineTable({
  columns: {
    picture: column.text(),
    name: column.text(),
    role: column.text(),
    yearCourse: column.text({ optional: true }),
    verse: column.text(),
    bio: column.text(),
  }
});


// https://astro.build/db/config
export default defineDb({
  tables: { Profile }
});
