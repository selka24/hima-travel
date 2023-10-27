import { format } from 'date-fns';
import { sq } from 'date-fns/locale';

export const useUtils = () => {
    const multipleSearchFilter = (array: any[], filterKeys: string | string[], keyword: string) => {
        const checkIdx = (option: string) => option.toLowerCase().indexOf(keyword);
        return array.filter(opt => {
            if(Array.isArray(filterKeys)){
                for(let x = 0; x < filterKeys.length; x++){
                    const idx = checkIdx(opt[filterKeys[x] || '']);
                    if(idx >= 0) return true;
                }
                return false;
            } else {
                return checkIdx(opt[filterKeys || '']);
            }
        })
    }

    const displayNights = (nights: number) => {
        if(!nights) return '';
        return nights + (nights > 1 ? ' Netë' : ' Natë')
    }

    const formatDateSQ = (date: Date | number, formatStr: string = 'PP') => {
        return format(date, formatStr, {
            locale: sq
        })
    }

    const roomBasisInfo = (code: string) => {
        switch (code) {
            case 'BB':
                return 'Mengjes i Perfshire';
            case 'CB':
                return 'Mengjes Kontinental';
            case 'AI':
                return 'All Inclusive';
            case 'FB':
                return 'Full Board';
            case 'HB':
                return 'Half Board';
            case 'RO':
                return 'Pa Ushqim';
            case 'BD':
                return 'Darka e perfshire';
            default:
                return `DEV-rast i ri: ${code}`;
        }

    }

    return {
        multipleSearchFilter,
        displayNights,
        formatDateSQ,
        roomBasisInfo
    }
}
