import axios from 'axios'
import Head from 'next/head'
import React, {useEffect, useState} from 'react'
import {Button} from 'react-bootstrap'

export default function KakaoSearchMap() {
  const [search, setSearch] = useState('')

  useEffect(() => {
    // https://apis.map.kakao.com/web/sample/keywordBasic/
    // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다

    const maps = window.kakao.maps
    const infowindow = new maps.InfoWindow({zIndex: 1})
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new maps.LatLng(37.49649204, 127.02969595), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      }

    const map = new maps.Map(mapContainer, mapOption) // 지도를 생성합니다

    // 장소 검색 객체를 생성합니다
    const ps = new maps.services.Places()

    // 키워드로 장소를 검색합니다
    ps.keywordSearch(search, placesSearchCB)

    // 키워드 검색 완료 시 호출되는 콜백함수 입니다
    function placesSearchCB(data: any, status: any, pagination: any) {
      if (status === maps.services.Status.OK) {
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
        // LatLngBounds 객체에 좌표를 추가합니다
        var bounds = new maps.LatLngBounds()

        for (var i = 0; i < data.length; i++) {
          displayMarker(data[i])
          bounds.extend(new maps.LatLng(data[i].y, data[i].x))
        }

        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        map.setBounds(bounds)
      }
    }

    // 지도에 마커를 표시하는 함수입니다
    function displayMarker(place: any) {
      // 마커를 생성하고 지도에 표시합니다
      var marker = new maps.Marker({
        map: map,
        position: new maps.LatLng(place.y, place.x),
      })

      // 마커에 클릭이벤트를 등록합니다
      maps.event.addListener(marker, 'click', function () {
        // 마커를 클릭하면 장소명이 인포윈도우에 표출됩니다
        infowindow.setContent(
          `<div class="p-3 text-center" style="min-width:150px;">
            ${place.place_name}
            <button id='id-${place.id}'>추가</button>
          </div>`
        )
        infowindow.open(map, marker)
        setTimeout(() => {
          const button = document.querySelector(`#id-${place.id}`)

          button!.addEventListener('click', addRestaurant.bind(null, place))
        }, 100)
      })
    }
  }, [search])

  const addRestaurant = async (place: any) => {
    // 옵션 기본 값은 *로 강조
    const api = await axios.create({
      baseURL: 'http://127.0.0.1:8000/api/v1',
    })

    const response = await api.post('/restaurant/', {
      name: place.place_name,
      longitude: place.x,
      latitude: place.y,
    })

    alert(`[${place.place_name}]이 새로운 식당으로 등록됐습니다!`)
  }

  const onChange = (event: any) => {
    setSearch(event.target.value)
  }

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APPKEY}&libraries=services,clusterer,drawing`}
        ></script>
      </Head>
      <div>
        <input type="text" onChange={onChange} placeholder="검색할 식당을 입력하세요" />
      </div>
      <div id="map" className="border border-dark rounded-3 m-3" style={{width: '500px', height: '600px'}}></div>
    </>
  )
}
