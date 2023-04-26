
import prisma from "../config/database";

async function create(username: string) {

    return await prisma.user.create({
        data: {
            username
        }
    })
}

async function search(username: string) {

    return await prisma.user.findUnique({
        where: {
            username
        }
    })
}

async function get() {

    return prisma.user.findMany({
        select: {
            id: true,
            username: true
        }
    })
}

export default {
    create,
    get,
    search
}