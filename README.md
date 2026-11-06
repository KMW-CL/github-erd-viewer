# GitHub ERD Viewer

GitHub의 `.vuerd.json` 또는 `.erd.json` 파일을 ERD Editor의 읽기 전용 뷰어로 보여주는 Chrome/Edge 확장 기능입니다. GitHub 원본 탭은 그대로 두고 ERD를 새 탭에서 엽니다.

## 처음 설치하기

1. [v1.0.0 설치용 ZIP](https://github.com/KMW-CL/github-erd-viewer/releases/download/v1.0.0/github-erd-viewer-v1.0.0.zip)을 다운로드합니다. [릴리스 페이지](https://github.com/KMW-CL/github-erd-viewer/releases/tag/v1.0.0)의 **Assets**에서도 같은 파일을 받을 수 있습니다.
2. ZIP의 압축을 풉니다. 압축을 풀면 `github-erd-viewer` 폴더가 나옵니다. 그 안에 `manifest.json`이 있는지 확인합니다.
3. 압축을 푼 `github-erd-viewer` 폴더를 계속 보관할 위치에 둡니다. 확장 기능을 사용하는 동안 이 폴더를 삭제하거나 옮기지 마세요.
4. Chrome 주소창에 `chrome://extensions`를 입력하고 **개발자 모드**를 켭니다. Edge에서는 `edge://extensions`를 엽니다.
5. **압축해제된 확장 프로그램을 로드합니다**를 누르고, 2단계에서 확인한 `github-erd-viewer` **폴더**를 선택합니다. ZIP 파일이나 `manifest.json` 파일 자체를 선택하지 않습니다.

## ERD 열기

1. GitHub에서 `.vuerd.json` 또는 `.erd.json` 파일 페이지를 엽니다. 이미 열려 있었다면 새로고침합니다.
2. 화면 오른쪽 아래의 **ERD 새 탭에서 보기**를 누릅니다.
3. 새 탭에서 ERD를 확인합니다. `Ctrl+K`로 테이블과 컬럼을 검색하고, 화면 아래의 버튼으로 확대하거나 축소할 수 있습니다.

비공개 저장소의 파일도 볼 수 있지만, 먼저 GitHub에 로그인해 해당 파일에 접근할 수 있어야 합니다. 이 확장 기능은 별도 GitHub 토큰을 요구하지 않습니다.

## 새 버전으로 업데이트하기

새 버전의 ZIP을 받아 압축을 풀고, 기존 확장 기능 폴더의 파일을 새 파일로 바꾼 뒤 `chrome://extensions`에서 **GitHub ERD Viewer** 카드의 **새로고침** 버튼을 누릅니다. 마지막으로 GitHub 파일 페이지도 새로고침합니다.

## 동작과 범위

- GitHub가 파일 페이지에 표시한 JSON을 읽어 공식 ERD Editor 뷰어에 전달합니다. 파일 내용은 외부 뷰어 서비스로 전송하지 않습니다.
- 새 뷰어 탭이 열려 있는 동안 파일 내용은 브라우저의 확장 기능 임시 메모리에 보관됩니다. 탭을 닫으면 삭제됩니다.
- ERD는 읽기 전용입니다. GitHub가 파일 화면의 내부 구조를 바꾸면 JSON을 읽는 선택자(`content.js`의 `#read-only-cursor-text-area`)를 수정해야 할 수 있습니다.

포함한 뷰어: [`@dineug/erd-editor` 5.1.0](https://www.npmjs.com/package/@dineug/erd-editor/v/5.1.0)의 `dist/erd-viewer.umd.js` ([MIT 라이선스](vendor/LICENSE)).
