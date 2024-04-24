const express = require('express');

const { Pool } = require('pg');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Configuração do pool de conexão com o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hp_desafio',
    password: 'ds564',
    port: 5432,
});

/* BRUXOS🧙‍♀️ */

// Rota para obter todos os bruxos
app.get('/bruxos', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM bruxos');
        res.json({
            total: result.rowCount,
            bruxos: result.rows,
        });
    } catch (error) {
        console.error('Erro ao obter bruxos:', error);
        res.status(500).send('Erro ao obter bruxos');
    }
});

// pegar varinhas
app.get('/varinhas', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM varinha');
        res.json({
            total: result.rowCount,
            varinhas: result.rows,
        });
    } catch (error) {
        console.error('Erro ao obter varinhas:', error);
        res.status(500).send('Erro ao obter varinhas');
    }
});
// criar bruxo
app.post('/bruxos', async (req, res) => {
    try {
        const { nome, idade, casa, habilidade, status, patrono } = req.body;

        let casaValida = ['Grifinória', 'Sonserina', 'Corvinal', 'Lufa-Lufa'];
        let sangueValido = ['Puro', 'Mestiço', 'Trouxa'];

        if (!casaValida.includes(casa)) {
            return res.status(400).send({ mensagem: 'Casa inválida, escolha entre Grifinória, Sonserina, Corvinal ou Lufa-Lufa' });
        } else if (!sangueValido.includes(status)) {
            return res.status(400).send({ mensagem: 'Status inválido, escolha entre Puro, Mestiço ou Trouxa' });
        }else{
            const {rows} = await pool.query('SELECT * FROM bruxos WHERE nome = $1', [nome]);
            res.status(201).send(rows[0]);
        }

        await pool.query('INSERT INTO bruxos (nome, idade, casa, habilidade, status, patrono) VALUES ($1, $2, $3, $4, $5, $6)',

            [nome, idade, casa, habilidade, status, patrono]);

        res.status(201).send({ mensagem: 'Bruxo(a) adicionado com sucesso, bem vindo(a)!🧙‍♀️' });

    } catch (error) {

        console.error('Erro ao criar bruxo:', error);
        res.status(500).send('Erro ao criar bruxo');
    }
});

// deletar bruxo
app.delete('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM bruxos WHERE id = $1', [id]);
        res.send({ mensagem: 'Bruxo(a) removido com sucesso!🧙‍♀️' });
    } catch (error) {
        console.error('Erro ao deletar bruxo:', error);
        res.status(500).send('Erro ao deletar bruxo');
    }
});

// atualizar bruxo
app.put('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { nome, idade, casa, habilidade, status, patrono } = req.body;
        await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status = $5, patrono = $6 WHERE id = $7',
            [nome, idade, casa, habilidade, status, patrono, id]);
        res.send({ mensagem: 'Bruxo(a) atualizado com sucesso!🧙‍♀️' });
    } catch (error) {
        console.error('Erro ao atualizar bruxo:', error);
        res.status(500).send('Erro ao atualizar bruxo');
    }
});

// pegar bruxo por id
app.get('/bruxos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM bruxos WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ mensagem: 'Bruxo(a) não encontrado(a)🧙‍♀️' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao obter bruxo:', error);
        res.status(500).send('Erro ao obter bruxo');
    }
});

// pesquisar bruxo por casa
app.get('/bruxos/casa/:casa', async (req, res) => {
    try {
        const { casa } = req.params;
        const result = await pool.query('SELECT * FROM bruxos WHERE casa = $1', [casa]);
        if (result.rows.length === 0) {
            return res.status(404).json({ mensagem: 'Bruxo(a) não encontrado(a)🧙‍♀️' });
        }
        res.json({
            total: result.rows.length,
            bruxos: result.rows,
        });
    } catch (error) {
        console.error('Erro ao obter bruxos:', error);
        res.status(500).send('Erro ao obter bruxos');
    }
});



// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}🎇`);
});
