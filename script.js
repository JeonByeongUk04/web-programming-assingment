const storageKeys = {
  books: "reading-log-books",
  goal: "reading-log-goal",
  owner: "reading-log-owner",
  routine: "reading-log-routine"
};

const statusLabels = {
  reading: "읽는 중",
  finished: "완독",
  wishlist: "읽고 싶음"
};

const readingQuotes = [
  "한 페이지씩 읽으면 오늘의 생각도 조금씩 정리된다.",
  "좋은 문장은 다시 읽을 때 더 오래 남는다.",
  "책을 읽는 시간은 나의 속도를 되찾는 시간이다.",
  "메모가 쌓이면 독서가 나만의 기록이 된다.",
  "완독보다 중요한 것은 읽으며 무엇을 발견했는지이다."
];

const seedBooks = [
  {
    id: makeId(),
    title: "데미안",
    author: "헤르만 헤세",
    status: "finished",
    rating: 5,
    pages: 240,
    finishedDate: "2026-06-02",
    memo: "스스로의 방향을 찾아가는 문장이 오래 남았다.",
    createdAt: "2026-06-02T09:00:00.000Z"
  },
  {
    id: makeId(),
    title: "불편한 편의점",
    author: "김호연",
    status: "reading",
    rating: 4,
    pages: 268,
    finishedDate: "",
    memo: "사람들이 서로를 조금씩 회복시키는 장면을 기록해 두기.",
    createdAt: "2026-06-06T13:20:00.000Z"
  },
  {
    id: makeId(),
    title: "아몬드",
    author: "손원평",
    status: "wishlist",
    rating: 0,
    pages: 264,
    finishedDate: "",
    memo: "다음 주말에 읽기 시작할 책.",
    createdAt: "2026-06-08T16:40:00.000Z"
  }
];

const refs = {
  menuToggle: document.querySelector("#menuToggle"),
  navLinks: document.querySelector("#navLinks"),
  eventMessage: document.querySelector("#eventMessage"),
  formPreview: document.querySelector("#formPreview"),
  form: document.querySelector("#bookForm"),
  bookList: document.querySelector("#bookList"),
  searchInput: document.querySelector("#searchInput"),
  sortSelect: document.querySelector("#sortSelect"),
  tabButtons: document.querySelectorAll(".tab-btn"),
  totalBooks: document.querySelector("#totalBooks"),
  finishedBooks: document.querySelector("#finishedBooks"),
  monthGoalText: document.querySelector("#monthGoalText"),
  readingBooks: document.querySelector("#readingBooks"),
  wishlistBooks: document.querySelector("#wishlistBooks"),
  totalPages: document.querySelector("#totalPages"),
  averageRating: document.querySelector("#averageRating"),
  ownerName: document.querySelector("#ownerName"),
  heroTitle: document.querySelector("#heroTitle"),
  goalInput: document.querySelector("#goalInput"),
  saveGoalBtn: document.querySelector("#saveGoalBtn"),
  goalBar: document.querySelector("#goalBar"),
  goalCopy: document.querySelector("#goalCopy"),
  liveClock: document.querySelector("#liveClock"),
  todayLabel: document.querySelector("#todayLabel"),
  quoteBox: document.querySelector("#quoteBox"),
  randomQuoteBtn: document.querySelector("#randomQuoteBtn"),
  pagePlanForm: document.querySelector("#pagePlanForm"),
  planPages: document.querySelector("#planPages"),
  planPace: document.querySelector("#planPace"),
  planResult: document.querySelector("#planResult"),
  routineChecks: document.querySelectorAll("#routineList input[type='checkbox']"),
  routineResult: document.querySelector("#routineResult"),
  routineResetBtn: document.querySelector("#routineResetBtn"),
  statusCanvas: document.querySelector("#statusCanvas"),
  sampleTableBody: document.querySelector("#sampleTableBody"),
  openTipDialog: document.querySelector("#openTipDialog"),
  closeTipDialog: document.querySelector("#closeTipDialog"),
  tipDialog: document.querySelector("#tipDialog")
};

