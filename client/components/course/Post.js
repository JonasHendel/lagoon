const Post = ({post}) => {
  return(
    <>
     <p>{post.author.name}</p>
     <p>{post.content}</p>
     <p>{post.date}</p>
    </>

  )
}

export default Post