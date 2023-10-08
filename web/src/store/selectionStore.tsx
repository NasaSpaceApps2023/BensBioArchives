import { makeAutoObservable } from "mobx"

class SelectionStore {
    selectedId: number | null = null

    constructor() {
        makeAutoObservable(this)
    }

    setSelectedId = (nemSelectedId: number | null) => {
        console.log(nemSelectedId);
        this.selectedId = nemSelectedId;
    }
}

const selectionStore = new SelectionStore()
export default selectionStore;