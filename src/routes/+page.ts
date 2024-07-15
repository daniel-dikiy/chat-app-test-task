// since there's no dynamic data here, we can prerender
// it so that it gets served as a static asset in production
export const prerender = true;

type ID = number;
export type UserID = ID;
export type UserName = string;

export interface Message {
    id: ID;
    user_id: UserID;
    username: UserName;
    created_at: string;
    time: string;
    text: string;
};