export interface ResponseApi<T> {
    success: string;
    data: T;
    message?: string;
}
export interface IGenericResponse {
    status: string;
    message: string;
}

export interface SignInI {
    email: string;
    password: string;
}
export interface UserI {
    _id: string;
    email: string;
    fullName: string;
    userName: string;
    confirmed: boolean;
    avatarUrl: string;
    token: string;
}
export interface RegisterI {
    email: string;
    fullName: string;
    userName: string;
    password: string;
    password2: string;
}
