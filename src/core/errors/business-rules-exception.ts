const BUSINESS_RULE_ERROR_CODE = 422

export class BusinessRuleException extends Error {
  public readonly code: number

  constructor(message: string) {
    super(`Business rule exception: ${message}`)
    this.name = 'BusinessRuleException'
    this.code = BUSINESS_RULE_ERROR_CODE
  }
}
