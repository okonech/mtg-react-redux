interface InstanceMemoizer<P, M> {
    getModel(P): M;
}

export class InstanceMemoizerImpl<P extends {}, M> implements InstanceMemoizer<P, M> {

    private _map = new WeakMap<P, M>();

    constructor(private readonly _classConstructor: new (P) => M) { }

    public getModel(key: P) {
        if (!this._map.has(key)) {
            this._map.set(key, new this._classConstructor(key));
            // console.log(`added card to ${this._classConstructor.name}`);
        }
        return this._map.get(key);
    }
}
