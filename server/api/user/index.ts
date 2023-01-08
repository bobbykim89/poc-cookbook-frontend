export default defineEventHandler(
  async (event): Promise<Response | undefined> => {
    const { POC_COOKBOOK_API } = useRuntimeConfig()

    const { method } = event.node.req

    const getResponse: Response = await $fetch(`${POC_COOKBOOK_API}/user`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
    const postResponse = async () => {
      const body = await readBody(event)
      const data: Response = await $fetch(`${POC_COOKBOOK_API}/user`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body,
      })
      return data
    }

    switch (method) {
      case 'GET':
        return getResponse
      case 'POST':
        return postResponse()
    }
  }
)
