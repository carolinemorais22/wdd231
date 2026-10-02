import { lugares } from '../scripts/lugares.mjs';

document.addEventListener('DOMContentLoaded', () => {
  renderVisitsMessage();
  renderCards(lugares);
});

function renderVisitsMessage() {
  const visitContainer = document.getElementById('visit-message');
  if (!visitContainer) return;

  const msPerDay = 86400000;
  const lastVisit = localStorage.getItem('lastVisitDate');
  const now = Date.now();

  if (!lastVisit) {
    visitContainer.textContent = "Boas-vindas! Entre em contato conosco caso tenha alguma dúvida.";
  } else {
    const timeDifference = now - parseInt(lastVisit, 10);
    const daysDifference = Math.floor(timeDifference / msPerDay);

    if (daysDifference < 1) {
      visitContainer.textContent = "Que bom que está de volta!";
    } else if (daysDifference === 1) {
      visitContainer.textContent = "Seu último acesso foi há 1 dia.";
    } else {
      visitContainer.textContent = `Seu último acesso foi há ${daysDifference} dias.`;
    }
  }

  localStorage.setItem('lastVisitDate', now.toString());
}

function renderCards(data) {
  const gridContainer = document.getElementById('gallery-grid');
  if (!gridContainer) return;

  gridContainer.innerHTML = data.map((item, index) => {
    const isFirst = index === 0;
    const loadingAttr = isFirst ? '' : 'loading="lazy"';
    const priorityAttr = isFirst ? 'fetchpriority="high"' : '';

    return `
      <article class="card-item area-${item.id}">
        <h2>${item.titulo}</h2>
        <figure>
          <img 
            src="${item.imagem}" 
            alt="${item.titulo}" 
            width="300" 
            height="200" 
            ${loadingAttr} 
            ${priorityAttr}
          >
        </figure>
        <address>${item.endereco}</address>
        <p>${item.descricao}</p>
        <button type="button" class="btn-more">Saiba mais</button>
      </article>
    `;
  }).join('');
}

const rotuloAno = document.getElementById("ano-atual");
  const rotuloModificacao = document.getElementById("ultima-modificacao");

  if (rotuloAno) rotuloAno.textContent = new Date().getFullYear();
  if (rotuloModificacao) rotuloModificacao.textContent = `Última modificação: ${document.lastModified}`;


  const botaoMenu = document.getElementById("botao-menu");
  const navegacao = document.getElementById("navegacao-principal");
  const botaoDropdown = document.querySelector(".botao-dropdown");
  const itemDropdown = document.querySelector(".item-dropdown");

  botaoMenu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");
    botaoMenu.classList.toggle("aberto");
  });
