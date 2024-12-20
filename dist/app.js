"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const videoRoutes_1 = __importDefault(require("./routes/videoRoutes"));
const db_1 = __importDefault(require("./config/db"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Video Metadata API',
            version: '1.0.0',
            description: 'API to manage video metadata',
        },
    },
    apis: ['./src/routes/*.ts'],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
// API routes
app.use('/api', videoRoutes_1.default);
// Sync Sequelize with database
db_1.default.sync({ force: false }).then(() => {
    console.log('Database synced!');
});
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
