export class ErrorResponse extends Error {

    constructor(
        name: string,
        message: string,
        public status: number,
        public properties?: any,
        public internalProperties?: any) {
        super();
        this.name = name;
        this.message = message;
    }

    public static NotFound(properties?: any, internalProperties?: any) {
        return new ErrorResponse("Resource not found", "The specific resource does not exist", 404);
    }

    public static Unauthorized(properties?: any, internalProperties?: any) {
        return new ErrorResponse("Unauthorized", "The request has not been applied because it lacks valid authentication credentials for the target resource.", 401);
    }

    public static InternalError(properties?: any, internalProperties?: any) {
        return new ErrorResponse("Internal Error", "Request could not be carried out", 500);
    }
}
