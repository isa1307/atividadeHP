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
    password: '1234',
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


// criar bruxo
app.post('/bruxos', async (req, res) => {
    try {
        const { nome, idade, casa, habilidade, status, patrono } = req.body;

        let casaValida = ['grifinoria', 'sonserina', 'corvinal', 'lufa-lufa'];
        let sangueValido = ['puro', 'mestico', 'trouxa'];

        if (!casaValida.includes(casa)) {
            return res.status(400).send({ mensagem: 'Casa inválida, escolha entre Grifinória, Sonserina, Corvinal ou Lufa-Lufa' });
        } else if (!sangueValido.includes(status)) {
            return res.status(400).send({ mensagem: 'Status inválido, escolha entre Puro, Mestiço ou Trouxa' });
        }else{
            res.status(201).send({ mensagem: `Seja bem vindo(a): ${nome}!🧙‍♀️` });
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
        let { nome, idade, casa, habilidade, status, patrono } = req.body;

        let casaValida = ['grifinoria', 'sonserina', 'corvinal', 'lufa-lufa'];
        let sangueValido = ['puro', 'mestico', 'trouxa'];

        if (!casaValida.includes(casa)) {
            return res.status(400).send({ mensagem: 'Casa inválida, escolha entre Grifinória, Sonserina, Corvinal ou Lufa-Lufa' });
        } else if (!sangueValido.includes(status)) {
            return res.status(400).send({ mensagem: 'Status inválido, escolha entre Puro, Mestiço ou Trouxa' });
        }

        await pool.query('UPDATE bruxos SET nome = $1, idade = $2, casa = $3, habilidade = $4, status = $5, patrono = $6 WHERE id = $7',
            [nome, idade, casa, habilidade, status, patrono, id]);

        res.send({ mensagem: `${nome} atualizado com sucesso!🧙‍♀️` });
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
        if (result.rowCount == 0) {
            return res.status(404).send({ mensagem: 'Bruxo(a) não encontrado(a)🧙‍♀️' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao obter bruxo:', error);
        res.status(500).send('Erro ao obter bruxo');
    }
});

//pesquisar pelo nome do bruxo
app.get('/bruxos/nome/:nome', async (req, res) => {
    try {
        const { nome } = req.query;
        let result;
        if (nome) {
            result = await pool.query('SELECT * FROM bruxos WHERE LOWER(nome) = LOWER($1)', [nome]);
        } else {
            result = await pool.query('SELECT * FROM bruxos');
        }
        if (result.rowCount == 0) {
            return res.status(404).send({ mensagem: 'Bruxo(a) não encontrado(a)🧙‍♀️' });
        }
        res.json(result.rows);
    } catch (error) {
        console.error('Erro ao obter bruxos:', error);
        res.status(500).send('Erro ao obter bruxos');
    }
});

// VARINHAS 🧙‍♂️

// Rota para obter todas as varinhas
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

// criar varinha
app.post('/varinhas', async (req, res) => {
    try {
        const { material, comprimento, nucleo, data_criacao } = req.body;
        await pool.query('INSERT INTO varinha (material, comprimento, nucleo, data_criacao) VALUES ($1, $2, $3, $4)',
            [material, comprimento, nucleo, data_criacao]);
        res.status(201).send({ mensagem: 'Varinha adicionada com sucesso!🧙‍♂️' });
    } catch (error) {
        console.error('Erro ao criar varinha:', error);
        res.status(500).send('Erro ao criar varinha');
    }
});

// deletar varinha
app.delete('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM varinha WHERE id = $1', [id]);
        res.send({ mensagem: 'Varinha removida com sucesso!🧙‍♂️' });
    } catch (error) {
        console.error('Erro ao deletar varinha:', error);
        res.status(500).send('Erro ao deletar varinha');
    }
});

// atualizar varinha
app.put('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { material, comprimento, nucleo, data_criacao } = req.body;
        await pool.query('UPDATE varinha SET material = $1, comprimento = $2, nucleo = $3,  data_criacao = $4 WHERE id = $5',
            [material, comprimento, nucleo, data_criacao, id]);
        res.send({ mensagem: 'Varinha atualizada com sucesso!🧙‍♂️' });
    } catch (error) {
        console.error('Erro ao atualizar varinha:', error);
        res.status(500).send('Erro ao atualizar varinha');
    }
});

// pegar varinha por id
app.get('/varinhas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM varinha WHERE id = $1', [id]);
        if (result.rowCount === 0) {
            return res.status(404).send({ mensagem: 'Varinha não encontrada🧙‍♂️' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Erro ao obter varinha:', error);
        res.status(500).send('Erro ao obter varinha');
    }
});




// Inicie o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}🎇`);
});
