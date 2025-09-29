'use client'
import Link from 'next/link'
import { peopleResult } from '@/utils/getTypes'
import CastProfile from '../pages/castProfile'
import Profile from '../profile'
export default function PeopleResults({ data }: { data: Array<peopleResult> }) {



  if (data !== undefined) {

    const people = data.filter(item => item.profile_path !== null)
    return (
      <div className=' listItem '>

        {people.map((item: any) =>
          <div key={item.id} >

            <Link href={`/cast/${item.id}`}>
              <Profile data={item} />
            </Link>
          </div>

        )}

      </div>)
  }



}