let books = loadBooks();
let activeFilter = "all";
let monthlyGoal = Number(localStorage.getItem(storageKeys.goal)) || 4;
let ownerName = localStorage.getItem(storageKeys.owner) || "";

refs.goalInput.value = monthlyGoal;
refs.ownerName.value = ownerName;

loadRoutineState();
render();
updateClock();
setInterval(updateClock, 1000);

refs.menuToggle.addEventListener("click", () => {
  const isOpen = refs.navLinks.classList.toggle("show");
  refs.menuToggle.classList.toggle("open", isOpen);
  refs.menuToggle.setAttribute("aria-expanded", String(isOpen));
});

refs.navLinks.addEventListener("click", (event) => {
  if (event.target.tagName !== "A") {
    return;
  }

  refs.navLinks.classList.remove("show");
  refs.menuToggle.classList.remove("open");
  refs.menuToggle.setAttribute("aria-expanded", "false");
});

refs.form.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(refs.form);
  const status = formData.get("status");
  const finishedDate = formData.get("finishedDate");

  const book = {
    id: makeId(),
    title: cleanText(formData.get("title")),
    author: cleanText(formData.get("author")),
    status,
    rating: Number(formData.get("rating")),
    pages: Number(formData.get("pages")) || 0,
    finishedDate: status === "finished" ? finishedDate || todayString() : "",
    memo: cleanText(formData.get("memo")),
    createdAt: new Date().toISOString()
  };

  books.unshift(book);
  saveBooks();
  refs.form.reset();
  document.querySelector("#bookStatus").value = "reading";
  document.querySelector("#bookRating").value = "0";
  alert("새 독서기록이 추가되었습니다.");
  render();
});

refs.searchInput.addEventListener("input", renderBookList);
refs.sortSelect.addEventListener("change", renderBookList);

refs.tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    refs.tabButtons.forEach((tab) => tab.classList.toggle("active", tab === button));
    renderBookList();
  });
});

refs.bookList.addEventListener("click", (event) => {
  const actionButton = event.target.closest("button[data-action]");

  if (!actionButton) {
    return;
  }

  const id = actionButton.dataset.id;
  const action = actionButton.dataset.action;

  if (action === "finish") {
    books = books.map((book) => {
      if (book.id !== id) {
        return book;
      }

      return {
        ...book,
        status: book.status === "finished" ? "reading" : "finished",
        finishedDate: book.status === "finished" ? "" : todayString()
      };
    });
  }

  if (action === "delete") {
    const targetBook = books.find((book) => book.id === id);
    const ok = confirm(`"${targetBook ? targetBook.title : "선택한 기록"}"을 삭제할까요?`);

    if (!ok) {
      return;
    }

    books = books.filter((book) => book.id !== id);
    alert("기록이 삭제되었습니다.");
  }

  saveBooks();
  render();
});

refs.saveGoalBtn.addEventListener("click", () => {
  monthlyGoal = Math.max(1, Number(refs.goalInput.value) || 1);
  ownerName = cleanText(refs.ownerName.value);

  localStorage.setItem(storageKeys.goal, String(monthlyGoal));
  localStorage.setItem(storageKeys.owner, ownerName);
  render();
});

refs.ownerName.addEventListener("change", () => {
  ownerName = cleanText(refs.ownerName.value);
  localStorage.setItem(storageKeys.owner, ownerName);
  renderTitle();
});

refs.randomQuoteBtn.addEventListener("click", () => {
  const index = Math.floor(Math.random() * readingQuotes.length);
  refs.quoteBox.textContent = readingQuotes[index];
});

