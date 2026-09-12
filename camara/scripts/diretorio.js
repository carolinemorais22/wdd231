document.addEventListener("DOMContentLoaded", () => {
  // --------------------------------------------
  //Menu Hambúrguer & Submenu
  // --------------------------------------------

  const botaoMenu = document.getElementById("botao-menu");
  const navegacao = document.getElementById("navegacao-principal");
  const botaoDropdown = document.querySelector(".botao-dropdown");
  const itemDropdown = document.querySelector(".item-dropdown");

  botaoMenu.addEventListener("click", () => {
    navegacao.classList.toggle("aberto");
    botaoMenu.classList.toggle("aberto");
  });

  if (botaoDropdown) {
    botaoDropdown.addEventListener("click", (e) => {
      e.stopPropagation();
      itemDropdown.classList.toggle("ativo");
    });
  }

  // -----------------------------------------------------
  // Modo Escuro / Claro
  // -----------------------------------------------------

  const botaoTema = document.getElementById("botao-tema");

  botaoTema.addEventListener("click", () => {
    document.body.classList.toggle("modo-escuro");
    if (document.body.classList.contains("modo-escuro")) {
      botaoTema.textContent = "☀️";
    } else {
      botaoTema.textContent = "🌙";
    }
  });

  // -----------------------------------------------------
  // Fetch (Async/Await)
  // -----------------------------------------------------

  const containerMembros = document.getElementById("container-membros");

  async function obterDadosMembros() {
    try {
      const resposta = await fetch("scripts/membros.json");
      if (!resposta.ok) {
        throw new Error(`Erro ao carregar JSON: ${resposta.status}`);
      }
      const membros = await resposta.json();
      exibirMembros(membros);
    } catch (erro) {
      console.error("Erro ao buscar dados dos membros:", erro);
      containerMembros.innerHTML = "<p>Não foi possível carregar o diretório de membros no momento.</p>";
    }
  }

  function obterTextoNivel(nivel) {
    switch (nivel) {
      case 3: return "Membro Ouro";
      case 2: return "Membro Prata";
      default: return "Membro";
    }
  }

  function exibirMembros(membros) {
    containerMembros.innerHTML = "";

    membros.forEach((membro) => {
      const cartao = document.createElement("section");
      cartao.className = "cartao-membro";

      cartao.innerHTML = `
        <img src="imagens/${membro.imagem}" alt="Logotipo da empresa ${membro.nome}" loading="lazy" width="110" height="110">
        <div>
          <h2>${membro.nome}</h2>
          <p>${membro.endereco}</p>
          <p>${membro.telefone}</p>
          <a href="${membro.site}" target="_blank" rel="noopener noreferrer">${membro.site}</a>
        </div>
        <span class="selo-nivel nivel-${membro.nivelAssociacao}">${obterTextoNivel(membro.nivelAssociacao)}</span>
      `;

      containerMembros.appendChild(cartao);
    });
  }

  // -----------------------------------------------
  // Alternância de Visualização (Cartão e Lista)
  // -----------------------------------------------

  const botaoGrade = document.getElementById("botao-grade");
  const botaoLista = document.getElementById("botao-lista");

  botaoGrade.addEventListener("click", () => {
    containerMembros.classList.add("exibicao-grade");
    containerMembros.classList.remove("exibicao-lista");
    botaoGrade.classList.add("ativo");
    botaoLista.classList.remove("ativo");
  });

  botaoLista.addEventListener("click", () => {
    containerMembros.classList.add("exibicao-lista");
    containerMembros.classList.remove("exibicao-grade");
    botaoLista.classList.add("ativo");
    botaoGrade.classList.remove("ativo");
  });

  // --------------------------------
  // Rodapé
  // --------------------------------
  
  const elementoAno = document.getElementById("ano-atual");
  const elementoModificacao = document.getElementById("ultima-modificacao");

  if (elementoAno) {
    elementoAno.textContent = new Date().getFullYear();
  }

  if (elementoModificacao) {
    elementoModificacao.textContent = `Última modificação: ${document.lastModified}`;
  }

  // Inicia a busca dos dados
  obterDadosMembros();
});