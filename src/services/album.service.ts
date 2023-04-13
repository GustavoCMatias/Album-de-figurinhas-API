import { IAlbum } from './../protocols';
import albumRepository from 'repository/album.repository';


async function create(album: IAlbum) {

    const albumExists = await albumRepository.create(album.nome)
    const now = new Date;

    const diff = now.getTime() - albumExists.created_at.getTime()

    if(diff > 100) throw Error
    
}

async function get() {
    const users = await albumRepository.get()
    return users
}


export default{
    create,
    get
}