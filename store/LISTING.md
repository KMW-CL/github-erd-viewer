# Chrome 웹 스토어 등록 내용

## 배포 설정

- 공개 범위: **Private**
- 허용 사용자: 현재 게시자 계정만. 다른 사용자는 이후 Trusted testers 또는 Google 그룹에 추가
- 지역: 전체 지역

## 스토어 등록 정보

- 이름: GitHub ERD Viewer
- 기본 언어: 한국어
- 카테고리: 개발자 도구
- 간단한 설명: GitHub의 ERD JSON 파일을 읽기 전용 ERD로 새 탭에서 표시합니다.
- 자세한 설명:

  GitHub에서 `.vuerd.json` 또는 `.erd.json` 파일을 열면 **ERD 새 탭에서 보기** 버튼이 표시됩니다. 버튼을 누르면 테이블과 관계를 ERD Editor의 읽기 전용 뷰어에서 확인할 수 있습니다. 원본 GitHub 탭은 그대로 유지됩니다.

  GitHub에 로그인해 접근할 수 있는 비공개 저장소의 파일도 볼 수 있습니다. 확장 기능은 파일을 외부 뷰어 서버에 업로드하지 않습니다. 파일 내용은 브라우저의 임시 저장 공간에 보관하고 뷰어 탭을 닫으면 삭제합니다.

- 홈페이지: https://github.com/KMW-CL/github-erd-viewer
- 개인정보 처리 안내: https://github.com/KMW-CL/github-erd-viewer/blob/main/PRIVACY.md

## 개인정보 항목 작성 근거

- 단일 목적: GitHub의 ERD JSON 파일을 읽기 전용 ERD로 표시
- 처리하는 데이터: 사용자가 GitHub에서 열어 본 ERD 파일의 내용과 파일 주소
- 수집·전송: 개발자 서버로 전송하지 않음. 사용자 브라우저에서만 처리
- 저장: 뷰어 탭을 사용하는 동안 `chrome.storage.session`에 임시 저장
- 접근 권한 이유: `github.com` 화면에서 ERD 파일을 확인하고 보기 버튼을 표시하기 위해 필요. `storage`는 새 뷰어 탭에 파일을 전달하기 위해 필요

스토어 심사 화면에서 실제 질문의 표현과 범위에 맞게 위 내용을 입력하고, 개인정보 처리 안내와 일치하는지 확인합니다.
