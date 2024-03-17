import {useState} from 'react';

export const useModalMapHook = () => {
    const [showModalMap, setShowModalMap] = useState<Map<string, boolean>>(new Map([
        ["filterModal", false],
        ["createModal", false],
        ["deleteModal", false],
        ["updateModal", false],
    ]));

    function getFilterModal(): boolean | undefined {
        return showModalMap.get('filterModal')
    }
    function getCreateModal(): boolean | undefined {
        return showModalMap.get('createModal')
    }

    const updateModalState = (modalName: string, value: boolean) => {
        setShowModalMap((prevMap) => new Map(prevMap.set(modalName, value)));
    };

    return {showModalMap, updateModalState, getCreateModal, getFilterModal};
};