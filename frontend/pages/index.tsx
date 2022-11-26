import 'bootstrap/dist/css/bootstrap.css'
import KakaoMap from 'components/KakaoMarkerMap'
import Head from 'next/head'
import Button from 'react-bootstrap/Button'
import {useEffect} from 'react'
import Link from 'next/link'

declare global {
  interface Window {
    kakao: any
  }
}

export default function Home() {
  // TODOs
  /*
    기능 정리)
    1. 이미 리뷰가 등록된 식당들은 핀으로 표시됨 - 가데이터로 세네개 식당이 핀으로 표시돼 있도록 설계
      - 핀으로 표시되는 api 사용법 확인
    2. 새로운 식당도 검색을 통해 등록이 가능해야 함
      - 등록 페이지를 별도로 만들고 지도 검색 기능을 제공, 선택 한 지도 정보 + 상호명을 저장할 수 있도록 함
      - 등록되고 메인 화면 이동 시 추가된 핀 표시
    3. 핀 선택 시 다이얼로그 표시, 별점과 리뷰를 등록할 수 있는 기능을 제공
      - 댓글은 depth없이 텍스트 200자까지 등록되도록 함
  */

  return (
    <div className="container">
      <Head>
        <title>오늘 뭐 먹지..? 😋</title>
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main>
        <h1>오늘 뭐 먹지..? 😋</h1>
        <KakaoMap />
        <div className="mt-3 d-flex justify-content-start">
          <Link href="/add">
            <Button variant="primary">새 식당 추가</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
