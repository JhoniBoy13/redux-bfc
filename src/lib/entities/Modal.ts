import React from "react";
import {ModalView} from "@/lib/entities/ModalView";

export interface ModalInterface {
    showModal: boolean; // State variable for modal visibility
    onClose: () => void; // Function to handle modal closing
    children: React.ReactNode;
}

export class Modal implements ModalInterface {
    // Content to be rendered within the modal
    showModal: boolean; // State variable for modal visibility
    onClose: () => void; // Function to handle modal closing
    children: React.ReactNode;

    constructor({showModal = false, onClose, children}: Modal) {
        this.showModal = showModal;
        this.onClose = onClose
        this.children = children
    }
}