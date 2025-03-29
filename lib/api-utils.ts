// Helper functions for API calls
export async function fetchData<T>(endpoint: string): Promise<T> {
  try {
    const response = await fetch(`/api/${endpoint}`)
    if (!response.ok) {
      throw new Error(`Error fetching data from ${endpoint}: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error)
    throw error
  }
}

export async function postData<T>(endpoint: string, data: any): Promise<T> {
  try {
    const response = await fetch(`/api/${endpoint}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`Error posting data to ${endpoint}: ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error(`Failed to post to ${endpoint}:`, error)
    throw error
  }
}

