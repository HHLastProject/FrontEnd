# Cafe log(카페 로그)
안녕하세요 카페로그 개발한 항해99 13기 10조 입니다.

<img src="https://velog.velcdn.com/images/clue97/post/cb5cdb33-c8b2-466c-a98d-cd475a708a2f/image.png"/>

## 목차
(추후 추가 예정)

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
