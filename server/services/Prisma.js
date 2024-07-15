const { PrismaClient } = require('@prisma/client');
const CommonHelper = require('../helpers/CommonHelper');

const prisma = new PrismaClient();

const executePrismaOperation = async (operationName, operationFunction) => {
  try {
    const timeStart = process.hrtime();
    const data = await operationFunction();
    const timeDiff = process.hrtime(timeStart);
    const timeTaken = Math.round((timeDiff[0] * 1e9 + timeDiff[1]) / 1e6);
    CommonHelper.log(['Prisma', operationName, 'INFO'], {
      message: { timeTaken },
      data
    });
    prisma.$disconnect();
    return data;
  } catch (error) {
    prisma.$disconnect();
    if (error?.code === 'P2025') {
      // Handle the case where the record is not found
      CommonHelper.log(['Prisma', operationName, 'WARN'], {
        message: `No phonebook entry found`
      });
      return false;
    }
    // Log other errors
    CommonHelper.log(['Prisma', operationName, 'ERROR'], {
      message: `${error}`
    });
    throw error;
  }
};

const getListPhonebook = async () => executePrismaOperation('getListPhonebook', () => prisma.phonebook.findMany());

const addPhonebook = async (name, number) => {
  await executePrismaOperation('addPhonebook', async () => {
    await prisma.phonebook.create({
      data: {
        name,
        number
      }
    });
  });
};

const editPhonebook = async (id, name, number) =>
  executePrismaOperation('editPhonebook', async () => {
    const result = await prisma.phonebook.update({
      where: {
        id: Number(id)
      },
      data: {
        name,
        number
      }
    });
    return !!result;
  });

const deletePhonebook = async (id) =>
  executePrismaOperation('deletePhonebook', async () => {
    const result = await prisma.phonebook.delete({
      where: {
        id: Number(id)
      }
    });
    return !!result;
  });

module.exports = { getListPhonebook, addPhonebook, editPhonebook, deletePhonebook };
