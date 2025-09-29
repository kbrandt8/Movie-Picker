'use client'
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Badge from 'react-bootstrap/Badge';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { addFavorite } from "@/utils/getUser";
import { addToList } from "@/utils/getLists";
import { useRouter } from 'next/navigation'
import { useState } from "react";
import Trailer from "./trailer";
import Watch from "./watch";
import { movieInfo, list, provider } from "@/utils/getTypes";
export default function MovieInfo({ data, user, favorite, lists, session, providers, trailerId }: {
  data: movieInfo,
  user: string,
  favorite: boolean,
  lists: [list],
  session: string,
  providers: {
    free: [provider],
    ads: [provider],
    rent: [provider],
    buy: [provider]
  },
  trailerId: string

}) {

  const router = useRouter()

  const imgLink = `https://image.tmdb.org/t/p/original/`

  const [show, setShow] = useState(false);


  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const changeFavorite = favorite ? <Button onClick={() => { addFavorite('movie', data.id, false, user); router.refresh() }}>Remove From Favorites?</Button> :
    <Button onClick={() => { addFavorite('movie', data.id, true, user); router.refresh(); }}>Add To Favorites?</Button>
  const addList = lists.map((item: any) => <Dropdown.Item key={item.id} onClick={() => { addToList(item.id, data.id, session); router.refresh() }}>{item.name}</Dropdown.Item>)
  return (<div>
    <div className="d-flex justify-content-around">
      <Card style={{ width: '100%' }}>
        <Card.Body>
          <div className="selectedMovie" style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${data.backdrop_path})`
          }}>
            <div className="movieInfoBackground">
              <h1>{data.title}</h1>
              <div className="movieInfo">
                <h1>{data.tagline && data.tagline}</h1>

              </div></div></div>

          <Card.Text>
            {data.runtime && data.runtime + " mins"}<br />
            {data.overview && data.overview}
          </Card.Text>
          {trailerId && <div>
            <Button onClick={handleShow} >Watch Trailer</Button>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>{data.title}</Modal.Title>
              </Modal.Header>
              <Modal.Body>

                <Trailer data={trailerId} />
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>

          </div>}

          {user !== undefined && changeFavorite}
          {user !== undefined && <DropdownButton id="dropdown-basic-button" title="Add to a List?">{addList}</DropdownButton>}


          {providers &&
            <Watch data={providers} />
          }
        </Card.Body>
      </Card>
    </div></div>
  )
}