import React from "react";

export function BFCTextArea({ text, setText, row , placeholder }: { text: string, setText: React.Dispatch<React.SetStateAction<string>> ,row:number, placeholder: string}) : React.JSX.Element{
    const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>): void => {
        setText(e.target.value)
    }

    return (
        <div className="form-outline mt-2">
            <textarea className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6" style={{textIndent: "5px"}} rows={row} placeholder={placeholder} value={text} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleTextChange(e)}></textarea>
        </div>
    );
}