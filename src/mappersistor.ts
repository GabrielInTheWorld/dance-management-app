import {existsSync, readFile, writeFileSync} from 'fs';
import {Persistor, MapWithInsertionIndex} from './persistor'

/** 
 * Persists maps that hold number-keys and values of type V in the filePath.
 */
export class MapPersistor<V> implements Persistor<V>{

    /** 
     * Creates an instance of MapPersistor<V>
     * 
     * @param {string} filePath The path at which save-data should be saved and loaded
     */
    public constructor(private readonly filePath: string) {
        console.log('Persistor: In working order');
    }

    /**
     * Loads the saved map, if there is a save-file.
     * 
     * If there is no save-file a new, empty map is created.
     * 
     * @returns {MapWithInsertionIndex<V>} A promise for an Array holding the loaded map, as well as the number right above the highest key
     */
    public async loadData(): Promise<MapWithInsertionIndex<V>> {
        //make an empty map:
        let map = new Map<number, V>();

        //if a save-file exists, use its' data instead of the empty map
        if (existsSync(this.filePath)) {
            try {
                //load the data from the file
                const loadedData = await this.actuallyLoadData();

                //transform the contents back into a map
                map = new Map<number, V>(JSON.parse(loadedData));
            }
            catch (ex) {
                console.error("ERROR occurred while loading data, maybe the file is faulty?: %s", ex);
            }
        }
        console.log('Persistor: Data loaded');

        //return with a newly initialized idCounter
        return {theMap: map, idCounter: this.getNewIdCounter(map)};
    }
    
    /**
     * Loads a string object from the save-file in filePath.
     * 
     * Said save-file is presumed to exist.
     * @returns {string} The string containing the save-files content
     */
    private async actuallyLoadData(): Promise<string>{
        const loadedData = await new Promise<string>((resolve, reject) => {
            readFile(this.filePath, 'utf8', (err, data)=>{
                if (err) reject(err);
                resolve(data);
            })
        });
        return loadedData;
    }

    /**
     * Saves a given Map in the save-file
     * 
     * @param {Map<number, V>} toBePersisted The Map that is to be persisted in the save-file
     */
    public persistData(toBePersisted: Map<number, V>): void{
        writeFileSync(this.filePath, JSON.stringify([...toBePersisted]));
        console.log('Persistor: Data persisted');
    }

    /**
     * Calculates the lowest free integer-key, that is higher than all existing keys
     * 
     * @param {Map<number, V>} map The Map for which the key is to be calculated
     * @returns {number} The lowest free integer-key, that is higher than all existing keys
     */
    private getNewIdCounter(map: Map<number, V>): number{
        let counter = 0
        map.forEach((value, key, map) => {
            if (key >= counter) {
                counter = key + 1;
            }
        });
        return counter;
    }
}