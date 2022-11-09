import SQS, { SQSResponse } from '../../adapters/aws-sqs';

export async function sendMessageToQueue(data: unknown): Promise<SQSResponse> {
  return await SQS.sendMessage({
    QueueUrl: process.env.AWS_QUEUE_URL as string,
    DelaySeconds: 0,
    MessageBody: JSON.stringify(data),
  }).promise();
}
