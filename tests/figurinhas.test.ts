import { faker } from '@faker-js/faker';
import prisma from '../src/config/database';

import supertest from "supertest"
import app from "../src/app"
import { cleanDB } from "./helper";
import { createAlbum } from "./factory/album.factory";
import { createFigurinha } from "./factory/figurinha.factory";
import { createUser } from "./factory/user.factory";

const api = supertest(app);

beforeEach(async () => {
    await cleanDB();
})

describe('POST /figurinha', () => {
    it('Should return 422 if invalid request', async () => {
        const figurinhaPost = {
            numero: faker.word.noun(),
            quantidade: 3,
            userId: 1,
            albumId: 1
        };

        const response = await api.post('/figurinha').send(figurinhaPost);

        expect(response.statusCode).toEqual(422);
    })
    it('Should increase count if figurinha exists', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);

        const figurinhaPost = {
            numero: figurinha.numero,
            quantidade: 3,
            userId: figurinha.userId,
            albumId: figurinha.albumId
        };

        const response = await api.post('/figurinha').send(figurinhaPost);

        expect(response.statusCode).toEqual(201);

        expect(response.body.quantidade).toEqual(figurinha.quantidade + 3);

        const figurinhasCount = await prisma.figurinha.count();

        expect(figurinhasCount).toEqual(1);
    })

    it('Should create new figurinha if number does not exist', async () => {
        const album = await createAlbum();
        const user = await createUser();

        const newNumber = faker.datatype.number();
        const newQuantity = faker.datatype.number();
        const figurinhaPost = {
            numero: newNumber,
            quantidade: newQuantity,
            userId: user.id,
            albumId: album.id
        }

        const response = await api.post('/figurinha').send(figurinhaPost);
        const countFigurinhas = await prisma.figurinha.count();

        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual(expect.objectContaining({
            userId: user.id,
            albumId: album.id,
            numero: newNumber,
            quantidade: newQuantity,
        }))
        expect(countFigurinhas).toEqual(1);

    })

})

describe('POST /figurinha/troca', () => {

    it('Should return 409 if trade quantity is not avaliable', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const user2 = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);
        const figurinha2 = await createFigurinha(user2.id, album.id);

        const tradePost = {
            user1: {
                numero: figurinha.numero,
                quantidade: figurinha.quantidade + 1,
                albumId: figurinha.albumId,
                userId: figurinha.userId,
            },
            user2: {
                numero: figurinha2.numero,
                quantidade: figurinha2.quantidade + 1,
                albumId: figurinha2.albumId,
                userId: figurinha2.userId,
            }
        };

        const response = await api.post('/figurinha/troca').send(tradePost);

        expect(response.statusCode).toEqual(409);
    })

    it('Should return 404 if user does not exist', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);

        const tradePost = {
            user1: {
                numero: figurinha.numero,
                quantidade: figurinha.quantidade + 1,
                albumId: figurinha.albumId,
                userId: figurinha.userId + 1,
            },
            user2: {
                numero: figurinha.numero,
                quantidade: figurinha.quantidade + 1,
                albumId: figurinha.albumId,
                userId: figurinha.userId,
            }
        };
        const response = await api.post('/figurinha/troca').send(tradePost);

        expect(response.statusCode).toEqual(404);
    })

    it('Should return 409 if both trade ids are equal', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);

        const tradePost = {
            user1: {
                numero: figurinha.numero,
                quantidade: figurinha.quantidade,
                albumId: figurinha.albumId,
                userId: figurinha.userId,
            },
            user2: {
                numero: figurinha.numero,
                quantidade: figurinha.quantidade,
                albumId: figurinha.albumId,
                userId: figurinha.userId,
            }
        };

        const response = await api.post('/figurinha/troca').send(tradePost);

        expect(response.statusCode).toEqual(409);


    })

    it('Should perform trade if data is correct', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const user2 = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);
        const figurinha2 = await createFigurinha(user2.id, album.id);

        const tradePost = {
            user1: {
                numero: figurinha.numero,
                quantidade: figurinha.quantidade - 2,
                albumId: figurinha.albumId,
                userId: figurinha.userId,
            },
            user2: {
                numero: figurinha2.numero,
                quantidade: figurinha2.quantidade - 2,
                albumId: figurinha2.albumId,
                userId: figurinha2.userId,
            }
        };

        const response = await api.post('/figurinha/troca').send(tradePost);
        const user1Loss = await prisma.figurinha.findFirst({
            where: {
                numero: figurinha.numero,
                albumId: figurinha.albumId,
                userId: figurinha.userId,
            }
        })

        const user1Gain = await prisma.figurinha.findFirst({
            where: {
                numero: figurinha2.numero,
                albumId: figurinha2.albumId,
                userId: figurinha.userId,
            }
        })

        const user2Loss = await prisma.figurinha.findFirst({
            where: {
                numero: figurinha2.numero,
                albumId: figurinha2.albumId,
                userId: figurinha2.userId,
            }
        })

        const user2Gain = await prisma.figurinha.findFirst({
            where: {
                numero: figurinha.numero,
                albumId: figurinha.albumId,
                userId: figurinha2.userId,
            }
        })

        expect(response.statusCode).toEqual(201);
        expect(user1Loss.quantidade).toEqual(2);
        expect(user1Gain.quantidade).toEqual(figurinha2.quantidade - 2);
        expect(user2Loss.quantidade).toEqual(2);
        expect(user2Gain.quantidade).toEqual(figurinha.quantidade - 2);

    })

})

