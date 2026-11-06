# GitHub ERD Viewer

GitHub의 `.vuerd.json` 또는 `.erd.json` 파일 페이지에 **ERD 새 탭에서 보기** 버튼을 추가하는 Chrome/Edge 확장 기능입니다. 버튼을 누르면 GitHub 원본 탭은 그대로 두고, 새 탭에서 ERD Editor의 읽기 전용 뷰어가 열립니다. 테이블 검색(`Ctrl+K`), 이동, 확대와 축소, 미니맵을 사용할 수 있습니다.

## 설치

1. Chrome에서 `chrome://extensions` 또는 Edge에서 `edge://extensions`를 엽니다.
2. **개발자 모드**를 켭니다.
3. **압축해제된 확장 프로그램을 로드합니다**를 누르고 이 저장소를 내려받은 폴더(`manifest.json`이 있는 폴더)를 선택합니다.
4. GitHub의 ERD JSON 파일 페이지를 새로고침합니다.

확장 기능의 파일이 수정되었을 때는 확장 기능 목록에서 **새로고침**을 누른 뒤 GitHub 페이지도 새로고침합니다.

예: `https://github.com/OWNER/REPOSITORY/blob/main/diagram.vuerd.json`

GitHub 파일 페이지 오른쪽 아래의 **ERD 새 탭에서 보기**를 누릅니다. 다른 ERD 파일도 같은 버튼으로 열 수 있습니다.

## 동작과 범위

- 확장 기능은 `github.com` 페이지에서만 실행되며, ERD JSON 파일 주소에만 버튼을 표시합니다.
- GitHub가 현재 페이지에 표시한 JSON을 읽습니다. GitHub 인증 정보나 별도 토큰을 요구하지 않습니다.
- ERD Editor 뷰어 JavaScript는 확장 기능 안에 포함되어 있습니다. 파일 내용은 새 뷰어 탭이 읽을 수 있도록 브라우저의 확장 기능 임시 메모리에 보관하고, 탭을 닫으면 삭제합니다. 외부 뷰어 서비스로 전송하지 않습니다.
- 파일 수정 기능은 없습니다. GitHub에서 접근 권한이 있는 비공개 저장소도 같은 방식으로 볼 수 있습니다.
- GitHub가 파일 화면의 내부 구조를 바꾸면 JSON을 읽는 선택자(`content.js`의 `#read-only-cursor-text-area`)를 수정해야 할 수 있습니다.
- 큰 ERD는 최초 렌더링과 전체 보기에서 시간이 걸릴 수 있습니다. 검색을 이용하면 많은 테이블 중 원하는 항목으로 이동할 수 있습니다.

포함한 뷰어: [`@dineug/erd-editor` 5.1.0](https://www.npmjs.com/package/@dineug/erd-editor/v/5.1.0)의 `dist/erd-viewer.umd.js` ([MIT 라이선스](vendor/LICENSE)).
