// src/mocks/mockUsers.ts
export interface User {
    username: string;
    password: string;
}

export const mockUsers: User[] = [
    { username: "admin", password: "admin123" },
    { username: "guest", password: "guest123" }
];
