# 캠핑하이브 AEO 홈페이지 (camphive.kr)

㈜캠핑하이브가 **AI 검색(ChatGPT·Claude·Perplexity·네이버 AI브리핑)의 답변에 인용되도록** 만드는 정보형 콘텐츠 사이트.

- 도메인: `camphive.kr` (등록 예정 — 변경 금지)
- 결과물: 순수 정적 HTML. 서버·DB·로그인 없음.
- 빌드 의존성: **0개**. Node.js만 있으면 돌아간다.
- 대상 독자: 캠핑장·글램핑장 창업을 준비하는 예비 사업자

> 이 폴더는 `홈피제작` 공장 안의 **camphive.kr 사이트 하나**다.
> 상위 `홈피제작/`에는 `sites/`(사양서)와 `docs/`(리서치·기록)가 따로 있다.
>
> 이 저장소는 AX솔로프리너 저장소와 완전히 별개다. 그쪽의 생존규칙 R1~R5,
> 매니페스트, 원가 게이트, 2계층 구조는 SaaS 앱용이며 **여기에는 적용하지 않는다.**

---

---

## ⛔ 현재 전 페이지 색인 차단 중 (해제 금지)

`site.config.mjs` 의 **`noindexAll: true`** 때문에 **홈을 포함한 모든 페이지**에
`noindex, nofollow` 가 붙어 있고 `sitemap.xml` 은 비어 있습니다.

이유: 사이트의 최종 이름과 도메인이 아직 확정되지 않았습니다.
(`camphive.kr` 은 별도의 '㈜캠핑하이브 회사 홈페이지'용으로 예약되었습니다)
정체성이 확정되기 전에 검색엔진과 AI가 이 사이트를 색인하면, 나중에 이름을 바꿔도
옛 정보가 남습니다. **AI는 한번 학습한 것을 되돌리지 않습니다.**

**이 값을 `false` 로 바꾸는 것은 아키 지시가 있을 때만 합니다. 임의 해제 금지.**

`robots.txt` 는 그대로 둡니다 — 봇의 **방문**은 허용하되 **색인**만 막는 것입니다.
현재 저장소 이름 `camphive-site` 와 `github.io` 주소도 임시입니다.

---

## 절대 요건

**본문 텍스트가 페이지 소스에 정적으로 존재해야 한다.**

JavaScript로 그려지는 텍스트는 AI 크롤러에게 **빈 페이지**다. AI 크롤러 대부분은
JS를 실행하지 않고 HTML 원본만 읽는다. 아무리 좋은 글을 써도 JS로 렌더링되면
AI는 그 글이 존재하는지조차 모른다.

**합격 기준**: 브라우저에서 `Ctrl+U`(소스 보기) → `Ctrl+F`로 본문 문장 검색 → 나오면 통과.

`npm run verify`가 이것을 매번 기계로 확인한다.

---

## ① 새 글 추가법 — 마크다운 파일 1개

**`src/content/` 에 `.md` 파일 하나를 넣으면 페이지가 하나 생긴다.** 그게 전부다.
빌드 설정도, 목록 등록도, 사이트맵 수정도 필요 없다. 전부 자동이다.

1. `src/content/_template.md` 를 복사한다 → 예: `src/content/guide/glamping-dome-cost.md`
2. 맨 위 `slug:` 를 정한다 → 그게 인터넷 주소가 된다 (`camphive.kr/guide/glamping-dome-cost/`)
3. `template: / noindex: / draft:` **세 줄을 지운다** (지워야 공개·색인된다)
4. `【확인 필요】` 자리를 실제 원고로 바꾼다
5. `npm run check` → 규격에 어긋나면 이유를 알려주고 멈춘다

파일 구조는 이렇게 생겼다. `---` 사이가 **설정**, 그 아래가 **본문**이다.

