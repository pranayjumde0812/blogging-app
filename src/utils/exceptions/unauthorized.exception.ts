import {HttpStatus, HttpStatusMessages} from '../../constants/httpStatus';
import HttpException from './http.exceptions';

export class UnAuthorizedException extends HttpException {
  constructor(message: string) {
    super(
      HttpStatus.UNAUTHORIZED,
      message ?? HttpStatusMessages[HttpStatus.UNAUTHORIZED],
    );
  }
}
