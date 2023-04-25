import httpStatus from 'http-status'

export function handleApplicationErrors(err, req, res, next) {
  if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === "NotFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }
  if (err.name === "BadRequest") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    })
  }

  if (err.name === "ConflictTrade") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    })
  }

  if (err.name === "conflictQuantity") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message
    })
  }

  return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({
    error: "InternalServerError",
    message: err.message,
  });
  
}

  

  