describe('DELETE /figurinha', () => {

    it('Should return 409 if loss quantity is not avaliable', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);

        const lossPost = {
            numero: figurinha.numero,
            quantidade: figurinha.quantidade + 1,
            albumId: figurinha.albumId,
            userId: figurinha.userId,
        };

        const response = await api.delete('/figurinha').send(lossPost);

        expect(response.statusCode).toEqual(409);
    })

    it('Should return 404 if user does not exist', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);

        const lossPost = {
            numero: figurinha.numero,
            quantidade: figurinha.quantidade,
            albumId: figurinha.albumId,
            userId: figurinha.userId + 1,
        };

        const response = await api.delete('/figurinha').send(lossPost);

        expect(response.statusCode).toEqual(404);
    })

    it('Should return 404 if album does not exist', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);

        const lossPost = {
            numero: figurinha.numero,
            quantidade: figurinha.quantidade,
            albumId: figurinha.albumId + 1,
            userId: figurinha.userId,
        };

        const response = await api.delete('/figurinha').send(lossPost);

        expect(response.statusCode).toEqual(404);
    })

    it('Should return 201 if everything is ok', async () => {
        const album = await createAlbum();
        const user = await createUser();
        const figurinha = await createFigurinha(user.id, album.id);

        const lossPost = {
            numero: figurinha.numero,
            quantidade: figurinha.quantidade - 1,
            albumId: figurinha.albumId,
            userId: figurinha.userId,
        };

        const response = await api.delete('/figurinha').send(lossPost);

        expect(response.statusCode).toEqual(201);
        expect(response.body.quantidade).toEqual(1);

    })
})

describe('GET /figurinha', () => {
    it('Should return correct info', async () => {
        const album = await createAlbum();
        const user = await createUser();
        await createFigurinha(user.id, album.id);
        const response = await api.get('/figurinha')
        expect(response.body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    numero: expect.any(Number),
                    quantidade: expect.any(Number),
                    user: expect.objectContaining(
                        {
                            id: expect.any(Number),
                            username: expect.any(String)
                        }
                    ),
                    album: expect.objectContaining(
                        {
                            id: expect.any(Number),
                            nome: expect.any(String)
                        }
                    ),
                })
            ])
        )
    })
})