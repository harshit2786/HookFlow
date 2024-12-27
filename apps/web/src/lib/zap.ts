export interface Action {
    id: string;
    order: number;
    metaData : object | null
}

export class Zap {
    triggerId: string | null;
    actions: Action[];

    constructor() {
        this.triggerId = null;
        this.actions = [];
    }

    setTrigger(id: string) {
        this.triggerId = id;
    }

    addAction(a: Action) {
        if (a.order > this.actions.length) {
            return;
        } else if (a.order === this.actions.length) {
            this.actions.push(a);
        } else {
            this.actions.splice(a.order, 0, a);
            for (let i = a.order + 1; i < this.actions.length; i++) {
                this.actions[i].order++;
            }
        }
    }
    updateAction(a: Action){
        if (a.order >= this.actions.length) {
            return;
        }
        this.actions[a.order] = a;
    }
    removeAction(ind : number){
        if (ind >= this.actions.length) {
            return;
        }
        this.actions.splice(ind,1);
        for (let i = ind; i < this.actions.length; i++) {
            this.actions[i].order--;
        }
    }
}
