export class ResourcerNotFoundError extends Error {
  constructor() {
    super('Resource not found')
  }
}
