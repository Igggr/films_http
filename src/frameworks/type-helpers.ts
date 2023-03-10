import { IncomingMessage, RequestListener, ServerResponse } from "http";


export type Handler = RequestListener<typeof IncomingMessage, typeof ServerResponse>;

// HEAD, OPTIONS, TRACE поддерживать не будем
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type EndPoint = string | RegExp;

export type Route = {
    method: HttpMethod;
    endPoint: EndPoint;
    handler: Handler;
};
export class ValidationError extends Error { }

export type Req = IncomingMessage & { id: string; };
export type Res = ServerResponse<IncomingMessage> & { req: IncomingMessage; };
