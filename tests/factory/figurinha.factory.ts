import { faker } from '@faker-js/faker';
import prisma from 'config/database';
export async function createFigurinha(userId: number, albumId: number) {
    const numero = faker.datatype.number();
    const quantidade = faker.datatype.number({max: 10, min: 3})
    return await prisma.figurinha.create({
        data: {
            numero,
            quantidade,
            userId,
            albumId
        }
        
    }
    );

}