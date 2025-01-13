import HttpException from './http.exceptions';

export class NotFoundException extends HttpException {
  constructor(message?: string) {
    super(404, message ?? 'Not Found');
  }
}
