import 'server-only';

import configuration from '../../configuration';
import type { Options } from 'nodemailer/lib/smtp-transport';

interface SendEmailParams {
  from: string;
  to: string;
  subject: string;
  text?: string;
  html?: string;
}

export default async function sendEmail(config: SendEmailParams) {
  const transporter = await getSMTPTransporter();

  return transporter.sendMail(config);
}

async function getSMTPTransporter() {
  const nodemailer = await import('nodemailer');

  return nodemailer.createTransport(getSMTPConfiguration());
}

function getSMTPConfiguration(): Options {
  if (configuration.production) {
    return getProductionSMTPConfiguration();
  }

  return getInBucketSMTPConfiguration();
}

function getProductionSMTPConfiguration() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASSWORD;
  const host = process.env.EMAIL_HOST;
  const port = Number(process.env.EMAIL_PORT);
  const secure = port === 465 && !configuration.production;

  if (!user || !pass || !host || !port) {
    throw new Error(
      `Missing email configuration. Please add the following environment variables:
      EMAIL_USER
      EMAIL_PASSWORD
      EMAIL_HOST
      EMAIL_PORT
      `,
    );
  }

  return {
    host,
    port,
    secure,
    auth: {
      user,
      pass,
    },
  };
}

function getInBucketSMTPConfiguration() {
  return {
    host: '0.0.0.0',
    port: 54325,
    secure: false,
    auth: {},
  };
}
