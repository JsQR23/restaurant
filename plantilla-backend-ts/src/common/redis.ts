
import { createClient } from "redis";
import logger from "./logger";

const redisConnectionString = `redis://default:${process.env.REDIS_PASS}@${process.env.REDIS_HOST}:${process.env.REDIS_PORT}/0`;

const redisClient = createClient({
    'url': redisConnectionString
});

redisClient.on('ready', () =>{
    logger.info("REDIS 0 READY");
});
redisClient.on('error', (error)=>{
    logger.error(`REDIS 0 ERROR: ${error}`);
});
redisClient.on('reconnecting', ()=>{
    logger.warn('REDIS 0 RECONNECTING');
});
redisClient.on('end', ()=>{
    logger.warn('REDIS 0 ENDED');
});
redisClient.connect();

export {redisClient}