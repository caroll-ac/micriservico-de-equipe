export abstract class BaseEntity<T extends object> {
    private proxy: T;

    constructor(public props: T) {
        this.proxy = new Proxy(this.props, {
            get: (target, prop: string) => target[prop as keyof T],
            set: (target, prop: string, value) => {
                target[prop as keyof T] = value;
                return true;
            },
        });
    }

    public get data(): T {
        return this.proxy;
    }
}