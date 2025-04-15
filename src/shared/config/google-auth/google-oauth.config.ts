import { registerAs } from '@nestjs/config';

export default registerAs('googleAuth', () => ({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callBackUrl: process.env.CALLBACK_URL,
}));
