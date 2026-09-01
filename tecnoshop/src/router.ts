type RouteHandler = (params: Record<string, string>, query: URLSearchParams) => void;

interface Route {
  pattern: RegExp;
  keys: string[];
  handler: RouteHandler;
}

const routes: Route[] = [];
let notFoundHandler: RouteHandler = () => {};

function compile(path: string): { pattern: RegExp; keys: string[] } {
  const keys: string[] = [];
  const pattern = path
    .split('/')
    .map((segment) => {
      if (segment.startsWith(':')) {
        keys.push(segment.slice(1));
        return '([^/]+)';
      }
      return segment.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    })
    .join('/');
  return { pattern: new RegExp(`^${pattern}$`), keys };
}

export function route(path: string, handler: RouteHandler) {
  const { pattern, keys } = compile(path);
  routes.push({ pattern, keys, handler });
}

export function notFound(handler: RouteHandler) {
  notFoundHandler = handler;
}

export function navigate(path: string) {
  window.location.hash = path;
}

function resolve() {
  const hash = window.location.hash.slice(1) || '/';
  const [pathPart, queryPart] = hash.split('?');
  const query = new URLSearchParams(queryPart || '');
  for (const r of routes) {
    const match = r.pattern.exec(pathPart);
    if (match) {
      const params: Record<string, string> = {};
      r.keys.forEach((k, i) => (params[k] = decodeURIComponent(match[i + 1])));
      r.handler(params, query);
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
      return;
    }
  }
  notFoundHandler({}, query);
}

export function startRouter() {
  window.addEventListener('hashchange', resolve);
  window.addEventListener('DOMContentLoaded', resolve);
  resolve();
}
