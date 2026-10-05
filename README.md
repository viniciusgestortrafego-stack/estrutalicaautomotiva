# Estrutálica Automotiva

Landing page estática. Os arquivos na raiz estão prontos para hospedagem, incluindo fontes e imagens locais. Abra `index.html` para visualizar a página. Não é necessário instalar dependências ou executar uma compilação.

## Conversão
Todos os CTAs usam o endereço de WhatsApp solicitado. O formulário valida nome, empresa, telefone, e-mail e solução; prepara um resumo e tenta copiá-lo para a área de transferência. O visitante deve colar e enviar o resumo no WhatsApp. Se a cópia não estiver disponível, o resumo permanece selecionável na página. O cadastro também é gravado na planilha de leads (veja abaixo).

## Conteúdo e imagens
Copy baseada na versão final da conversa “estrutalica automotiva”. Logo fornecida pelo cliente. Fotos de racks e carrinhos provenientes do site oficial da Estrutálica, preservadas como exemplos reais de portfólio. Não foram adicionados números de desempenho, certificações ou depoimentos.

## Revisão
Validação de layout em 320, 390, 768 e 1440 pixels; validação dos campos obrigatórios, preparação do resumo, FAQ e consistência dos destinos de WhatsApp.

## Integração com a planilha
Ao preparar a mensagem do WhatsApp, o formulário também envia o cadastro (nome, empresa, WhatsApp, e-mail, solução, origem e um ID) ao receptor único de leads do grupo (Google Apps Script), que grava na aba ESTRUTALICA AUTOMOTIVA da planilha "GRUPO ESTRUTALICA - LEADS". O código do receptor está no repositório `onsuprimentos`, em `scripts/google-apps-script.gs`. O mesmo cadastro reenviado não cria linha duplicada.
