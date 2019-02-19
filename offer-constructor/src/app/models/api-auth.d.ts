export interface ExistUserResponse {
    result: boolean;
}

export interface RegisterUserResponse {
    result: boolean;
}

export interface LoginUserResponse {
    result: boolean;
    token: string;
}

export interface CurrentUserResponse {
    result: boolean;
    user: User;
}

export interface User {
    id: number;
    email: string;
    firstname: string;
    lastname: string;
    surname: string;
    avatar: boolean;
}

export interface UpdateUserResponse {
    result: boolean;
    data: User;
}