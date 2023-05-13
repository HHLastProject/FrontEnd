# Cafe log(카페 로그)
안녕하세요 카페로그 개발한 항해99 13기 10조 입니다.

<img src="https://velog.velcdn.com/images/clue97/post/cb5cdb33-c8b2-466c-a98d-cd475a708a2f/image.png"/>

## 프로젝트 소개
Cafe Log는 지역과 범위에 따라 가맹점 카페들을 소개하고,

유저는 피드를 남기며 카페 정보를 공유하고,

나의 즐겨찾기를 커스텀 폴더에 저장 하는 서비스입니다.

## 배포 사이트
[사이트 이동하기](http://yongminbucket.s3-website.ap-northeast-2.amazonaws.com/)

## 주요 기능

1. 메인페이지 : 내 근처 카페들 썸네일/간단한 정보 리스팅, 위치기반 주변 카페 플로팅(네이버 맵)
2. 로그인페이지 : 카카오톡 소셜 로그인, 어드민(관리자) 로그인
3. 피드페이지 :  피드 작성, 조회, 삭제
4. 마이페이지 : 내가 작성한 피드 관리, 삭제, 닉네임 변경
5. 피드 댓글 기능 : 해당 피드의 댓글 조회, 작성, 삭제
6. 스크랩 기능 : 해당 카페 즐겨 찾기에 추가
7. 라이크 기능 : 해당 피드의 좋아요 기능
8. 즐겨찾기 기능 : 내가 스크랩한 가게들을 폴더들을 만들어서 나만의 즐겨찾기 커스텀 마이징
9. 어드민 페이지 : 가게정보 메뉴정보, 위치정보, 업체리스팅 등록, 추가, 수정, 삭제

## 기술 스텍
<div float: left;>
  <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black">
  <img src="https://img.shields.io/badge/React-4479A1?style=for-the-badge&logo=React&logoColor=white"> 
  <img src="https://img.shields.io/badge/Typescript-339933?style=for-the-badge&logo=Typescript&logoColor=white">
  <img src="https://img.shields.io/badge/Styledcomponents-000000?style=for-the-badge&logo=StyledComponents&logoColor=white">
  <img src="https://img.shields.io/badge/ReactRouter-342353?style=for-the-badge&logo=ReactRouter&logoColor=white">
  <img src="https://img.shields.io/badge/TanstackQuery-FCC624?style=for-the-badge&logo=reactquery&logoColor=black"> 
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white">
  <img src="https://img.shields.io/badge/axios-339933?style=for-the-badge&logo=axios&logoColor=white">
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white">
  <img src="https://img.shields.io/badge/VSCode-007ACC?style=for-the-badge&logo=Visual Studio Code&logoColor=white"/>
  <img src="https://img.shields.io/badge/yarn-%23000000.svg?style=for-the-badge&logo=yarn&logoColor=white"/>
</div>


## 시스템 아키텍쳐
<img src="https://file.notion.so/f/s/2a66890c-9a76-4685-bfbe-660b96058cad/Untitled.png?id=1d004cf9-3eb9-4a60-bda1-4a6d3be9d904&table=block&spaceId=83c75a39-3aba-4ba4-a792-7aefe4b07895&expirationTimestamp=1683607127760&signature=W7huIuP9bwV3psVY6gXdHCCq31bY4aVmo3gkfeqbg5o&downloadName=Untitled.png" />

## ERD
<img src="https://www.notion.so/image/https%3A%2F%2Fs3-us-west-2.amazonaws.com%2Fsecure.notion-static.com%2Fa88cb49f-dbec-4e0e-b3cc-aeaf9f892fc1%2FdrawSQL--export-2023-05-05_(1).png?id=d0f7ec1b-68c1-410d-82cd-d5564f30fb06&table=block&spaceId=260f887b-8556-40ce-a271-f96b57122ce0&width=2000&userId=590d24df-8177-46bb-a06f-834b55fe5afd&cache=v2"/>

## API 명세서
[API 명세서 이동](https://www.notion.so/bb4ae82cea364e9ab9ac97cb39f099fa?v=19d62894b34c46cc99ee7311e782da6c)


## 트러블슈팅
<details>
  <summary>일정시간 지나면 데이터가 안보이는 현상</summary>

  
  * 문제 및 현상 : <br>하나의 페이지에서 일정시간이 지나면, 페이지 내부의 몇몇 컴포넌트가 안보이는 현상
  * 원인 : 
  1. 부모 컴포넌트에서 fetch를 하고, 자식 컴포넌트에서는 해당 쿼리키로 캐시에 저장되어 있는 데이터에 직접적으로 접근해서 데이터를 가져옴(props 전달없이, 쿼리 캐시 객체를 이용하여 컴포넌트 짜는 시도)
  2. 처음에는 의도적으로 잘 작동하나, cache time이 지나고 난 뒤에는, 해당 자식 컴포넌트의 데이터가 휘발되어 상태가 undefine이 됨
  * 해결 :
  1. 부모 컴포넌트에서 prop 직전 전달
  2. useMutation을 다시 실행해서 캐시데이터 값을 가져옴.
  두가지 다 적용 가능했음
  
  * 느낀점 :
  1. 캐시 데이터를 사용하고자 한다면, 그냥 커스텀 훅을 이용하는게 낫다.
  2. 쿼리 캐시 객체를 이용해서 캐시한 결과물만 가져올 경우, 
  cache time 이상으로 유저가 그 페이지에 체류할 경우에 이와같은 현상이 일어나므로,
  커스텀 훅으로 쿼리문을 작성하고 필요할땐 그냥 리턴값을 가져오면 된다.
  
  * 의도 :
  처음 의도한 바는, 부모에서 useMutation을 한차례 사용했고 mutate에 넘길 DTO 객체가 존재함.
  하위 컴포넌트에서는 그 결과값만을 원했기 때문에, 캐시를 잘 사용하면 props로 DTO 객체를 전달하지 않으면서 데이터만 갖고올 수 있을거라 생각했고,
  쿼리 캐시 객체에 직접 접근하는 방법을 시도하여 겉보기엔 성공은 했으나, 유저가 해당 페이지에 캐시타임을 초과하여 체류할 경우에 이와같은 문제가 발생하여 다시 고친 사례
  
</details>

<details>
  <summary>맵 마커 플로팅 성능 문제</summary>

  
  * 문제 및 현상 : <br>
  전체 데이터 fetch로 인한 긴 로딩시간 및 마커 과다로 성능 저하

  * 원인 : 
  1. 처음엔 모든 데이터를 받아서 마커를 띄우고자 했음
  2. naver map이 보이지 않는 영역의 마커도 미리 띄워두는 것인지, 
  아니면 화면이 이동하면 창의 크기에 위치하는 마커만 띄워주는 것인지를 모르는 상태로 진행
  
  * 해결 : 
  1. 서비스 로직 1차 변경: 현재 유저의 위치가 변할 때, 또는 맵의 zoom이 바뀔때마다 반경만큼의 데이터를 fetch(실시간 위치기반이었을 당시)
  2. 서비스 로직 2차 변경: 실시간 위치기반 삭제, 지도상의 임의의 위치에서 검색할 경우 그 근처의 데이터를 보여주는 식으로 변경
  3. 검색한 위치의 최대 반경만큼의 데이터를 fetch, Zoom이 바뀔때마다 데이터 fetch는 삭제
  4. 반경을 변경할 경우에는 직전에 받은 최대 반경의 데이터 중, 반경 내에 속한 카페리스트만 가공해서 보여주는 식으로 변경
  5. fetch 수를 줄이고, 양을 조절하여 UX 편의성 확보 + 성능 
</details>

<details>
  <summary>로그아웃 후 데이터 잔존 현상</summary>

  
  * 문제 및 현상 : <br>
  로그아웃을 진행하고, 비로그인 상태에서 마이페이지 클릭 시, 직전 로그인 회원정보가 렌더됨

  * 원인 : 
  1. 로그아웃을 했더라도 이미 로그아웃 전에 한차례 실행했던 쿼리데이터가 캐시에 저장됨(Tanstack-Query 특성)
  2. 일반적인 Axios 또는 thunks를 사용할 경우에는 있을 수 없는 일이지만 Tanstack-Query의 특성이 이런 현상을 야기함.
  3. Query Data가 null 상태가 아니므로 데이터를 렌더링
  
  * 해결 : 
  로그아웃을 실행할 시, QueryClient 객체의 removeQueries([”쿼리키”]) 메서드를 사용. 
  해당 쿼리키에 대한 캐시 데이터를 명시적으로 삭제 
</details>
<details>
  <summary>파일 업로드 관련 이슈</summary>

  
  * 문제 및 현상 : <br>
  이미지 데이터와 배열을 보낼때 값이 들어가지 않고 undefined나 null 전달
  1) 배열 형식(ex. tags: [’tag1’, ‘tag2’])의 데이터를 넣어서 보냈지만 데이터가 null로 들어가는 것을 확인.
  2) 이미지 데이터를 formData.append(’pic’, e.target.files[0]); 만 해서, 일반 객체 안에 넣어 보냈더니 서버쪽에 데이터가 들어가지 않음을 확인.

  * 원인 : <br>
  1. 파일을 보낼 때 일반적으로 데이터를 보내듯 객체 안에 해당 파일만 formData에 넣어 보낸 것이 문제
  2. 배열은 append로 넣을때 JSON 형태로 변환해줘야 한다.
  3. formData로 보낼땐 모든 데이터를 전부 formData로 보내는 게 맞음.
  
  * 해결 : <br>
  formdata를 보낼 땐 하나를 보내더라도, 모든 데이터를 append로 formdata에 추가,
  formdata 객체를 보내야 한다는 것을 확인.
  모든 데이터를 append로 넣어두고 formdata 자체를 바디에 넣어 보냈다.
