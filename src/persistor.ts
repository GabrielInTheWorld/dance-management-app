/**
 * A number-keyed map where idCounter is the lowest key, from which one can start inserting
 * (without running the risk of accidentally replacing something)
 */
export interface MapWithInsertionIndex<V>{
    theMap: Map<number, V>, 
    idCounter: number
}

export interface Persistor<V>{
    loadData(): Promise<MapWithInsertionIndex<V>>,
    persistData(toBePersisted: Map<number, V>): void;
}