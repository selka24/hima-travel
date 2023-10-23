const errors = ref([]);
const invalid = ref(false);
const validParams = reactive({
    nights: null,
    checkin_date: null,
    origin_id: null,
    destination_id: null,
})

const queryInt = [
    'nights',
    'checkin_date',
    'origin_id',
    'destination_id',
]
export const useQueryValidator = () => {
    const route = useRoute();
    const handleQueryValidate = () => {
        errors.value = [];
        console.log('handleQueryValidate handleQueryValidate')
        queryInt.forEach(param => {
            if(!route.query[param]) {
                errors.value.push(`${param} has no value`)
            }
        })


        const {
            nights,
            checkin_date,
            origin_id,
            destination_id
        } = route.query

        if(!errors.value.length) {
            validParams.checkin_date = new Date(checkin_date);

            if(isNaN(validParams.checkin_date)){
                errors.value.push(`Data nuk eshte korrekte`);
            }

            try {
                validParams.nights = JSON.parse(nights);
                if(isNaN(validParams.nights)) throw new Error('nights invalid')
            } catch (e) {
                errors.value.push(`Netet e fjetjes nuk jane korrekte`);
            }

            try {
                validParams.origin_id = JSON.parse(origin_id);
                if(isNaN(validParams.origin_id)) throw new Error('origin_id invalid')
            } catch (e) {
                errors.value.push(`Nisja nuk eshte korrekte`)
            }

            try {
                validParams.destination_id = JSON.parse(destination_id);
                if(isNaN(validParams.destination_id)) throw new Error('destination_id invalid')
            } catch (e) {
                errors.value.push(`Mberritja nuk eshte korrekte`)
            }
        }
        invalid.value = !!errors.value.length;
    }

    handleQueryValidate();

    return {
        errors,
        invalid,
        validParams,
        handleQueryValidate
    }
}