</details>
<details>
  <summary>피드 작성 페이지로 이동시 불필요한 서버 요청 및 path 간결화에 대한 이슈</summary>

  
  * 문제 및 현상 : <br>
  각각 다른 페이지에서 피드 작성 페이지로 이동시, 카페 이름이 자동으로 입력될때 조금의 딜레이 발생
  또한 프론트엔드 측의 Router path 복잡(/shop/:shopId/feedForm => /feedForm)
  
  * 원인 : <br>
  1. 파라미터로 전달된 고유 Id를 이용해 서버에 카페 이름에 대한 데이터 요청, 받아온 데이터를 카페이름 칸에 자동으로 입력시키게 구현되었기 때문.
  
  * 해결 : <br>
  불필요한 서버 요청을 없애고, 코드를 간결하게 수정할 방법을 고민하다가 react-router의 Link 기능을 이용해 state를 넘겨줄 수 있다는 걸 알게됨. 
  
  방법 변경 : <br>
  1) 기존
  -. 파라미터를 넘겨주는 것으로 데이터 요청)
  2) 개선
  -. 상세 페이지 ⇒ 피드 작성페이지로 넘어갈때 Link를 이용해 문자열(카페 이름)을 state로 전달, 그 외에 페이지에서 접근할 때는 아무것도 넘겨주지 않아 빈값이 유지되도록 구현.
  
  * 느낀점 :<br>
  -. 내 스스로의 힘으로 해결하려다보니 오히려 코드는 길어지고, 불필요한 서버 요청을 발생시키는 등 들인 시간과 시행착오가 더 길어진다는 것을 느꼈다. 
  지금 사용하는 라이브러리의 기능들만 제대로 파악하고 있어도 간단히 해결할 수 있었던 일이었음을 깨달았다.
  
