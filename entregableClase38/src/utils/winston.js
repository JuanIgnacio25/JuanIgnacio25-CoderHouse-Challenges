const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({ level: 'info' }),
        new winston.transports.File({ filename: 'src/utils/logs/warn.log', level: 'warn' }),
        new winston.transports.File({ filename: 'src/utils/logs/error.log', level: 'error' })
    ]
})

module.exports = {
    info : (req,res,next)=>{
        logger.info(`ruta ${req.url}, método ${req.method}`)
        next()
    }
}