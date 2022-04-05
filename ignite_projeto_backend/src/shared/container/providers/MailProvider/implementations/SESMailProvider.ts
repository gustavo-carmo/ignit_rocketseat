import { SES } from 'aws-sdk';
import fs from 'fs';
import handlebars from 'handlebars';
import nodemailer, { Transporter } from 'nodemailer';

import IMailProvider, { ISendMail } from '../IMailProvider';

export default class SESMailProvider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: '2010-12-01',
        region: process.env.AWS_BUCKET_REGION,
      }),
    });
  }

  async sendMail({ path, variables, subject, to }: ISendMail): Promise<void> {
    const tamplateFileContent = fs.readFileSync(path).toString('utf-8');

    const templateParse = handlebars.compile(tamplateFileContent);

    const handlebarsTamplateHTML = templateParse(variables);

    await this.client.sendMail({
      to,
      from: 'Rentx <team@gustavocarmo.com>',
      subject,
      html: handlebarsTamplateHTML,
    });
  }
}
