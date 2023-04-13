import { IUser } from '../protocols';
import userRepository from 'repository/user.repository';


async function create(user: IUser) {

    const userExists = await userRepository.create(user.username)
    const now = new Date;

    const diff = now.getTime() - userExists.created_at.getTime()

    if(diff > 100) throw Error
    
}

async function get() {
    const users = await userRepository.get()
    return users
}


export default{
    create,
    get
}