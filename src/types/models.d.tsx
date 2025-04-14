
declare global {
    interface ITodo {
        id: number;
        name: string;
    }

    interface IUserLogin {
        username: string;
        password: string;
    }
}
export default global;