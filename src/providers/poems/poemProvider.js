import axios from 'axios'

export async function getRandomPoem() {
  return (await getSomePoems())[0]
}

export async function getSomePoems() {
  const poem = await axios.get('https://www.poemist.com/api/v1/randompoems')
  return poem.data
}
