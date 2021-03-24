import axios from 'axios';
import { response, Response, Request } from 'express';


export class ComplaintProxy {
    path: string;

    constructor(path: string) {
        this.path = path;
    }

    pingComplaint(): Promise<Response> {
        return new Promise(resolve => {
            axios.get(this.path + '/ping', {}).then(response => {
                resolve(response.data);
            }).catch(() => {
                resolve(response.json({ "error": "error" }));
            });
        });
    }

    listComplaints(skip: string, take: string, orderDate: string): Promise<Response> {
        return new Promise(resolve => {
            axios.get(this.path + '/complaints', {
                params: {
                    skip: skip,
                    take: take,
                    orderDate: orderDate
                }
            }).then(response => {
                resolve(response.data);
            }).catch(() => {
                resolve(response.json({ "error": "error" }));
            });
        });
    }

    async createComplaint(req:Request, resp: Response): Promise<Response>{
        try {
            const res = await axios.post(this.path + '/complaint/create', req.body);
            return resp.sendStatus(res.status);
        } catch(err) {
            return resp.status(err.response.status).json(err.response.data);
        }
    }

    async addVote(req:Request, resp: Response): Promise<Response>{
        try {
            const res = await axios.post(this.path + '/vote/add', req.body);
            return resp.sendStatus(res.status);
        } catch(err) {
            return resp.status(err.response.status).json(err.response.data);
        }
    }
}