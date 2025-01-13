import HttpException from './http.exceptions';

export class BadRequestException extends HttpException {
  constructor(message?: string) {
    super(400, message ?? 'Bad Request');
  }
}
