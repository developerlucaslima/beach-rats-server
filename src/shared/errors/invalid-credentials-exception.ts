import { BaseException } from './base-exception'

const INVALID_CREDENTIALS_ERROR_CODE = 401

export class InvalidCredentialsException extends BaseException {
  public readonly code: number

  constructor() {
    super('Invalid credentials.')
    this.name = 'InvalidCredentialsException'
    this.code = INVALID_CREDENTIALS_ERROR_CODE
  }
}
