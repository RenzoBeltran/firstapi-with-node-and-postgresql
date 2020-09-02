const {
  Pool
} = require("pg");

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "firstapi",
  port: "5432",
});

const getUsers = async (req, res) => {
  try {
    const response = await pool.query("SELECT * FROM users");
    console.log(response.rows);
    res.status(200).json(response.rows);
  } catch (e) {
    console.log(e);
  }

};

const createUser = async (req, res) => {
  try {
    const {
      name,
      email
    } = req.body;
    const response = await pool.query("INSERT INTO users (name, email) VALUES ($1, $2)", [name, email])
    res.status(201).json({
      message: "User created successfully",
      user: {
        name,
        email
      }
    });
  } catch (error) {
    console.log(error);
  }
}

const getUserById = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const response = await pool.query("SELECT * FROM users where id=$1", [id])
    console.log(response);
    res.json(response.rows);
  } catch (error) {
    console.log(error);
  }
}

const deleteUser = async (req, res) => {
  try {
    const {
      id
    } = req.params;
    const response = await pool.query("DELETE FROM users WHERE id=$1", [id])
    res.json({
      message: `User ${id} has been successfully deleted`
    })
  } catch (error) {
    console.log(error);
  }

}

const updateUser = async (req, res) => {
  try {
    const {
      name,
      email
    } = req.body
    const {
      id
    } = req.params
    const response = await pool.query("UPDATE users SET name=$1, email=$2 WHERE id=$3", [name, email, id])
    res.json({
      message: `User ${id} has been updated successfully`,
      user: {
        name,
        email
      }
    })
  } catch (error) {
    console.log(error);
  }
}
module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  updateUser
};