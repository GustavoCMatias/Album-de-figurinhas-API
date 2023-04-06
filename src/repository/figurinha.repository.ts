import connectionDb from "../config/database"


async function create(numero: number, quantidade: number) {
    await connectionDb.query(`
    INSERT INTO figurinhas (numero, quantidade)
    values ($1, $2)
    `, [numero, quantidade])
}

async function search(numFigurinha: number) {
    return await connectionDb.query(`
    SELECT * FROM figurinhas f
    where f.numero = $1
    `, [numFigurinha])
}

async function update(numero: number, quantidade: number)  {
    return await connectionDb.query(`
    UPDATE figurinhas
    SET quantidade = quantidade + $1
    WHERE numero = $2
    `, [quantidade, numero])
}

export default {
    create,
    search, 
    update
}