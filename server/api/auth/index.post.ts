interface AuthBody {
  email: string
  password: string
}

export default defineEventHandler(async (event): Promise<Response> => {
  const { POC_COOKBOOK_API } = useRuntimeConfig()
  const { email, password }: AuthBody = await readBody(event)

  const data: Response = await $fetch(`${POC_COOKBOOK_API}/auth`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: {
      email,
      password,
    },
  })
  return data
})
