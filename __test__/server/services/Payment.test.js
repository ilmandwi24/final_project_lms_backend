const MySQL = require('mysql2/promise');
const { addPayment } = require('../../../server/services/Payment');

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

describe('Payment Test', () => {
    let queryMock;
    let releaseMock;

    beforeEach(() => {
        queryMock = MySQL.createPool().getConnection().query;
        releaseMock = MySQL.createPool().getConnection().release;
        jest.clearAllMocks();
    });

    describe('Add Payment', () => {
        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            // amount, payment_method, purchase_id, payment_status
            await expect(addPayment(10000, 'bca', '1', 'unpaid')).rejects.toThrow(mockError);
            expect(releaseMock).toHaveBeenCalled();
        });
        it('should return user', async () => {
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
            await addPayment(10000, 'bca', '1', 'unpaid');
            expect(queryMock).toHaveBeenCalled();
            expect(releaseMock).toHaveBeenCalled();
        });
            


     
    });

   


});