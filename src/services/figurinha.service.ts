import figurinhaRepository from '../repository/figurinha.repository';
import { Figurinha } from './../protocols';


async function create(figurinhaList:Figurinha[]) {
    const placeHolder: string[] = [];
    const figurinhaInfo: number[] = [];

    figurinhaList.forEach((item, i) => {
        placeHolder.push(`$${2*i}, $${2*i+1}`)
        figurinhaInfo.push(item.numero, item.quantidade)
    })

    const placeHolderStr: string = placeHolder.join('), (')

    figurinhaRepository.create(placeHolderStr, figurinhaInfo)

}

export default{
    create
}