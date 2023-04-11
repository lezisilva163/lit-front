import React from 'react';
import api from '../../Api.js'
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const imgUrl = 'https://image.tmdb.org/t/p/w500'

function Film() {
    const [films, setFilms] = useState([]);
    const [filmsRented, setFilmsRent] = useState([]);

    useEffect(() => {
        listFilms();
        rentedFilms();
    }, []);

    async function listFilms() {
        const response = await api.get('list/film');
        setFilms(response.data)
    }

    async function rentFilm(id, name) {
        try {
            await api.post('/rent/film', {
                filmId: id,
                filmName: name
            });
            setFilmsRent(filmsRented => [...filmsRented, id])
        } catch(error) {
            alert("Ocorreu um erro ao alugar o filme.")
        }
    }

    async function rentedFilms() {
        const response = await api.get('/rented/films');
        const filmsRented = response.data.map(filmRented => filmRented.the_movie_db_film_id);
        setFilmsRent(filmsRented);
    }

    const CardImage = styled.img`
        width: 100%;
        height: 450px;
        padding: 5px;
        `;
    
    const CardBody = styled.div`
        height: 80px;
        padding: 5px;
        text-align: center;
    `;

    const Title = styled.h2`
        padding: 50px;
    `;

    const Button = styled.button`
        background: #007298;
        border-radius: 5px;
        border: none;
        color: #ffffff
    `;

    const CardFooter = styled.footer`
        backgroud: #007298;
        color: #ffffff;
        border-radius: 5px;
        border: none;
    `;

    return(
        <div className='container-fluid'>
            <>
                <Title className='color4 main-title-size'>TOP FILMES</Title>
                <Row xs={1} md={5} className='g-4'>
                    {films.map(film => (
                        <Col>
                            <Card>
                                <CardImage src={imgUrl + film.poster_path}></CardImage>
                                <CardBody>
                                <Card.Title className='main-text-bold'>{film.title}</Card.Title>
                                </CardBody>
                                { filmsRented.find((filmRented) => filmRented === film.id) 
                                    ? <CardFooter className="text-muted main-text-center">Alugado! Restando 2 dias</CardFooter>
                                    : <Button onClick={async () => { await rentFilm(film.id, film.title) }}>Alugar</Button>
                                }
                            </Card>
                        </Col>
                    ))}
                </Row>
            </>
        </div>
        
    );
}





export default Film;