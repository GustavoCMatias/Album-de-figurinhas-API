import { faker } from '@faker-js/faker';
import prisma from '../src/config/database';

import supertest from "supertest"
import app from "../src/app"
import { cleanDB } from "./helper";
import { createAlbum } from "./factory/album.factory";

const api = supertest(app);
afterAll(async () => {
    await cleanDB();
})

beforeAll(async () => {
    await cleanDB();
})

beforeEach(async () => {
    await cleanDB();
})

describe('POST /album', () => {
    it('Should return 422 if invalid request', async () => {
        const albumPost = {
            nome: faker.datatype.number()
        };

        const response = await api.post('/album').send(albumPost);

        expect(response.statusCode).toEqual(422);
    })

    it('Should return 409 if name already exists',async () => {
        const album = await createAlbum();

        const albumPost = {
            nome: album.nome
        };

        const response = await api.post('/album').send(albumPost);

        expect(response.statusCode).toEqual(409);

    })

    it('Should return 201 if ok',async () => {
        const albumPost = {
            nome: faker.animal.bird()
        };

        const response = await api.post('/album').send(albumPost);

        expect(response.statusCode).toEqual(201);

        const albumCount = await prisma.album.count();

        expect(albumCount).toEqual(1);
    })
})

describe('GET /album', () => {
    it('Should return 200 and data',async () => {
        await createAlbum();

        const response = await api.get('/album');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                nome: expect.any(String),
            })
        ]))
    })
})
    