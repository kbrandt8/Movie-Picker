import { getFavorites, getUserAccount } from '@/utils/getUser'
import { cookies } from 'next/headers'
import { getFaves } from '@/utils/getDash'
import Dashboard from '@/components/dashboard/dashboard';
import Movie from '@/components/dashboard/movie';
import { redirect } from 'next/navigation'
import MovieRecs from '@/components/dashboard/movie';
export default async function Page() {
  const cookieStore = await cookies()

  const session = cookieStore.get('movieSession')?.value || ""
  const data = await getUserAccount(session)
  const account_id = await data.id
  const faves = await getFaves(account_id)

  if (session !== "") {
    return (
      <main>
        <Dashboard data={data} />
        {faves.map((item: any) =>
          <div key={item.id}>
            <MovieRecs movie={item} />
          </div>
        )
        }
      </main>

    )
  } else {
    redirect("/")

  }
}