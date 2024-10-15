export default interface User {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    accessToken?: string;
}