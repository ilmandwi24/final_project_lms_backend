const MySQL = require('mysql2/promise');
const { addPurchase } = require('../../../server/services/Purchase');

jest.mock('mysql2/promise', () => {
    const queryMock = jest.fn();
    const releaseMock = jest.fn();
    return {
        createPool: () => ({
            getConnection: () => ({
                query: queryMock,
                release: releaseMock
            })
        })
    };
});

describe('Purchase Test', () => {
    let queryMock;
    let releaseMock;

    beforeEach(() => {
        queryMock = MySQL.createPool().getConnection().query;
        releaseMock = MySQL.createPool().getConnection().release;
        jest.clearAllMocks();
    });

    describe('Add Purchase', () => {
        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            await expect(addPurchase(1,2)).rejects.toThrow(mockError);
            expect(releaseMock).toHaveBeenCalled();
        });
        it('should return purchase', async () => {
            const mockQuery = {
                fieldCount: 0,
                affectedRows: 1,
                insertId: 11,
                serverStatus: 2,
                warningCount: 0,
                message: '',
                protocol41: true,
                changedRows: 0
            };
            queryMock.mockResolvedValue([mockQuery]);
            await addPurchase(1,2);
            expect(queryMock).toHaveBeenCalled();
            expect(releaseMock).toHaveBeenCalled();
        });
            


     
    });

});