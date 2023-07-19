import 'bootstrap/dist/css/bootstrap.css'
import {useEffect, useState} from 'react'
import KakaoMarkerMap from 'components/KakaoMarkerMap'
import Head from 'next/head'
import Button from 'react-bootstrap/Button'
import Link from 'next/link'
import {GetServerSideProps} from 'next/types'
import axios from 'axios'

declare global {
  interface Window {
    kakao: any
  }
}

const title = '오늘 뭐 먹지..? 😋'

export default function Home({restaurants}: any) {
  const [input, setInput] = useState('')
  const [recommendData, setRecommendData] = useState('')

  async function onSubmit(event: any) {
    event.preventDefault()
    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input}),
      })

      const data = await response.json()
      if (response.status !== 200) {
        throw data.error || new Error(`Request failed with status ${response.status}`)
      }

      setRecommendData(data.result.content)
      setInput('')
      // TODO, 해당하는 식당과 카페를 지도에 표시하기 위해 데이터 가공
    } catch (error: any) {
      // Consider implementing your own error handling logic here
      console.error(error)
      alert(error.message)
    }
  }

  // TODO
  /*
    기능 정리)
    1. 이미 리뷰가 등록된 식당들은 핀으로 표시됨 - 가데이터로 세네개 식당이 핀으로 표시돼 있도록 설계 (DONE)
    2. 새로운 식당도 검색을 통해 등록이 가능해야 함
      - 등록 페이지를 별도로 만들고 지도 검색 기능을 제공, 선택한 위치(lat, long)와 상호명을 저장할 수 있도록 함
      - 등록되고 메인 화면 이동 시 추가된 핀 표시
    3. 핀 선택 시 다이얼로그 표시, 별점과 리뷰를 등록할 수 있는 기능을 제공
      - 댓글은 depth없이 텍스트 200자까지 등록되도록 함
  */

  return (
    <div className="container">
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        {recommendData ? (
          <h1 className="fw-semibold">
            {recommendData} 😋
          </h1>
        ) : (
          <>
          <h1>{title}</h1>
          <form onSubmit={onSubmit}>
            <div className="mt-3 d-flex justify-content-start">
              <input type="text" className='form-control' onChange={(e) => setInput(e.target.value)} value={input} placeholder="누가 출근했나요?" />
              <input type="submit" className="ms-1 btn btn-sm btn-success" value="점메추" />
            </div>
          </form>
          </>
        )}
        {/* <KakaoMarkerMap data={recommendData} /> */}
      </main>
    </div>
  )
}

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const api = await axios.create({
//     baseURL: 'http://127.0.0.1:8000/api/v1',
//   })

//   const {data} = await api.get('/restaurant')

//   return {
//     props: {
//       restaurants: data,
//     },
//   }
// }
