// __tests__/phonebook.test.js
const Request = require('supertest');
const TestHelper = require('../../../server/helpers/TestHelper');
const sample = require('../../../server/api/sample');
const Database = require('../../../server/services/Database');
const Prisma = require('../../../server/services/Prisma');
const Redis = require('../../../server/services/Redis');

jest.mock('../../../server/services/Redis', () => ({
  getKey: jest.fn(),
  setWithExpire: jest.fn()
}));

let server;
describe('Sample', () => {
  beforeAll(() => {
    server = TestHelper.createTestServer('/api/sample', sample);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('API v1 Anime', () => {
    describe('GET /v1/anime/recomendation', () => {
      it('should return 200 and get anime list from fetch', async () => {
        const mockAnimeList = {
          pagination: {
            last_visible_page: 20,
            has_next_page: true
          },
          data: []
        };
        Redis.getKey.mockResolvedValue(null);
        Redis.setWithExpire.mockResolvedValue(null);
        jest.spyOn(global, 'fetch').mockResolvedValue({
          json: jest.fn().mockResolvedValue(mockAnimeList)
        });

        const response = await Request(server).get('/api/sample/v1/anime/recomendation');
        expect(response.status).toBe(200);
      });

      it('should return 200 and get anime list from redis', async () => {
        const mockAnimeList = '{"pagination":{"last_visible_page":20,"has_next_page":true},"data":[]}';
        Redis.getKey.mockResolvedValue(mockAnimeList);
        const response = await Request(server).get('/api/sample/v1/anime/recomendation');
        expect(response.status).toBe(200);
      });
      it('should return 500 on error whet fetch anime list', async () => {
        Redis.getKey.mockResolvedValue(null);
        Redis.setWithExpire.mockResolvedValue(null);
        jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Internal Server Error'));
        const response = await Request(server).get('/api/sample/v1/anime/recomendation');
        expect(response.status).toBe(500);
      });
    });
  });

  describe('API V1 Query Database', () => {
    describe('GET /v1/phonebook', () => {
      it('should return 200 and phonebook list, when get list phonebook', async () => {
        const mockPhonebookList = [
          { id: 1, name: 'Nabhan XL', number: '+62818666040' },
          { id: 2, name: 'Nabhan TSEL', number: '+6281229743370' }
        ];
        jest.spyOn(Database, 'getListPhonebook').mockResolvedValue(mockPhonebookList);

        const response = await Request(server).get('/api/sample/v1/phonebook');
        expect(response.status).toBe(200);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Database, 'getListPhonebook').mockResolvedValue([]);
        const response = await Request(server).get('/api/sample/v1/phonebook');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'getListPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/sample/v1/phonebook');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v1/phonebook', () => {
      it('should return 200 and success message, when add phonebook', async () => {
        jest.spyOn(Database, 'addPhonebook').mockResolvedValue('success');
        const response = await Request(server).post('/api/sample/v1/phonebook').send({
          name: 'Nabhan TSEL',
          number: '+6281229743370'
        });
        expect(response.status).toBe(200);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'addPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).post('/api/sample/v1/phonebook').send({
          name: 'Nabhan TSEL',
          number: '+6281229743370'
        });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v1/phonebook/:id', () => {
      it('should return 200 and success message, when edit phonebook', async () => {
        jest.spyOn(Database, 'editPhonebook').mockResolvedValue({ id: 2, name: 'Nabhan', number: '0818666040' });
        const response = await Request(server).put('/api/sample/v1/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server).put('/api/sample/v1/phonebook/1').send({
          name: 'Nabhan',
          msisdn: '0818666040'
        });
        expect(response.status).toBe(400);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Database, 'editPhonebook').mockResolvedValue(false);
        const response = await Request(server).put('/api/sample/v1/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'editPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).put('/api/sample/v1/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v1/phonebook/:id', () => {
      it('should return 200 and success message, when delete phonebook', async () => {
        jest.spyOn(Database, 'deletePhonebook').mockResolvedValue({ id: 2, name: 'Nabhan', number: '0818666040' });
        const response = await Request(server).delete('/api/sample/v1/phonebook/1');
        expect(response.status).toBe(200);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Database, 'deletePhonebook').mockResolvedValue(false);
        const response = await Request(server).delete('/api/sample/v1/phonebook/1');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Database, 'deletePhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/sample/v1/phonebook/1');
        expect(response.status).toBe(500);
      });
    });
  });

  describe('API V2 ORM', () => {
    describe('GET /v2/phonebook', () => {
      it('should return 200 and phonebook list, when get list phonebook', async () => {
        const mockPhonebookList = [
          { id: 1, name: 'Nabhan XL', number: '+62818666040' },
          { id: 2, name: 'Nabhan TSEL', number: '+6281229743370' }
        ];
        jest.spyOn(Prisma, 'getListPhonebook').mockResolvedValue(mockPhonebookList);

        const response = await Request(server).get('/api/sample/v2/phonebook');
        expect(response.status).toBe(200);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Prisma, 'getListPhonebook').mockResolvedValue([]);
        const response = await Request(server).get('/api/sample/v2/phonebook');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'getListPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).get('/api/sample/v2/phonebook');
        expect(response.status).toBe(500);
      });
    });

    describe('POST /v2/phonebook', () => {
      it('should return 200 and success message, when add phonebook', async () => {
        jest.spyOn(Prisma, 'addPhonebook').mockResolvedValue('success');
        const response = await Request(server).post('/api/sample/v2/phonebook').send({
          name: 'Nabhan TSEL',
          number: '+6281229743370'
        });
        expect(response.status).toBe(200);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'addPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).post('/api/sample/v2/phonebook').send({
          name: 'Nabhan TSEL',
          number: '+6281229743370'
        });
        expect(response.status).toBe(500);
      });
    });

    describe('PUT /v1/phonebook/:id', () => {
      it('should return 200 and success message, when edit phonebook', async () => {
        jest.spyOn(Prisma, 'editPhonebook').mockResolvedValue({ id: 1, name: 'Nabhan', number: '0818666040' });
        const response = await Request(server).put('/api/sample/v2/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(200);
      });

      it('should return 400 and success message, incorrect body', async () => {
        const response = await Request(server).put('/api/sample/v2/phonebook/1').send({
          name: 'Nabhan',
          msisdn: '0818666040'
        });
        expect(response.status).toBe(400);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Prisma, 'editPhonebook').mockResolvedValue(false);
        const response = await Request(server).put('/api/sample/v2/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'editPhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).put('/api/sample/v2/phonebook/1').send({
          name: 'Nabhan',
          number: '0818666040'
        });
        expect(response.status).toBe(500);
      });
    });

    describe('DELETE /v1/phonebook/:id', () => {
      it('should return 200 and success message, when delete phonebook', async () => {
        jest.spyOn(Prisma, 'deletePhonebook').mockResolvedValue({ id: 2, name: 'Nabhan', number: '0818666040' });
        const response = await Request(server).delete('/api/sample/v2/phonebook/1');
        expect(response.status).toBe(200);
      });

      it('should return 404 when phonebook not found', async () => {
        jest.spyOn(Prisma, 'deletePhonebook').mockResolvedValue(false);
        const response = await Request(server).delete('/api/sample/v2/phonebook/1');
        expect(response.status).toBe(404);
      });

      it('should return 500 when error', async () => {
        jest.spyOn(Prisma, 'deletePhonebook').mockRejectedValue(new Error('Mock error'));
        const response = await Request(server).delete('/api/sample/v2/phonebook/1');
        expect(response.status).toBe(500);
      });
    });
  });
});