refs.pagePlanForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const pages = Number(refs.planPages.value);
  const pace = Number(refs.planPace.value);

  if (!pages || !pace) {
    refs.planResult.textContent = "두 값을 모두 1 이상으로 입력하세요.";
    return;
  }

  const days = Math.ceil(pages / pace);
  const finishDate = new Date();
  finishDate.setDate(finishDate.getDate() + days);
  refs.planResult.textContent = `${days}일 뒤, ${formatDate(finishDate.toISOString())}에 완독할 수 있습니다.`;
});

refs.routineChecks.forEach((checkbox, index) => {
  checkbox.dataset.index = String(index);
  checkbox.addEventListener("change", () => {
    saveRoutineState();
    renderRoutineMinutes();
  });
});

refs.routineResetBtn.addEventListener("click", () => {
  refs.routineChecks.forEach((checkbox) => {
    checkbox.checked = false;
  });
  saveRoutineState();
  renderRoutineMinutes();
});

refs.openTipDialog.addEventListener("click", () => {
  if (typeof refs.tipDialog.showModal === "function") {
    refs.tipDialog.showModal();
  } else {
    alert("완독한 날짜와 한 줄 메모를 같이 남기면 나중에 책을 다시 찾기 쉽습니다.");
  }
});

refs.closeTipDialog.addEventListener("click", () => {
  refs.tipDialog.close();
});

window.addEventListener("resize", drawStatusChart);

function loadBooks() {
  const saved = localStorage.getItem(storageKeys.books);

  if (!saved) {
    return seedBooks;
  }

  try {
    const parsed = JSON.parse(saved);
    return Array.isArray(parsed) ? parsed : seedBooks;
  } catch {
    return seedBooks;
  }
}

function saveBooks() {
  localStorage.setItem(storageKeys.books, JSON.stringify(books));
}

function render() {
  renderTitle();
  renderStats();
  renderBookList();
  renderRecentTable();
  drawStatusChart();
  renderRoutineMinutes();
}

function renderTitle() {
  refs.heroTitle.textContent = ownerName ? ownerName : "나의 독서기록";
}

function renderStats() {
  const finished = books.filter((book) => book.status === "finished");
  const reading = books.filter((book) => book.status === "reading");
  const wishlist = books.filter((book) => book.status === "wishlist");
  const finishedThisMonth = finished.filter(isFinishedThisMonth);
  const pages = finished.reduce((sum, book) => sum + Number(book.pages || 0), 0);
  const ratedBooks = books.filter((book) => Number(book.rating) > 0);
  const average = ratedBooks.length
    ? ratedBooks.reduce((sum, book) => sum + Number(book.rating), 0) / ratedBooks.length
    : 0;
  const goalRate = monthlyGoal ? Math.min(100, Math.round((finishedThisMonth.length / monthlyGoal) * 100)) : 0;

  refs.totalBooks.textContent = `${books.length}권`;
  refs.finishedBooks.textContent = `${finished.length}권`;
  refs.monthGoalText.textContent = `${finishedThisMonth.length} / ${monthlyGoal}권`;
  refs.readingBooks.textContent = `${reading.length}권`;
  refs.wishlistBooks.textContent = `${wishlist.length}권`;
  refs.totalPages.textContent = `${pages.toLocaleString("ko-KR")}쪽`;
  refs.averageRating.textContent = `${average.toFixed(1)}점`;
  refs.goalBar.style.width = `${goalRate}%`;
  refs.goalCopy.textContent = `이번 달 ${finishedThisMonth.length}권을 완독했습니다. 목표까지 ${Math.max(monthlyGoal - finishedThisMonth.length, 0)}권 남았습니다.`;
}

function renderBookList() {
  const keyword = refs.searchInput.value.trim().toLowerCase();
  const sortedBooks = [...books].sort(sortBooks);
  const visibleBooks = sortedBooks.filter((book) => {
    const matchesFilter = activeFilter === "all" || book.status === activeFilter;
    const matchesKeyword = `${book.title} ${book.author}`.toLowerCase().includes(keyword);
    return matchesFilter && matchesKeyword;
  });

  if (!visibleBooks.length) {
    refs.bookList.innerHTML = `
      <div class="empty-state">
        조건에 맞는 기록이 없습니다. 새 책을 추가하거나 검색어를 바꿔보세요.
      </div>
    `;
    return;
  }

  refs.bookList.innerHTML = visibleBooks.map(createBookCard).join("");
}

