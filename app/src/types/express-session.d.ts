import 'express-session';

declare module 'express-session' {
    interface SessionData {
        user_id: string;
    }
}
