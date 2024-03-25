import React from "react";
// @ts-ignore
import {Dialog} from "@headlessui/react";
import {ModalView} from "@/lib/entities/ModalView";

function getColor(color: String): string {
    switch (color){
        case 'green':
            return `bg-green-100`
            break;
        case 'blue':
            return `bg-blue-100`
            break;

        case 'red':
            return `bg-red-100`
            break;

        default:
            return ''
    }


}

export function BFCDialogHeading({name, text, color, children}: ModalView) {
    return (
        <div>
            <div className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full ${getColor(color)}`}>
                {children}
            </div>
            <div className="mt-3 text-center ">
                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                    {name + " Event"}
                </Dialog.Title>
                <div className="my-3">
                    <p className="text-sm text-gray-500">
                        {text}
                    </p>
                </div>
            </div>
        </div>
        // </div>

    );
}