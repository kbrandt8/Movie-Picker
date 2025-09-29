'use client'
import Link from "next/link"
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Movie from "../movie";
import Carousel from 'react-bootstrap/Carousel';
interface cast {
    media_type: string,
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    genre_ids: [number],
    popularity: number,
    vote_average: number,
    release_date: Date,
    poster_path: string,
    character: string
}
interface crew {
    media_type: string,
    id: number,
    backdrop_path: string,
    title: string,
    overview: string,
    genre_ids: [number],
    popularity: number,
    vote_average: number,
    release_date: Date,
    poster_path: string,
    job: string
}
export default function CastProfile({ data, cast, crew }: {
    data: {
        name: string,
        known_for_department: string,
        profile_path: string,
        gender: number,
        popularity: number,
        id: number,
        place_of_birth: string,
        birthday: string,
        biography: string
    }, cast: [cast],
    crew: [crew]
}) {
    const crewMovies = crew.filter(item => item.media_type === "movie")
    const castMovies = cast.filter(item => item.media_type === "movie")


    const imgLink = `https://image.tmdb.org/t/p/original/`

    return (
        <div className="flex flex-column ">
            <Carousel

                fade
                indicators={false}
                pause='hover'
                keyboard
                prevIcon={''}
                nextIcon={''}
                wrap={true}
                touch={true}

            >

                {cast ?

                    cast.map((movie: any) =>
                        <Carousel.Item key={cast.indexOf(movie)}>
                            <div className="selectedMovie" style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
                            }}>
                                <div className="castInfoBackground">
                                    <h1>{data.name}</h1>

                                </div>
                            </div>
                        </Carousel.Item>
                    ) :

                    crew.map((movie: any) =>
                        <Carousel.Item key={crew.indexOf(movie)}>
                            <div className="selectedCastMovie" style={{
                                backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,

                            }}>
                                <div className="castInfoBackground">
                                    <h1>{data.name}</h1>
                                </div>
                            </div>
                        </Carousel.Item>
                    )
                }

            </Carousel><div>

            </div>



            <div className=" flex flex-column text-center place-content-center m-1">
                <h1>About {data.name}</h1>
                <p>
                    {data.profile_path &&

                        <Image className='portrait float-left' src={imgLink + data.profile_path} height={150} width={100} alt={data.name} />

                    }     {data.biography}</p>



                {castMovies &&
                    <main>
                        <h1>Cast</h1>

                        <div className=' flex flex-row flex-wrap place-content-center '>
                            {castMovies.map((item: any) =>
                                <div key={cast.indexOf(item)} className=' p-1 m-1 flex flex-column justify-center content-center'>

                                    <Movie movie={item} width={7} />

                                </div>
                            )
                            }</div></main>}


                {crewMovies &&
                    <main>
                        <h1>Crew</h1>

                        <div className=' flex flex-row flex-wrap  place-content-center '>
                            {crewMovies.map((item: any) =>
                                <div key={crew.indexOf(item)} className=' p-1 m-1 flex flex-column justify-center content-center'>

                                    <Movie movie={item} width={7} />

                                </div>
                            )
                            }</div></main>}

            </div>

        </div>

    )
}