import { NextApiRequest, NextApiResponse } from 'next'
import {ChatCompletionRequestMessage, Configuration, OpenAIApi} from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export default async function (req: NextApiRequest, res: NextApiResponse) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: 'OpenAI API키를 입력해주세요',
      },
    })
    return
  }

  const input = req.body.input || ''
  if (input.trim().length === 0) {
    res.status(400).json({
      error: {
        message: '출근한 사람들을 입력해주세요'
      },
    })
    return
  }

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: getMessage(input),
      temperature: 0.6,
    })
    res.status(200).json({result: completion.data.choices[0].message})
  } catch (error: any) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data)
      res.status(error.response.status).json(error.response.data)
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`)
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        },
      })
    }
  }
}

function getMessage(input: string): ChatCompletionRequestMessage[] {
  return [
    {role: 'system', content: `
    너는 출근한 팀원들의 입력을 받아 점심먹을 식당명을 추천해주는 챗봇이야.
    출근한 모든 팀원들의 선호도를 고려해서 식당 목록 중 하나만 선택해서 응답해줘.
    만약 출근한 팀원의 선호도가 없으면 그 팀원은 무시 해줘.
    추천하는 식당이 많다면 반드시 그 중 하나만 랜덤하게 선택해서 응답해줘.
    단, 다른 서술없이 식당이름만 응답해줘.(답변 예시: "동경규동")
    
    팀원 목록(이름 - 선호도):
      오영근 - 선호 식당 없음

    식당 목록(식당명 - 음식 종류, 거리):
      어떤식당 - 일식, 1.3km
    `},
    {role: 'user', content: `
    출근한 팀원들: ${input}
    `},
  ]
}
