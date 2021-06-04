const express = require('express');
const helmet = require('helmet')
const cors = require('cors')

const ProjectRouter = require('./projects/projects-router')
const ActionRouter = require('./actions/actions-router')




const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors())




// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!
server.use("/api/projects", ProjectRouter)
server.use("/api/actions", ActionRouter)


server.use((err, req, res, next) => {
    res.status(err.status || 500).json({
        message: err.message,
        stack: err.stack
    })
})


module.exports = server;
