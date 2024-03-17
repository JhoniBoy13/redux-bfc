import React from "react";

export function BFCButton({ text, clickFunction, type , extraClass , disabled}: { text: string, clickFunction?: () => void, type?: "submit" | "reset" | "button" , extraClass?: string, disabled?: boolean}) : React.JSX.Element {
    return (
        <button type={type ?? 'button'} className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${extraClass}`} onClick={clickFunction} disabled={disabled ?? false}>
            {text}
        </button>
    );
}