function conflictError(message: string[]) {
    return {
      name: "ConflictError",
      message,
    };
  }

function invalidBody(message: string[]){
  return {
    name: "InvalidBody",
    message,
  };
}
  
//   function duplicatedEmailError(email: string) {
//     return {
//       name: "DuplicatedEmailError",
//       message: "Email is already been used",
//       email,
//     };
//   }
  
  function notFoundError() {
    return {
      name: "NotFoundError",
      message: "No result was found",
    };
  }
  
  function conflictTrade(){
    return {
      name: "ConflictTrade",
      message: "Both traders have same id"
    }
  }

  function conflictQuantity(){
    return {
      name: "ConflictQtt",
      message: "Not enough figurinhas"
    }
  }
  
  export default {
    conflictError,
    invalidBody,
    notFoundError,
    conflictTrade,
    conflictQuantity
  };