import prisma from "../src/config/database.js";

async function main(){
    await prisma.user.createMany({
        data: [
            {username: 'Batman'},
            {username: 'Aquaman'}
        ]
    }
    );

    await prisma.album.createMany({
        data: [
            {nome: 'Copa 2022'},
            {nome: 'Yu-gi-oh'}
        ]
    });

    await prisma.figurinha.createMany({
        data: [
            {numero: 5, quantidade: 3, userId: 1, albumId: 1},
            {numero: 10, quantidade: 5, userId: 2, albumId: 2},
        ]
    })

}

main()
	.then(() => {
		console.log("Registro rolou topmente");
})
	.catch(e => {
		console.log(e);
		process.exit(1);
})
	.finally(async () => {
		await prisma.$disconnect();
})