</details>
<details>
  <summary>버튼 선택 후 돌아왔을때 필터 값이 리셋되는 이슈</summary>

  
  * 문제 및 현상 : <br>
  가게 리스트 페이지에서 다른 페이지를 보고 돌아왔을때 선택해놨던 값이 유지되었으면 좋겠다는 의견을 받음

  * 원인 : <br>
  1. 필터 값을 state로 상태관리 해줬기에 새로고침될 때 리셋되는 것.
  
  * 해결 : <br>
  페이지를 이동하더라도 버튼이 유지되도록 값을 저장해둬야 함.<br>
  방안 : 각 필터값을 local에 저장해두고 값을 꺼내 쓰는 것.<br>
  장점: 영원히 저장할 수 있음.<br>
  단점: 저장 시간을 설정할 수 없음. ⇒ 이 같은 단점도 같이 보완할 필요가 있어보임<br>
  버튼을 눌렀을 때 state에 저장된 필터값을 페이지마다 각각 localStorage에 저장.<br>
  해당 페이지에 들어왔을때 local에 저장된 값을 불러와 만료 시간과 현재 시간을 비교하여, <br>만료시간이 지난 데이터라는 걸 확인하면 해당 데이터를 지우는 것으로 구현해 이를 보완.
</details>
<details>
  <summary>댓글, 피드 작성시 공백 입력이 허용되는 이슈</summary>

  
  * 문제 및 현상 : <br>
  댓글, 피드 작성시 공백 입력이 허용됨 + 공백만 작성했는데도 버튼이 바로 활성화되는 것.

  * 원인 : <br>
  input에 타이핑되는 모든 문자를 state에 모두 setState 해놓고, state 값을 그대로 전송했기 때문.<br>위 같은 이유로 state가 있을 경우 버튼이 활성화되게 구현했기때문에 공백도 문자로 인식.<br>
  
  * 해결 : <br>
  1. state.trim()된 값만 input value로 입력되게 변경, 마찬가지로 state.trim() 값만 전송되도록 코드를 변경. <br>
  ⇒ 문자열 앞뒤 공백없이 전송되는 것과 공백 입력시 버튼 자체가 활성화 되지 않게 하는 것은 해결되었으나, <br>댓글 입력시 공백이나 엔터가 입력되지 않는 현상 발견.
    
