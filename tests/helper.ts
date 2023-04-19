import prisma from "config/database";


export async function cleanDB(){
    await prisma.figurinha.deleteMany({});
    await prisma.album.deleteMany({});
    await prisma.user.deleteMany({});
} 