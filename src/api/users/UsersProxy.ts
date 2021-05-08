import { Request, Response } from 'express';
import axios from 'axios';

export class UsersProxy {
	path: string;

	constructor(path: string) {
		this.path = path;
	}

	async pingUser(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.get(this.path + '/ping', {});
			return resp.status(res.status).json(res.data);
		} catch (error) {
			console.error(error);
			return resp.status(error.response.status).json(error.response.data);
		}
	}

	async createUser(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.post(this.path + '/users', req.body);
			return resp.sendStatus(res.status);
		} catch (err) {
			return resp.status(err.response.status).json(err.response.data);
		}
	}

	async getUserByAuthId(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.get(this.path + `/user/${req.params.id}`);
			return resp.status(res.status).json(res.data);
		} catch (err) {
			return resp.status(err.response.status).json(err.response.data);
		}
	}
}
