const { delay, ServiceBusClient } = require('@azure/service-bus')

// connection string to your service bus
const connectionString = "<Your connecting string>";

// name of the Queue
const topicName = "<Your topic name>";
let subscription = ""

async function main() {
    const sbClient = new ServiceBusClient(connectionString);
    console.log(`Subscription : ${subscription}`);
    const receiver = sbClient.createReceiver(topicName, subscription);
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

const readline = require('readline');
const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: 'Enter your subscription name: ',
});

r1.prompt();

r1.on('line', (line) => {
    subscription = line;
    main().catch((error) => {
        console.log('Error occured: ', error);
        process.exit(1);
    });
}).on('close', () => {
    process.exit(0);
})