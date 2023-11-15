import { format, formatDuration } from 'date-fns';
import { sq } from 'date-fns/locale';
export const useUtils = () => {

    const runtimeConfig = useRuntimeConfig()

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

    const formatDateSQ = (date: Date | number | string, formatStr: string = 'PP') => {

        return format(new Date(date), formatStr, {
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
        if(!el) return false;
        const rect = el.getBoundingClientRect();
        // returns true or false based on whether the element is in viewport
        return rect.top === 0;
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

    const sendWhatsappMessage = (pckg: FullPackage) => {
        const number = '355696696144';
        const info = ['Udhetime', 'Mar,%20 20 %20 Shtator %20 2023', '2','http://localhost:3000/package']
        const link = `https://api.whatsapp.com/send/?phone=${number}&text=`
        const pckgTitle = pckg.hotel_data.hotel.name.replace(/\s+/g, '%20')
        let message = `Pershendetje,%0a
        Dua %20te%20 prenotoj %20paketen:%20${pckgTitle}%20-%20${pckg.hotel_data.hotel.country}%0a
        Nisja:%20 ${formatDateSQ(pckg.hotel_data.check_in_date, 'dd %20 LLLL %20 yyyy')}%0a
        Numri%20 personave:%20${info[2]}%0a
        Linku%20 i %20 paketës:%20${runtimeConfig.public.prodUrl}/package?package=${pckg.id}`
        window.open(link + message.replace(/\s+/g, ''), "_blank");
    }

    const buildStorageUrl = (file_path: string) => {
        return `${runtimeConfig.public.storageUrl}/${file_path}`
    }

    const getAllDatesInMonth = (year: number, month: number) => {
        let startDate = new Date(year, month - 1, 1); // month is 0-indexed
        let endDate = new Date(year, month, 1);

        let dates = [];
        while (startDate < endDate) {
            dates.push(new Date(startDate)); // clone the date object
            startDate.setDate(startDate.getDate() + 1);
        }

        return dates;
    }

    return {
        multipleSearchFilter,
        isInViewport,
        displayNights,
        formatDateSQ,
        formatDurationSQ,
        buildStorageUrl,
        sendWhatsappMessage,
        roomBasisInfo,
        getAllDatesInMonth,
    }
}
