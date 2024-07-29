export default class HTTPResponseError extends Error {
    response: Response;

    constructor(response: Response) {
        super(`HTTP Error ${response.status}: ${response.statusText}`);
        this.response = response;
    }
}