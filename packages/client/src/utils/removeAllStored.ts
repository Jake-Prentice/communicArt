import {PREFIX} from "constants/index";

//remove everything stored in localstorage/sessionstorage with the app PREFIX
const removeAllStored = (storageType: Storage) => {
    Object.entries(storageType).map(
        x => x[0] 
    ).filter(
        x => x.substring(0,PREFIX.length) === PREFIX
    ).forEach(
        x => storageType.removeItem(x))
}

export default removeAllStored;