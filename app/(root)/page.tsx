/* eslint-disable @typescript-eslint/no-unused-vars */
import StartupCard, { StartupCardType } from "@/components/StartupCard";
import SearchForm from "../../components/SearchForm";
import { STARTUPS_QUERY } from "@/sanity/lib/queries";
// import { client } from "@/sanity/lib/client";
import { sanityFetch, SanityLive } from "@/sanity/lib/live";
import { auth } from "@/auth";

export default async function Home({searchParams}: {searchParams: Promise<{query?: string}>
}) {
  const query = (await searchParams).query;
  const params = {search: query || null};

  const session = await auth();
  // console.log(session?.id)
  // const posts = await client.fetch(STARTUPS_QUERY);
  const {data: posts} = await sanityFetch({query: STARTUPS_QUERY, params});
//   const posts = [
//     {
//       _createdAt: new Date(),
//       views: 55,
//       author: { _id: 1, name: "Ayoub"},
//       _id: 1,
//       description : "this is a discription",
//       image : "https://www.wikihow.com/images/thumb/4/41/Get-the-URL-for-Pictures-Draft-Step-1.jpg/v4-460px-Get-the-URL-for-Pictures-Draft-Step-1.jpg.webp",
//       category : "Robots",
//       title : "we Robot",
//     },
// ];
  return (
    <>
    <section className="pink_container">
    <p className='tag'>Pitch, Vote and Grow</p>
    <h1 className="heading">Pitch Your Startup, <br /> Connect With Entrepreneurs</h1>
    <p className="sub-heading !max-w-3xl">
      Submit Ideas on Pitches, and Get Noticed in Virtual Competitions.
    </p>
    <SearchForm query={query}/>
    </section>

    <section className="section_container max-w-[1200px] mx-auto">
    <p className="text-30-semibold">
    {query ? `Search results for "${query}"` : 'All startups '}
  </p>
  
  <ul className="mt-7 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {posts.length > 0 ? (
      posts.map((post: StartupCardType) => (
        <StartupCard key={post._id} post={post}/>
      ))
    ) : (
      <p className="no-results">No startups found</p>
    )}
  </ul>
    </section>

    <SanityLive />
    </>
  );
}
