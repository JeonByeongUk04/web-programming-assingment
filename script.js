const storageKeys = {
  books: "reading-log-books",
  goal: "reading-log-goal",
  owner: "reading-log-owner"
};

const statusLabels = {
  reading: "읽는 중",
  finished: "완독",
  wishlist: "읽고 싶음"
};

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
  goalCopy: document.querySelector("#goalCopy")
};

let books = loadBooks();
let activeFilter = "all";
let monthlyGoal = Number(localStorage.getItem(storageKeys.goal)) || 4;
let ownerName = localStorage.getItem(storageKeys.owner) || "";

refs.goalInput.value = monthlyGoal;
refs.ownerName.value = ownerName;

render();

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
    books = books.filter((book) => book.id !== id);
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
    <article class="book-card">
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
