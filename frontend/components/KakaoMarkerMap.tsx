import dayjs from 'dayjs'
import Head from 'next/head'
import React, {useEffect} from 'react'

const ratingIcon = {
  GOOD: '👍',
  SOSO: '🤷',
  BAD: '👎',
}

export default function KakaoMarkerMap({data}: any) {
  useEffect(() => {
    const maps = window.kakao.maps
    const mapContainer = document.getElementById('map'), // 지도를 표시할 div
      mapOption = {
        center: new maps.LatLng(37.49649204, 127.02969595), // 지도의 중심좌표
        level: 3, // 지도의 확대 레벨
      }

    const map = new maps.Map(mapContainer, mapOption) // 지도를 생성

    // 마커를 표시할 위치와 내용을 가지고 있는 객체 배열
    const positions = data.map((info: any) => {
      const averageRating =
        info.review_set.reduce((acc: any, cur: any) => {
          return acc + cur.rating
        }, 0) / info.review_set.length

      let icon = ''
      if (!isNaN(averageRating)) {
        if (averageRating >= 4) {
          icon = ratingIcon.GOOD
        } else if (averageRating >= 2) {
          icon = ratingIcon.SOSO
        } else {
          icon = ratingIcon.BAD
        }
      }

      const reviewDiv = info.review_set
        ? info.review_set.reduce((acc: string, review: any) => {
            return (
              acc +
              `<div class="pb-2 px-2 d-flex justify-content-between">
                <div class="d-flex">
                  ${review.commenter}: ${review.comment} 
                </div>
                <div class="d-flex">
                  <small>${dayjs(review.created_at).format('YYYY-MM-DD')}</small>
                </div>
              </div>`
            )
          }, '')
        : ''

      return {
        content: `<div class="p-3 text-center" style="min-width:300px;">
            <div class="pb-3">
              ${info.name} ${isNaN(averageRating) ? '' : averageRating + '점'} ${icon}
            </div>
            ${reviewDiv}
          </div>`,
        latlng: new maps.LatLng(info.latitude, info.longitude),
      }
    })

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

        // TODO, click 했을 때 리뷰를 추가할 수 있는 폼 제공
      })(marker, infowindow)
    }
  }, [data])

  return (
    <>
      <Head>
        <script
          type="text/javascript"
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_APPKEY}`}
        ></script>
      </Head>
      <div id="map" className={`border border-dark rounded-3 m-3 ${data.length == 0 ? 'd-none' : '' }`} style={{width: '500px', height: '600px' }}></div>
    </>
  )
}
