import { Kafka } from "kafkajs";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();
const kafka = new Kafka({
    clientId: 'outbox-worker',
    brokers: ['localhost:9092']
  })
  const TOPIC_NAME = 'zap-events';

async function main() {
    const consumer = kafka.consumer({groupId : "worker"})
    await consumer.connect();
    await consumer.subscribe({ topic: 'zap-events', fromBeginning: true })

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      })

      // run the execution of zap

      await consumer.commitOffsets([{
        topic : TOPIC_NAME,
        partition,
        offset : (parseInt(message.offset) + 1).toString()
      }])
    },
  })
}