import '../config/enviroment.config';
import { SNSClient, SubscribeCommand, SubscribeCommandInput } from '@aws-sdk/client-sns';

const snsClient = new SNSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const params: SubscribeCommandInput = {
  TopicArn: 'arn:aws:sns:us-east-1:747138375486:teste_topic',
  Protocol: 'sqs',
};

const run = async () => {
  try {
    const data = await snsClient.send(new SubscribeCommand(params));
    console.log('Success.', data);
    return data;
  } catch (err) {
    console.log('Error', err);
  }
};
run();
