declare module 'express-ejs-layouts' {
  import { RequestHandler } from 'express';
  const layoutMiddleware: RequestHandler & {
    extractScripts?: (html: string) => string;
  };
  export default layoutMiddleware;
}
