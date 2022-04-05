import { container } from 'tsyringe';

import IMailProvider from './IMailProvider';
import EtherealMailProvider from './implementations/EtherealMailProvider';
import SESMailProvider from './implementations/SESMailProvider';

const mailToUse = () => {
  switch (process.env.MAIL_PROVIDER) {
    case 'ses':
      return container.resolve(SESMailProvider);
    case 'ethereal':
      return container.resolve(EtherealMailProvider);
    default:
      return container.resolve(EtherealMailProvider);
  }
};

container.registerInstance<IMailProvider>('MailProvider', mailToUse());
