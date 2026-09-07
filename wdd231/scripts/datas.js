const anoatual = new Date().getFullYear();
document.getElementById("anoatual").textContent = anoatual;

const ultimaModificacao = new Date().toLocaleString('pt-BR');
document.getElementById("ultimaModificacao").textContent = ultimaModificacao;