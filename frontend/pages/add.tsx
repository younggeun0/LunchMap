import KakaoMap from 'components/KakaoMarkerMap'
import KakaoSearchMap from 'components/KakaoSearchMap'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'
import {Button} from 'react-bootstrap'

const title = '식당 추가 🍽️'

export default function AddRestaurant() {
  return (
    <div className="container">
      <Head>
        <title>{title}</title>
      </Head>

      <main>
        <h1>{title}</h1>
        <KakaoSearchMap />
        <div className="mt-3 d-flex justify-content-start">
          <Link href="/">
            <Button className="me-3" variant="outline-success">리뷰 보기 😋</Button>
          </Link>
        </div>
      </main>
    </div>
  )
}
