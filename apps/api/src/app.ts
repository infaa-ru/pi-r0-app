export interface Request {
  readonly params: Record<string, string>
  readonly body: Record<string, string>
}

type Handler = (req: Request) => unknown

interface Route {
  readonly method: string
  readonly path: string
}

const routes: Route[] = []

const register = (method: string) => (path: string, _options: Record<string, unknown>, _handler: Handler): void => {
  routes.push({ method, path })
}

export const app = { get: register('GET'), post: register('POST'), put: register('PUT'), delete: register('DELETE') }