2. input value에 직접적으로 state.trim()을 넣는 것이 아니라, 
    
    ```jsx
    {(state.trim().length === 0) ? inactive : active }
    ```
    
    이런 식으로 버튼만 달리 보여주도록 코드를 수정하여 해결. onClick 메서드는 active버튼에만 부여해두었다.
</details>
<details>
  <summary>댓글 삭제하기 버튼을 두번 눌러야만 삭제실행</summary>

  
  * 문제 및 현상 : <br>
  댓글 삭제하기 버튼을 두번 눌러야만 삭제<br>
  
  * 원인 : <br>
  모달 창을 구현할 때 클릭된 버튼의 이름(여기선 ‘삭제하기’)을 setState 해준 뒤, <br>
  state의 값이 어떤 것이냐에 따라 실행되는 함수가 다르도록 구현하였는데, <br>
  setState 다음 줄에서 바로 if(state === ‘삭제하기’){ 삭제 실행; }의 형식으로 코드를 짜놓았다.<br>

  ```jsx
    당시 짰던 코드를 간결하게 표현하자면,

    const onClickHandler = (btnName : string) => {
	  setState(btnName); //여기선 '삭제하기'가 들어가야함.
	  if(state === '삭제하기') { deleteComment(); }
    }
  ```
  이러면 처음 버튼을 눌렀을때, state에 값이 할당되기 전(즉, mount 되기 전)에 바로 state의 값을 비교하는 코드로 넘어감<br>
  state에 아직 ‘삭제하기’라는 값이 할당되기 전에 비교되고, 해당 값과 다르다고 인식하여 if문을 건너뛴 것으로 판단.<br>
  두번째 누를때에서야 state의 값이 바뀐 것을 인식하고 정상적으로 작동되었던 것이다.<br>
  
  * 해결 : <br>
  state에 값을 set하는 방식을 없애고, 클릭된 버튼의 이름을 직접 넘겨받아 if(buttonName ===  ‘삭제하기’)를 비교하도록 코드 수정.<br>
  코드도 간결해지고, mount되는 시간이 달라서 생긴 문제로부터 벗어날 수 있었다.<br>
  
    ```jsx
    const onClickHandler = (btnName : string) => {
	  if(btnName === '삭제하기') { deleteComment(); }
    }
    ```
</details>
<details>
  <summary>메인컨텐츠 프레임과 하단네비바로 구성된 전체웹페이지에서 스크롤 이벤트가 발생할 시에 ui가 망가지는 현상</summary>

  
  * 문제 및 현상 : <br>
  스크롤이 일어날 경우에 아래쪽 ui가 망가짐<br>
  <img src="https://file.notion.so/f/s/693423ac-c870-4fd2-b2a2-49fdb0fb4782/Untitled.png?id=3183279f-9ff9-437d-be0b-bd2c9f3ecbc3&table=block&spaceId=260f887b-8556-40ce-a271-f96b57122ce0&expirationTimestamp=1684075793461&signature=cZzYu3D3m4Ar-C_62j8MQ49k-qrrkVWA1uvXtLfUycM&downloadName=Untitled.png"/>
  
  * 원인 및 해결 : <br>
  Router단에서 Vertical Flex로 전체 웹을 구성하는데, 이때 상단의 메인컨텐츠 부분이 flex : 1로 되어있음 <br>
  이 부분이 고정이 되어있는 것으로 보이며, 해당 메인컨텐츠 부분을 스크롤 가능하게 만들어서 해결 <br>
  