function createBookCard(book) {
  const safeMemo = book.memo ? escapeHtml(book.memo) : "아직 남긴 메모가 없습니다.";
  const ratingText = Number(book.rating) > 0 ? "★".repeat(Number(book.rating)) : "평점 미정";
  const finishedText = book.finishedDate ? `완독일 ${formatDate(book.finishedDate)}` : "완독일 미정";
  const pagesText = Number(book.pages) > 0 ? `${Number(book.pages).toLocaleString("ko-KR")}쪽` : "페이지 미정";
  const actionLabel = book.status === "finished" ? "읽는 중으로" : "완독 처리";

  return `
    <article class="book-card" tabindex="0"
      onmouseover="cardMouseOver(this)"
      onmouseout="cardMouseOut(this)"
      onfocus="cardMouseOver(this)"
      onblur="cardMouseOut(this)">
      <div>
        <div class="book-title-row">
          <h3>${escapeHtml(book.title)}</h3>
          <span class="status-badge ${book.status}">${statusLabels[book.status]}</span>
        </div>
        <p class="book-meta">
          <span>${escapeHtml(book.author)}</span>
          <span>${ratingText}</span>
          <span>${pagesText}</span>
          <span>${finishedText}</span>
        </p>
        <p class="book-memo">${safeMemo}</p>
      </div>
      <div class="book-actions">
        <button class="ghost-btn" type="button" data-action="finish" data-id="${book.id}">${actionLabel}</button>
        <button class="danger-btn" type="button" data-action="delete" data-id="${book.id}">삭제</button>
      </div>
    </article>
  `;
}

// 입력, 마우스, 클릭 이벤트를 설명하기 쉽게 분리한 교재식 이벤트 함수들입니다.
function showEventMessage(message) {
  if (!refs.eventMessage) {
    return;
  }

  refs.eventMessage.textContent = message;
}

function focusField(element, message) {
  element.classList.add("focus-field");
  showEventMessage(message);
}

function blurField(element, message) {
  element.classList.remove("focus-field");
  element.classList.toggle("empty-field", element.hasAttribute("required") && !element.value.trim());
  showEventMessage(message);
}

function previewTitle(value) {
  const title = cleanText(value);
  refs.formPreview.textContent = title
    ? `미리보기: "${title}"을(를) 독서기록에 추가하는 중입니다.`
    : "입력 중인 책 제목이 여기에 표시됩니다.";
}

function statusChanged(value) {
  const label = statusLabels[value] || value;
  showEventMessage(`onchange: 책 상태가 "${label}"(으)로 변경되었습니다.`);
}

function navHover(element) {
  element.classList.add("js-hover");
  showEventMessage("onmouseover: 메뉴 위에 마우스를 올려 색상을 바꿨습니다.");
}

function navOut(element) {
  element.classList.remove("js-hover");
  showEventMessage("onmouseout: 메뉴에서 마우스가 벗어나 원래 색상으로 돌아갑니다.");
}

function buttonHover(element) {
  element.classList.add("button-hover");
  showEventMessage("onmouseover: 버튼 배경색이 바뀌었습니다.");
}

function buttonOut(element) {
  element.classList.remove("button-hover");
  showEventMessage("onmouseout: 버튼 배경색을 원래대로 돌렸습니다.");
}

function cardMouseOver(element) {
  element.classList.add("event-hover");
  showEventMessage("onmouseover/onfocus: 책 카드의 테두리와 배경색을 변경했습니다.");
}

