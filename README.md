

Rotas de figurinhas
POST /figurinhas/ganhar: adiciona uma nova figurinha ao álbum do usuário.
POST /figurinhas/trocar: permite que o usuário troque uma figurinha com outro usuário.
DELETE /figurinhas/perder: remove uma figurinha do álbum do usuário.
GET /figurinhas/ver: exibe todas as figurinhas do usuário.
Rotas de usuários
POST /usuarios/create: cria um novo usuário.
GET /usuarios/get: exibe todos os usuários registrados.
Rotas de álbuns
POST /albuns/create: cria um novo álbum para o usuário.
GET /albuns/get: exibe todos os álbuns do usuário.
Contribuição


# API de figurinhas

Esta API permite que os usuários criem e gerenciem álbuns de figurinhas, permitindo que eles ganhem novas figurinhas, percam elas ou as troquem entre si.

## Rotas

### **Rotas de figurinhas**

* POST **'/figurinha'**: adiciona uma nova figurinha ao álbum do usuário.
* POST **'/figurinha/troca'**: permite que o usuário troque uma figurinha com outro usuário.
* DELETE **'/figurinha'**: remove uma figurinha do álbum do usuário.
* GET **'/figurinha'**: exibe todas as figurinhas.

### **Rotas de usuários**

* POST **'/user'**: cria um novo usuário.
* GET **'/user'**: exibe todos os usuários registrados.

### **Rotas de álbuns**

* POST **'/album'**: cria um novo álbum.
* GET **'/album'**: exibe todos os álbuns registrados.