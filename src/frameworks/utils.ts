import { IncomingMessage } from "http";


export function getReqData(req: IncomingMessage): Promise<Record<string, string>> {
    return new Promise((resolve, reject) => {
        try {
            let body = "";
            req.on("data", (chunk) => {
                body += chunk.toString();
            });
            req.on("end", () => {resolve(JSON.parse(body));
            });
        } catch (error) {
            reject(error);
        }
    });
}