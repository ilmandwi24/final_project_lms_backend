const MySQL = require('mysql2/promise');
const { addCourse, getAllCourse, deleteCourse, getAllCourseByIntructor } = require('../../../server/services/Course');

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

describe('Course Test', () => {
    let queryMock;
    let releaseMock;

    beforeEach(() => {
        queryMock = MySQL.createPool().getConnection().query;
        releaseMock = MySQL.createPool().getConnection().release;
        jest.clearAllMocks();
    });

    describe('Add Course', () => {
        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            // name,description,instructorId
            await expect(addCourse('Laravel 10 Basic', 'Laravel 10 Description', '1')).rejects.toThrow(mockError);
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
            await addCourse('Laravel 10 Basic', 'Laravel 10 Description', '1');
            expect(queryMock).toHaveBeenCalled();
            expect(releaseMock).toHaveBeenCalled();
        });
            


     
    });

    describe('Get All Course', () => {

        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            await expect(getAllCourse()).rejects.toThrow(mockError);
            expect(releaseMock).toHaveBeenCalled();
        });
        it('should return all course', async () => {
            const mockQuery = [
                {
                   id: 123,
                   nama: "Laravel 10",
                   description: "Laravel 10 Description"
                   
                },
                // { id: 2, name: 'Nabhan TSEL', number: '+6281229743370' }
            ];
            queryMock.mockResolvedValue([mockQuery]);
            const result = await getAllCourse();
            expect(result).toEqual(mockQuery);
            expect(releaseMock).toHaveBeenCalled();
        });
       
    });

    describe('Get All Course By Instructor', () => {
        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            await expect(getAllCourseByIntructor(1)).rejects.toThrow(mockError);
            expect(releaseMock).toHaveBeenCalled();
        });
        it('should return email', async () => {
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
            await getAllCourseByIntructor(1);
            expect(queryMock).toHaveBeenCalled();
            expect(releaseMock).toHaveBeenCalled();
        });
    });
    describe('Delete Course', () => {
        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            await expect(deleteCourse(1)).rejects.toThrow(mockError);
            expect(releaseMock).toHaveBeenCalled();
        });
        it('should return email', async () => {
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
            await deleteCourse(1);
            expect(queryMock).toHaveBeenCalled();
            expect(releaseMock).toHaveBeenCalled();
        });
    });

});