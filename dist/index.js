"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = __importDefault(require("./routes/user"));
const auth_1 = __importDefault(require("./routes/auth"));
const auth_2 = require("./middleware/auth");
const app = (0, express_1.default)();
const PORT = 3000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true })); //  for form-data
// Public login route
app.use("/api/auth", auth_1.default);
// Protect all user CRUD routes
app.use("/api/users", auth_2.verifyToken, user_1.default);
app.listen(PORT, () => {
    console.log(`Server running http://localhost:${PORT}`);
});
//# sourceMappingURL=index.js.map