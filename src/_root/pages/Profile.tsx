import { Models } from "appwrite"
import { Link } from "react-router-dom"
import { useGetCurrentUser } from "@/lib/react-query/queries"
import { Button } from "@/components/ui"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { GridPostList, Loader } from "@/components/shared"

const Profile = () => {
  const { data: currentUser, isPending: isUserLoading } = useGetCurrentUser()

  const userPosts = currentUser?.save
    .map((savePost: Models.Document) => ({
      ...savePost.post,
      creator: {
        imageUrl: currentUser.imageUrl
      }
    }))
    .reverse()

  const userLikes = currentUser?.liked.reverse()

  if (isUserLoading) return <Loader />

  return (
    <div className='profile-container'>
      <div className='profile-inner_container'>
        <div className='flex gap-8'>
          <img
            src={
              currentUser?.imageUrl || "/assets/icons/profile-placeholder.svg"
            }
            width={150}
            height={150}
            className='rounded-full'
          />
          <div>
            <div className='flex items-center gap-10'>
              <h2 className='h1-semibold'>{currentUser?.name}</h2>

              <Link to={`/update-profile/${currentUser?.$id}`}>
                <Button type='button' className='shad-button_dark_4'>
                  <img src='/assets/icons/edit.svg' width={24} height={24} />
                  Edit Profile
                </Button>
              </Link>
            </div>
            <p className='text-light-3 body-medium mb-6'>
              {currentUser?.username}
            </p>
            <p className='base-regular'>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.{" "}
              {currentUser?.bio}
            </p>
          </div>
        </div>
      </div>

      <Tabs defaultValue='posts'>
        <TabsList className='mb-8'>
          <TabsTrigger value='posts' className='profile-tab'>
            <img src='/assets/icons/posts.svg' />
            Posts
          </TabsTrigger>
          <TabsTrigger value='likes' className='profile-tab'>
            <img src='/assets/icons/like.svg' />
            Likes
          </TabsTrigger>
        </TabsList>
        <TabsContent value='posts'>
          <GridPostList posts={userPosts} showStats={false} showUser={false} />
        </TabsContent>
        <TabsContent value='likes'>
          <GridPostList posts={userLikes} showStats={false} showUser={false} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Profile
