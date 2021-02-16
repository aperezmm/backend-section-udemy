const mcache = require('memory-cache');
const { CACHE_KEY } = require('../config');

module.exports = function(duration){
    return (req, res, next) => {
        const key =  CACHE_KEY + req.originalUrl || req.url;
        //Le pasamos el key
        const cachedBody = mcache.get(key);

        if(cachedBody){
            return res.send(JSON.parse(cachedBody));
        }else{
            //Si no existe tenemos que cacharla
            res.sendResponse = res.send;
            //Recibe un body 
            res.send = body => {
                mcache.put(key, body, duration * 1000);
                res.sendResponse(body);
            };
            next();
        }
    };
};