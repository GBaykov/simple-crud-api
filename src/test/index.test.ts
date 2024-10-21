import request from 'supertest';
import * as http from 'http';
import { serverStarter } from '../api';

let server: http.Server;

beforeAll((done) => {
  server = http.createServer(serverStarter);
  server.listen(4000, () => done());
});

afterAll((done) => {
  server.close(() => done());
});

describe('User API testing', () => {
  let user_id: string;

  it('should create new_user', async () => {
    const newUser = {
      username: 'Admin',
      age: 25,
      hobbies: ['string'],
    };

    const response = await request(server).post('/api/users').send(newUser);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(response.body.username).toBe('Admin');
    expect(response.body.age).toBe(25);
    expect(response.body.hobbies).toEqual(['string']);

    user_id = response.body.id;
  });

  it('should return user by user_is', async () => {
    const response = await request(server).get(`/api/users/${user_id}`);
    expect(response.status).toBe(200);
    expect(response.body.id).toBe(user_id);
    expect(response.body.username).toBe('Admin');
    expect(response.body.age).toBe(25);
    expect(response.body.hobbies).toEqual(['string']);
  });

  it('should update  user', async () => {
    const updatedUser = {
      username: 'updated_name',
      age: 25,
      hobbies: ['coding', 'reading'],
    };

    const response = await request(server)
      .put(`/api/users/${user_id}`)
      .send(updatedUser);
    expect(response.status).toBe(200);
    expect(response.body.age).toBe(25);
    expect(response.body.username).toBe('updated_name');
    expect(response.body.hobbies).toEqual(['coding', 'reading']);
  });

  it('should remove user by user_id', async () => {
    const response = await request(server).delete(`/api/users/${user_id}`);
    expect(response.status).toBe(204);

    const getResponse = await request(server).get(`/api/users/${user_id}`);
    expect(getResponse.status).toBe(404);
  });

  it('should return empty array', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should return 404', async () => {
    const response = await request(server).get(`/api/users/${user_id}`);
    expect(response.status).toBe(404);
  });
});
