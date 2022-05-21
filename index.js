const express = require('express');
const app     = express();

app.listen(3000, () => console.log("Servidor express activo http://localhost:3000"));

const {insertar, listarUsuarios, listarTransferencias, editar, insertarTransferencia, eliminar} = require('./consultas.js');

app.use(express.json());


// Activar Página Principal
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/index.html`);
 });

 app.get("/usuarios", async(req, res) => {
    const respuesta = await listarUsuarios();
    res.json(respuesta.rows);
})


// Listar transferencias
app.get("/transferencias", async(req, res) => {
    const respuesta = await listarTransferencias();
    res.json(respuesta.rows);

})


// Registrar Usuario
app.post("/usuario", async (req, res) => {
    try {
        const resp = await insertar(req.body);
        res.status(201).json(resp ? resp : { code: resp.code})

    } catch (error) {
        res.status(500).json({error: "Ha ocurrido error en el servidor"});
        
    }
})


// Editar USuario
app.put("/usuario", async (req, res) => {
    try {
        const resp = await editar(req.body, req.query.id);
        res.status(201).json(resp.rows ? resp : { code: resp.code})

    } catch (error) {
        res.status(500).json({error: "Ha ocurrido error en el servidor"});
        
    }
})


// Registrar Transferencia
app.post("/transferencia", async (req, res) => {
    try {
        const resp = await insertarTransferencia(req.body);
        res.status(201).json(resp.rows ? resp : { code: resp.code})

    } catch (error) {
        res.status(500).json({error: "Ha ocurrido error en el servidor"});
        
    }
})


// Eliminar Usuario
app.delete("/usuario", async (req, res) => {
    try {
        const resp = await eliminar(req.query);
        res.status(201).json(resp.rows ? resp : { code: resp.code})

    } catch (error) {
        res.status(500).json({error: "Ha ocurrido error en el servidor"});
        
    }
})