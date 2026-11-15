# Chrome 웹 스토어 등록 내용

## 배포 설정

- 공개 범위: **Public**
- 허용 사용자: Chrome 웹 스토어 이용자
- 지역: 전체 지역

## 스토어 등록 정보

- 이름: GitHub ERD Viewer
- 기본 언어: 영어(미국)
- 카테고리: 개발자 도구
- 간단한 설명: View ERD JSON files from GitHub in a read-only ERD viewer in a new tab.
- 자세한 설명:

  Open a `.vuerd.json` or `.erd.json` file on GitHub and click **Open ERD in new tab** to view its tables and relationships in a read-only ERD Editor viewer. The original GitHub tab stays open.

  The extension also works with private repositories you can access while signed in to GitHub. It reads the file content shown on the GitHub page and does not upload it to an external viewer server. The content is stored temporarily in your browser and removed when you close the viewer tab.

- 홈페이지: https://github.com/KMW-CL/github-erd-viewer
- 개인정보 처리 안내: https://github.com/KMW-CL/github-erd-viewer/blob/main/PRIVACY.md

## 개인정보 항목 작성 근거

- 단일 목적: GitHub의 ERD JSON 파일을 읽기 전용 ERD로 표시
- 처리하는 데이터: 사용자가 GitHub에서 열어 본 ERD 파일의 내용과 파일 주소
- 수집·전송: 개발자 서버로 전송하지 않음. 사용자 브라우저에서만 처리
- 저장: 뷰어 탭을 사용하는 동안 `chrome.storage.session`에 임시 저장
- 접근 권한 이유: `github.com` 화면에서 ERD 파일을 확인하고 보기 버튼을 표시하기 위해 필요. `storage`는 새 뷰어 탭에 파일을 전달하기 위해 필요

스토어 심사 화면에서 실제 질문의 표현과 범위에 맞게 위 내용을 입력하고, 개인정보 처리 안내와 일치하는지 확인합니다.
