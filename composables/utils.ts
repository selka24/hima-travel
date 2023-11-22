import {format, formatDuration} from 'date-fns';
import {sq} from 'date-fns/locale';

export const useUtils = () => {

    const runtimeConfig = useRuntimeConfig();


    const multipleSearchFilter = (array: any[], filterKeys: string | string[], keyword: string) => {
        const checkIdx = (option: string) => option.toLowerCase().indexOf(keyword);
        return array.filter(opt => {
            if (Array.isArray(filterKeys)) {
                for (let x = 0; x < filterKeys.length; x++) {
                    const idx = checkIdx(opt[filterKeys[x] || '']);
                    if (idx >= 0) return true;
                }
                return false;
            } else {
                return checkIdx(opt[filterKeys || '']);
            }
        })
    }

    const displayNights = (nights: number) => {
        if (!nights) return '';
        return nights + (nights > 1 ? ' Netë' : ' Natë')
    }

    const removeTimezone = (date: any) => {
        const parseDate = new Date(date)
        const userTimezoneOffset = parseDate.getTimezoneOffset() * 60000;
        return new Date(parseDate.valueOf() + userTimezoneOffset)
    }

    const formatDateSQ = (date: Date | number | string, formatStr: string = 'PP') => {
        return format(removeTimezone(date), formatStr, {
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
        if (!el) return false;
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
                return 'Vetëm fjetje';
            case 'BD':
                return 'Darka e përfshirë';
            default:
                return `DEV-rast i ri: ${code}`;
        }

    }

    const sendWhatsappMessage = (pckg: FullPackage) => {
        const number = '355695161381';
        // const info = ['Udhetime', 'Mar,%20 20 %20 Shtator %20 2023', '2','http://localhost:3000/package']
        const link = `https://api.whatsapp.com/send/?phone=${number}&text=`
        const pckgTitle = pckg.hotel_data.hotel.name.replace(/\s+/g, '%20');
        const pckgNight = displayNights(pckg.hotel_data.number_of_nights).replace(/\s+/g, '%20');
        const pckgBasis = roomBasisInfo(pckg.hotel_data.room_basis).replace(/\s+/g, '%20');
        let message = `Pershendetje %20 Hima%0a
        Jam %20i%20 interesuar %20për%20 udhëtimin %20${pckg.hotel_data.hotel.city.replace(/\s+/g, '%20')}%0a
        Nisja:%20 ${formatDateSQ(pckg.hotel_data.check_in_date, 'dd %20 LLLL %20 yyyy')}, %20 ${pckgNight} %20, ${pckgBasis}%0a
        Hotel:%20 ${pckgTitle}`
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
        removeTimezone,
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
