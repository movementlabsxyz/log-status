export type ResultStatus = "PENDING" | "OK";

export interface ResultOperations<T> {

    getStatus(): ResultStatus;

    fulfill(value: T): void;

    unwrap(): T;

}

export class Result<T> implements ResultOperations<T> {

    private status: ResultStatus;
    private value? : T;

    constructor(status: ResultStatus) {
        this.status = status;
        this.value = undefined;
    }

    getStatus(): ResultStatus {
        return this.status;
    }

    fulfill(value: T): void {
        this.value = value;
        this.status = "OK";
    }

    unwrap(): T {
        if(this.status !== "OK")
            throw new Error("Result not fulfilled");
        return this.value as unknown as T;
    }

}