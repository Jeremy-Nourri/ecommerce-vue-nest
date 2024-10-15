export default class FetchError extends Error {
    public readonly statusCode: number;
    public readonly url?: string;
    public readonly method?: string;
    public readonly responseBody?: any;
  
    constructor(
        message: string, 
        statusCode: number, 
        url?: string, 
        method?: string, 
        responseBody?: any
    ) {
        super(message);
  
        this.name = "FetchError";
  
        this.statusCode = statusCode;
        this.url = url;
        this.method = method;
        this.responseBody = responseBody;
  
    }
}
  