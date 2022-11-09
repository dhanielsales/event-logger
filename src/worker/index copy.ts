import '../config/enviroment.config';

import SQS from '../adapters/aws-sqs';

SQS.receiveMessage(
  {
    AttributeNames: ['SentTimestamp'],
    MaxNumberOfMessages: 10,
    MessageAttributeNames: ['All'],
    VisibilityTimeout: 1,
    WaitTimeSeconds: 0,
    QueueUrl: process.env.AWS_QUEUE_URL as string,
  },
  (err, data) => {
    if (err) {
      console.log('Error', err);
    } else {
      console.log('Received');

      if (data.Messages) {
        for (const message of data.Messages) {
          console.log({
            id: message.MessageId,
            data: message.Body,
          });
        }
      }
    }
  },
);
