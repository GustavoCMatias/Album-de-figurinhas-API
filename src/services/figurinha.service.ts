import figurinhaRepository from '../repository/figurinha.repository';
import { Figurinha } from './../protocols';

function hasDuplicates(array: number[]) {
    return (new Set(array)).size !== array.length;
}

async function create(figurinha:Figurinha) {

    const retorno  = await figurinhaRepository.search(figurinha.numero)
    if(retorno.rowCount){
        await figurinhaRepository.won(figurinha.numero, figurinha.quantidade)
        return     
    }

    await figurinhaRepository.create(figurinha.numero, figurinha.quantidade)

}

async function get() {
    const listFigurinha = await figurinhaRepository.get()
    return listFigurinha.rows
}

async function trade(fig_ganha: number, fig_perdida: number) {

    
    const retorno_perdida  = await figurinhaRepository.search(fig_perdida)
    if( retorno_perdida.rowCount === 0 || retorno_perdida.rows[0].quantidade === 0 ) throw Error
    await figurinhaRepository.lost(fig_perdida, 1)


    const retorno_ganha  = await figurinhaRepository.search(fig_ganha)
    if(retorno_ganha.rowCount){
        await figurinhaRepository.won(fig_ganha, 1)
        return     
    }

    await figurinhaRepository.create(fig_ganha, 1)
    return
}

async function lost(fig_perdida:number, quantidade:number) {
    const retorno  = await figurinhaRepository.search(fig_perdida)
    if( retorno.rowCount === 0 || retorno.rows[0].quantidade < quantidade ) throw Error

    await figurinhaRepository.lost(fig_perdida, quantidade)
}

export default{
    create,
    get,
    trade,
    lost
}