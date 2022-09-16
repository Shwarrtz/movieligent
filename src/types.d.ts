type Movie = {   
    id: number,
    title: string,
    adult: boolean,
    backdrop_path: string,
    genre_ids: Array<number>,
    original_language: string,
    original_title: string,
    overview: string,
    popularity: number,
    poster_path: string,
    release_date: string,
    video: boolean,
    vote_average: number,
    vote_count: number
}

type Header = {   
    id: string,    
    type: string,
    label: string,
    visible: boolean,
    array: boolean
}

type Error = {   
    hasError: boolean,    
    messages: {}
}

type IFilterData = {
    language: String,
    page: Number,
    include_adult: Boolean,
    region: String,
    year: any,
    primary_release_year: any
}

type Favourite = {
    id: Array<number>,
    name: Array<String>
}