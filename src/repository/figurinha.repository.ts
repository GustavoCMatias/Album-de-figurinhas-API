import connectionDb from "../config/database"


async function create(placeHolderStr: string, figurinhaInfo: number[]) {
    await connectionDb.query(`
    INSERT INTO figurinhas (numero, quantidade)
    values (${placeHolderStr})
    `, figurinhaInfo)
}

export default {
    create
}