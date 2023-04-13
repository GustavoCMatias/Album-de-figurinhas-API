
import prisma from "../config/database.js";

async function create(nome: string) {

    return await prisma.album.upsert({
        where: {
            nome: nome
        },
        create: {
            nome: nome
        },
        update: {

        }
    })

}


async function get() {

    return prisma.album.findMany({
        select: {
            id: true,
            nome: true
        }
    })
}

export default {
    create,
    get
}