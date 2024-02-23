export enum LoadingState {
    LOADED = 'LOADED',
    ERROR = 'ERROR',
    NEVER = 'NEVER',
}

export interface ResponseTweet<T> {
    success: string;
    data: T;
}
export interface Tweet {
    _id: string;
    text: string;
    user: {
        fullName: string;
        userName: string;
        avatarUrl: string;
    };
    images?: string[];
    createdAt: string;
}
export interface Tags {
    _id: string;
    name: string;
    count: number;
}

export interface TweetsState {
    items: Tweet[];
    loadingState: LoadingState;
}
