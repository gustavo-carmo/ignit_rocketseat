export interface ISendMail {
  to: string;
  subject: string;
  path: string;
  variables?: any;
}

export default interface IMailProvider {
  sendMail(data: ISendMail): Promise<void>;
}
