const { PrismaClient } = require('@prisma/client');
const { getListPhonebook, addPhonebook, editPhonebook, deletePhonebook } = require('../../../server/services/Prisma');

// Mock PrismaClient and its methods
jest.mock('@prisma/client', () => {
  const findManyMock = jest.fn();
  const createMock = jest.fn();
  const updateMock = jest.fn();
  const deleteMock = jest.fn();
  class PrismaClientMock {
    constructor() {
      this.phonebook = {
        findMany: findManyMock,
        create: createMock,
        update: updateMock,
        delete: deleteMock
      };
      this.$disconnect = () => {};
    }
  }
  return {
    PrismaClient: PrismaClientMock
  };
});

describe('Prisma-based Phonebook CRUD operations', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getListPhonebook', () => {
    it('should return phonebook list', async () => {
      const mockData = [
        { id: 1, name: 'Nabhan XL', number: '+62818666040' },
        { id: 2, name: 'Nabhan TSEL', number: '+6281229743370' }
      ];

      const prismaMock = new PrismaClient();
      prismaMock.phonebook.findMany.mockResolvedValue(mockData);

      const result = await getListPhonebook();

      expect(result).toEqual(mockData);
      expect(prismaMock.phonebook.findMany).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = new Error('Mock error');
      const prismaMock = new PrismaClient();
      prismaMock.phonebook.findMany.mockRejectedValue(mockError);

      await expect(getListPhonebook()).rejects.toThrow(mockError);
      expect(prismaMock.phonebook.findMany).toHaveBeenCalled();
    });
  });

  describe('addPhonebook', () => {
    it('should successfully add phonebook entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.phonebook.create.mockResolvedValue('success');
      await addPhonebook('Nabhan TSEL', '+6281229743370');
      expect(prismaMock.phonebook.create).toHaveBeenCalled();
    });
  });

  describe('editPhonebook', () => {
    it('should successfully edit phonebook entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.phonebook.update.mockResolvedValue({ id: 2, name: 'Nabhan', number: '0818666040' });
      await editPhonebook('2', 'Nabhan', '0818666040');
      expect(prismaMock.phonebook.update).toHaveBeenCalled();
    });

    it('should throw error', async () => {
      const mockError = { code: 'P2025' };
      const prismaMock = new PrismaClient();
      prismaMock.phonebook.update.mockRejectedValue(mockError);
      const result = await editPhonebook('Nabhan', '0818666040');
      expect(result).toBe(false);
      expect(prismaMock.phonebook.update).toHaveBeenCalled();
    });
  });

  describe('deletePhonebook', () => {
    it('should successfully delete phonebook entry', async () => {
      const prismaMock = new PrismaClient();
      prismaMock.phonebook.delete.mockResolvedValue({ id: 2, name: 'Nabhan', number: '0818666040' });
      await deletePhonebook('Nabhan');
      expect(prismaMock.phonebook.delete).toHaveBeenCalled();
    });
  });
});
