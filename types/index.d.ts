export {  };

declare global {
    interface Package {
        id: string | null
        image: string
        country: string
        price: number
        currency: string
        description: string
        logo: string
        offers: number
    }

    interface IBaseOrigin {
        id:	number
        name: string
        description: string
        city: string
        country: string
        created_at:	Date
        updated_at:	Date
    }

    interface Destination extends IBaseOrigin {
        pivot: {
            origin_id: number
            destination_id: number
        }
    }
    interface Origin extends IBaseOrigin {
        id:	number
        name: string
        description: string
        city: string
        country: string
        created_at:	Date
        updated_at:	Date
        destinations: Destination[]
    }
}

