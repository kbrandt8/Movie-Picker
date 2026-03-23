
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { getUserAccount, getUserInfo } from '@/utils/getUser';
import { cookies } from 'next/headers'
export default async function LoginButton({ loggedIn, session }: { loggedIn: boolean, session: string }) {


  if (loggedIn) {
    const { account_id } = await getUserAccount(session)
    const accountDetails = await getUserInfo(account_id)
    return (
      <Navbar className="bg-body-tertiary">
        <Container className="flex flex-column justify-content: center;">

          Hi, {accountDetails.name}

          <div className="d-inline-block align-top avatar " style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original/${accountDetails.avatar.tmdb.avatar_path})`
          }} />

        </Container>
        <Container></Container>
        <Container></Container>
        <Container><Link href={'/logout'}><Button>Log out</Button></Link></Container>
      </Navbar>
    )
  } else {

    return (
      <Navbar className="bg-body-tertiary">
        <Container>
          <Link href={`/login/`}>
            <Button >Log in</Button>
          </Link>
        </Container>
      </Navbar>

    )
  }

}