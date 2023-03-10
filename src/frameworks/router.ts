import { IncomingMessage, RequestListener, ServerResponse } from "http";

export type Handler = RequestListener<typeof IncomingMessage, typeof ServerResponse>;

// HEAD, OPTIONS, TRACE поддерживать не будем
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type EndPoint = string | RegExp;

export type Route = {
    method: HttpMethod;
    endPoint: EndPoint;   
    handler: Handler;
} 

class ValidationError extends Error { } 


export class Router {
    public routes: Route[] = [];
    
    private addRoute(method: HttpMethod, endPoint: EndPoint, handler: Handler) {
        if (this.routes.some((route) => route.endPoint === endPoint && route.method === method)) {
            throw new ValidationError(`With EndPoint ${endPoint} allready associated handler`);
        }
        this.routes.push({ method, endPoint, handler });
    }

    get(endPoint: EndPoint, handler: Handler) {
        this.addRoute('GET', endPoint, handler);
    }

    post(endPoint: EndPoint, handler: Handler) {
        this.addRoute('POST', endPoint, handler);
    }

    put(endPoint: EndPoint, handler: Handler) {
        this.addRoute('PUT', endPoint, handler);
    }

    patch(endPoint: EndPoint, handler: Handler) {
        this.addRoute('PATCH', endPoint, handler);
    }

    delete(endPoint: EndPoint, handler: Handler) {
        this.addRoute('DELETE', endPoint, handler);
    }
}