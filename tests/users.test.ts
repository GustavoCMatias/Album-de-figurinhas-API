import { faker } from '@faker-js/faker';
import prisma from '../src/config/database';

import supertest from "supertest"
import app from "../src/app"
import { cleanDB } from "./helper";
import { createUser } from "./factory/user.factory";

const api = supertest(app);

beforeEach(async () => {
    await cleanDB();
})

describe('POST /users', () => {
    it('Should return 422 if invalid request', async () => {
        const userPost = {
            username: faker.datatype.number()
        };

        const response = await api.post('/user').send(userPost);

        expect(response.statusCode).toEqual(422);
    })

    it('Should return 409 if username already exists',async () => {
        const user = await createUser();

        const userPost = {
            username: user.username
        };

        const response = await api.post('/user').send(userPost)

        expect(response.statusCode).toEqual(409);

    })

    it('Should return 201 if ok',async () => {
        const userPost = {
            username: faker.name.firstName()
        };


        
        const response = await api.post('/user').send(userPost);

        expect(response.statusCode).toEqual(201);

        const userCount = await prisma.user.count();

        expect(userCount).toEqual(1);
    })
})

describe('GET /users', () => {
    it('Should return 200 and data',async () => {
        await createUser();

        const response = await api.get('/user');
        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expect.arrayContaining([
            expect.objectContaining({
                id: expect.any(Number),
                username: expect.any(String),
            })
        ]))
    })
})
    