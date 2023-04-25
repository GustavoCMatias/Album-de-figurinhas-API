import { faker } from '@faker-js/faker';
import prisma from 'config/database';
export async function createAlbum() {
    return await prisma.album.create({
        data: {
            nome: faker.animal.bird()
        }
    }
    );
}