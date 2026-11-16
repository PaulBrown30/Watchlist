export type Show = {
    id: number;
    title: string;
    year: number;
    kind: "film" | "serie";
}

export const watchlist: Show[] = [
    {
        id: 1,
        title: "Le cronache di Narnia", 
        year: 2001,
        kind: "film"
    },
        {
        id: 2,
        title: "Star wars", 
        year: 1971,
        kind: "film"
    },
        {
        id: 3,
        title: "Edgerunners", 
        year: 2021,
        kind: "serie"
    },
        {
        id: 4,
        title: "Avengers", 
        year: 2011,
        kind: "film"
    },
        {
        id: 5,
        title: "Friends", 
        year: 1990,
        kind: "serie"
    },
        {
        id: 6,
        title: "Scrubs", 
        year: 2003,
        kind: "serie"
    },
]