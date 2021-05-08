import { Request, Response } from 'express';
import AuthValidator from '../../src/api/middlewares/auth';
import { UsersProxy } from '../../src/api/users/UsersProxy';

const mockResponse = () => {
	const res: Response = {} as Response;
	res.status = jest.fn().mockReturnValue(res);
	res.sendStatus = jest.fn().mockReturnValue(res);
	res.json = jest.fn().mockReturnValue(res);
	return res;
};

describe('Test auth middleware', () => {
	it('User is authenticated', async () => {
		const mRequest = {
			headers: {
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2NrIjoidG9rZW4ifQ.XXx47Hiq9qlQgyNyhZ6-z2MGTH7e2L0kfaB17YXPsKA',
			},
		} as Request;
		const mResponse = mockResponse();
		const mNext = jest.fn();

		const authValidator = new AuthValidator();
		jest.spyOn(
			UsersProxy.prototype,
			'authorization',
		).mockImplementation(() =>
			Promise.resolve('b34783ad-2534-4893-9efa-f3d602a0f0fc'),
		);
		await authValidator.checkJWT(mRequest, mResponse, mNext);
		expect(mNext).toHaveBeenCalled();
	});

	it('User does not have a token', async () => {
		const mRequest = {
			headers: {},
		} as Request;
		const mResponse = mockResponse();
		const mNext = jest.fn();

		const authValidator = new AuthValidator();
		await authValidator.checkJWT(mRequest, mResponse, mNext);
		expect(mResponse.status).toHaveBeenCalledWith(403);
	});

	it('User has an invalid token', async () => {
		const mRequest = {
			headers: {
				authorization:
					'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtb2NrIjoidG9rZW4ifQ.XXx47Hiq9qlQgyNyhZ6-z2MGTH7e2L0kfaB17YXPsKA',
			},
		} as Request;
		const mResponse = mockResponse();
		const mNext = jest.fn();

		const authValidator = new AuthValidator();
		jest.spyOn(
			UsersProxy.prototype,
			'authorization',
		).mockImplementation(() => Promise.reject('Invalid token'));
		await authValidator.checkJWT(mRequest, mResponse, mNext);
		expect(mResponse.status).toHaveBeenCalledWith(403);
	});
});