</details>
<details>
  <summary>컴포넌트 기능/UI 분리시에 발생하는 이벤트버블링 이슈</summary>

  
  * 문제 및 현상 : <br>
  버튼 속성/UI를 기능적으로 분리를 시도할때, 이벤트 버블링으로 인해서 e.target이 이상한 값을 가리키게 되는 현상 발생<br>
  분명 인자로 받는 e는 HTMLDivElement 타입인데 Target은 최하위 뎁스에 존재하는 자식요소인 Img 요소를 가리킨다.<br>
  콘솔창에는 분명히 target에 alt가 잡히지만, e.target.alt로 접근하려고 하면 존재하지 않는다며 에러가 뜬다.<br>
  인자 e의 타입을 ButtonElement, DivElement, ImgElement 등 본인과 자식 요소를 다 바꿔가면서 해도 동일한 현상이 일어남.<br>
  <img src="https://file.notion.so/f/s/7a1af0b4-19c8-470d-9b13-3d47c6525736/Untitled.png?id=2602e40e-02e9-45ea-94ef-f1864574e4fe&table=block&spaceId=260f887b-8556-40ce-a271-f96b57122ce0&expirationTimestamp=1684075973295&signature=4M1T7nGBV9f9DPxueCoupRXmPJ0pq7lV93i60059pEA&downloadName=Untitled.png"/>

  * 원인 : <br>
  e.target, e.currentTarget, 이벤트 위임 등이 관련이 있는 현상<br>
  
  * 해결 : <br>
  일단 방식을 바꿔서 e를 사용한 코드가 아닌 배열을 사용하여 인자로 넘기는 식으로 진행(납기로 인해서 더 볼 여유가 안됨)<br>
  추가 : event.target.classList.contains를 사용해서 자식노드의 이벤트를 처리하면 됨(추후 조사해봄)
</details>
<details>
  <summary>다른 페이지를 보다가 새로고침을 할 경우, 하단 네비바의 액티브버튼이 “맵”을 가리키는 현상</summary>

  
  * 문제 및 현상 : <br>
  즐겨찾기를 보다가 새로고침을 할 경우, 하단 네비바의 액티브 버튼이 홈으로 돌아가게 된다.<br>  
  
  * 원인 : <br>
  액티브된 버튼을 가리키는 state가 새로고침하면서 초기화.<br>
  메인컨텐츠는 새로고침 이전의 페이지 url이 그대로 유지되는 반면,<br>
  하단 네비바의 버튼은 state가 초기화되어 기본값인 홈을 가리킴.<br>
  
  * 해결 : <br>
  useEffect를 사용하여 첫 렌더링 시점에, 현재 브라우저의 url을 파싱하여 state에 할당한다.<br>
  <img src="https://file.notion.so/f/s/bf26dfcf-f6f2-46da-98d1-42e3795b7fdf/Untitled.png?id=4996a789-4fcf-488f-beae-10566700e495&table=block&spaceId=260f887b-8556-40ce-a271-f96b57122ce0&expirationTimestamp=1684076405436&signature=RuzS3LvY_MiHHD09DjQK9NoFbhFCSeL0qDn8gpjLG9M&downloadName=Untitled.png"/>
</details>

## 성능개선
<details>
  <summary>Lighthouse 웹페이지 성능 향상</summary>

  
  * 주안점 : <br>
  프로젝트 중, 부하가 많은 요소는 맵페이지로, 맵페이지를 중점적으로 개선하면 점수가 많이 오를 것으로 추측됨.
  
  
  1. fetch의 빈도를 어떻게 할 것인가?<br>
  -. 기존 : 실시간을 전제로 했을 당시에는 위치가 약간이라도 변하면 매번 fetch<br>
  -. 변경 : 실시간을 제거하고, 임의의 위치에서 유저가 검색을 실행할 경우에만 fetch
  
  
  2. 1회 fetch할 때 받아오는 데이터의 양을 어느정도로 할 것인가?<br>
  -. 기존 : 1km 반경의 모든 카페 ( res : 약 90 ~ 120 곳의 카페정보 )<br>
  -. 변경 : 500m 반경의 모든 카페 ( res : 약 10 ~ 20개의 카페)
  
  3. 위와 같이 변경 시 장점<br>
  마커에 메모이제이션이 가능.<br>
  기존 90개 가량의 카페가 나열될 때는 메모이제이션을 적용하면 오히려 버벅거림.<br>
  
  어떤 마커는 렌더가 되고 어떤것은 안되고,<br> 
  어떤 마커는 커스텀이미지, 어떤 마커는 기본 마커 이미지로 변경<br>
  
  위와 같은 이상현상들이 발생했기에 메모이제이션을 풀었음.<br>
  fetch 데이터의 수를 조절하여 10~20개가 될 경우, <br>
  유저의 사용성을 해치지 않으면서, 동시에 메모이제이션을 적용가능.<br>
  fetch 속도를 증진시키면서 동시에 리렌더링을 삭제하여 성능을 격하게 올릴 수 있다고 판단.<br>
  
  4. 개선 결과<br>
  <img src="https://file.notion.so/f/s/c2c0be58-fb99-41ac-a18f-6b7bca1cab06/Untitled.png?id=453a7737-744c-4ed6-8c34-2eb497e6f7ad&table=block&spaceId=260f887b-8556-40ce-a271-f96b57122ce0&expirationTimestamp=1684074094733&signature=DL6xXJSZdbxQEjbnckpUS6O4h3pDeVSGtQkmXiszv50&downloadName=Untitled.png" />
  
