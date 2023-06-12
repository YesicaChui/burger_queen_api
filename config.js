const config = {}
config.port = process.argv[2] || process.env.PORT || 8080;
config.dbUrl = process.env.MONGO_URL || process.env.DB_URL || 'mongodb://localhost:27017/burgerQueenAPI_DB';
config.secret = process.env.JWT_SECRET || 'yesi';
config.adminEmail = process.env.ADMIN_EMAIL || 'karen@gmail.com';
config.adminPassword = process.env.ADMIN_PASSWORD || '123456';
export default config