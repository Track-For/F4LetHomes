**Para:** lucio.risi@vallues.co
**Assunto:** 4Let Homes · Marco intermediário: correções aplicadas e pedido de aprovação

Olá, Lucio, tudo bem?

Concluí a etapa intermediária do contrato (Cláusulas 5.2-b e 5.3). Validei os fluxos do site www.f4let.com em português, inglês e espanhol e apliquei direto no painel da Stays as correções que estavam ao meu alcance. O relatório completo, com valor antigo, valor novo e teste de cada item, está em anexo (`correcoes-2026-11-19.md`).

**O que foi corrigido**

1. **Imóveis que existiam na Stays e não apareciam no site.** A causa era que três anúncios estavam desconectados do canal Site: a Pousada Pedra Baleia, o Residencial Santo Antônio (Praia Grande) e o Verano Ponta Negra T1905. Conectei os três. Agora eles aparecem na busca, e a página do Santo Antônio, que dava erro 404, abre normalmente. Também criei a localidade "Praia Grande" no filtro de busca e incluí o T1905 na localidade Natal.
2. **Imóveis que pediam e-mail ao proprietário.** Sete unidades estavam em modo "Enviar pedido": Colina Duplo e Triplo, Chalé T1303, BH Del Rey, os dois Verano e a Pedra Baleia. Liguei a reserva instantânea nas sete. Hoje as 14 unidades mostram "Reserve já" e levam o hóspede direto à identificação, com datas e preço corretos. Se algum proprietário exigir aprovação prévia, eu volto a unidade em um minuto.
3. **Cliques em cidades.** Os 5 cards da home agora levam à busca da cidade, com todos os imóveis, nas três línguas. Nenhum dá 404 nem volta para a home. Como não temos mais imóveis em Cabo Frio, o card dessa cidade virou **Praia Grande**, com uma foto da própria praia, e "Cabo Frio" saiu do filtro de busca. Rio das Ostras entra assim que o imóvel for publicado.
4. **Depoimentos falsos.** Os quatro depoimentos genéricos, com fotos de banco de imagens, saíram da home. No lugar entrou o bloco **"Viva a Experiência"**, com quatro roteiros reais (Ponta Negra e Genipabu; kite e Tourinhos em Gostoso; Pampulha e Mercado Central em BH; serra em Cerro Corá). Cada roteiro leva à busca da cidade. O bloco já está traduzido para inglês e espanhol e funciona no celular.
5. **Sobre nós.** Ajustei o título principal da página para os buscadores (SEO), sem mudança visual.

**Problemas identificados que dependem de vocês**

- **Rio das Ostras:** quando o imóvel estiver cadastrado na Stays, me avise e me mande uma boa foto da cidade ou do imóvel. Eu conecto o anúncio ao site, crio a localidade e coloco o card na home.
- **Pousada Pedra Baleia:** já aparece no site, mas o calendário tem bloqueios manuais em quase todas as datas até out/2027. Por isso ela some das buscas com data. É preciso conferir com o proprietário quais períodos podem ser liberados.
- **Termos e Condições:** o texto publicado diz "sair apenas entre as 88h até 88h". Preciso do horário correto para corrigir.
- **Tarifas futuras:** 12 anúncios ficam sem diária a partir de 15/12/2026, e a Pedra Baleia a partir de 18/01/2027. Quando chegarem essas datas, eles somem da busca. Preciso dos valores da operação.
- **Cadastro:** o Verano T1905 está com o endereço "Apto. 604", igual ao do P0604. Os chalés Standard e Premium e seis agrupamentos estão em rascunho; vale confirmar se devem ir ao ar.

**Material reaproveitado**

As fotos de Natal, Tourinhos e Pampulha foram para a biblioteca de mídia da Stays, sem os dados de localização do celular. Também reaproveitei a foto da Colina Flamboyant e os textos institucionais já existentes. O conteúdo dos depoimentos removidos está guardado no relatório, caso seja necessário.

**Limitações externas**

- **Código de login que não chega no e-mail (DNS):** a causa está confirmada. O DNS de f4let.com, na GoDaddy, não autoriza o servidor de envio da Stays (Mandrill). A correção são três registros, que estão prontos no relatório: ajustar o SPF e criar dois CNAMEs, `mte1` e `mte2`. Preciso de acesso à GoDaddy, ou alguém da 4Let pode aplicá-los. Depois disso, aviso a Stays e testo o login com um e-mail novo.
- **Pagamento:** o checkout com Mercado Pago só pode ser validado com um e-mail de teste autorizado. Fica para a próxima etapa.
- **Stays:** o bloco de conteúdo da home não tem campo por idioma. Resolvi isso com uma versão única que exibe automaticamente o idioma da página.

**Próxima etapa (dias 9 a 15)**

- Validar o login, a recuperação de senha e "Minha reserva" depois que o DNS estiver corrigido.
- Testar o checkout com os meios de pagamento.
- Implantar o formulário do proprietário (Anexo I: até 5 fotos, aviso de privacidade e envio para o seu e-mail).
- Modernizar visualmente as demais páginas e fazer o SEO técnico: títulos, sitemap (a URL `/pt/home` está vazia) e Política de Cancelamento em inglês e espanhol.
- Fazer as 2 rodadas de revisão.
- Rodar o teste de busca com as 3 propriedades e datas de referência que você me enviar.

**Pedido de aprovação**

Conforme a Cláusula 5.2-b, peço a sua **aprovação por escrito da continuidade** do projeto e a liberação da parcela do marco intermediário, no valor de **R$ 600,00**, por PIX ou transferência. Basta responder a este e-mail com o "de acordo".

Se puder, aproveite a resposta para me mandar o horário correto dos Termos e o acesso ao DNS. Assim eu já sigo com a próxima etapa.

Obrigado!

Luiz
Track For
