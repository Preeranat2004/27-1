const express = require('express');
const mysql = require('mysql2/promise');
const bodyParser = require('body-parser');
const cors = require('cors');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'book',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const app = express();
app.use(bodyParser.json());
app.use(cors());

const port = 8000;
// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.get('/books', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute('SELECT * FROM books');
        connection.release();
        res.json(results);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.post('/book/insert', async (req, res) => {
    const { title, author, published_date } = req.body;
    try {
        const connection = await pool.getConnection();
        const [results] = await connection.execute(
            'INSERT INTO books (title, author, published_date) VALUES (?, ?, ?)',
            [title, author, published_date]
        );
        connection.release();
        res.json({ id: results.insertId, title, author, published_date });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.put('/book/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, published_date } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.execute(
            'UPDATE books SET title = ?, author = ?, published_date = ? WHERE id = ?',
            [title, author, published_date, id]
        );
        connection.release();
        res.json({ id, title, author, published_date });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.patch('/book/:id', async (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    try {
        const connection = await pool.getConnection();
        await connection.execute(
            'UPDATE books SET title = ? WHERE id = ?',
            [title, id]
        );
        connection.release();
        res.json({ id, title });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.delete('/book/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const connection = await pool.getConnection();
        await connection.execute('DELETE FROM books WHERE id = ?', [id]);
        connection.release();
        res.json({ message: 'Book deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});