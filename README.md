# 나의 독서기록 웹페이지 코드 설명

이 문서는 `index.html`, `styles.css`, `script.js`에 작성된 코드를 발표하거나 교수님께 설명할 수 있도록 정리한 설명서이다.  
전체 웹페이지는 **HTML로 구조를 만들고, CSS로 디자인과 반응형 레이아웃을 적용하고, JavaScript로 이벤트 처리와 데이터 저장 기능을 구현한 독서기록 웹페이지**이다.

---

## 1. index.html 설명

`index.html`은 웹페이지의 전체 구조를 담당한다. 사용자가 보는 제목, 메뉴, 로그인 폼, 독서기록 입력 폼, 책 목록, 목표 영역, 표, 캔버스 등이 모두 이 파일에 들어 있다.

### 문서 기본 설정

```html
<!DOCTYPE html>
```

HTML5 문서임을 브라우저에 알려준다.

```html
<html lang="ko">
```

문서의 기본 언어를 한국어로 설정한다.

```html
<head>
```

브라우저 화면에는 직접 보이지 않는 문서 정보를 넣는 영역이다.

```html
<meta charset="UTF-8">
```

한글이 깨지지 않도록 문자 인코딩을 UTF-8로 설정한다.

```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

모바일, 태블릿, 데스크톱 화면에서 반응형 디자인이 제대로 동작하도록 화면 너비를 기기 너비에 맞춘다.

```html
<title>나의 독서기록</title>
```

브라우저 탭에 표시되는 제목이다.

```html
<link rel="stylesheet" href="styles.css">
```

외부 CSS 파일인 `styles.css`를 현재 HTML 문서에 연결한다.

```html
</head>
```

문서 설정 영역이 끝났다는 뜻이다.

### body와 onload 이벤트

```html
<body onload="showEventMessage('...')">
```

브라우저 화면에 실제로 보이는 내용이 시작된다.  
`onload`는 페이지가 완전히 열렸을 때 실행되는 이벤트이다. 여기서는 페이지가 열리면 `showEventMessage()` 함수를 실행하여 이벤트 안내 문구를 보여준다.

### 상단 헤더와 메뉴

```html
<header class="site-header">
```

페이지 상단 영역이다. CSS에서 `site-header` 클래스를 이용해 상단 고정 메뉴처럼 디자인한다.

```html
<nav class="navbar" aria-label="주요 메뉴">
```

메뉴 링크들을 담는 내비게이션 영역이다. `aria-label`은 화면 읽기 프로그램이 이 영역을 주요 메뉴로 이해하도록 돕는다.

```html
<a class="brand" href="#overview">
```

사이트 로고 역할을 하는 링크이다. 클릭하면 `id="overview"`인 첫 화면 영역으로 이동한다.

```html
<span class="brand-mark">R</span>
```

로고처럼 보이는 R 문자를 표시한다.

```html
<span>Reading Log</span>
```

웹페이지의 이름을 표시한다.

```html
<button class="menu-toggle" id="menuToggle" type="button" aria-label="메뉴 열기" aria-expanded="false">
```

모바일 화면에서 메뉴를 열고 닫는 버튼이다.  
`id="menuToggle"`은 JavaScript에서 이 버튼을 찾기 위해 사용한다.  
`aria-expanded="false"`는 현재 메뉴가 닫혀 있다는 접근성 정보이다.

```html
<span></span>
<span></span>
<span></span>
```

햄버거 메뉴 아이콘의 세 줄을 표현하기 위한 빈 `span` 태그이다.

```html
<ul class="nav-links" id="navLinks">
```

상단 메뉴 목록이다. `id="navLinks"`는 JavaScript에서 모바일 메뉴를 열고 닫을 때 사용한다.

```html
<li><a href="#record" onmouseover="navHover(this)" onmouseout="navOut(this)">기록하기</a></li>
```

`기록하기` 메뉴이다. 클릭하면 `id="record"` 영역으로 이동한다.  
`onmouseover`는 마우스를 올렸을 때 실행되고, `onmouseout`은 마우스가 벗어났을 때 실행된다.  
`this`는 현재 마우스가 올라간 링크 자신을 의미한다.

```html
<li><a href="#library" ...>책장</a></li>
```

책 목록 영역으로 이동하는 메뉴이다. 마우스 이벤트가 연결되어 있어 색이 바뀐다.

```html
<li><a href="#goals" ...>목표</a></li>
```

월간 목표와 독서 현황 영역으로 이동하는 메뉴이다.

```html
<li><a href="#login" ...>로그인</a></li>
```

로그인 폼 영역으로 이동하는 메뉴이다.

```html
<li><a href="https://www.kyobobook.co.kr/" target="_blank" rel="noopener" ...>교보문고</a></li>
```

교보문고 공식 사이트로 이동하는 외부 링크이다.  
`target="_blank"`는 새 탭에서 열리게 한다.  
`rel="noopener"`는 새 탭을 열 때 보안상 안전하게 처리하기 위한 속성이다.

### 메인 영역

```html
<main>
```

페이지의 주요 내용을 담는 영역이다.

### 첫 화면 hero 영역

```html
<section class="reader-hero" id="overview" aria-label="독서기록 요약">
```

첫 화면 대표 영역이다. 배경 이미지, 제목, 독서 통계가 들어간다.  
`id="overview"`는 상단 로고 링크가 이동할 위치이다.

```html
<div class="hero-content">
```

첫 화면의 제목과 설명을 묶는 영역이다.

```html
<p class="eyebrow">Personal Reading Journal</p>
```

작은 보조 제목이다. CSS에서 강조 색으로 표현된다.

```html
<h1 id="heroTitle">나의 독서기록</h1>
```

페이지의 가장 큰 제목이다. JavaScript에서 사용자가 입력한 기록 이름으로 바뀔 수 있다.

```html
<p class="hero-copy">...</p>
```

웹페이지의 목적을 설명하는 문장이다.

```html
<dl class="hero-stats" aria-label="현재 독서 통계">
```

통계를 보여주는 설명 목록이다. `dl`은 description list의 약자이다.

```html
<dt>전체 기록</dt>
<dd id="totalBooks">0권</dd>
```

`dt`는 통계 항목 이름이고, `dd`는 값이다.  
`id="totalBooks"`는 JavaScript가 전체 책 수를 넣는 위치이다.

```html
<dt>완독</dt>
<dd id="finishedBooks">0권</dd>
```

완독한 책 수를 보여준다.

```html
<dt>이번 달 목표</dt>
<dd id="monthGoalText">0 / 0권</dd>
```

이번 달 완독 수와 목표 권수를 보여준다.

```html
<dt>현재 시간</dt>
<dd id="liveClock">--:--:--</dd>
```

현재 시간이 들어가는 위치이다. JavaScript의 `setInterval()`을 이용해 1초마다 시간이 바뀐다.

```html
<p class="today-label" id="todayLabel">...</p>
```

오늘 날짜와 요일을 표시하는 문장이다.

### 로그인 폼

```html
<section class="login-strip" id="login" aria-label="로그인 폼">
```

로그인 폼 전체를 감싸는 영역이다. `id="login"` 때문에 상단 메뉴에서 바로 이동할 수 있다.

```html
<div class="login-info">
```

로그인 영역의 제목과 설명 문구를 담는 부분이다.

```html
<p id="loginMessage">...</p>
```

로그인 결과 메시지가 표시되는 위치이다. JavaScript의 `loginSubmit()` 함수가 이 내용을 바꾼다.

```html
<form class="simple-login-form" name="fo" method="get" onsubmit="loginSubmit(event)">
```

교재 예제 형태의 로그인 폼이다.  
`name="fo"`는 폼 이름이다.  
`method="get"`은 제출 방식이다.  
`onsubmit="loginSubmit(event)"`는 제출 버튼을 눌렀을 때 JavaScript 함수가 실행되게 한다.

```html
<input id="loginId" name="userId" type="text" size="15" value="" placeholder="예: reader01">
```

사용자 ID 입력칸이다.  
`type="text"`는 일반 텍스트 입력이다.  
`size="15"`는 입력칸의 기본 크기이다.  
`placeholder`는 사용자가 무엇을 입력해야 하는지 예시를 보여준다.

```html
onfocus="focusField(this, '...')"
```

입력칸에 커서가 들어갔을 때 실행되는 이벤트이다.

```html
onblur="blurField(this, '...')"
```

입력칸에서 커서가 빠져나갔을 때 실행되는 이벤트이다.

```html
<input id="loginPassword" name="userPassword" type="password" ...>
```

비밀번호 입력칸이다. `type="password"`라서 입력 내용이 점이나 별표처럼 가려진다.

```html
<input class="login-submit" type="submit" value="완료">
```

로그인 제출 버튼이다.  
`value="완료"`는 버튼에 표시되는 글자이다.

### 독서기록 입력 영역

```html
<section class="dashboard" aria-label="독서 기록 관리">
```

독서기록 입력 폼과 책장 목록을 함께 보여주는 큰 영역이다.

```html
<aside class="entry-panel" id="record">
```

책 기록을 입력하는 패널이다. `id="record"` 때문에 메뉴에서 이 위치로 이동한다.

```html
<p class="event-message" id="eventMessage">
```

이벤트가 발생했을 때 안내 메시지를 보여주는 문장이다.

```html
<form class="book-form" id="bookForm" onsubmit="showEventMessage(...)">
```

책 기록을 입력하는 폼이다. `id="bookForm"`은 JavaScript에서 제출 이벤트를 연결할 때 사용한다.

```html
<input id="bookTitle" name="title" type="text" placeholder="예: 데미안" required>
```

책 제목 입력칸이다.  
`required`가 있어서 비워두면 제출할 수 없다.

```html
onkeyup="previewTitle(this.value)"
```

키보드를 누를 때마다 현재 입력값을 `previewTitle()` 함수에 전달한다.

```html
<input id="bookAuthor" name="author" type="text" placeholder="예: 헤르만 헤세" required>
```

저자 입력칸이다.

```html
<select id="bookStatus" name="status">
```

책 상태를 선택하는 드롭다운이다.

```html
<option value="reading">읽는 중</option>
```

사용자가 보는 글자는 `읽는 중`이고, JavaScript가 사용하는 실제 값은 `reading`이다.

```html
<option value="finished">완독</option>
```

완독 상태를 의미한다.

```html
<option value="wishlist">읽고 싶음</option>
```

읽고 싶은 책 상태를 의미한다.

```html
<select id="bookRating" name="rating">
```

평점을 선택하는 드롭다운이다.

```html
<input id="bookPages" name="pages" type="number" min="1" max="3000" placeholder="320">
```

페이지 수를 입력하는 숫자 입력칸이다.  
최소값은 1, 최대값은 3000이다.

```html
<input id="finishedDate" name="finishedDate" type="date">
```

완독일을 날짜 선택 형식으로 입력한다.

```html
<textarea id="bookMemo" name="memo" rows="4" placeholder="..."></textarea>
```

책에 대한 메모를 여러 줄로 입력하는 칸이다.

```html
<div class="form-preview" id="formPreview">
```

책 제목을 입력하는 동안 미리보기 문구가 표시되는 영역이다.

```html
<button class="primary-btn" type="submit">기록 추가</button>
```

책 기록을 추가하는 버튼이다.

### 책장 영역

```html
<section class="library-panel" id="library">
```

저장된 책 목록을 보여주는 영역이다.

```html
<input id="searchInput" type="search" placeholder="제목 또는 저자">
```

검색 입력칸이다. 입력한 글자를 기준으로 책 제목과 저자를 검색한다.

```html
<select id="sortSelect">
```

정렬 기준을 선택하는 드롭다운이다.

```html
<option value="recent">최근 기록순</option>
<option value="rating">평점 높은순</option>
<option value="title">제목순</option>
```

책 목록을 최근순, 평점순, 제목순으로 정렬할 수 있게 한다.

```html
<button class="tab-btn active" data-filter="all">전체</button>
```

전체 책을 보여주는 필터 버튼이다.

```html
<button class="tab-btn" data-filter="reading">읽는 중</button>
```

읽는 중인 책만 보여준다.

```html
<button class="tab-btn" data-filter="finished">완독</button>
```

완독한 책만 보여준다.

```html
<button class="tab-btn" data-filter="wishlist">읽고 싶음</button>
```

읽고 싶은 책만 보여준다.

```html
<div class="book-list" id="bookList"></div>
```

JavaScript가 책 카드를 만들어 넣는 영역이다.

```html
<table>
```

최근 독서기록을 표로 보여준다.

```html
<thead>
```

표의 제목 행이다.

```html
<tbody id="sampleTableBody"></tbody>
```

JavaScript가 책 데이터를 표 행으로 넣는 부분이다.

### 목표와 현황 영역

```html
<section class="insights" id="goals">
```

독서 목표와 현재 독서 현황을 보여주는 영역이다.

```html
<input id="ownerName" type="text" maxlength="20" placeholder="예: 민지의 독서노트">
```

사용자가 독서기록 이름을 입력하는 칸이다.

```html
<input id="goalInput" type="number" min="1" max="30">
```

월간 완독 목표 권수를 입력하는 칸이다.

```html
<button id="saveGoalBtn">저장</button>
```

기록 이름과 목표를 저장하는 버튼이다.

```html
<div class="goal-meter"><span id="goalBar"></span></div>
```

목표 달성률을 막대 그래프로 보여준다.  
JavaScript가 `goalBar`의 width 값을 바꾼다.

```html
<form class="mini-form" id="pagePlanForm">
```

완독 예상일을 계산하는 폼이다.

```html
<input id="planPages" type="number" placeholder="180">
```

남은 페이지 수를 입력한다.

```html
<input id="planPace" type="number" placeholder="30">
```

하루에 읽을 페이지 수를 입력한다.

```html
<p id="planResult">
```

완독 예상일 계산 결과가 표시된다.

```html
<ul class="summary-list">
```

읽는 중, 읽고 싶음, 기록한 페이지, 평균 평점을 목록으로 보여준다.

```html
<p class="quote-box" id="quoteBox">
```

랜덤 독서 문장이 표시되는 영역이다.

```html
<button id="randomQuoteBtn">문장 뽑기</button>
```

버튼을 누르면 JavaScript 배열에서 문장을 무작위로 골라 보여준다.

```html
<input type="checkbox" value="10">
```

독서 루틴 체크박스이다. `value="10"`은 해당 루틴이 10분이라는 뜻이다.

```html
<canvas id="statusCanvas" width="520" height="260">
```

JavaScript가 상태별 책 수 그래프를 그리는 영역이다.

```html
<dialog class="tip-dialog" id="tipDialog">
```

독서 팁을 보여주는 팝업 창이다.

```html
<script src="script.js"></script>
```

JavaScript 파일을 연결한다. HTML 구조가 먼저 만들어진 뒤 JavaScript가 실행되도록 문서 끝부분에 배치했다.

---

## 2. styles.css 설명

`styles.css`는 웹페이지의 색상, 크기, 배치, 반응형 디자인, 마우스 이벤트 시 변화 등을 담당한다.

### 전체 색상 변수

```css
:root {
```

전체 문서에서 사용할 CSS 변수를 선언하는 영역이다.

```css
--bg: #f6f3ed;
```

페이지 배경색이다.

```css
--surface: #fffdf8;
--surface-strong: #ffffff;
```

카드나 입력 폼의 배경색으로 사용한다.

```css
--ink: #1f2a2e;
```

기본 글자색이다.

```css
--muted: #66716f;
```

보조 설명 문장에 사용하는 흐린 글자색이다.

```css
--line: #ddd6c9;
```

테두리 색이다.

```css
--green, --green-dark, --coral, --gold, --blue
```

버튼, 강조 표시, 그래프 등에 사용하는 주요 색상이다.

```css
--shadow: ...
```

카드에 그림자를 줄 때 사용하는 값이다.

### 기본 초기화

```css
* { box-sizing: border-box; }
```

모든 요소의 크기 계산에 padding과 border가 포함되게 한다.

```css
html { scroll-behavior: smooth; }
```

메뉴 링크를 클릭해 섹션으로 이동할 때 부드럽게 스크롤된다.

```css
body { ... }
```

문서 전체의 여백, 배경색, 글자색, 글꼴, 줄간격을 설정한다.

```css
a { color: inherit; text-decoration: none; }
```

링크의 밑줄을 없애고 부모 요소의 글자색을 따라가게 한다.

```css
button, input, select, textarea { font: inherit; }
```

폼 요소들이 body의 글꼴을 그대로 사용하게 한다.

### 상단 메뉴

```css
.site-header { position: sticky; top: 0; ... }
```

상단 메뉴를 스크롤해도 위에 붙어 있게 만든다.

```css
.navbar { display: flex; ... }
```

브랜드와 메뉴를 양쪽으로 배치한다.

```css
.brand { display: inline-flex; ... }
```

로고와 텍스트를 한 줄로 정렬한다.

```css
.brand-mark { display: inline-grid; ... }
```

R 글자를 정사각형 로고처럼 가운데 배치한다.

```css
.nav-links { display: flex; ... }
```

메뉴 항목들을 가로로 배치한다.

```css
.nav-links a:hover { ... }
```

메뉴에 마우스를 올렸을 때 배경색과 글자색을 바꾼다.

```css
.nav-links a.js-hover { ... }
```

JavaScript의 `navHover()` 함수가 붙이는 클래스이다. 이벤트로 색상이 바뀐다.

```css
.menu-toggle { display: none; ... }
```

기본 데스크톱 화면에서는 모바일 메뉴 버튼을 숨긴다.

```css
.menu-toggle.open span:nth-child(...)
```

모바일 메뉴가 열렸을 때 햄버거 아이콘이 X 모양으로 바뀌게 한다.

### 첫 화면

```css
.reader-hero { ... }
```

첫 화면의 전체 영역이다. 배경 이미지와 어두운 그라데이션을 함께 적용한다.

```css
background: linear-gradient(...), url("assets/reading-desk.png") center / cover;
```

배경 이미지를 꽉 차게 넣고, 위에 어두운 그라데이션을 덮어 글자가 잘 보이게 한다.

```css
.reader-hero::after { ... }
```

첫 화면 아래쪽에 추가 그라데이션을 넣어 자연스럽게 보이게 한다.

```css
.hero-content, .hero-stats { z-index: 1; ... }
```

배경 이미지 위에 글자와 통계가 올라오도록 한다.

```css
h1 { font-size: clamp(...); }
```

화면 크기에 따라 제목 크기가 자연스럽게 조절되게 한다.

```css
.hero-stats { display: grid; grid-template-columns: repeat(4, 1fr); }
```

통계 4개를 데스크톱 화면에서 4칸으로 배치한다.

### 로그인 폼

```css
.login-strip { display: grid; ... }
```

로그인 설명과 로그인 폼을 2단으로 배치한다.

```css
.login-info, .simple-login-form { ... }
```

로그인 영역을 카드처럼 보이게 배경, 테두리, 그림자를 준다.

```css
.simple-login-form label { display: inline-flex; ... }
```

라벨과 입력칸을 한 줄로 정렬한다.

```css
.login-submit { ... }
```

완료 버튼의 색상, 크기, 테두리, 커서를 설정한다.

### 입력 폼과 이벤트 스타일

```css
.dashboard { display: grid; grid-template-columns: ... }
```

책 입력 패널과 책장 패널을 2단으로 배치한다.

```css
.entry-panel, .library-panel, .goal-panel, .note-panel { ... }
```

각 주요 영역을 카드처럼 보이게 만든다.

```css
.event-message, .form-preview { ... }
```

이벤트 발생 안내 문구와 입력 미리보기 박스를 꾸민다.

```css
input, select, textarea { ... }
```

모든 입력 요소의 공통 디자인을 설정한다.

```css
input:focus, select:focus, textarea:focus { ... }
```

사용자가 입력칸을 선택했을 때 테두리와 그림자를 강조한다.

```css
.focus-field { ... }
```

JavaScript의 `focusField()` 함수가 붙이는 클래스이다. `onfocus` 이벤트가 발생하면 입력칸이 강조된다.

```css
.empty-field { ... }
```

필수 입력값이 비어 있을 때 빨간 느낌으로 표시한다.

### 버튼과 마우스 이벤트

```css
.primary-btn, .ghost-btn, .danger-btn, .tab-btn { ... }
```

모든 버튼의 공통 크기, 정렬, 둥근 모서리, 전환 효과를 지정한다.

```css
.primary-btn:hover { ... }
```

마우스를 올렸을 때 기본 버튼 색이 바뀐다.

```css
.button-hover { ... }
```

JavaScript의 `buttonHover()` 함수가 붙이는 클래스이다. `onmouseover` 이벤트 예제로 사용된다.

```css
.danger-btn:hover { ... }
```

삭제 버튼에 마우스를 올렸을 때 빨간색으로 강조한다.

### 책 카드

```css
.book-list { display: grid; gap: 14px; }
```

책 카드들을 세로로 일정한 간격을 두고 배치한다.

```css
.book-card { display: grid; ... }
```

책 정보와 버튼 영역을 좌우로 배치한다.

```css
.book-card:hover { ... }
```

마우스를 올리면 테두리 색이 바뀌고 살짝 위로 올라간다.

```css
.book-card.event-hover { ... }
```

JavaScript의 `cardMouseOver()`가 붙이는 클래스이다.

```css
.status-badge { ... }
```

책 상태를 배지 형태로 보여준다.

### 표, 목표, 그래프

```css
.table-wrap { overflow-x: auto; }
```

모바일에서 표가 너무 넓으면 가로 스크롤이 생기도록 한다.

```css
table { width: 100%; border-collapse: collapse; }
```

표 너비를 영역 전체로 쓰고 테두리를 겹쳐 보이게 한다.

```css
.goal-meter { ... }
```

월간 목표 달성률 막대의 배경이다.

```css
.goal-meter span { width: 0; ... }
```

실제 달성률 막대이다. JavaScript에서 width를 바꾼다.

```css
.routine-list input { accent-color: var(--green); }
```

체크박스 색상을 초록색으로 설정한다.

```css
.chart-area canvas { width: 100%; height: auto; }
```

캔버스 그래프가 반응형으로 줄어들게 한다.

### 반응형 디자인

```css
@media (max-width: 980px) { ... }
```

태블릿 정도 화면에서 2단 레이아웃을 1단으로 바꾼다.

```css
@media (max-width: 760px) { ... }
```

모바일 화면에서 메뉴 버튼을 보이게 하고, 메뉴 목록은 접히게 한다.

```css
@media (max-width: 520px) { ... }
```

작은 모바일 화면에서 폼, 버튼, 카드가 화면 너비에 맞게 꽉 차도록 한다.

---

## 3. script.js 설명

`script.js`는 웹페이지의 동작을 담당한다. 독서기록 추가, 삭제, 검색, 정렬, 필터, 로그인, 목표 저장, 루틴 체크, 캔버스 그래프, 이벤트 메시지 표시 등이 모두 이 파일에서 동작한다.

### 저장 키

```js
const storageKeys = { ... };
```

브라우저 `localStorage`에 데이터를 저장할 때 사용할 이름들을 모아둔 객체이다.

```js
books: "reading-log-books"
```

책 목록을 저장할 키이다.

```js
goal: "reading-log-goal"
```

월간 목표를 저장할 키이다.

```js
owner: "reading-log-owner"
```

독서기록 이름을 저장할 키이다.

```js
routine: "reading-log-routine"
```

체크박스 루틴 상태를 저장할 키이다.

### 상태 이름

```js
const statusLabels = { ... };
```

영어 상태값을 한글로 보여주기 위한 객체이다.

```js
reading: "읽는 중"
finished: "완독"
wishlist: "읽고 싶음"
```

내부 값은 영어로 처리하고, 화면에는 한글로 보여준다.

### 랜덤 문장 배열

```js
const readingQuotes = [ ... ];
```

문장 뽑기 버튼을 눌렀을 때 보여줄 독서 문장 배열이다.

### 기본 책 데이터

```js
const seedBooks = [ ... ];
```

처음 페이지를 열었을 때 기본으로 보여줄 책 데이터이다.

```js
id: makeId()
```

각 책을 구분하기 위한 고유 ID를 만든다.

```js
title, author, status, rating, pages, finishedDate, memo, createdAt
```

책 제목, 저자, 상태, 평점, 페이지 수, 완독일, 메모, 생성 날짜를 저장한다.

### HTML 요소 찾기

```js
const refs = { ... };
```

자주 사용하는 HTML 요소들을 `document.querySelector()`로 찾아 한 곳에 모아둔 객체이다.

```js
menuToggle: document.querySelector("#menuToggle")
```

모바일 메뉴 버튼을 찾는다.

```js
bookList: document.querySelector("#bookList")
```

책 카드가 들어갈 영역을 찾는다.

```js
searchInput, sortSelect, tabButtons
```

검색 입력칸, 정렬 선택 상자, 필터 버튼들을 찾는다.

```js
totalBooks, finishedBooks, monthGoalText
```

상단 통계 값이 들어갈 요소들을 찾는다.

```js
statusCanvas
```

그래프를 그릴 캔버스 요소를 찾는다.

### 전역 상태 변수

```js
let books = loadBooks();
```

저장된 책 목록을 불러와 `books` 배열에 넣는다.

```js
let activeFilter = "all";
```

현재 선택된 필터이다. 처음에는 전체 보기이다.

```js
let monthlyGoal = Number(localStorage.getItem(...)) || 4;
```

저장된 월간 목표를 불러온다. 없으면 기본값 4를 사용한다.

```js
let ownerName = localStorage.getItem(...) || "";
```

저장된 기록 이름을 불러온다.

### 초기 실행

```js
refs.goalInput.value = monthlyGoal;
refs.ownerName.value = ownerName;
```

저장된 목표와 이름을 입력칸에 표시한다.

```js
loadRoutineState();
render();
updateClock();
setInterval(updateClock, 1000);
```

체크박스 상태를 불러오고, 화면을 그리고, 현재 시간을 표시한 뒤 1초마다 시간을 갱신한다.

### 메뉴 이벤트

```js
refs.menuToggle.addEventListener("click", ...)
```

모바일 메뉴 버튼을 클릭했을 때 메뉴를 열고 닫는다.

```js
classList.toggle("show")
```

메뉴 목록에 `show` 클래스를 붙이거나 제거한다.

```js
setAttribute("aria-expanded", ...)
```

접근성 정보를 현재 열림 상태에 맞게 바꾼다.

### 책 추가 이벤트

```js
refs.form.addEventListener("submit", ...)
```

책 입력 폼이 제출되었을 때 실행된다.

```js
event.preventDefault();
```

폼 제출 시 페이지가 새로고침되는 기본 동작을 막는다.

```js
const formData = new FormData(refs.form);
```

폼 안의 입력값들을 쉽게 가져오기 위한 객체를 만든다.

```js
const book = { ... };
```

입력값을 이용해 새 책 객체를 만든다.

```js
books.unshift(book);
```

새 책을 배열 맨 앞에 추가한다.

```js
saveBooks();
render();
```

저장소에 저장하고 화면을 다시 그린다.

### 검색, 정렬, 필터

```js
refs.searchInput.addEventListener("input", renderBookList);
```

검색어가 바뀔 때마다 책 목록을 다시 그린다.

```js
refs.sortSelect.addEventListener("change", renderBookList);
```

정렬 기준이 바뀔 때마다 목록을 다시 그린다.

```js
refs.tabButtons.forEach(...)
```

각 필터 버튼마다 클릭 이벤트를 붙인다.

```js
activeFilter = button.dataset.filter;
```

클릭한 버튼의 `data-filter` 값을 현재 필터로 저장한다.

### 책 카드 버튼 이벤트

```js
refs.bookList.addEventListener("click", ...)
```

책 목록 전체에 클릭 이벤트를 걸어 둔다. 동적으로 생성된 버튼도 처리할 수 있다.

```js
event.target.closest("button[data-action]")
```

클릭한 요소 주변에서 `data-action`이 있는 버튼을 찾는다.

```js
if (action === "finish")
```

완독 처리 버튼을 눌렀을 때 상태를 바꾼다.

```js
if (action === "delete")
```

삭제 버튼을 눌렀을 때 `confirm()`으로 확인하고 삭제한다.

### 목표 저장

```js
refs.saveGoalBtn.addEventListener("click", ...)
```

목표 저장 버튼을 눌렀을 때 실행된다.

```js
localStorage.setItem(...)
```

목표와 기록 이름을 브라우저 저장소에 저장한다.

### 로그인 처리

```js
function loginSubmit(event) { ... }
```

로그인 폼 제출을 처리하는 함수이다.

```js
event.preventDefault();
```

로그인 폼 제출로 페이지가 새로고침되지 않게 한다.

```js
if (!userId || !userPassword)
```

아이디나 비밀번호가 비어 있는지 검사한다.

```js
refs.loginMessage.textContent = ...
```

로그인 결과 메시지를 화면에 표시한다.

### 화면 그리기 함수

```js
function render() { ... }
```

화면 전체를 다시 갱신하는 중심 함수이다.

```js
renderTitle();
renderStats();
renderBookList();
renderRecentTable();
drawStatusChart();
renderRoutineMinutes();
```

제목, 통계, 책 목록, 표, 캔버스 그래프, 루틴 시간을 각각 다시 계산하고 표시한다.

### 통계 계산

```js
const finished = books.filter(...)
```

완독한 책만 골라낸다.

```js
const pages = finished.reduce(...)
```

완독한 책들의 페이지 수를 모두 더한다.

```js
const average = ...
```

평점이 있는 책들의 평균 평점을 계산한다.

```js
refs.goalBar.style.width = `${goalRate}%`;
```

목표 달성률만큼 막대 너비를 바꾼다.

### 책 목록 출력

```js
function renderBookList() { ... }
```

검색어, 필터, 정렬 기준에 맞게 책 목록을 화면에 출력한다.

```js
const visibleBooks = sortedBooks.filter(...)
```

현재 조건에 맞는 책만 골라낸다.

```js
refs.bookList.innerHTML = visibleBooks.map(createBookCard).join("");
```

책 객체들을 HTML 카드 문자열로 바꿔 화면에 넣는다.

### 책 카드 생성

```js
function createBookCard(book) { ... }
```

책 하나를 카드 형태 HTML로 만드는 함수이다.

```js
escapeHtml(book.title)
```

사용자가 입력한 제목에 HTML 태그가 섞여 있어도 안전하게 표시한다.

```js
onmouseover="cardMouseOver(this)"
onmouseout="cardMouseOut(this)"
```

책 카드에 마우스를 올리거나 벗어날 때 색이 바뀌게 한다.

### 최근 기록 표

```js
function renderRecentTable() { ... }
```

최근 5개의 책을 표 형식으로 보여준다.

```js
books.slice(0, 5)
```

배열 앞에서 5개만 가져온다.

### 캔버스 그래프

```js
function drawStatusChart() { ... }
```

책 상태별 개수를 캔버스에 막대그래프로 그린다.

```js
const context = canvas.getContext("2d");
```

2D 그래픽을 그릴 도구를 가져온다.

```js
context.fillRect(...)
context.fillText(...)
```

사각형 막대와 글자를 캔버스에 그린다.

### 시간 표시

```js
function updateClock() { ... }
```

현재 시간과 날짜를 화면에 표시한다.

```js
new Date()
```

현재 날짜와 시간을 가져온다.

```js
toLocaleTimeString("ko-KR")
```

한국어 형식의 시간 문자열로 바꾼다.

### 체크박스 루틴

```js
function loadRoutineState()
```

저장된 체크박스 상태를 불러온다.

```js
function saveRoutineState()
```

현재 체크박스 상태를 저장한다.

```js
function renderRoutineMinutes()
```

체크된 항목의 `value`를 더해서 완료한 독서 시간을 계산한다.

### 정렬 함수

```js
function sortBooks(a, b)
```

정렬 기준에 따라 책 배열을 정렬한다.

```js
rating
title
recent
```

평점순, 제목순, 최근 기록순을 처리한다.

### 이벤트 설명 함수

```js
function showEventMessage(message)
```

이벤트 발생 내용을 화면의 안내 박스에 출력한다.

```js
function focusField(element, message)
```

`onfocus` 이벤트가 발생했을 때 입력 요소에 강조 클래스를 붙인다.

```js
function blurField(element, message)
```

`onblur` 이벤트가 발생했을 때 강조 클래스를 제거한다.

```js
function buttonHover(element)
function buttonOut(element)
```

마우스를 버튼 위에 올리거나 벗어날 때 버튼 색을 바꾼다.

```js
function cardMouseOver(element)
function cardMouseOut(element)
```

책 카드에 마우스를 올리거나 벗어날 때 카드 스타일을 바꾼다.

### 보조 함수

```js
function cleanText(value)
```

문자열 앞뒤 공백을 제거한다.

```js
function makeId()
```

책마다 고유한 ID를 만든다.

```js
function escapeHtml(value)
```

사용자가 입력한 값이 HTML로 실행되지 않고 글자로만 보이게 바꾼다.

```js
function todayString()
```

오늘 날짜를 `YYYY-MM-DD` 형식으로 만든다.

```js
function formatDate(dateString)
```

날짜를 한국어 형식으로 보기 좋게 바꾼다.

---

## 전체 정리

이 프로젝트는 다음 웹프로그래밍 개념을 사용한다.

- HTML 기본 구조
- `form`, `input`, `select`, `textarea`
- `a href` 내부 이동과 외부 링크
- `table`
- `dialog`
- `canvas`
- CSS 변수
- flex 레이아웃
- grid 레이아웃
- hover 효과
- focus 효과
- media query 반응형 디자인
- JavaScript DOM 조작
- `onclick`, `onfocus`, `onblur`, `onmouseover`, `onmouseout`, `onchange`, `onkeyup`, `onsubmit`, `onload`
- 배열 `map`, `filter`, `reduce`, `sort`
- 객체
- 함수
- `localStorage`
- `setInterval`
- `Date`
- `alert`, `confirm`

