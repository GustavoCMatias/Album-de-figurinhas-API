import figurinhaRepository from '../repository/figurinha.repository';
import { Figurinha } from './../protocols';

function hasDuplicates(array: number[]) {
    return (new Set(array)).size !== array.length;
}

async function create(figurinha:Figurinha) {

    const retorno  = await figurinhaRepository.search(figurinha.numero)

    if(retorno.rowCount){
        await figurinhaRepository.update(figurinha.numero, figurinha.quantidade)
        return
        
    }

    await figurinhaRepository.create(figurinha.numero, figurinha.quantidade)

}

export default{
    create
}