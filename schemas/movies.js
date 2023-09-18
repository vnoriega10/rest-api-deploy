const z =  require('zod')

const movieSchema = z.object({
    title: z.string({
        invalid_type_error: 'El titulo de la pelicula debe ser un string',
        required_error: 'El titulo de la pelicula es requerido'
    }),
    year: z.number().int().min(1900).max(2024),
    director: z.string(),
    duration: z.number().int().positive(),
    rate: z.number().min(0).max(10).default(5.5),
    poster: z.string().url({
        message: 'Debe ser una url para el poster'
    }),
    genre: z.array(
        z.enum(['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Crime' ,'Sci-Fi']),
        {
            required_error: 'Genero de pelicula es requerido',
            invalid_type_error: 'Debe ser un genero en enum'
        }
    )
})

function validateMovie(object) {
    return movieSchema.safeParse(object)
}

function validatePartalMovie(object){
    return movieSchema.partial().safeParse(object)
}

module.exports = {
    validateMovie,
    validatePartalMovie
}