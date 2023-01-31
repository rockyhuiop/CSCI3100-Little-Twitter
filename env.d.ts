declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      MONGO_URI: string;
      SESSION_SECRET: string;
    }
  }
  namespace Express {
    export interface Request {
      user?: User;
    }
  }
}

declare module "express-session" {
  interface Session {
    user: {
      name: string;
      _id: string;
      email: string;
    };
  }
}

export {};
