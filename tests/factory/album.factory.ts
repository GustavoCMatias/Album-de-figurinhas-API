import prisma from 'config/database';
export async function createAlbum() {
    return await prisma.album.createMany({
        data: [{
            nome: 'Copa 2022'
        },
        {
            nome: 'Yu-gi-oh'
        }]
    }
    );
}