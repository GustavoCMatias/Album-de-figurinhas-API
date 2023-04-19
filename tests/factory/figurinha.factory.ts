import prisma from 'config/database';
export async function createFigurinha(userId: number, albumId: number) {
    return await prisma.figurinha.createMany({
        data: [{
            numero: 5,
            quantidade: 3,
            userId,
            albumId
        },
        {
            numero: 5,
            quantidade: 3,
            userId: userId + 1,
            albumId:albumId + 1
        },
        ]
    }
    );

}