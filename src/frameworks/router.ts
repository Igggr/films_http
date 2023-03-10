import { Route, HttpMethod, EndPoint, Handler, ValidationError } from "./type-helpers";

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