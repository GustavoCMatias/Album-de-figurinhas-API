import errors from 'errors';
import { IUser } from '../protocols';
import userRepository from 'repository/user.repository';


async function create(user: IUser) {

    const userExists = await userRepository.search(user.username)
    if(userExists) throw errors.duplicatedNameError();

    return await userRepository.create(user.username)
    
}

async function get() {
    const users = await userRepository.get()
    return users
}


export default{
    create,
    get
}