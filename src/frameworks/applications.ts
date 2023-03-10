import { createServer, IncomingMessage, Server, ServerResponse } from 'http';
import { Router } from "./router";
import { Route, HttpMethod, Handler } from "./type-helpers";


export class Application {
    private stringRoutes: Map<string, Handler>; 
    private regExpRoutes: Route[]; 
    private server: Server<typeof IncomingMessage, typeof ServerResponse>;

    constructor() {
        this.stringRoutes = new Map();
        this.regExpRoutes = [];
        this.server = this._createServer();
    }

    public addRouter(router: Router) {
        const regExpRoutes = router.routes.filter((route) => (route.endPoint instanceof RegExp));
        const stringRoutes = router.routes.filter((route) => !(route.endPoint instanceof RegExp))
            .map((route) => {
            return [ `${route.method}:${route.endPoint}`, route.handler] as [string, Handler];
                
            }
        );
        this.regExpRoutes = [...this.regExpRoutes, ...regExpRoutes];

        this.stringRoutes = new Map([...this.stringRoutes.entries(), ...stringRoutes]);
    }

    private _createServer() {
        return createServer((req, res) => {

            res.writeHead(200, {
                'Content-Type': 'application/json'
            });

            const handler = this.findHandler(req);
            if (handler === undefined) {
                res.end('Page Does n\'t exist');
            } else {
                handler(req, res);
            }
        });
    }

    private findHandler(req: IncomingMessage): Handler | undefined {
        const method = (req.method ?? 'GET') as HttpMethod;
        const url = req.url ?? '';
        const pathMetod = `${method}:${url}`;

        if (this.stringRoutes.has(pathMetod)) {
            return this.stringRoutes.get(pathMetod);
        }
        if (this.stringRoutes.has(pathMetod + '/')) {
            return this.stringRoutes.get(pathMetod + '/');
        }
        for (const route of this.regExpRoutes) {
            if (route.method === method && (route.endPoint as RegExp).test(url)) {
                return (req, res) => {
                    const mathces = (route.endPoint as RegExp).exec(url);
                    const id = mathces?.[1];
                    (req as any).id = id;
                    return route.handler(req, res);
                };
            }
        }
        return;
    }

    listen(port: number, callback: () => void) {
        console.log(this.stringRoutes);
        console.log(this.regExpRoutes);

        this.server.listen(port, callback);
    }
}