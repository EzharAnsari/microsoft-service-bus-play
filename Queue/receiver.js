const { delay, ServiceBusClient } = require('@azure/service-bus')

// connection string to your service bus
const connectionString = "<Your connecting string>";

// name of the Queue
const queueName = "<Your queue name>";

async function main() {
    const sbClient = new ServiceBusClient(connectionString);
    const receiver = sbClient.createReceiver(queueName);
    const messageHandler = async (messageReceived) => {
        console.log(`Received message: ${messageReceived.body}`)
    }

    const errorHandler = async (error) => {
        console.log(error);
    }

    receiver.subscribe({
        processMessage: messageHandler,
        processError: errorHandler
    });

    await delay(20000);

    await receiver.close();
    await sbClient.close();
}

main().catch((err) => {
    console.log("Error occured: ", err);
})