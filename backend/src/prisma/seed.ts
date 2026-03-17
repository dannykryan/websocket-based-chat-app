import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DIRECT_URL! });
const prisma = new PrismaClient({ adapter });

const users = [
  { username: "cyclops", email: "cyclops@xmen.com", bio: "Leader of the X-Men", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/cyclops.webp" },
  { username: "wolverine", email: "wolverine@xmen.com", bio: "The best there is at what I do", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/wolverine.jpg" },
  { username: "storm", email: "storm@xmen.com", bio: "Mistress of the elements", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/storm.jpg" },
  { username: "jean_grey", email: "jean@xmen.com", bio: "Telepathic X-Man", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/jean_grey.jpg" },
  { username: "beast", email: "beast@xmen.com", bio: "Brilliant scientist and X-Man", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/beast.jpg" },
  { username: "gambit", email: "gambit@xmen.com", bio: "The Ragin' Cajun", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/gambit.webp" },
  { username: "rogue", email: "rogue@xmen.com", bio: "Can't touch this", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/rogue.webp" },
  { username: "iceman", email: "iceman@xmen.com", bio: "Coolest X-Man alive", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/iceman.jpg" },
  { username: "nightcrawler", email: "nightcrawler@xmen.com", bio: "BAMF!", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/nightcrawler.jpg" },
  { username: "magneto", email: "magneto@xmen.com", bio: "Master of magnetism", profilePictureUrl: "https://birclqnuxghihsievxtb.supabase.co/storage/v1/object/public/Images/UserAvatars/magneto.webp" },
];

async function main() {
  console.log("Seeding database...");

  const passwordHash = await bcrypt.hash("password123", 10);

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: {
        ...user,
        passwordHash,
      },
    });
    console.log(`Created user: ${user.username}`);
  }

  console.log("Seeding complete!");
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });