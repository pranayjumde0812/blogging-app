import {HttpStatus, HttpStatusMessages} from '../../constants/httpStatus';
import HttpException from './http.exceptions';

export class ForbiddenAccessException extends HttpException {
  constructor(message: string) {
    super(
      HttpStatus.FORBIDDEN,
      message ?? HttpStatusMessages[HttpStatus.FORBIDDEN],
    );
  }
}
