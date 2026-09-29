const express = require('express')
const session = require('express-session')
const path = require('path')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'soundhate-secreto',
    resave: false,
    saveUninitialized: false
}))

app.use(express.static(__dirname))


// ==========================
// LOGIN
// ==========================

app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'teladelogin.html'))
})


// ==========================
// FAZER LOGIN
// ==========================

app.post('/login', (req, res) => {

    const email = req.body.email
    const senha = req.body.senha

    if (email && senha) {

        req.session.logado = true
        req.session.email = email

        res.redirect('/')

    } else {

        res.send(`
            <h2>Preencha o email e a senha!</h2>
            <a href="/login">Voltar para o login</a>
        `)

    }
})


// ==========================
// PÁGINA INICIAL
// ==========================

app.get('/', (req, res) => {

    if (!req.session.logado) {
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, 'telainicial.html'))

})


// ==========================
// PÁGINA DE ÁLBUNS
// ==========================

app.get('/album', (req, res) => {

    if (!req.session.logado) {
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, 'exebicaodealbum.html'))

})


// ==========================
// ÁLBUM IGOR
// ==========================

app.get('/igor', (req, res) => {

    if (!req.session.logado) {
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, 'album.html'))

})

// ==========================
// ARTISTA TYLER, THE CREATOR
// ==========================

app.get('/tyler', (req, res) => {

    if (!req.session.logado) {
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, 'artista.html'))

})

// PÁGINA DE SINGLES
app.get('/singles', (req, res) => {
    if (!req.session.logado) {
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, 'singles.html'))
})

// PÁGINA DE TRAP
app.get('/trap', (req, res) => {
    if (!req.session.logado) {
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, 'trap.html'))
})

app.get('/rap', (req, res) => {
    if (!req.session.logado) {
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, 'rap.html'))
})


// PÁGINA DE R&B
app.get('/R&B', (req, res) => {
    if (!req.session.logado) {
        return res.redirect('/login')
    }

    res.sendFile(path.join(__dirname, 'R&B.html'))
})

// ==========================
// BARRA DE PESQUISA
// ==========================

app.get('/buscar', (req, res) => {

    const pesquisa = req.query.q

    if (!pesquisa) {
        return res.redirect('/')
    }

    const busca = pesquisa.toLowerCase().trim()

    // ARTISTAS
    if (
        busca === 'tyler' ||
        busca === 'tyler, the creator' ||
        busca === 'tyler the creator'
    ) {
        return res.redirect('/tyler')
    }

    // ÁLBUM IGOR
    if (busca === 'igor') {
        return res.redirect('/igor')
    }

    // SINGLES
    if (
        busca === 'best interest' ||
        busca === 'that guy'
    ) {
        return res.redirect('/singles')
    }

    // GÊNEROS
    if (busca === 'trap') {
        return res.redirect('/trap')
    }

    if (
        busca === 'r&b' ||
        busca === 'r&b'
    ) {
        return res.redirect('/R&B')
    }

    if (busca === 'rap') {
        return res.redirect('/rap')
    }

    // ÁLBUNS
    if (
        busca === 'álbuns' ||
        busca === 'albuns' ||
        busca === 'album' ||
        busca === 'álbum'
    ) {
        return res.redirect('/album')
    }

    // SE NÃO ENCONTRAR
    res.send(`
        <div style="font-family: Arial; text-align: center; margin-top: 100px;">
            <h2>Nada encontrado</h2>
            <p>Não encontramos "${pesquisa}".</p>
            <a href="/">Voltar para a página inicial</a>
        </div>
    `)
})

// ==========================
// LOGOUT
// ==========================

app.get('/logout', (req, res) => {

    req.session.destroy(() => {
        res.redirect('/login')
    })

})


// ==========================
// SERVIDOR
// ==========================

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})