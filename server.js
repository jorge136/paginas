// server.js

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { MongoClient } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Conectar a la base de datos MongoDB
const uri = 'mongodb://localhost:27017'; // Cambia esta URI si usas un servicio en la nube
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/comments', async (req, res) => {
    try {
        const { comment } = req.body;
        if (!comment) {
            return res.status(400).json({ message: 'Comentario no puede estar vacío' });
        }

        // Conectar a la base de datos
        await client.connect();
        const db = client.db('commentsDB');
        const collection = db.collection('comments');

        // Insertar comentario en la base de datos
        await collection.insertOne({ text: comment });
        res.status(201).json({ message: 'Comentario agregado', comment });
    } catch (error) {
        res.status(500).json({ message: 'Error al agregar comentario', error });
    } finally {
        await client.close();
    }
});

app.get('/comments', async (req, res) => {
    try {
        // Conectar a la base de datos
        await client.connect();
        const db = client.db('commentsDB');
        const collection = db.collection('comments');

        // Obtener todos los comentarios
        const comments = await collection.find().toArray();
        res.json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener comentarios', error });
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`);
});
