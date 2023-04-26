
import prisma from "../config/database";

async function create(nome: string) {

    return await prisma.album.create({
        data: {
            nome
        }
    })
}

async function search(nome: string) {

    return await prisma.album.findUnique({
        where: {
            nome
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
    search,
    get
}