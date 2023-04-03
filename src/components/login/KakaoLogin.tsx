import React, { useEffect } from 'react'
import { KAKAO_AUTH_URL } from '../../custom/ym/variables'


const KakaoLogin = () => {

    return (
        <div>
            <a href={KAKAO_AUTH_URL}>카카오 로그인</a>
        </div>
    )
}

export default KakaoLogin