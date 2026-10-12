// Synthetic fact extractor of the fixture (app repository: no errors or statuses, they live in contracts): tiny regex scans over the fixture's own source tree.
// Prints {"files": {"<kind>.json": {kind, items}}} on stdout, the protocol `pi facts` expects.
import { readdirSync, readFileSync, statSync } from 'node:fs'
import { join, relative } from 'node:path'

const ROOT = process.cwd()
const API = 'apps/api/src'
const WEB = 'apps/web-v2/src/app'

const walk = (dir) =>
  readdirSync(join(ROOT, dir)).sort().flatMap((name) => {
    const path = `${dir}/${name}`
    return statSync(join(ROOT, path)).isDirectory() ? walk(path) : [path]
  })
const read = (path) => readFileSync(join(ROOT, path), 'utf8')
const byId = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0)
const quoted = (text) => [...text.matchAll(/'([^']+)'/g)].map((m) => m[1])

const permissions = quoted(read(`${API}/access/permissions.ts`).split('=')[1])
const roleBlock = read(`${API}/access/role-permissions.ts`)
const roles = [...roleBlock.matchAll(/^\s{2}(\w+): \[([^\]]*)\]/gm)].map((m) => ({ role: m[1], keys: quoted(m[2]) }))

const routeFiles = walk(API).filter((f) => f.endsWith('.routes.ts'))
const api = routeFiles.flatMap((file) => {
  const lines = read(file).split('\n')
  const starts = lines.flatMap((line, i) => (/^app\.(get|post|put|patch|delete)\(/.test(line) ? [i] : []))
  return starts.map((start, n) => {
    const [, verb, path, options = ''] = /^app\.(\w+)\('([^']+)'(?:, \{([^}]*)\})?/.exec(lines[start])
    const method = verb.toUpperCase()
    const end = (starts[n + 1] ?? lines.length) - 1
    const permission = /permission: '([^']+)'/.exec(options)?.[1]
    return {
      id: `api:${method} ${path}`,
      method,
      path,
      prefix: '/api/v1',
      files: [file],
      handler: { file, line: start + 1, endLine: end },
      calls: [],
      directPermissions: permission ? [permission] : [],
      hasSchema: false,
      ...(/idempotency: true/.test(options) ? { idempotency: true } : {}),
    }
  })
}).sort(byId)

const tables = [...read(`${API}/db/schema.ts`).matchAll(/export const (\w+) = pgTable\('([^']+)'/g)]
  .map((m) => ({ id: `table:${m[2]}`, file: `${API}/db/schema.ts`, symbol: m[1], table: m[2] }))
  .sort(byId)

const ui = walk(WEB).filter((f) => f.endsWith('/page.tsx')).map((file) => {
  const route = `/${relative(WEB, file).replace(/\/?page\.tsx$/, '')}`
  const isAdmin = route.startsWith('/admin')
  return { id: `ui:${route}`, file, group: route.split('/')[1] || 'home', route, ...(isAdmin ? { nav: 'admin', navId: `admin-${route.split('/')[2] ?? 'home'}` } : {}) }
}).sort(byId)

const files = {
  'perm.json': { kind: 'perm', items: permissions.map((key) => ({ id: `perm:${key}`, key, roles: roles.filter((r) => r.keys.includes(key)).map((r) => r.role).sort() })).sort(byId) },
  'role.json': { kind: 'role', items: roles.map((r) => ({ id: `role:${r.role}`, role: r.role, scope: 'workspace', permissionCount: r.keys.length })).sort(byId) },
  'api.json': { kind: 'api', items: api },
  'table.json': { kind: 'table', items: tables },
  'ui.json': { kind: 'ui', items: ui },
}
process.stdout.write(JSON.stringify({ files }))
