import { MailerSend, Sender } from "mailersend";
import dotenv from "./dotenv";

const mailerSend = new MailerSend({
	apiKey: dotenv.MAIL.APIKEY,
});

const sentFrom = new Sender(
	dotenv.MAIL.SMTP.TOKEN,
	dotenv.MAIL.NAME,
);

export { mailerSend, sentFrom };