```markdown
---
slug: guide/glamping-dome-cost
title: 글램핑 돔 설치 비용 — 캠핑하이브
description: 검색 결과에 뜨는 설명문
question: 글램핑 돔 한 동 설치 비용은 얼마인가요?
answer: >
  결론부터 한 문단. 40~60단어.
asOf: 2026-08-13
updated: 2026-08-13
faq:
  - q: 자주 받는 질문 1?
    a: 답변 1
related:
  - slug:
    label: 캠핑하이브 홈
---

표: 표 제목
| 구분 | 값 |
| --- | --- |
| 항목 | 숫자 |
출처: 자사 시공 실적
비고: 단위는 만원

## 소제목은 물음표로 끝나면 더 좋습니다?

문단을 씁니다. **굵게**, [링크](/guide/), `코드` 를 쓸 수 있습니다.

- 목록
- 목록
```

**쓸 수 있는 문법**: `##` 소제목, `###` 작은제목, 문단, `-` 목록, `1.` 순서목록,
`| 표 |`, `>` 인용, `**굵게**`, `*기울임*`, `` `코드` ``, `[글자](주소)`

**표 규칙**: 표 바로 위 `표:` 줄이 표 제목이 되고, 바로 아래 `출처:` `비고:` 줄이 표에 붙는다.
표 칸 안에서는 굵게·링크가 동작하지 않는다 — 표는 데이터이므로 글자 그대로 싣는다.

### 미확정 정보는 `【확인 필요】`

확인되지 않은 수치·법령·금액은 **지어내지 않고** `【확인 필요】`로 적는다.
기호를 통일해 두었으므로 전체 검색 한 번으로 남은 개수를 셀 수 있다.

```bash
grep -rc "【확인 필요】" src/content/
```

---

## ② 미리보기 — 명령 한 줄

```bash
npm run dev
```

빌드 후 `http://localhost:4321` 이 열린다. `Ctrl+C` 로 종료.

| 명령 | 하는 일 |
|---|---|
| `npm run build` | `src/content/*.md` → `dist/` 정적 HTML 생성 |
| `npm run verify` | 소스 보기 검증 |
| `npm run check` | 빌드 + 검증 한 번에 |
| `npm run serve` | `dist/` 미리보기 서버만 실행 |
| `npm run dev` | 빌드 + 미리보기 (평소엔 이것만 쓰면 된다) |

---

## ③ 배포법 세 가지

`dist/` 폴더를 그대로 웹서버에 올리면 끝이다. 서버에 빌드 과정이 필요 없다.

### 방법 1 — GitHub Pages 자동 배포 (현재 설정된 방식, 권장)

`.github/workflows/deploy.yml` 이 이미 들어 있다. GitHub에 올리기만 하면
**빌드 → 검증 → 배포**가 자동으로 돈다. 검증이 실패하면 배포가 멈추므로
깨진 페이지가 인터넷에 올라가지 않는다. 무료다.

원고를 고친 뒤:

```bash
git add . && git commit -m "원고 수정" && git push
```

→ 2~3분 뒤 사이트에 반영된다. 연결 절차는 아래 "GitHub 연결 절차" 참조.

### 방법 2 — 정적 호스팅 서비스 (Cloudflare Pages, Netlify, Vercel)

저장소를 연결하고 설정 두 칸만 채운다.

| 칸 | 값 |
|---|---|
| 빌드 명령 (Build command) | `node build.mjs` |
| 출력 폴더 (Output directory) | `dist` |

### 방법 3 — 일반 웹호스팅 (FTP 수동 업로드)

```bash
npm run build
```

생성된 `dist/` 폴더 **안의 내용물 전부**를 웹호스팅의 `public_html/`(또는 `www/`)에
FTP로 올린다. `dist` 폴더째로 올리지 않도록 주의한다.

### 배포 후 반드시 확인할 것

- `camphive.kr/robots.txt` 가 열리는가
- `camphive.kr/sitemap.xml` 이 열리는가
- 아무 페이지나 열고 `Ctrl+U` → 본문 문장이 보이는가
- **HTTPS** 가 적용되어 있는가 (http만 되면 일부 AI 크롤러가 건너뛴다)

---

## GitHub 연결 절차 (사장님이 직접 하셔야 하는 부분)

로컬 준비는 끝나 있다(`git init` + 첫 커밋 완료). 아래는 **사장님 GitHub 계정**이
필요한 부분이라 대신 해드릴 수 없다. 순서대로 따라가면 된다.

