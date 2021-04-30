import * as cron from 'node-cron';
import { Request, Response } from 'express';
import { emailJob } from './jobs/emailJob';

export const emailTask = (): void => {
	cron.schedule(
		'0 30 9 26 * *',
		() => {
			const categories = ['Hole', 'Water', 'Electricity'];
			const req = {} as Request;

			const response = () => {
				const res: Response = {} as Response;
				res.sendStatus = () => this;
				return res;
			};

			categories.forEach(async (category) => {
				const res = response();
				req.query = {
					category,
				};
				await emailJob(req, res);
			});
		},
		{
			timezone: 'America/Sao_Paulo',
		},
	);
};
