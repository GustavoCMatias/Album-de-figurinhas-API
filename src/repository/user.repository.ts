
import prisma from "../config/database";

async function create(username: string) {

    return await prisma.user.upsert({
        where: {
            username: username
        },
        create: {
            username: username
        },
        update: {

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
    get
}