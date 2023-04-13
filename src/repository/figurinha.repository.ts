
import prisma from "../config/database.js";

async function create(numeroFig: number, quantidadeFig: number, album: number, user: number) {

    await prisma.figurinha.create({
        data: {
                numero: numeroFig,
                quantidade: quantidadeFig,
                userId: user,
                albumId: album
            },
    })

}

async function search(numFigurinha: number, album: number, user: number) {
    return prisma.figurinha.findFirst({
        where: {
            numero: numFigurinha,
            albumId: album,
            userId: user
        },
        select:{
            id: true,
            quantidade: true
        }
    })
}

async function wonOrLost(quantidade: number, figurinhaId: number) {
    await prisma.figurinha.update({
        where:{
            id: figurinhaId
        },
        data: {
            quantidade: {increment: quantidade}
        }
    }
    )
}


async function get() {

    return prisma.figurinha.findMany({
        select: {
            id: true,
            numero: true,
            quantidade: true,
            user: {
                select: {
                    id: true,
                    username: true                   
                }
            },
            album: {
                select:{
                    id: true,
                    nome:true
                }
            }
        }
    })
}

export default {
    create,
    search,
    wonOrLost,
    get
}