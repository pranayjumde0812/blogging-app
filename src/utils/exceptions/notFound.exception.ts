import {HttpStatus, HttpStatusMessages} from '../../constants/httpStatus';
import HttpException from './http.exceptions';

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(
      HttpStatus.NOT_FOUND,
      message ?? HttpStatusMessages[HttpStatus.NOT_FOUND],
    );
  }
}