**1단계 — GitHub 계정 만들기** (이미 있으면 건너뛴다)
`github.com` → Sign up → 이메일·비밀번호 입력.

**2단계 — 빈 저장소 만들기**
GitHub 오른쪽 위 `+` → `New repository`
- Repository name: `camphive` (아무 이름이나 무방)
- Public / Private 중 **Public** 선택 (무료 계정은 Public이라야 Pages를 쓸 수 있다)
- 아래 `Add a README file` 등 체크박스는 **전부 해제** (이미 파일이 있으므로)
- `Create repository` 클릭

**3단계 — 이 폴더를 그 저장소에 올리기**
만들어진 화면에 나오는 주소(`https://github.com/사용자명/camphive.git`)를 복사한 뒤,
이 폴더에서 아래를 실행한다. `사용자명` 부분만 본인 것으로 바꾼다.

```bash
git remote add origin https://github.com/사용자명/camphive.git && git push -u origin main
```

**4단계 — Pages 켜기**
저장소 화면 → `Settings` 탭 → 왼쪽 메뉴 `Pages`
→ `Build and deployment` 의 `Source` 를 **`GitHub Actions`** 로 바꾼다.
(`Deploy from a branch` 가 아니다. 이걸 잘못 고르면 배포되지 않는다)

**5단계 — 배포 확인**
저장소 `Actions` 탭에 초록색 체크가 뜨면 성공이다. 주소는
`https://사용자명.github.io/camphive/` 형태로 나온다.

**6단계 — camphive.kr 도메인 연결** (도메인 등록 후에 한다)
`Settings` → `Pages` → `Custom domain` 에 `camphive.kr` 입력 → Save.
그다음 도메인을 산 곳(가비아 등)의 DNS 설정에서 아래를 등록한다.

| 종류 | 이름 | 값 |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | 사용자명.github.io |

DNS는 반영에 최대 24시간 걸린다. 반영되면 `Enforce HTTPS` 를 체크한다.

> **주의**: `CNAME` 파일을 미리 만들어두지 않았다. 도메인이 아직 등록 전인데
> 그 파일이 있으면 `github.io` 주소마저 접속이 안 되기 때문이다.
> 6단계에서 GitHub이 알아서 만들어 준다.

---

## 정본 문장 (Canonical Sentence)

```
경기 가평 소재, 2014년부터 글램핑 구조물을 제작·시공해온 전문 제조사
```

이 문장은 **모든 페이지에 글자 단위로 동일하게** 나타난다. 조사 하나, 가운뎃점 하나
바꾸지 않는다. AI가 여러 페이지·여러 출처에서 완전히 같은 표현을 반복 확인하면
그 표현을 회사의 정의로 굳히고, 답변에 **그 문장 그대로** 인용한다.
표현이 페이지마다 조금씩 다르면 AI는 자기 말로 요약해버리고, 우리 문장은 사라진다.

- 정의 위치: `site.config.mjs` 의 `CANONICAL_SENTENCE` (한 곳)
- 출력 위치: 전 페이지 푸터 + `Organization.description` + `LocalBusiness.description`
- `npm run verify` 가 매 페이지에서 글자 단위 일치를 검사한다

**외부에도 같은 문장을 써야 한다.** 홈페이지 안에서만 반복하면 자기 주장일 뿐이다.
네이버 플레이스, 구글 비즈니스 프로필, 인스타그램 소개란, 영업 자료 —
회사를 소개하는 모든 곳에 이 문장을 붙여넣는다. 그래야 교차 검증이 된다.

---

## 콘텐츠 구조 규격

콘텐츠 페이지는 아래 순서를 **반드시** 지킨다. 위반하면 빌드가 실패한다.
(`draft: true` 인 동안은 경고로만 나오므로 작성 중 임시저장이 가능하다)

