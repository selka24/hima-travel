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

    interface DestinationPhoto {
        id: number
        destination_id: number
        file_path: string
        created_at: string
        updated_at: string
    }
    interface TravelOffer extends IBaseOrigin{
        show_in_homepage: number
        packages_count: number
        packages_min_total_price: string | null
        destination_photos?: DestinationPhoto[]
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

    interface BasePackage {
        id: number
        outbound_flight_id: number
        inbound_flight_id: number
        hotel_data_id: number
        commission: string
        total_price: string
        price_minus_hotel: string
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

    interface Package extends BasePackage {
        package_config_id: number
        hotel_data: Hotel
    }

    interface HotelPhoto {
        id: number
        hotel_id: number
        file_path: string
        created_at: string
        updated_at: string
    }

    interface FullHotel extends Hotel {
        hotel: {
            id: number
            hotel_id: number
            name: string
            address: string
            phone: string
            fax: string
            stars: number
            stars_id: number
            longitude: string
            review_score: string
            review_count: number
            latitude: string
            is_apartment: number
            giata_code: string
            city_id: number
            city: string
            iso_code: string
            country: string
            description: string
            country_id: number
            destination_id: number
            hotel_photos: HotelPhoto[]
            created_at: string
            updated_at: string
        }
    }

    interface Flight {
        id: number
        origin: string
        destination: string
        departure: string | Date
        arrival: string | Date
        price: string
        airline: string
        extra_data: string
        created_at: null | string
        updated_at: null | string
        package_config_id: number
    }

    interface FullPackage extends BasePackage {
        package_config_id: number
        hotel_data: FullHotel
        outbound_flight: Flight
        inbound_flight: Flight
    }

    interface RecommendPackage extends BasePackage{
        hotel_data: FullHotel
        laravel_through_key: number
    }
}

