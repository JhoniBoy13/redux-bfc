import React from "react";

export interface ModalViewInterface {
    readonly name: string
    color: string
    text: string
    children?: React.ReactNode
}

export class ModalView implements ModalViewInterface {
    readonly name: string
    color: string
    text: string
    children?: React.ReactNode


    constructor({name, color, text, children}: ModalView) {
        this.name = name
        this.color = color
        this.text = text
        this.children = children
    }
}