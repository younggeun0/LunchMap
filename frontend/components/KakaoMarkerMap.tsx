import dayjs from 'dayjs'
import Head from 'next/head'
import React, {useEffect} from 'react'

const ratingIcon = {
  GOOD: 'π',
  SOSO: 'π€·',
  BAD: 'π',
}

export default function KakaoMarkerMap({data}: any) {
  useEffect(() => {
    const maps = window.kakao.maps
    const mapContainer = document.getElementById('map'), // μ§λλ₯Ό νμν  div
      mapOption = {
        center: new maps.LatLng(37.49649204, 127.02969595), // μ§λμ μ€μ¬μ’ν
        level: 3, // μ§λμ νλ λ λ²¨
      }

    const map = new maps.Map(mapContainer, mapOption) // μ§λλ₯Ό μμ±

    // λ§μ»€λ₯Ό νμν  μμΉμ λ΄μ©μ κ°μ§κ³  μλ κ°μ²΄ λ°°μ΄
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
              ${info.name} ${isNaN(averageRating) ? '' : averageRating + 'μ '} ${icon}
            </div>
            ${reviewDiv}
          </div>`,
        latlng: new maps.LatLng(info.latitude, info.longitude),
      }
    })

    for (let i = 0; i < positions.length; i++) {
      // λ§μ»€λ₯Ό μμ±ν©λλ€
      const marker = new maps.Marker({
        map: map, // λ§μ»€λ₯Ό νμν  μ§λ
        position: positions[i].latlng, // λ§μ»€μ μμΉ
      })

      // λ§μ»€μ νμν  μΈν¬μλμ°λ₯Ό μμ±ν©λλ€
      const infowindow = new maps.InfoWindow({
        content: positions[i].content, // μΈν¬μλμ°μ νμν  λ΄μ©
      })

      // λ§μ»€μ μ΄λ²€νΈλ₯Ό λ±λ‘νλ ν¨μ λ§λ€κ³  μ¦μ νΈμΆνμ¬ ν΄λ‘μ λ₯Ό λ§λ­λλ€
      // ν΄λ‘μ λ₯Ό λ§λ€μ΄ μ£Όμ§ μμΌλ©΄ λ§μ§λ§ λ§μ»€μλ§ μ΄λ²€νΈκ° λ±λ‘λ©λλ€
      ;(function (marker, infowindow) {
        // λ§μ»€μ mouseover μ΄λ²€νΈλ₯Ό λ±λ‘νκ³  λ§μ°μ€ μ€λ² μ μΈν¬μλμ°λ₯Ό νμν©λλ€
        maps.event.addListener(marker, 'mouseover', function () {
          infowindow.open(map, marker)
        })

        // λ§μ»€μ mouseout μ΄λ²€νΈλ₯Ό λ±λ‘νκ³  λ§μ°μ€ μμ μ μΈν¬μλμ°λ₯Ό λ«μ΅λλ€
        maps.event.addListener(marker, 'mouseout', function () {
          infowindow.close()
        })

        // TODO, click νμ λ λ¦¬λ·°λ₯Ό μΆκ°ν  μ μλ νΌ μ κ³΅
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
      <div id="map" className="border border-dark rounded-3 m-3" style={{width: '500px', height: '600px'}}></div>
    </>
  )
}
