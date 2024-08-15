const MySQL = require('mysql2/promise');
const { getAllLessonByIdCourse, getLessonById, addLessonToCourse } = require('../../../server/services/Lesson');

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

describe('Lesson Test', () => {
    let queryMock;
    let releaseMock;

    beforeEach(() => {
        queryMock = MySQL.createPool().getConnection().query;
        releaseMock = MySQL.createPool().getConnection().release;
        jest.clearAllMocks();
    });

    describe('Add Lesson To Course', () => {

        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            await expect(addLessonToCourse(1, 'title', 'content')).rejects.toThrow(mockError);
            expect(releaseMock).toHaveBeenCalled();
        });
        it('should return lesson by', async () => {
        
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
            await addLessonToCourse(1, 'title', 'content');
            expect(queryMock).toHaveBeenCalled();
            expect(releaseMock).toHaveBeenCalled();
        });
       
    });

    describe('getAllLessonByIdCourse', () => {
        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            await expect(getAllLessonByIdCourse(1)).rejects.toThrow(mockError);
            expect(releaseMock).toHaveBeenCalled();
        });
        it('should return all lesson by id course', async () => {
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
            await getAllLessonByIdCourse(1);
            expect(queryMock).toHaveBeenCalled();
            expect(releaseMock).toHaveBeenCalled();
        });
            


     
    });

    describe('Get Lesson By id', () => {

        it('should throw error', async () => {
            const mockError = new Error('Mock error');
            queryMock.mockRejectedValue(mockError);
            await expect(getLessonById(1)).rejects.toThrow(mockError);
            expect(releaseMock).toHaveBeenCalled();
        });
        it('should return lesson by', async () => {
            const mockQuery = [
                {
                   title: "laravel 10",
                   content: "laravel 10 description",
                   
                },
                // { id: 2, name: 'Nabhan TSEL', number: '+6281229743370' }
            ];
            queryMock.mockResolvedValue([mockQuery]);
            const result = await getLessonById(1);
            expect(result).toEqual(mockQuery);
            expect(releaseMock).toHaveBeenCalled();
        });
       
    });

});