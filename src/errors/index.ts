function conflictError(message: string[]): Error {
  return {
    name: "ConflictError",
    message: message.join(', '),
  };
}

function invalidBody(message: string[]): Error  {
  return {
    name: "InvalidBody",
    message: message.join(', '),
  };
}

function duplicatedNameError(): Error  {
  return {
    name: "DuplicatedNameError",
    message: "Name is already been used",
  };
}

function notFoundError(): Error  {
  return {
    name: "NotFoundError",
    message: "No result was found",
  };
}

function conflictTrade(): Error  {
  return {
    name: "ConflictTrade",
    message: "Both traders have same id"
  }
}

function conflictQuantity(): Error  {
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
  conflictQuantity,
  duplicatedNameError
};