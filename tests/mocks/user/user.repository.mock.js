module.exports = {
    //Nos sirve cuando estemos testeando nuestro repo
    get: jest.fn(),
    getAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
    getUserByUsername: jest.fn()
};