function cardMouseOut(element) {
  element.classList.remove("event-hover");
  showEventMessage("onmouseout/onblur: 책 카드의 스타일을 원래대로 돌렸습니다.");
}

function renderRecentTable() {
  const rows = books.slice(0, 5).map((book, index) => {
    const rating = Number(book.rating) > 0 ? `${book.rating}점` : "미정";

    return `
      <tr>
        <td>${index + 1}</td>
        <td>${escapeHtml(book.title)}</td>
        <td>${escapeHtml(book.author)}</td>
        <td>${statusLabels[book.status]}</td>
        <td>${rating}</td>
      </tr>
    `;
  });

  refs.sampleTableBody.innerHTML = rows.join("");
}

function drawStatusChart() {
  const canvas = refs.statusCanvas;
  const context = canvas.getContext("2d");
  const data = [
    { label: "읽는 중", value: books.filter((book) => book.status === "reading").length, color: "#2f6f5e" },
    { label: "완독", value: books.filter((book) => book.status === "finished").length, color: "#d8644a" },
    { label: "읽고 싶음", value: books.filter((book) => book.status === "wishlist").length, color: "#2d5574" }
  ];
  const maxValue = Math.max(...data.map((item) => item.value), 1);

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = "#fffdf8";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = "#ddd6c9";
  context.lineWidth = 2;
  context.strokeRect(1, 1, canvas.width - 2, canvas.height - 2);

  data.forEach((item, index) => {
    const barHeight = 32;
    const x = 118;
    const y = 48 + index * 58;
    const barWidth = Math.round((canvas.width - 170) * (item.value / maxValue));

    context.fillStyle = "#1f2a2e";
    context.font = "16px Arial";
    context.fillText(item.label, 24, y + 22);

    context.fillStyle = "#ece4d7";
    context.fillRect(x, y, canvas.width - 160, barHeight);

    context.fillStyle = item.color;
    context.fillRect(x, y, barWidth, barHeight);

    context.fillStyle = "#1f2a2e";
    context.font = "bold 15px Arial";
    context.fillText(`${item.value}권`, x + barWidth + 10, y + 22);
  });
}

function updateClock() {
  const now = new Date();

  refs.liveClock.textContent = now.toLocaleTimeString("ko-KR");
  refs.todayLabel.textContent = now.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long"
  });
}

function loadRoutineState() {
  const saved = JSON.parse(localStorage.getItem(storageKeys.routine) || "[]");

  refs.routineChecks.forEach((checkbox, index) => {
    checkbox.checked = saved.includes(index);
  });
}

function saveRoutineState() {
  const checkedIndexes = [...refs.routineChecks]
    .filter((checkbox) => checkbox.checked)
    .map((checkbox) => Number(checkbox.dataset.index));

  localStorage.setItem(storageKeys.routine, JSON.stringify(checkedIndexes));
}

function renderRoutineMinutes() {
  const totalMinutes = [...refs.routineChecks].reduce((sum, checkbox) => {
    return checkbox.checked ? sum + Number(checkbox.value) : sum;
  }, 0);

  refs.routineResult.textContent = `완료한 루틴: ${totalMinutes}분`;
}

function sortBooks(a, b) {
  const sortMode = refs.sortSelect.value;

  if (sortMode === "rating") {
    return Number(b.rating) - Number(a.rating);
  }

  if (sortMode === "title") {
    return a.title.localeCompare(b.title, "ko-KR");
  }

  return new Date(b.createdAt) - new Date(a.createdAt);
}

function isFinishedThisMonth(book) {
  if (!book.finishedDate) {
    return false;
  }

  const finishedDate = new Date(book.finishedDate);
  const now = new Date();
  return finishedDate.getFullYear() === now.getFullYear()
    && finishedDate.getMonth() === now.getMonth();
}

function cleanText(value) {
  return String(value || "").trim();
}

function makeId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return cleanText(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function formatDate(dateString) {
  return new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "short",
    day: "numeric"
  }).format(new Date(dateString));
}
