import React from "react";
import {SelectOption} from "@/lib/entities/SelectOption";

export function BFCSelect<T extends SelectOption>({options, selected, color, setSelected, setColor}: { options: T[]; selected: T; color: string; setSelected: React.Dispatch<React.SetStateAction<T>>; setColor: React.Dispatch<React.SetStateAction<string>>; }): React.JSX.Element {

    function setSelectedItemById(id: number) {
        const selectedItem: T | undefined = options.find((option: T) => option.id === id);
        selectedItem && setSelected(selectedItem);
    }

    const changeSelectedOption = (e: React.ChangeEvent<HTMLSelectElement>): void => {
        const value: string[] = e.target.value.split(",");
        setColor(value[1]);
        setSelectedItemById(Number(value[0]));
    }

    // Set value prop on select
    const selectedValue = `${selected.id},${selected.color}`; // Combine ID and color

    return (
        <div className="mt-2">
            <select
                name="selectedGroup"
                onChange={changeSelectedOption}
                style={{color: color}}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900  shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-600 sm:text-sm sm:leading-6"
                value={selectedValue} // Set the combined value
            >
                {options.map((item: T) => (
                    <option
                        id={item.id.toString()}
                        key={item.id}
                        style={{color: item.color}}
                        value={[item.id.toString(), item.color]}>{item.title}</option>
                ))}
            </select>
        </div>
    );
}
