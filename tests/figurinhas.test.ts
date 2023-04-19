import prisma from '../src/config/database';

import supertest from "supertest"
import app from "../src/app"
import { cleanDB } from "./helper";
import { createAlbum } from "./factory/album.factory";
import { createFigurinha } from "./factory/figurinha.factory";
import { createUser } from "./factory/user.factory";

const api = supertest(app);

beforeAll(async () => {
    await cleanDB();
})

// afterAll(async () => {
//     app.close()
// });

describe('POST /figurinha', () => {
    it('Should increase count if figurinha exists', async () => {
        await createAlbum();
        await createUser();
        const existingUser = await prisma.user.findFirst({
            orderBy: {
                id: 'asc'
            }
        })
        const existingAlb = await prisma.album.findFirst({
            orderBy: {
                id: 'asc'
            }
        })

        await createFigurinha(existingUser.id, existingAlb.id);
        const existingFig = await prisma.figurinha.findMany({});

        const figurinhaPost = {
            numero: existingFig[0].numero,
            quantidade: 3,
            userId: existingFig[0].userId,
            albumId: existingFig[0].userId
        };

        console.log('aqui')

        const response = await api.post('figurinha').set(figurinhaPost);

        console.log('aqui2')
        const figurinhas = await prisma.figurinha.findFirst({
            where: {
                numero: existingFig[0].numero,
                userId: existingFig[0].userId,
                albumId: existingFig[0].albumId
            }
        });

        console.log('figurinhas ', figurinhas)

        expect(figurinhas.quantidade).toEqual(existingFig[0].quantidade + 3);

        const figurinhasCount = await prisma.figurinha.count();

        expect(figurinhasCount).toEqual(2);

        expect(response.statusCode).toEqual(201);

    })

    it('Should create new figurinha if number does not exist', async () => {

        const figurinhaPost = {
            numero: 4,
            quantidade: 3,
            userId: 1,
            albumId: 1
        }

        const response = await api.post('figurinha').set(figurinhaPost);
        const figurinhas = await prisma.figurinha.count();

        expect(figurinhas).toEqual(3);

        expect(response.statusCode).toEqual(201);

    })

})

describe('POST /figurinha/troca', () => {
    
    it('Should return 422 if trade quantity is not avaliable', async () => {
        const figurinhas = await prisma.figurinha.findMany({})

        const tradePost = {
            user1: {
                numero: figurinhas[0].numero,
                quantidade: figurinhas[0].quantidade + 1,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[0].userId,
            },
            user2: {
                numero: figurinhas[1].numero,
                quantidade: figurinhas[1].quantidade,
                albumId: figurinhas[1].albumId,
                userId: figurinhas[1].userId,
            }
        };

        const response = await api.post('figurinha/troca').set(tradePost);

        expect(response.statusCode).toEqual(500);
    })




    it('Should return 500 if both trade ids are equal', async () => {
        const figurinhas = await prisma.figurinha.findMany({})

        const tradePost = {
            user1: {
                numero: figurinhas[0].numero,
                quantidade: figurinhas[0].quantidade,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[0].userId,
            },
            user2: {
                numero: figurinhas[0].numero,
                quantidade: figurinhas[0].quantidade,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[0].userId,
            }
        };

        const response = await api.post('figurinha/troca').set(tradePost);

        expect(response.statusCode).toEqual(500);


    })

    it('Should perform trade if data is correct', async () => {
        const figurinhas = await prisma.figurinha.findMany({})

        const tradePost = {
            user1: {
                numero: figurinhas[0].numero,
                quantidade: figurinhas[0].quantidade - 2,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[0].userId,
            },
            user2: {
                numero: figurinhas[1].numero,
                quantidade: figurinhas[1].quantidade - 2,
                albumId: figurinhas[1].albumId,
                userId: figurinhas[1].userId,
            }
        };

        const response = await api.post('figurinha/troca').set(tradePost);
        const user1Loss = await prisma.figurinha.findFirst({
            where: {
                numero: figurinhas[0].numero,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[0].userId,
            }
        })

        const user1Gain = await prisma.figurinha.findFirst({
            where: {
                numero: figurinhas[1].numero,
                albumId: figurinhas[1].albumId,
                userId: figurinhas[0].userId,
            }
        })

        const user2Loss = await prisma.figurinha.findFirst({
            where: {
                numero: figurinhas[1].numero,
                albumId: figurinhas[1].albumId,
                userId: figurinhas[1].userId,
            }
        })

        const user2Gain = await prisma.figurinha.findFirst({
            where: {
                numero: figurinhas[0].numero,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[1].userId,
            }
        })

        expect(user1Loss.quantidade).toEqual(2);
        expect(user1Gain.quantidade).toEqual(figurinhas[1].quantidade - 2);
        expect(user2Loss.quantidade).toEqual(2);
        expect(user2Gain.quantidade).toEqual(figurinhas[0].quantidade - 2);
        expect(response.statusCode).toEqual(200);
    })
    
})

describe('DELETE /figurinha', () => {
    
    it('Should return 500 if loss quantity is not avaliable',async () => {
        const figurinhas = await prisma.figurinha.findMany({}) 

        const lossPost = {
                numero: figurinhas[0].numero,
                quantidade: figurinhas[0].quantidade + 1,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[0].userId,
        };

        const response = await api.delete('figurinha').set(lossPost);

        expect(response.statusCode).toEqual(500);
    })

    it('Should return 201 if everything is ok',async () => {
        const figurinhas = await prisma.figurinha.findMany({})
        
        const lossPost = {
                numero: figurinhas[0].numero,
                quantidade: figurinhas[0].quantidade - 1,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[0].userId,
        };

        const response = await api.delete('figurinha').set(lossPost);

        const figs = await prisma.figurinha.findFirst({
            where: {
                numero: figurinhas[0].numero,
                albumId: figurinhas[0].albumId,
                userId: figurinhas[0].userId,
            }
        })

        expect(figs.quantidade).toEqual(1);

        expect(response.statusCode).toEqual(201);
    })
})