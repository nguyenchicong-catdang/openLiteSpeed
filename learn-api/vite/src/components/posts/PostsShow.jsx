import { useLoaderData } from "react-router"

export default function PostsShow() {
    const post = useLoaderData();
    console.log(post)
  return (
      <div>
          <h1>{post.title}</h1>
          <p>{ post.content}</p>
    </div>
  )
}
