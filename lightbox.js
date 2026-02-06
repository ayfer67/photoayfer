// Pega todos os itens da galeria (na ordem do HTML)
const items = Array.from(document.querySelectorAll(".galeria a.item"));

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.querySelector(".lightbox-img");

const closeBtn = document.querySelector(".lightbox-close");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");

let currentIndex = 0;

// 1) Marca automaticamente horizontais vs verticais (sem mexer nas verticais)
items.forEach((a) => {
  const img = a.querySelector("img");
  if (!img) return;

  const applyOrientation = () => {
    // naturalWidth/Height só existe quando a imagem carregou
    if (img.naturalWidth && img.naturalHeight) {
      if (img.naturalWidth > img.naturalHeight) a.classList.add("landscape");
    }
  };

  if (img.complete) applyOrientation();
  else img.addEventListener("load", applyOrientation, { once: true });
});

// 2) Abrir lightbox com índice correto
items.forEach((a, index) => {
  a.dataset.index = String(index);
  a.addEventListener("click", (e) => {
    e.preventDefault();
    currentIndex = index;
    showImage();
    lightbox.classList.add("active");
  });
});

// Mostrar imagem atual
function showImage() {
  const href = items[currentIndex]?.getAttribute("href");
  if (!href) return;
  lightboxImg.src = href;
}

// Fechar
function closeLightbox() {
  lightbox.classList.remove("active");
}

closeBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  closeLightbox();
});

// Próxima
nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex + 1) % items.length;
  showImage();
});

// Anterior
prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();
  currentIndex = (currentIndex - 1 + items.length) % items.length;
  showImage();
});

// Fechar clicando fora (backdrop)
lightbox.addEventListener("click", (e) => {
  // se clicar no fundo (não na imagem/botões), fecha
  if (e.target === lightbox) closeLightbox();
});

// Teclado (melhora navegação e evita “travadas”)
document.addEventListener("keydown", (e) => {
  if (!lightbox.classList.contains("active")) return;

  if (e.key === "Escape") closeLightbox();
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % items.length;
    showImage();
  }
  if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    showImage();
  }
});
