import KakaoMap from 'components/KakaoMarkerMap'
import KakaoSearchMap from 'components/KakaoSearchMap'
import React from 'react'

export default function AddRestaurant() {
  return (
    <>
      <div>
        <h1>식당 추가</h1>
      </div>
      <div>
        <KakaoSearchMap />
        <input type="text" placeholder="식당 이름을 입력하세요" />
      </div>
    </>
  )
}
