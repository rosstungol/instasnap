import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { Input } from "@/components/ui/input"
import { GridPostItem, Loader, SearchResults } from "@/components/shared"
import { useGetExplorePosts, useSearchPosts } from "@/lib/react-query/queries"
import useDebounce from "@/hooks/useDebounce"
import { useUserContext } from "@/context/AuthContext"

const Explore = () => {
  const { ref, inView } = useInView()
  const { user } = useUserContext()
  const { data, fetchNextPage, isFetchingNextPage } = useGetExplorePosts()

  const explorePosts = data?.pages.flatMap((page) => page)

  const [searchValue, setSearchValue] = useState("")
  const debouncedBValue = useDebounce(searchValue, 500)
  const { data: searchedPosts, isFetching: isSearchFetching } =
    useSearchPosts(debouncedBValue)

  useEffect(() => {
    if (inView && !searchValue) fetchNextPage()
  }, [inView, searchValue])

  if (!explorePosts) {
    return (
      <div className='flex flex-center w-full h-full'>
        <Loader />
      </div>
    )
  }

  const shouldShowSearchResults = searchValue !== ""

  const explorePostGrid = (
    <ul className='grid-container'>
      {explorePosts.map((post, i) => {
        if (i + 1 === explorePosts.length)
          return (
            <li ref={ref} className='relative min-w-80 h-80' key={post?.$id}>
              <GridPostItem
                user={user}
                post={post}
                showUser={false}
                showStats={true}
              />
            </li>
          )
        return (
          <li className='relative min-w-80 h-80' key={post?.$id}>
            <GridPostItem
              user={user}
              post={post}
              showUser={false}
              showStats={true}
            />
          </li>
        )
      })}
    </ul>
  )

  return (
    <div className='explore-container'>
      <div className='explore-inner_container'>
        <h2 className='h3-bold md:h2-bold w-full'>Search Posts</h2>
        <div className='flex gap-1 px-4 w-full rounded-lg bg-dark-4'>
          <img
            src='/assets/icons/search.svg'
            alt='search'
            width={24}
            height={24}
          />
          <Input
            type='text'
            placeholder='Search'
            className='explore-search'
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
          />
        </div>
      </div>

      <div className='flex-between w-full max-w-5xl mt-16 mb-7'>
        <h3 className='body-bold md:h3-bold'>Popular Today</h3>
      </div>

      <div className='flex flex-wrap gap-9 w-full max-w-5xl'>
        {shouldShowSearchResults ? (
          <SearchResults
            isSearchFetching={isSearchFetching}
            searchedPosts={searchedPosts?.documents}
          />
        ) : (
          explorePostGrid
        )}
      </div>

      {isFetchingNextPage && (
        <div className='mt-10'>
          <Loader />
        </div>
      )}
    </div>
  )
}

export default Explore
