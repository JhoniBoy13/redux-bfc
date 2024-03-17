import React from "react";

export function BFCInput({ text, setText, name , placeholder }: { text: string, setText: React.Dispatch<React.SetStateAction<string>> ,name:string, placeholder: string}) : React.JSX.Element{
    const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setText(e.target.value)
    }

    return (
        <div className="mt-2">
            <input type="text" name={name} className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" value={text} onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleTextChange(e)} placeholder={placeholder}/>
        </div>
    );
}