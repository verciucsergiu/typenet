export class Exception {
    constructor(public message?: string) {
        console.error(message);
    }
}