// const User = require("../routes/user");
const pool = require('../db');



//handle get
// async function handleGetAllUsers(req, res){
//       try {
//         const result = await pool.query('SELECT * FROM users');
//         res.json(result.rows);
//       } catch (err) {
//         res.status(500).json({ error: err.message });
//       }
// }   .

// async function handleGetAllUsers (req, res)  {
//   try {
//     const result = await pool.query("SELECT * FROM users");

//     // Format dob before sending
//     const users = result.rows.map(user => ({
//       ...user,
//       dob: formatDate(user.dob)
//     }));

//     res.json(users);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: err.message });
//   }
// };



 async function handleGetAllUsers (req, res) {
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
 try {
    const { 
      page = 1, 
      limit = 10, 
      sortKey = "first_name", 
      sortOrder = "asc", 
      name =""
    } = req.query;

    // if search query is provided → run search
    if (name) {
      const result = await pool.query(
        "SELECT * FROM users WHERE first_name LIKE $1",
        [`%${name}%`]
      );

      return res.json({
        data: result.rows,
        total: result.rows.length,
        page: 1,
        limit: result.rows.length
      });
    }

    // else → run all users with pagination + sorting
    
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 10;
    const offset = (pageNum - 1) * limitNum;

    const validColumns = ["first_name", "last_name", "dob", "mobile", "address"];
    const validOrders = ["asc", "desc"];

    const column = validColumns.includes(sortKey) ? sortKey : "first_name";
    const order = validOrders.includes(sortOrder.toLowerCase()) ? sortOrder : "asc";

    const result = await pool.query(
      `SELECT * FROM users ORDER BY ${column} ${order} LIMIT $1 OFFSET $2`,
      [limitNum, offset]
    );

    const total = await pool.query("SELECT COUNT(*) FROM users");

    return res.json({
      data: result.rows,
      total: parseInt(total.rows[0].count),
      page: pageNum,
      limit: limitNum
    });

  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).json({ error: "Server error" });
  }
};



//handle update
async function handleUpdateUserById(req,res) {
     const { id } = req.params;
  const { first_name, last_name, dob, mobile, address } = req.body;

  try {
    const result = await pool.query(
      'UPDATE users SET first_name=$1, last_name=$2, dob=$3, mobile=$4, address=$5   WHERE id = $6 RETURNING *',
      [first_name, last_name, dob, mobile, address, id]
    );

 if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]); // return updated row
  }  catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
}
// handle post
async function handleCreateNewtUser(req, res) {
      const { first_name, last_name, dob, mobile, address } = req.body;
      try {
        await pool.query(
          'INSERT INTO users (first_name, last_name, dob, mobile, address) VALUES ($1, $2, $3, $4, $5)',
          [first_name, last_name, dob, mobile, address]
        );
        res.sendStatus(201);
         res.send("User added");
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}
//handle delete
async function handleDeleteUserById(req,res){
const { id } = req.params;
  try {
    await pool.query('DELETE FROM users WHERE id=$1', [id]);
    res.sendStatus(200);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// search
// async function searchUser(req, res)  {
//  try {
//     const { name } = req.query;

//     if (!name) {
//       return res.status(400).json({ error: "Name is required" });
//     }

//    const result = await pool.query(
//   "SELECT * FROM users WHERE first_name LIKE $1",
//   [`%${name}%`]
// );
//     res.json(result.rows);
//     console.log("search for ",name);
//   } catch (err) {
//     console.error("Error searching users:", err);
//     res.status(500).json({ error: err.message });
//   }
// };

//  format dob as dd/mm/yyyy
function formatDate(dateString) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}




module.exports ={
    handleGetAllUsers,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewtUser,
    // searchUser
} 
