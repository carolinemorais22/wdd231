const rotuloAno = document.getElementById("ano-atual");
const rotuloModificacao = document.getElementById("ultima-modificacao");

if (rotuloAno) rotuloAno.textContent = new Date().getFullYear();
if (rotuloModificacao) rotuloModificacao.textContent = `Última modificação: ${document.lastModified}`;