| # | 요소 | 규격 | 이유 |
|---|---|---|---|
| 1 | H1 | 질의문 그대로, 물음표까지 | AI가 "이 문서가 그 질문의 답"이라고 인식한다 |
| 2 | 답변 블록 | **40~60단어** | AI가 통째로 인용하는 부분. 넘치면 요약되어 우리 표현이 사라진다 |
| 3 | 기준일자 | `YYYY-MM-DD` | 시점이 명시된 정보를 AI가 더 신뢰하고 우선 인용한다 |
| 4 | 데이터표 | **정확히 2개** | 표의 수치는 요약되지 않고 행·열 그대로 인용된다 |
| 5 | H2 본문 | **5~8개** | 소제목 단위로 따로 인용된다 |
| 6 | FAQ | **정확히 4문항** | FAQPage 구조화 데이터로 질문 단위 인용에 대응한다 |
| 7 | 갱신일 | `YYYY-MM-DD` | 최신성 판단 근거 |
| 8 | 내부 링크 | 1개 이상 | 글이 연결돼야 "이 주제의 자료가 모인 곳"으로 인식된다 |

빌드 로그가 실패 사유를 수치와 함께 알려준다:

```
오류  guide/glamping-dome-cost.md: answer 가 78단어입니다. 40~60단어여야 합니다.
오류  guide/glamping-dome-cost.md: 데이터표가 1개입니다. 정확히 2개여야 합니다.
```

### 원고 쓸 때 지킬 것

- **결론부터.** 배경 설명 뒤에 답을 두면 AI가 답을 못 찾는다.
- **답변 블록은 접속사로 시작하지 않는다.** 앞 문맥 없이 그 문단만 떼어내도 말이 되어야 한다.
- **수치를 넣는다.** 숫자가 있는 문단이 인용률이 훨씬 높다.
- **한 문단은 3~4문장.** 긴 문단은 AI가 어디를 잘라야 할지 몰라 통째로 버린다.
- **H2도 질문형으로.** 소제목 단위 인용이 붙는다.
- **모르는 건 쓰지 않는다.** 틀린 수치가 인용되면 회사 신뢰도가 통째로 깎인다.
  `【확인 필요】` 로 표시해두고 확인 후 채운다.
- **가격은 구간으로만.** 확정 단가표는 싣지 않는다. 구간 숫자도 실측값만 쓴다.

---

## 폴더 구조

```
camphive/
├─ site.config.mjs        ★ 회사 정보·정본 문장·봇 목록. 회사 정보는 여기만 고친다
├─ build.mjs                 빌드
├─ verify.mjs                소스 보기 검증
├─ serve.mjs                 미리보기 서버
├─ package.json              의존성 0개
├─ .github/workflows/        GitHub Pages 자동 배포 설정
├─ src/
│  ├─ styles.css             스타일 (JS 없음, 애니메이션 없음)
│  ├─ content/            ★ 원고가 사는 곳. .md 파일 1개 = 페이지 1개
│  │  ├─ index.md            홈
│  │  ├─ _template.md     ★ 템플릿 (복사해서 새 글 시작)
│  │  └─ guide/              가이드 문서들
│  └─ lib/
│     ├─ frontmatter.mjs     설정(--- 사이) 읽기
│     ├─ markdown.mjs        마크다운 → 구조 변환
│     ├─ content.mjs         .md 파일 → 페이지 객체
│     ├─ html.mjs            HTML 조립 헬퍼
│     ├─ jsonld.mjs          JSON-LD @graph 생성
│     ├─ layout.mjs          head / header / footer
│     ├─ render-article.mjs  콘텐츠 페이지 렌더러
│     ├─ render-home.mjs     홈 렌더러
│     └─ validate.mjs        구조 검사 규칙
├─ static/                   그대로 복사될 파일
└─ dist/                     빌드 결과물 — git에 올리지 않는다 (자동 생성)
```

`robots.txt`와 `sitemap.xml`은 **빌드 때 자동 생성**된다. 직접 만들거나 고치지 않는다.
(봇 목록은 `site.config.mjs`의 `bots`, URL 목록은 `src/content/`가 원본이다.)

---

## JSON-LD @graph

