import { Router, Request, Response } from 'express';
import { paths } from './config/enviroments';
import { UsersProxy } from './api/users/UsersProxy';
import { ComplaintProxy } from './api/complaint/ComplaintProxy';
import { ReportProxy } from './api/report/ReportProxy';
import { MailerProxy } from './api/mailer/MailerProxy';

const routers = Router();
const usersProxy = new UsersProxy(paths.configUsers());
const complaintProxy = new ComplaintProxy(paths.configComplaint());
const reportProxy = new ReportProxy(paths.configReport());
const mailerProxy = new MailerProxy(paths.configMailer());

routers.get('/api/users/ping', async (req: Request, resp: Response) => {
	return await usersProxy.pingUser(req, resp);
});

routers.get('/api/complaints/ping', async (req: Request, resp: Response) => {
	return await complaintProxy.pingComplaint(req, resp);
});

routers.post('/api/complaints', async (req: Request, resp: Response) => {
	return await complaintProxy.createComplaint(req, resp);
});

routers.post('/api/votes', async (req: Request, resp: Response) => {
	return await complaintProxy.addVote(req, resp);
});

routers.get('/api/votes', async (req: Request, resp: Response) => {
	return await complaintProxy.listVote(req, resp);
});

routers.get('/api/mailer/ping', async (req: Request, resp: Response) => {
	const response = await mailerProxy.pingMailer(resp);
	resp.status(200).json(response);
});

routers.get('/api/complaints', async (req: Request, resp: Response) => {
	return await complaintProxy.listComplaints(req, resp);
});

routers.get('/api/reports/ping', async (req: Request, resp: Response) => {
	return await reportProxy.pingReport(req, resp);
});

routers.get('/api/complaints/votes', async (req: Request, resp: Response) => {
	return await complaintProxy.getComplaintWithVote(req, resp);
});

routers.delete('/api/complaint/delete', async (req: Request, resp: Response) => {
	return await complaintProxy.deleteComplaint(req, resp);
});

routers.post('/api/mailer/send', async (req: Request, resp: Response) => {
	try {
		const reportRequest = {} as Request;
		const complaintResponse = await complaintProxy.getWaitComplaints(req);
		reportRequest.body = {
			complaints: complaintResponse,
			category: String(req.query.category),
		};
		const reportResponse = await reportProxy.createReport(reportRequest);
		const mailerRequest = {} as Request;
		mailerRequest.body = reportResponse;
		return await mailerProxy.sendMail(mailerRequest, resp);
	} catch (error) {
		return resp.status(400).json({ error: error });
	}
});

routers.post('/api/users', async (req: Request, resp: Response) => {
	return usersProxy.createUser(req, resp);
});
export default routers;
