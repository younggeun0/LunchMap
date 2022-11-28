import Head from 'next/head'
import React, {useEffect} from 'react'
import {Button} from 'react-bootstrap'

export default function KakaoSearchMap({ data }: any) {
  useEffect(() => {
    // TODO 식당 검색 기능 추가
    // https://apis.map.kakao.com/web/sample/keywordBasic/
    const maps = window.kakao.maps
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      }

    const map = new maps.Map(mapContainer, mapOption) // 지도를 생성합니다

    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열입니다
    const positions = [
      {
        content: '<div>카카오</div>',
        latlng: new maps.LatLng(33.450705, 126.570677),
      },
      {
        content: '<div>생태연못</div>',
        latlng: new maps.LatLng(33.450936, 126.569477),
      },
      {
        content: '<div>텃밭</div>',
        latlng: new maps.LatLng(33.450879, 126.56994),
      },
      {
        content: '<div>근린공원</div>',
        latlng: new maps.LatLng(33.451393, 126.570738),
      },
    ]

    for (let i = 0; i < positions.length; i++) {
      // 마커를 생성합니다
      const marker = new maps.Marker({
        map: map, // 마커를 표시할 지도
        position: positions[i].latlng, // 마커의 위치
      })

      // 마커에 표시할 인포윈도우를 생성합니다
      const infowindow = new maps.InfoWindow({
        content: positions[i].content, // 인포윈도우에 표시할 내용
      })

      // 마커에 이벤트를 등록하는 함수 만들고 즉시 호출하여 클로저를 만듭니다
      // 클로저를 만들어 주지 않으면 마지막 마커에만 이벤트가 등록됩니다
      ;(function (marker, infowindow) {
        // 마커에 mouseover 이벤트를 등록하고 마우스 오버 시 인포윈도우를 표시합니다
        maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker)
        })

        // 마커에 mouseout 이벤트를 등록하고 마우스 아웃 시 인포윈도우를 닫습니다
        maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close()
        })
      })(marker, infowindow)
    }
  })

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APPKEY}`}
        ></script>
      </Head>
      <div>
        <input type="text" placeholder="검색할 식당을 입력하세요" />
        <Button className="ms-3" variant="outline-primary">
          검색
        </Button>
      </div>
      <div id="map" className="border border-dark rounded-3 m-3" style={{width: '500px', height: '600px'}}></div>
    </>
  )
}
