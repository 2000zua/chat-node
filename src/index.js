import express from "express";
import { createServer } from "node:http";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { Server } from "socket.io";



const app = express();
const server = createServer(app);
const PORT = 3000
const __dirname = dirname(fileURLToPath(import.meta.url))
const io = new Server(server);


console.log(__dirname)


app.get('/', (req, res) => {
    res.sendFile(join(__dirname, 'index.html'));
});

io.on(`connection`, (socket)=> {
    console.log(`Um usuario conectado: ${socket.id}`);
    // desconectar o socket , nao e uma boa pratica usar o desconeactar aquir
    socket.on('chat message', (msg) => {
        io.emit('chat message', msg);
        console.log('message: '+msg)
    });

    // reportar a mensagem para os outros
    socket.broadcast.emit('hi');
});




server.listen(PORT, () => {
    console.log(`Servidor iniciado na porta ${PORT}`);
});