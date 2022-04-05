import IMailProvider, { ISendMail } from '../IMailProvider';

interface IMessage {
  to: string;
  path: string;
  subject: string;
  variables: any;
}

export default class MailProviderInMemory implements IMailProvider {
  private messages: IMessage[] = [];

  async sendMail({ to, path, subject, variables }: ISendMail): Promise<void> {
    const message: IMessage = {
      to,
      path,
      subject,
      variables,
    };

    this.messages.push(message);

    console.log('E-mail enviado!');
  }
}
