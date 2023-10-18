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
}

