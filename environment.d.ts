declare namespace NodeJS {
    interface ProcessEnv {
        PORT : string;
        NODE_ENV: 'development' | 'prod' | 'test' | 'production';

        POSTGRES_HOST: string;
        POSTGRES_PORT: string;
        POSTGRES_USER: string;
        POSTGRES_PASSWORD: string;
        POSTGRES_DB: string;
    }
}
