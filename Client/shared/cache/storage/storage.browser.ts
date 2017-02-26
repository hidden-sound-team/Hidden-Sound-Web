import { StorageService } from './storage.service';

export class BrowserStorage implements StorageService {
    getItem (key: string): any {
        let storedItem = window.sessionStorage.getItem(key);
        try {
            return JSON.parse(storedItem);
        } catch (ex) {
            return storedItem;
        }
    } 

    setItem (key: string, value: any) {
        // We need to try and stringify it first (we can't save Objects/etc or it'll error out)
        if (typeof value !== 'string') {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        } else {
            window.sessionStorage.setItem(key, value);
        }
    }
    
    removeItem (key: string) {
        window.sessionStorage.removeItem(key);
    }

    clear () {
        window.sessionStorage.clear();
    }
}
