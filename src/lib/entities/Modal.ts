export class Modal {
    readonly name: string
    show: boolean

    constructor(name: string, show: boolean = false) {
        this.show = show;
        this.name = name
    }
}