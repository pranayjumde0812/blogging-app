import {HttpStatus, HttpStatusMessages} from '../../constants/httpStatus';
import HttpException from './http.exceptions';

export class InternalServerException extends HttpException {
  constructor(message?: string) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      message ?? HttpStatusMessages[HttpStatus.INTERNAL_SERVER_ERROR],
    );
  }
}
