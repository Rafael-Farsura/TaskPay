import { User } from './path/to/your/user/entity';

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
