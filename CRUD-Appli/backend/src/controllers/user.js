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

async function handleGetAllUsers (req, res)  {
  try {
    const result = await pool.query("SELECT * FROM users");

    // Format dob before sending
    const users = result.rows.map(user => ({
      ...user,
      dob: formatDate(user.dob)
    }));

    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
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
    handleCreateNewtUser
}