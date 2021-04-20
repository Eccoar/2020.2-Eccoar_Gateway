import axios from 'axios';
import * as request from 'supertest';
import app from '../src/server';

describe('test get ping endpoint', () => {
	const pingMock = {
		status: 200,
		body: '',
	};

	it('Get pong from ping in users route', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(pingMock),
		);
		const result = await request(app).get('/api/users/ping').send({});
		expect(result.status).toEqual(200);
		expect(result.body).toContain(pingMock.body);
	});

	it('Get pong from ping in complaints route', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(pingMock),
		);
		const result = await request(app).get('/api/complaints/ping').send({});
		expect(result.status).toEqual(200);
		expect(result.body).toContain(pingMock.body);
	});

	it('Get pong from ping in reports route', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(pingMock),
		);
		const result = await request(app).get('/api/reports/ping').send({});
		expect(result.status).toEqual(200);
		expect(result.body).toContain(pingMock.body);
	});
});

describe('test complaints route', () => {
	const mockStatus = {
		status: 200,
	};

	it('Test get complaints API', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).get('/api/complaints').send({});
		expect(result.status).toEqual(200);
	});

	it('Test create complaints API', async () => {
		jest.spyOn(axios, 'post').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).post('/api/complaints').send({});
		expect(result.status).toEqual(200);
	});

	it('Test adds vote API', async () => {
		jest.spyOn(axios, 'post').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).post('/api/votes').send({});
		expect(result.status).toEqual(200);
	});

	it('Test remove vote API', async () => {
		jest.spyOn(axios, 'delete').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).delete('/api/votes').send({});
		expect(result.status).toEqual(200);
	});

	it('Test lists votes API', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).get('/api/votes').send({});
		expect(result.status).toEqual(200);
	});

	it('Test gets complaints with votes API', async () => {
		jest.spyOn(axios, 'get').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).get('/api/complaints/votes').send({});
		expect(result.status).toEqual(200);
	});
});

describe('Test User route', () => {
	const mockStatus = {
		status: 200,
	};

	it('Test create user route', async () => {
		jest.spyOn(axios, 'post').mockImplementationOnce(() =>
			Promise.resolve(mockStatus),
		);
		const result = await request(app).post('/api/users').send({});
		expect(result.status).toEqual(200);
	});
});
