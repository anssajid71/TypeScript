"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_route_1 = __importDefault(require("./routes/user.route"));
const services_route_1 = __importDefault(require("./routes/services.route"));
const packages_route_1 = __importDefault(require("./routes/packages.route"));
const hotels_route_1 = __importDefault(require("./routes/hotels.route"));
const companies_route_1 = __importDefault(require("./routes/companies.route"));
const bookings_route_1 = __importDefault(require("./routes/bookings.route"));
const attachments_route_1 = __importDefault(require("./routes/attachments.route"));
const fs_1 = __importDefault(require("fs"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const options = {
    swaggerDefinition: {
        info: {
            title: 'Your API',
            version: '1.0.0',
            description: 'API documentation for Your API',
        },
    },
    apis: ['swaggerDef.ts'],
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
fs_1.default.writeFileSync('swagger.json', JSON.stringify(swaggerSpec, null, 2));
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use('/user', user_route_1.default);
app.use('/services', services_route_1.default);
app.use('/packages', packages_route_1.default);
app.use('/hotels', hotels_route_1.default);
app.use('/companies', companies_route_1.default);
app.use('/bookings', bookings_route_1.default);
app.use('/attachments', attachments_route_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerSpec));
app.get('/', (req, res) => {
    res.send('Hello, TypeScript Express!');
});
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
