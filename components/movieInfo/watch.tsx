'use client'
import Accordion from 'react-bootstrap/Accordion';
import Image from 'react-bootstrap/Image';
import { provider } from '@/utils/getTypes';
export default function Watch({ data }: {
  data: {
    free: [provider],
    ads: [provider],
    rent: [provider],
    buy: [provider]
  }
}) {
  const imgLink = `https://image.tmdb.org/t/p/original/`



  return (
    <div>
      <Accordion defaultActiveKey="0" flush>


        {data.free && <Accordion.Item eventKey="0">
          <Accordion.Header>Streaming Free</Accordion.Header>
          <Accordion.Body>
            {data.free.map((item: any) => <button key={item.provider_id}><Image src={imgLink + item.logo_path} width={100} height={100} alt={item.provider_name}></Image>{item.provider_name}</button>)}
          </Accordion.Body>

        </Accordion.Item>}
        {data.ads && <Accordion.Item eventKey="1">
          <Accordion.Header>Watch with Ads</Accordion.Header>
          <Accordion.Body>
            {data.ads.map((item: any) => <button key={item.provider_id}><Image src={imgLink + item.logo_path} width={100} height={100} alt={item.provider_name}></Image>{item.provider_name}</button>)}
          </Accordion.Body>
        </Accordion.Item>}
        {data.rent && <Accordion.Item eventKey="2">
          <Accordion.Header>Rent</Accordion.Header>
          <Accordion.Body>
            {data.rent.map((item: any) => <button key={item.provider_id}><Image src={imgLink + item.logo_path} width={100} height={100} alt={item.provider_name}></Image>{item.provider_name}</button>)}
          </Accordion.Body>
        </Accordion.Item>}
        {data.buy &&
          <Accordion.Item eventKey="3">
            <Accordion.Header>Buy</Accordion.Header>
            <Accordion.Body>
              {data.buy.map((item: any) => <button key={item.provider_id}><Image src={imgLink + item.logo_path} width={100} height={100} alt={item.provider_name}></Image>{item.provider_name}</button>)}
            </Accordion.Body>
          </Accordion.Item>}
      </Accordion>
    </div>
  )
}