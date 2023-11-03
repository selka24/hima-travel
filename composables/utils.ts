import { format, formatDuration } from 'date-fns';
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
    const formatDurationSQ = (duration: any, options: string[] = ['hours', 'minutes']) => {
        return formatDuration(duration, {
            format: options,
            locale: sq
        })
    }

    const isInViewport = (el: HTMLElement) => {
        const rect = el.getBoundingClientRect();

        // returns true or false based on whether the element is in viewport
        const isInView = (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)

        );

        return isInView;
    }

    const roomBasisInfo = (code: string) => {
        switch (code) {
            case 'BB':
                return 'Mëngjesi i përfshirë';
            case 'CB':
                return 'Mengjes kontinental';
            case 'AI':
                return 'All Inclusive';
            case 'FB':
                return 'Full board';
            case 'HB':
                return 'Half board';
            case 'RO':
                return 'Pa ushqim';
            case 'BD':
                return 'Darka e përfshirë';
            default:
                return `DEV-rast i ri: ${code}`;
        }

    }

    const sendWhatsappMessage = () => {
        const number = '355696696144';
        const info = ['Udhetime', 'Mar,%20 20 %20 Shtator %20 2023', '2','http://localhost:3000/package']
        const link = `https://api.whatsapp.com/send/?phone=${number}&text=`
        let message = `Pershendetje%0a
        Dua %20te%20 prenotoj %20paketen:%20${info[0]}%0a
        Data:%20 ${info[1]}%0a
        Numri%20 personave:%20${info[2]}%0a
        Linku%20 pakets:%20${info[3]}`
        window.open(link + message.replace(/\s+/g, ''), "_blank");
    }

    return {
        multipleSearchFilter,
        isInViewport,
        displayNights,
        formatDateSQ,
        formatDurationSQ,
        sendWhatsappMessage,
        roomBasisInfo
    }
}
