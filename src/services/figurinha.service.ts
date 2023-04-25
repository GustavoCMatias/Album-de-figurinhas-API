import errors from 'errors';
import figurinhaRepository from '../repository/figurinha.repository';
import { IFigurinha } from './../protocols';


async function create(figurinha:IFigurinha) {

    const listFigurinha = await figurinhaRepository.search(figurinha.numero, figurinha.albumId, figurinha.userId)

    if(listFigurinha === null){
        return await figurinhaRepository.create(figurinha.numero, figurinha.quantidade, figurinha.albumId, figurinha.userId)
    }

    return await figurinhaRepository.wonOrLost(figurinha.quantidade, listFigurinha.id)
    

}

async function get() {
    const listFigurinha = await figurinhaRepository.get()
    return listFigurinha
}

async function trade(user1: IFigurinha, user2: IFigurinha) {

    if(user1.userId === user2.userId ) throw errors.conflictTrade ;

    const checkPerdidaUser1 = await figurinhaRepository.search(user1.numero, user1.albumId, user1.userId);
    if(checkPerdidaUser1 === null) throw errors.notFoundError;
    if(checkPerdidaUser1.quantidade < user1.quantidade) throw errors.conflictQuantity;

    const checkPerdidaUser2 = await figurinhaRepository.search(user2.numero, user2.albumId, user2.userId);
    if(checkPerdidaUser2 === null) throw errors.notFoundError;
    if(checkPerdidaUser2.quantidade < user2.quantidade) throw errors.conflictQuantity;

    await create({numero: user2.numero, quantidade: user2.quantidade, albumId: user2.albumId, userId: user1.userId});
    await figurinhaRepository.wonOrLost(-user1.quantidade, checkPerdidaUser1.id);

    await create({numero: user1.numero, quantidade: user1.quantidade, albumId: user1.albumId, userId: user2.userId});
    await figurinhaRepository.wonOrLost(-user2.quantidade, checkPerdidaUser2.id);
}

async function lost(figPerdida: IFigurinha) {
    
    const retorno  = await figurinhaRepository.search(figPerdida.numero, figPerdida.albumId, figPerdida.userId)
    if(retorno === null) throw errors.notFoundError;
    if(retorno.quantidade < figPerdida.quantidade) throw errors.conflictQuantity;

    return await figurinhaRepository.wonOrLost(-figPerdida.quantidade, retorno.id)
}

export default{
    create,
    get,
    trade,
    lost
}