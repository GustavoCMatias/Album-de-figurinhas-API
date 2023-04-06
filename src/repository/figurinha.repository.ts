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

async function won(numero: number, quantidade: number)  {
    return await connectionDb.query(`
    UPDATE figurinhas
    SET quantidade = quantidade + $1
    WHERE numero = $2
    `, [quantidade, numero])
}

async function lost(numero: number, quantidade:number)  {
    return await connectionDb.query(`
    UPDATE figurinhas
    SET quantidade = quantidade - $2
    WHERE numero = $1
    `, [numero, quantidade])
}

async function get()  {
    return await connectionDb.query(`
    SELECT numero, quantidade
    FROM figurinhas
    ORDER BY numero ASC
    `,)
}

export default {
    create,
    search, 
    lost,
    won,
    get
}