</details>
<details>
  <summary>생산성 향상을 위한 컴포넌트 구조 고찰</summary>

  
  * 계기 : <br>
  프로젝트 초, 팀원이 2명 이탈. 그 중 한명은 기획자. 계속하여 기획이 하루가 다르게 뒤집히고, 디자인은 디자인대로 하루가 다르게 번복됨.<br>
  이런 상황에서 매번 처음부터 ui 컴포넌트를 다시 구성하는 것이 굉장히 비생산적이라는 생각이 들면서,<br>
  이러한 변경에 바로바로 대처하여 '낭비'를 제거하기 위한 방법의 필요성 이슈화<br>
  
  * 접근 : <br>
  기존의 문제점 - 각각의 프론트엔드 개발자가 자신의 스타일에 맞춰서 그때그때 css를 figma에 맞춰 급조하는 식으로 코딩.<br>
  하루이틀 사이에 바뀌어버리는 내용들을 매번 손으로 타이핑하면서 수정하기에는 시간도 많이 걸릴 뿐더러 휴먼에러도 잦아짐.<br>
    → 헤더, 버튼, 모달, 인풋 등의 요소마다 필수적인 css style을 계층화하여 객체에 담자.<br>
    → 새로운 스타일이 나오는 경우에는 기존 컴포넌트를 복사하고 일부만 바꿔서 객체에 추가하면 된다<br>
  
    그러나 휴먼에러에 대한 부분은 바뀌지 않고, 시간도 그렇게 빨라질거로 기대되지 않음.<br>
    → 추가적인 조치 필요<br>
  
    컴파운드 패턴 접목하여, 계층화시킨 CSS 요소를 패턴 내부에 입히자<br>
    → 이럴 경우에, 새로운 디자인이 생기면 기존 컴포넌트를 복붙하고 컴파운드 패턴의 일부 요소만 바꾸면 된다.(조립식으로 뚝딱 만들수 있다)
  
  
  * 결과:<br>
  <img src="https://file.notion.so/f/s/974ed2d6-c307-4daf-adcf-9d4f5bb35d7a/Untitled.png?id=85f1bd68-23f5-4a2f-94bd-619e8c26a0bd&table=block&spaceId=260f887b-8556-40ce-a271-f96b57122ce0&expirationTimestamp=1684074993344&signature=VUh47Flhu0rXx_qbIaNsT2qzYPPhIDGN_t772dDKpfU&downloadName=Untitled.png" />
  
  효과는 뛰어났다.
  
  
  * 보완점 : hover 같은 액션에 대한 정의는 여전히 불편해서 추가적인 아이디어 
</details>

## 팀원
|이름|역할|주특기|
|------|---|---|
|김용민|팀장|REACT|
|이주희|팀원|REACT|
|송종호|부팀장|NODE.JS|
|박찬웅|팀원|NODE.JS|
|김진아|팀원|디자이너|

## 커밋 메세지 유형 지정

- `FEAT` : 새로운 기능의 추가
- `FIX` : 버그 수정
- `DOCS` : 문서 수정
- `STYLE` : 스타일 관련 기능(코드 포맷팅, 세미콜론 누락, 코드 자체의 변경이 없는 경우)
- `REFACTOR` : 코드 리펙토링
- `TEST` : 테스트 코트, 리펙토링 테스트 코드 추가
- `CHORE` : 빌드 업무 수정, 패키지 매니저 수정(ex .gitignore 수정 같은 경우)

## 개발 기간
2023.3.31~5.12
