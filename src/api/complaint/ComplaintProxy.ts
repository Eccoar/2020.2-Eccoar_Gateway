import axios from 'axios';
import { Response, Request, request } from 'express';

export class ComplaintProxy {
	path: string;

	constructor(path: string) {
		this.path = path;
	}

	async pingComplaint(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.get(this.path + '/ping', {});
			return resp.status(res.status).json(res.data);
		} catch (error) {
			console.error(error);
			return resp.status(error.response.status).json(error.response.data);
		}
	}

	async listComplaints(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.get(this.path + '/complaints', {
				params: {
					skip: String(req.query.skip),
					take: String(req.query.take),
					orderDate: String(req.query.orderDate),
				},
			});
			return resp.status(res.status).json(res.data);
		} catch (error) {
			console.error(error);
			return resp.status(error.response.status).json(error.response.data);
		}
	}

	async getComplaintWithVote(
		req: Request,
		resp: Response,
	): Promise<Response> {
		try {
			const res = await axios.get(this.path + '/complaint/votes', {
				params: {
					userId: req.query.userId,
					complaintId: req.query.complaintId,
				},
			});
			return resp.status(res.status).json(res.data);
		} catch (error) {
			console.error(error);
			return resp.status(error.response.status).json(error.response.data);
		}
	}

	async createComplaint(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.post(
				this.path + '/complaint/create',
				req.body,
			);
			return resp.status(res.status).json(res.data);
		} catch (error) {
			console.error(error);
			return resp.status(error.response.status).json(error.response.data);
		}
	}

	async removeVote(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.delete(this.path + '/vote/remove', {
				params: {
					userId: Number(req.query.userId),
					complaintId: Number(req.query.complaintId),
				},
			});
			return resp.status(res.status).json({ msg: 'OK' });
		} catch (err) {
			return resp.status(err.response.status).json(err.response.data);
		}
	}

	async addVote(req: Request, resp: Response): Promise<Response> {
		try {
			const res = await axios.post(this.path + '/vote/add', req.body);
<<<<<<< HEAD
			return resp.sendStatus(res.status);
		} catch (error) {
			console.error(error);
			return resp.status(error.response.status).json(error.response.data);
=======
			return resp.status(res.status).json(res.data);
		} catch (err) {
			return resp.status(err.response.status).json(err.response.data);
>>>>>>> Updating AddVote return
		}
	}

	async listVote(req: Request, resp: Response): Promise<Response> {
		return new Promise(() => {
			axios
				.get(
					this.path + '/vote/list',
					(req.query.latitude != null ||
						req.query.latitude != undefined) &&
						(req.query.longitude != null ||
							req.query.longitude != undefined)
						? {
								params: {
									userId: req.query.userId,
									skip: req.query.skip,
									take: req.query.take,
									latitude: req.query.latitude,
									longitude: req.query.longitude,
								},
						  }
						: {
								params: {
									userId: req.query.userId,
									skip: req.query.skip,
									take: req.query.take,
								},
						  },
				)
				.then((response) => {
					return resp.status(response.status).json(response.data);
				})
				.catch((error) => {
					console.error(error);
					return resp
						.status(error.response.status)
						.json(error.response.data);
				});
		});
	}

	async getWaitComplaints(req: Request): Promise<Response> {
		try {
			const result = await axios.get(this.path + '/complaints/wait', {
				params: {
					category: String(req.query.category),
				},
			});
			return result.data;
		} catch (error) {
			console.error(error);
			return error;
		}
	}
}