모든 페이지에 `@graph` 하나가 실린다. 스키마를 페이지마다 흩뿌리면 AI는
"이 글을 쓴 회사"와 "가평의 그 제조사"를 서로 다른 존재로 본다.
`@id` 로 노드를 지정하고 서로 참조시켜야 하나의 지식 덩어리가 된다.

| 노드 | `@id` | 역할 |
|---|---|---|
| `Organization` | `{base}/#organization` | 회사. 설립 2013, 주소, 정본 문장, `sameAs` |
| `LocalBusiness` | `{base}/#localbusiness` | 지역 사업자. `parentOrganization` → 회사 |
| `WebSite` | `{base}/#website` | 사이트. `publisher` → 회사 |
| `WebPage` | `{url}#webpage` | 페이지. `isPartOf` → 사이트, `about` → 회사 |
| `Article` | `{url}#article` | 본문. `author`/`publisher` → 회사 |
| `FAQPage` | `{url}#faq` | FAQ 4문항 |
| `BreadcrumbList` | `{url}#breadcrumb` | 경로 |
| `ItemList` | `{home}#contents` | 홈의 콘텐츠 목록 (공개된 글만) |

**값이 없는 항목은 필드 자체를 만들지 않는다.** 빈 문자열을 내보내면 AI가
"주소가 빈칸인 회사"로 읽는다. 확정되지 않은 정보는 아예 없는 편이 낫다.

`npm run verify` 가 끊긴 참조(존재하지 않는 `@id`를 가리키는 링크)를 잡아낸다.

---

## robots.txt

`site.config.mjs` 의 `bots` 목록으로 자동 생성되며, 명시 **16종** 전부 `Allow: /` 다.

**AI 검색·인용 봇** (6종) — 답변에 우리 문장이 인용되는 경로:
`OAI-SearchBot` · `ChatGPT-User` · `Claude-SearchBot` · `Claude-User` · `PerplexityBot` · `Perplexity-User`

**AI 학습 봇** (6종) — 모델 자체에 회사가 각인되는 경로:
`GPTBot` · `ClaudeBot` · `anthropic-ai` · `Google-Extended` · `Applebot-Extended` · `CCBot`

**일반 검색엔진** (4종):
`Googlebot` · `Bingbot` · `Yeti`(네이버) · `Daumoa`(다음)

여기에 `User-agent: *` 전체 허용과 `Sitemap:` 줄이 붙는다.

> 학습 봇을 막으면 인용도 같이 줄어든다. 이 사이트는 인용되는 것이 목적이므로
> 전부 열어둔다. 회사 기밀은 애초에 올리지 않는 것으로 관리한다.

---

## 검증 (`npm run verify`)

매 페이지에 대해 다음을 기계로 확인한다. GitHub Actions 배포에서도 같은 검사가 돌며,
하나라도 실패하면 배포가 중단된다.

1. **본문 텍스트가 소스에 존재** — 원고의 모든 문장·표 칸·FAQ를 HTML 원문에서 문자열 검색
2. **실행 스크립트 0개** — JSON-LD 외 `<script>` 가 하나라도 있으면 실패
3. **정본 문장 글자 단위 일치**
4. **JSON-LD 유효성 + `@graph` 참조 연결**
5. **렌더링 없이 읽히는 본문 분량**
6. **내부 링크 유효성** — 존재하지 않는 페이지를 가리키면 실패
7. **robots.txt** — 봇 16종 전부 `Allow: /`, sitemap 경로 기재, 전체 차단 없음
8. **sitemap.xml** — URL 수 일치, 절대경로, noindex 페이지 제외

---

## 만들지 않는 것

- 회원가입 · 로그인 · 결제 · 관리자 페이지 · DB
- `/about/` 등 회사 소개 페이지 — 이 사이트는 AEO 정보 사이트이지 회사 홈페이지가 아니다.
  발행 주체 정보는 홈 본문의 정본 문장과 Organization JSON-LD가 담당한다.
- 화려한 애니메이션 — AEO에 도움이 안 되고 렌더링을 지연시켜 오히려 방해가 된다.
- 기존 qshop 사이트 간섭 (역할 분리: 이 사이트 = 정보 / qshop = 제품·견적)
