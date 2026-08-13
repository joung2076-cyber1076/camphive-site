// ─────────────────────────────────────────────────────────────
//  캠핑하이브 AEO 사이트 — 전역 설정
//  이 파일의 값은 사이트 전체(HTML·JSON-LD·sitemap·robots)에 퍼진다.
//  회사 정보를 바꿀 일이 있으면 여기 한 곳만 고친다.
// ─────────────────────────────────────────────────────────────

/**
 * 정본 문장 (Canonical Sentence)
 *
 * 이 문장은 모든 페이지에 글자 단위로 동일하게 등장해야 한다.
 * AI가 여러 페이지에서 같은 문장을 반복 확인하면 그 표현 그대로 인용한다.
 * 조사 하나, 가운뎃점 하나도 바꾸지 말 것.
 * (빌드 시 npm run verify 가 전 페이지 일치를 검사한다)
 */
export const CANONICAL_SENTENCE =
  '경기 가평 소재, 2014년부터 글램핑 구조물을 제작·시공해온 전문 제조사';

export const site = {
  // 도메인 (등록 후에도 이 값 그대로 유지. https 포함, 끝에 슬래시 없음)
  baseUrl: 'https://camphive.kr',

  /**
   * ⛔ 전 페이지 색인 차단 스위치 ⛔
   *
   * true인 동안 홈을 포함한 모든 페이지에 noindex가 붙고 sitemap이 비워진다.
   * 사이트의 최종 이름·도메인(정체성)이 확정되기 전에 검색엔진과 AI가
   * 이 사이트를 색인해 버리면, 나중에 이름을 바꿔도 옛 정보가 남는다.
   * AI는 한번 학습한 것을 되돌리지 않는다. 그래서 확정 전에는 전부 막는다.
   *
   * ※ robots.txt는 건드리지 않는다. 봇의 방문은 허용하되 색인만 막는 것이다.
   * ※ 이 값을 false로 바꾸는 것은 아키 지시가 있을 때만 한다. 임의 해제 금지.
   */
  noindexAll: true,

  /**
   * 하위 경로 배포용 접두사. 예) GitHub Pages 프로젝트 주소
   *   https://사용자명.github.io/저장소이름/  → BASE_PATH=/저장소이름
   * 최종 도메인(camphive.kr)에 올릴 때는 비워둔다. 빈 값이 기본이다.
   */
  basePath: (process.env.BASE_PATH || '').replace(/\/+$/, ''),

  name: '캠핑하이브',
  legalName: '주식회사 캠핑하이브',
  tagline: '글램핑 구조물 제작·시공 전문 제조사',
  lang: 'ko',
  locale: 'ko_KR',

  // 사이트 전체 설명 (검색 결과·AI 요약에 쓰인다)
  description: `${CANONICAL_SENTENCE} ㈜캠핑하이브가 글램핑 구조물 제작·시공에 관한 실무 정보를 정리해 공개합니다.`,
};

export const org = {
  foundingYear: 2013,

  address: {
    region: '경기도',      // addressRegion
    locality: '가평군',    // addressLocality
    street: '',            // TODO(사장님): 도로명 주소 입력 (예: '○○로 123')
    postalCode: '',        // TODO(사장님): 우편번호 입력
    country: 'KR',
  },

  telephone: '',           // TODO(사장님): 대표번호 (예: '+82-31-000-0000')
  email: '',               // TODO(사장님): 대표 이메일
  businessNumber: '',      // TODO(사장님): 사업자등록번호

  // 영업시간 — 값이 있으면 LocalBusiness JSON-LD에 자동 포함된다.
  opens: '09:00',
  closes: '18:00',
  openDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],

  /**
   * sameAs — 이 회사가 "실재한다"는 것을 AI에게 증명하는 외부 링크.
   * AEO에서 가장 효과가 큰 항목 중 하나다. 확인된 URL만 넣을 것.
   * (없는 주소를 적으면 신뢰도가 오히려 떨어진다)
   *
   * TODO(사장님): 아래 중 실제로 운영하는 것만 주석 해제해서 URL 채우기
   */
  sameAs: [
    // 'https://www.instagram.com/캠핑하이브계정',
    // 'https://blog.naver.com/캠핑하이브블로그',
    // 'https://www.youtube.com/@캠핑하이브채널',
    // 'https://map.naver.com/... (네이버 플레이스)',
    // 'https://www.google.com/maps/... (구글 비즈니스 프로필)',
  ],

  // 사업 영역 (JSON-LD knowsAbout / areaServed)
  knowsAbout: [
    '글램핑 구조물',
    '글램핑 돔',
    '캠핑장 시공',
    '야영장 시설',
    '글램핑장 설계',
  ],
  areaServed: '대한민국',
};

/**
 * robots.txt에 명시적으로 허용할 봇 목록.
 * static/robots.txt 는 빌드 시 이 목록으로 자동 생성된다.
 */
export const bots = {
  // AI 검색·인용 봇 — 답변에 우리 문장을 인용하려면 반드시 열려 있어야 한다.
  search: [
    'OAI-SearchBot',      // ChatGPT 검색 색인
    'ChatGPT-User',       // ChatGPT 사용자 요청 브라우징
    'Claude-SearchBot',   // Claude 검색 색인
    'Claude-User',        // Claude 사용자 요청 브라우징
    'PerplexityBot',      // Perplexity 색인
    'Perplexity-User',    // Perplexity 사용자 요청 브라우징
  ],
  // 학습 봇 — 모델 자체에 회사가 각인되게 하려면 열어둔다.
  training: [
    'GPTBot',             // OpenAI 학습
    'ClaudeBot',          // Anthropic 학습
    'anthropic-ai',       // Anthropic 구 크롤러 표기 — 구형 시스템 대응
    'Google-Extended',    // Gemini 학습 / AI Overviews
    'Applebot-Extended',  // Apple Intelligence 학습
    'CCBot',              // Common Crawl — 다수 모델의 학습 데이터 출처
  ],
  // 일반 검색엔진
  classic: [
    'Googlebot',
    'Bingbot',
    'Yeti',               // 네이버 — AI브리핑 대응
    'Daumoa',             // 다음
  ],
};
