import { NextFunction } from 'express';
import { Response } from 'express';
import httpStatus from 'http-status'

export function handleApplicationErrors(err: Error, _req: Request, res: Response, _next: NextFunction) {
  if (err.name === "ConflictError" || err.name === "DuplicatedEmailError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === "InvalidBody") {
    return res.status(httpStatus.UNPROCESSABLE_ENTITY).send({
      message: err.message,
    });
  }

  if (err.name === "duplicatedNameError") {
    return res.status(httpStatus.CONFLICT).send({
      message: err.message,
    });
  }

  if (err.name === "notFoundError") {
    return res.status(httpStatus.NOT_FOUND).send({
      message: err.message,
    });
  }
  if (err.name === "BadRequest") {
    return res.status(httpStatus.BAD_REQUEST).send({
      message: err.message
    })
  }

  if (err.name === "conflictTrade") {
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

  

  