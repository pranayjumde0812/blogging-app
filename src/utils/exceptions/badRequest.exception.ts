import {HttpStatus, HttpStatusMessages} from '../../constants/httpStatusCode';
import HttpException from './http.exceptions';

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(
      HttpStatus.BAD_REQUEST,
      message ?? HttpStatusMessages[HttpStatus.BAD_REQUEST],
    );
  }
}
