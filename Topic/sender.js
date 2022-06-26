const { delay, ServiceBusClient } = require('@azure/service-bus')

// connection string to your service bus
const connectionString = "<Your connecting string>";

// name of the Queue
const topicName = "<your topic name>";

async function main() {
    const sbClient = new ServiceBusClient(connectionString);
    const sender = sbClient.createSender(topicName);

    try {
        for(let x=0; x<1000; x++) {
            let batch = await sender.createMessageBatch();
            batch.tryAddMessage({
                body: `Message Id: ${x}`
            });
            console.log(`Sending Message Id: ${x}`);
            await sender.sendMessages(batch);
            await delay(500, null);
        }
    } finally {
        await sbClient.close();
    }
}

main().catch((err) => {
    console.log("Error occured: ", err);
})