import { Router, Request, Response } from 'express';
import { paths } from './config/enviroments';
import { UsersProxy } from './api/users/UsersProxy';
import { ComplaintProxy } from './api/complaint/ComplaintProxy';

const routers = Router();
const usersProxy = new UsersProxy(paths.configUsers());
const complaintProxy = new ComplaintProxy(paths.configComplaint());

routers.get("/api/users/ping", async (req: Request, resp: Response) => {
    const response = await usersProxy.pingUser();
    resp.status(200).json(response);
});

routers.get("/api/complaints/ping", async (req: Request, resp: Response) => {
    const response = await complaintProxy.pingComplaint();
    resp.status(200).json(response);
})

routers.get("/api/complaints", async (req: Request, resp: Response) => {
    try {
        const response = await complaintProxy.listComplaints(req.query.skip as string, req.query.take as string, req.query.orderDate as string);
        resp.status(200).json(response);
    } catch (error) {
        resp.status(400);
        resp.json({
            status: 'erro',
            error
        })
    }
})

routers.post("/api/complaint/create", async (req:Request, resp:Response) => {
    return await complaintProxy.createComplaint(req, resp);
});

routers.post("/api/vote/add", async (req:Request, resp:Response) => {
    return await complaintProxy.addVote(req, resp);
});

routers.get("/api/vote/list", async (req:Request, resp: Response) => {
    return await complaintProxy.listVote(req, resp);
})

export default routers;