import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Loader } from "../shared"
import { ProfileValidation } from "@/lib/validation"
import { Textarea, useToast } from "../ui"
import { ProfileUploader } from "../shared"
import { useUserContext } from "@/context/AuthContext"
import { useGetUserById, useUpdateUser } from "@/lib/react-query/queries"

const ProfileForm = () => {
  const navigate = useNavigate()
  const { toast } = useToast()
  const { id } = useParams()
  const { user, setUser } = useUserContext()

  const form = useForm<z.infer<typeof ProfileValidation>>({
    resolver: zodResolver(ProfileValidation),
    defaultValues: {
      file: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio || ""
    }
  })

  const { data: currentUser } = useGetUserById(id || "")
  const { mutateAsync: updateUser, isPending: isLoadingUpdate } =
    useUpdateUser()

  if (!currentUser)
    return (
      <div className='flex-center w-full h-full'>
        <Loader />
      </div>
    )

  const handleUpdate = async (values: z.infer<typeof ProfileValidation>) => {
    const updatedUser: any = await updateUser({
      userId: currentUser.$id,
      name: values.name,
      username: values.username,
      email: values.email,
      bio: values.bio,
      file: values.file,
      imageUrl: currentUser.imageUrl,
      imageId: currentUser.imageId
    })

    if (updatedUser === undefined) {
      toast({ title: "Update user failed. Please try again." })
    }

    setUser({
      ...user,
      name: updatedUser?.name,
      username: updatedUser?.username,
      email: updateUser?.email,
      bio: updatedUser?.bio,
      imageUrl: updatedUser?.imageUrl
    })

    toast({ title: "Update successful." })
    return navigate(`/profile/${id}`)
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleUpdate)}
        className='flex flex-col gap-9 w-full max-w-5xl'
      >
        <FormField
          control={form.control}
          name='file'
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <ProfileUploader
                  fieldChange={field.onChange}
                  mediaUrl={currentUser.imageUrl}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Name</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='username'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Username</FormLabel>
              <FormControl>
                <Input type='text' className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Email</FormLabel>
              <FormControl>
                <Input type='email' className='shad-input' {...field} />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name='bio'
          render={({ field }) => (
            <FormItem>
              <FormLabel className='shad-form_label'>Bio</FormLabel>
              <FormControl>
                <Textarea
                  className='shad-textarea custom-scrollbar'
                  {...field}
                />
              </FormControl>
              <FormMessage className='shad-form_message' />
            </FormItem>
          )}
        />

        <div className='flex gap-4 items-center justify-end'>
          <Button
            type='button'
            className='shad-button_dark_4'
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type='submit'
            className='shad-button_primary whitespace-nowrap'
            disabled={isLoadingUpdate}
          >
            {isLoadingUpdate ? <Loader /> : "Update Profile"}
          </Button>
        </div>
      </form>
    </Form>
  )
}

export default ProfileForm
