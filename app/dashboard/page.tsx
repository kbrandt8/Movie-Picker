import { getFavorites, getUserAccount } from '@/utils/getUser'
import { cookies } from 'next/headers'
import {getFaves} from '@/utils/getDash'
import Dashboard from '@/components/dashboard/dashboard';
import Movie from '@/components/dashboard/movie';
import MovieRecs from '@/components/dashboard/movie';
export default async  function Page() {
    const cookieStore = cookies()
    const session = cookieStore.get('session')?.value
    const data = await getUserAccount(session)
    const account_id = await data.id
    const faves = await getFaves(account_id)



  return (
    <>
    <Dashboard data={data} />
{faves.map((item:any)=>
<div key={item.id}>
  <MovieRecs movie={item} />
  </div>
)
  }
    </>

  )
}