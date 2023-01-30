const express = require('express');
const { Router } = express
const routerProcess = new Router()
const args = process.argv;
const { fork } = require('child_process');
const { query } = require('express');
const os = require('os')
const compression = require('compression');
const logger = require('../../api/log4js')

routerProcess.get('/info',compression() ,async (req, res, next) =>{

    logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente`);

    const argumentos = args.slice(2);
    const platform = process.platform;
    const version = process.version;
    const memory = process.memoryUsage.rss()
    const rutaCompleta = process.execPath;
    const pid = process.pid;
    const carpeta = process.cwd()
    const numCPUs = os.cpus().length;

    const datos = {
        argumentos,
        platform,
        version,
        memory,
        rutaCompleta,
        pid,
        carpeta,
        numCPUs,
    }

    res.send({datos})
})

routerProcess.get('/api/randoms', async (req, res, next) =>{
    logger.info(`Se intentó acceder a ${req.url} con método ${req.method} exitosamente`);
    const cant = req.query.cant || 100000000
    const child = fork('./api/calculo.js');
    child.send(cant);
    child.on('message', (suma) => {
        res.json(suma);
    })
})

module.exports = routerProcess