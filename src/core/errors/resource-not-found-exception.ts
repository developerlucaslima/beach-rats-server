const RESOURCE_NOT_FOUND_ERROR_CODE = 404

export class ResourceNotFoundException extends Error {
  public readonly code: number

  constructor(resource: string = 'Resource') {
    super(`${resource} not found.`)
    this.name = 'ResourceNotFoundException'
    this.code = RESOURCE_NOT_FOUND_ERROR_CODE
  }
}
