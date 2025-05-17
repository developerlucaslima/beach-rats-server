import { BaseException } from './base-exception'

const UNAUTHORIZED_ERROR_CODE = 401

export class UnauthorizedException extends BaseException {
  public readonly code: number

  constructor(message: string = 'Unauthorized.') {
    super(`Unauthorized exception: ${message}`)
    this.name = 'UnauthorizedException'
    this.code = UNAUTHORIZED_ERROR_CODE
  }
}
