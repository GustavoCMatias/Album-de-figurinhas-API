export interface IFigurinha {
    numero: number,
    quantidade: number,
    albumId: number,
    userId: number
  }

export interface ITrocaBody {
    user1: IFigurinha,
    user2: IFigurinha
}

export interface IAlbum {
  nome: string
}

export interface IUser {
  username: string
}