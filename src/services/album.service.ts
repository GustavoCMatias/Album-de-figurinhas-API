import errors from 'errors';
import { IAlbum } from './../protocols';
import albumRepository from 'repository/album.repository';


async function create(album: IAlbum) {

    const albumExists = await albumRepository.search(album.nome)
    if(albumExists) throw errors.duplicatedNameError();

    return await albumRepository.create(album.nome)
    
}

async function get() {
    const users = await albumRepository.get()
    return users
}


export default{
    create,
    get
}