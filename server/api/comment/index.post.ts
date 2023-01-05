interface PostCommentBody {
  text: string
  post: string
}

export default defineEventHandler(async (event): Promise<Response | null> => {
  const { POC_COOKBOOK_API } = useRuntimeConfig()
  const { text, post }: PostCommentBody = await readBody(event)
  const { authorization } = event.node.req.headers

  if (authorization) {
    const data: Response = await $fetch(`${POC_COOKBOOK_API}/comment`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: authorization,
      },
      body: { text, post },
    })
  }
  return null
})
