import prisma from 'config/database';

export async function createUser() {
    return await prisma.user.createMany({
        data: [{
            username: 'Batman',
        },
        {
            username: 'Aquaman'
        }]
    }
    );
}