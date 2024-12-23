import express from "express";
import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const client = new PrismaClient();
const kafka = new Kafka({
    clientId: 'outb0x-processor',
    brokers: ['localhost:9092']
  })
const TOPIC_NAME = 'zap-events';
async function main() {
    const producer = kafka.producer();
    await producer.connect()
    while(true){
        const zaps = await client.zapRunOutbox.findMany({
            take : 10
        });
        producer.send({
            topic : TOPIC_NAME,
            messages : zaps.map((a) => {
                return {
                    value : a.zapRunId
                }
            })
        })
        await client.zapRunOutbox.deleteMany({
            where : {
                id : {
                    in : zaps.map(a => a.id)
                }
            }
        })
    }
}
main();