const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    password: 'pantalla2',
    database: 'bancosolar',
    host: 'localhost',
    port: 5432
});


// Registrar Usuario
const insertar = async (usuario) => {
    try {
        const {nombre, balance} = usuario;
        const config = {
            text: "insert into usuarios (nombre, balance) values ($1, $2) returning *",
            values: [nombre, balance]
        }
        const resp = await pool.query(config);
        return resp;

    } catch (error) {
        return error;
        
    }
};


// Listar Usuarios
const listarUsuarios = async () => {
    try {
        const sql = "select * from usuarios";
        const resp = await pool.query(sql);
        return resp;

    } catch (error) {
        return error;

    }
};


// Listar Transferencias
const listarTransferencias = async () => {
    const consulta = {
        text:  "select emisor, receptor, monto, fecha from transferencias",
        values: [],
        rowMode: "array"
    }

    try {
        const resp = await pool.query(consulta);
        return resp;

    } catch (error) {
        console.log("error", error);
        return error;

    }
}


// Editar Usuario
const editar = async (usuario, id) => {
    const {name, balance} = usuario;
    const config = {
        text: "update usuarios set nombre=$2, balance=$3 where id=$1 returning *",
        values: [id, name, balance]

    }

    try {
        const resp = await pool.query(config);
        console.log(resp.rows);
        return resp;

    } catch (error) {
        console.log(error);
        return error;
        
    }
};


// Registrar Transferencia
const insertarTransferencia = async (transferencia) => {
    const fecha = new Date();
    const {emisor, receptor, monto} = transferencia;
    try {
        await pool.query("begin");

        // Resgistra Transferencia
        let config = {
            text: "insert into transferencias (emisor, receptor, monto, fecha) values ($1, $2, $3, $4) returning *",
            values: [emisor, receptor, monto, fecha]

        }
        const respTransferencia = await pool.query(config);

        // Actualiza Monto Emisor
        config = {
            text: "update usuarios set balance = balance - $2  where nombre = $1 returning *",
            values: [emisor, monto]

        }
        const respUsuariosMenos = await pool.query(config);

        // Actualiza Monto Receptor
        config = {
            text: "update usuarios set balance = balance + $2  where nombre = $1 returning *",
            values: [receptor, monto]

        }
        const respUsuariosMas = await pool.query(config);

        await pool.query("commit");
        return respTransferencia;
        
    } catch (error) {
        await pool.query("rollback");
        return error;
        
    }
};


// Eliminar usuario
const eliminar = async (usuario) => {
    const {id} = usuario;
    const config = {
        text: "delete from usuarios where id=$1 returning *",
        values: [id]
    }

    try {
        const resp = await pool.query(config);
        return resp;

    } catch (error) {
        return error;
        
    }
};

// Exportación de módulos
module.exports = {insertar, listarUsuarios, listarTransferencias, editar, insertarTransferencia, eliminar}