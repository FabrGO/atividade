const express = require('express');
const exphbs = require('express-handlebars');

const pool = require('./db/conn') // Modulo interno

PORT = 3333
const app = express();//Utilizando express

//para receber informaçãos do front-end json
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//configurando do handlebars
app.engine('handlebars', exphbs.engine());
app.set('view engine','handlebars');

//moddleware para utilizar arquivos estaticos
app.use(express.static('public'))

// rota-> localhost:3333
app.get('/', (req, res)=>{
    return res.render("home");
});

app.post('/cursos/insertcurso', (req, res) =>{
    const {nome, horas} = req.body

    const sql  = `INSERT INTO cursos(??, ??) VALUES(?, ?);`

    const data = ['nome', 'horas', nome, horas]

    pool.query(sql, data, function (err) {
        if(err){
            console.log(err);
            return 
        }
        res.redirect('/')
    })
})

app.get('/cursos', (req, res)=>{

    const sql = 'SELECT * FROM cursos'

    pool.query(sql, (err, data)=>{
        if(err){
            console.log(err)
            return
        }

        const cursos = data
        console.log(cursos)
        return res.render('cursos', {cursos})
    })

})
app.get('/cursos/:id', (req, res)=>{
    const id = req.params.id

    const sql = `SELECT * FROM cursos WHERE ?? = ?`

    const data = ['id', id]

    pool.query(sql, data, (err, data)=>{
        if(err){
            console.log(err)
            return
        }
        const curso = data[0]
        console.log(curso)
        return res.render('curso', {curso})
    })
})
//Edição primeira etapa
app.get('/cursos/edit/:id', (req, res)=>{
    const id = req.params.id

    const sql = `SELECT * FROM cursos WHERE ?? = ?`

    const data = ['id', id]

pool.query(sql, data, function(err, data){
    if(err){
        console.log(err)
    }
    const curso = data [0]
    console.log(curso)
    return res.render('editcurso', {curso})
    })
})

//edição segunda etapa
app.post('/cursos/updatecurso', (req, res)=>{
    const {id, nome, horas} = req.body

    const sql = `UPDATE cursos SET ??=?,
    ?? = ? WHERE ?? = ?`

    const data = ['nome', nome, 'horas', horas, 'id', id]

    pool.query(sql, data, function(err){
        if(err){
            console.log(err)
            return
        }
        return res.redirect('/cursos')
    })

    
})

//Rota excluir dados
app.post('/cursos/remove/:id', (req, res)=>{
    const id = req.params.id

    const sql = `DELETE FROM cursos WHERE ?? = ?`

    const data = ['id', id]

    pool.query(sql, data, (err)=>{
        if(err){
            console.log(err)
            return
        }
        //resposta
    return res.redirect('/cursos')
    })

})




app.listen(PORT, ()=>{
    console.log(`Servidor ON ${PORT} 😎👍👍👍👍👍👍👍`)
})