# Design implementado — Estrutálica Automotiva

Landing page B2B em português, com direção premium, limpa e industrial. A identidade usa grafite, branco e laranja, preserva o arquivo original da logo no cabeçalho e rodapé e apresenta fotografias reais de racks e carrinhos do portfólio. O objetivo é iniciar atendimento comercial pelo WhatsApp.

## Paleta e tipografia

| Uso | Valor |
| --- | --- |
| Grafite principal, texto e fundos escuros | `#1b1919` |
| Laranja de destaque e botões | `#ef912c` |
| Branco | `#ffffff` |
| Fundo alternado claro | `#f2f2ef` |
| Texto secundário em fundos claros | `#626262` |
| Divisórias claras | `#dededb` |

Barlow Bold nos títulos principais e de produtos; Manrope Regular/Bold no corpo, navegação e controles. As fontes são locais. Corpo de 16px com entrelinha 1,65; títulos grandes, compactos e com trechos laranja ou cinza. O hero chega a 88px em telas amplas e usa 48px até 600px.

## Composição e onze seções

Conteúdo central com largura máxima de 1220px, margens generosas, linhas finas e seções geralmente espaçadas em 110px no desktop. Fundos claros e grafite alternam o ritmo; o fechamento usa laranja. Cantos discretos de 2–3px, poucas sombras e fotografias amplas sustentam a linguagem industrial.

1. Hero grafite: proposta de valor à esquerda, formulário branco à direita e faixa fotográfica abaixo.
2. Problema: quatro obstáculos logísticos e uma afirmação de fechamento.
3. Soluções: dois cards fotográficos, três linhas de serviços e CTA.
4. Benefícios: título amplo e três benefícios em lista sobre grafite.
5. Desenvolvimento sob medida: texto editorial e especificações em tabela descritiva.
6. Processo: seis etapas numeradas e link de contato.
7. Experiência automotiva: fotografia e conteúdo em painel grafite.
8. Diferenciais: quatro colunas de argumentos.
9. Objeções: convite ao contato e quatro perguntas contextualizadas.
10. FAQ: seis itens expansíveis nativos com indicadores de mais/menos.
11. Encerramento: fundo laranja, síntese da oferta e botão grafite.

Cabeçalho e rodapé complementam essas onze seções. A navegação contém Soluções, Como funciona e Dúvidas; os botões comerciais levam ao mesmo WhatsApp. A logo é enquadrada por CSS a partir da imagem original, sem redesenho.

## Componentes e acessibilidade

Botões retangulares com setas lineares, links sublinhados, cards de produtos, listas separadas por linhas e formulário com rótulos visíveis. Há link para pular ao conteúdo, contorno de foco, textos alternativos, validação nativa e aviso de resultado com `aria-live`. O FAQ usa `details`/`summary`. A preferência por movimento reduzido remove rolagem suave e deslocamento de botões.

## Comportamento responsivo

- Até 1100px: margens de 32px, espaçamentos menores e campos do formulário em uma coluna.
- Até 800px: navegação textual oculta; problemas e diferenciais passam a duas colunas; bloco automotivo e FAQ ficam empilhados. O hero ainda mantém duas colunas.
- Até 600px: margens de 20px; hero, produtos, benefícios, personalização, objeções e fechamento ficam em uma coluna. Nome e empresa dividem a linha; telefone e e-mail ocupam linhas completas. Processo, problemas e diferenciais mantêm duas colunas compactas. Seções usam aproximadamente 62px de espaçamento vertical.

## Fluxo do formulário e WhatsApp

O formulário solicita nome, empresa, WhatsApp, e-mail corporativo e solução. Ao ativar “Preparar cadastro no WhatsApp”, a validação nativa impede a continuação com campos inválidos. Com dados válidos, o navegador monta um resumo visível e tenta copiá-lo para a área de transferência; se isso não estiver disponível, seleciona o texto para cópia manual.

O link abre `wa.me/551149630188` com a mensagem inicial fixa. Os dados do formulário precisam ser colados e enviados pelo visitante na conversa; não são incorporados automaticamente ao link. O resultado inclui um segundo link “Continuar no WhatsApp”. Sem JavaScript, o botão continua abrindo o contato e o visitante informa seus dados na conversa. Não há banco de leads nem confirmação de recebimento automático.
