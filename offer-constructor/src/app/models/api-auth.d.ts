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