"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDeleteUserById = exports.handleCreateNewtUser = exports.handleUpdateUserById = exports.handleGetAllUsers = void 0;
const db_1 = require("../db");
//   try {
//     const { page = 1, limit = 10, sortKey = "first_name", sortOrder = "asc" } = req.query;
//       if(name){
//         const { name } = req.query;
//     if (!name) {
//       return res.status(400).json({ error: "Name is required" });
//     }
//    const result = await pool.query(
//   "SELECT * FROM users WHERE first_name LIKE $1",
//   [`%${name}%`]
// ); 
//     res.json(result.rows);
//       }
//      const pageNum = parseInt(page, 10) || 1;
// const limitNum = parseInt(limit, 10) || 10;
// const offset = (pageNum - 1) * limitNum;
//     // whitelist allowed columns
//     const validColumns = ["first_name", "last_name", "dob", "mobile", "address"];
//     const validOrders = ["asc", "desc"];
//     const column = validColumns.includes(sortKey) ? sortKey : "first_name";
//     const order = validOrders.includes(sortOrder.toLowerCase()) ? sortOrder : "asc";
//    const result = await pool.query(
//   `SELECT * FROM users ORDER BY ${column} ${order} LIMIT $1 OFFSET $2`,
//   [limitNum, offset]
// );
//       const total = await pool.query(`SELECT COUNT(*) FROM users`);
//     res.json({
//       data: result.rows,
//       total: parseInt(total.rows[0].count),
//       page: parseInt(page),
//       limit: parseInt(limit)
//     }); 
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server error" });
//   }
const handleGetAllUsers = async (req, res) => {
    try {
        const { page = 1, limit = 10, sortKey = "first_name", sortOrder = "asc", name = "" } = req.query;
        // if search query is provided then run search
        if (name) {
            const result = await db_1.pool.query("SELECT * FROM users WHERE first_name LIKE $1", [`%${name}%`]);
            return res.json({
                data: result.rows,
                total: result.rows.length,
                page: 1,
                limit: result.rows.length
            });
        }
        const pageNum = parseInt(page, 10) || 1;
        const limitNum = parseInt(limit, 10) || 10;
        const offset = (pageNum - 1) * limitNum;
        const sortOrdera = typeof sortOrder === "string" ? sortOrder : "asc";
        const sortKeya = typeof sortKey === "string" ? sortKey : "first_name";
        const validColumns = ["first_name", "last_name", "dob", "mobile", "address"];
        const validOrders = ["asc", "desc"];
        const column = validColumns.includes(sortKeya) ? sortKey : "first_name";
        const order = validOrders.includes(sortOrdera.toLowerCase()) ? sortOrder : "asc";
        //fetch users
        const result = await db_1.pool.query(`SELECT * FROM users ORDER BY ${column} ${order} LIMIT $1 OFFSET $2`, [limitNum, offset]);
        const total = await db_1.pool.query("SELECT COUNT(*) FROM users");
        return res.json({
            data: result.rows,
            total: parseInt(total.rows[0].count),
            page: pageNum,
            limit: limitNum,
            success: true,
            message: "User Fetch successfully"
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error("Error fetching users:", err);
            res.status(500).json({ error: "Server error" });
        }
    }
};
exports.handleGetAllUsers = handleGetAllUsers;
// update
const handleUpdateUserById = async (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, dob, mobile, address } = req.query;
    console.log(first_name, last_name, dob, mobile, address);
    try {
        const result = await db_1.pool.query('UPDATE users SET first_name=$1, last_name=$2, dob=$3, mobile=$4, address=$5   WHERE id = $6 RETURNING *', [first_name, last_name, dob, mobile, address, id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(result.rows[0]); // return updated row
        res.status(200).json({
            data: result.rows,
            message: "update successfully",
            success: true
        });
    }
    catch (err) {
        if (err instanceof Error) {
            console.error(err.message);
            res.status(500).send("Server error");
        }
    }
};
exports.handleUpdateUserById = handleUpdateUserById;
// handle post
const handleCreateNewtUser = async (req, res) => {
    const { first_name, last_name, dob, mobile, address, } = req.query;
    try {
        const result = await db_1.pool.query('INSERT INTO users (first_name, last_name, dob, mobile, address) VALUES ($1, $2, $3, $4, $5)', [first_name, last_name, dob, mobile, address]);
        res.sendStatus(201);
        res.send("User added");
        return res.json({
            data: result.rows,
            success: true,
            message: "New User added",
        });
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
    }
};
exports.handleCreateNewtUser = handleCreateNewtUser;
//handle delete
const handleDeleteUserById = async (req, res) => {
    const { id } = req.params;
    try {
        await db_1.pool.query('DELETE FROM users WHERE id=$1', [id]);
        res.sendStatus(200);
    }
    catch (err) {
        if (err instanceof Error) {
            res.status(500).json({ error: err.message });
        }
    }
};
exports.handleDeleteUserById = handleDeleteUserById;
//# sourceMappingURL=user.js.map