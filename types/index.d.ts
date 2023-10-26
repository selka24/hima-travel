export {  };

declare global {
    interface IBaseOrigin {
        id:	number
        name: string
        description: string
        city: string
        country: string
        created_at:	Date | string
        updated_at:	Date | string
    }

    interface Destination extends IBaseOrigin {
        pivot: {
            origin_id: number
            destination_id: number
        }
    }
    interface Origin extends IBaseOrigin {
        destinations: Destination[]
    }

    interface SearchParams {
        nights: number | null
        checkin_date: string | null
        origin_id: number | null
        destination_id: number | null
    }

    interface Flight {
        id: number
        outbound_flight_id: number
        inbound_flight_id: number
        hotel_data_id: number
        commission: string
        total_price: string
        created_at: Date | string
        updated_at: Date | string
    }

    interface Hotel {
        id: number
        hotel_id: number
        number_of_nights: number
        package_config_id: number
        check_in_date: Date | string
        room_basis: string
        room_details: string
        price: string
        created_at: Date | string
        updated_at: Date | string
    }

    interface Package extends Flight {
        package_config_id: number
        hotel_data: Hotel
    }
}

