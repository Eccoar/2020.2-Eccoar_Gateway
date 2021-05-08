import { Request, Response, NextFunction } from 'express';
import { paths } from '../../config/enviroments';
import { UsersProxy } from '../users/UsersProxy';

const userProxy = new UsersProxy(paths.configUsers());

export default class AuthValidator {
	checkJWT = async (
		req: Request,
		resp: Response,
		next: NextFunction,
	): Promise<Response | void> => {
		const token: string = req.headers['authorization'];
		if (!token)
			return resp
				.status(403)
				.json({ status: 'error', message: 'Access Denied' });
		try {
			await userProxy.authorization(token);
		} catch (err) {
			return resp
				.status(403)
				.json({ status: 'error', message: 'Access Denied' });
		}
		next();
	};
}
