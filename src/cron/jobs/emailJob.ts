import { Request, Response } from 'express';
import { paths } from '../../config/enviroments';
import { ComplaintProxy } from '../../api/complaint/ComplaintProxy';
import { ReportProxy } from '../../api/report/ReportProxy';
import { MailerProxy } from '../../api/mailer/MailerProxy';

const complaintProxy = new ComplaintProxy(paths.configComplaint());
const reportProxy = new ReportProxy(paths.configReport());
const mailerProxy = new MailerProxy(paths.configMailer());

export const emailJob = async (
	req: Request,
	res: Response,
): Promise<Response> => {
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
		return await mailerProxy.sendMail(mailerRequest, res);
	} catch (error) {
		return res.status(400).json({ error: error });
	}
};
