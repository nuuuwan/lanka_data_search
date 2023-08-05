const CACHE_KEY_DATASET_HISTORY = 'datasetHistory';

export default class DatasetHistory {
    static getHistory() {
        return JSON.parse(localStorage.getItem(CACHE_KEY_DATASET_HISTORY) || '[]');
    }

    static setHistory(history) {
        localStorage.setItem(CACHE_KEY_DATASET_HISTORY, JSON.stringify(history));
    }


    static addToHistory(datasetList) {
        const datasetIDList = datasetList.map((x) => x.shortID);
        const newHistory = [...new Set([].concat( DatasetHistory.getHistory(), datasetIDList))];
        DatasetHistory.setHistory(newHistory);
    }
}