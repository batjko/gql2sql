import axios from 'axios'

const poemURL = 'https://www.poemist.com/api/v1/randompoems'

export async function getRandomPoem() {
  return (await getSomePoems())[0]
}

export async function getSomePoems() {
  const poem = await axios.get(poemURL)
  return poem.data
}
