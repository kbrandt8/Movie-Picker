'use client'
import Button from 'react-bootstrap/Button';
import { useState, useEffect } from 'react'
import { addFavorite } from "@/utils/getUser";
import Card from 'react-bootstrap/Card';
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function Favorites({ data, user }: { data: [{ id: string, poster_path: string, title: string }], user: string }) {
    const imgLink = `https://image.tmdb.org/t/p/original/`
    const router = useRouter();

    return (
        <div className='listItem'>
            {data.map((movie: any) => <div key={movie.id} className='m-1' >
                <Card style={{ width: '8rem' }} >
                    <Link href={`/movies/${movie.id}`} > <Card.Img variant="top" src={imgLink + movie.poster_path} /></Link>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Body>
                        <Button onClick={() => { addFavorite('movie', movie.id, false, user); router.refresh() }}>Delete?</Button>
                    </Card.Body>
                </Card>


            </div>)}
        </div>
    )
} 