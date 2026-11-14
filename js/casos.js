/* ============================================================
   "Qual é a sua situação?": assuntos, quem cuida e o que separar
   para a primeira conversa. Só texto fixo, nada vem de fora.

   Quem cuida de cada área saiu da bio do Instagram e do cartão de
   especialidades do escritório (14/11/2026):
     Cível, Família, Consumidor e Imobiliário · Dr. José Carlos Fortes
     Trabalho e Previdenciário · Dra. Viviana Faco
     Criminal · Dr. Ezio Cotrim
   Empresa e correspondência vão para o escritório (não sabemos qual
   advogado atende: confirmar com o cliente).

   "nota": frase curta tirada dos próprios posts do escritório.
   Regra da OAB (Provimento 205/2021): nada de prometer resultado.
   ============================================================ */
window.JC_CASOS = {
  whats: '5522974026263',
  /* documentos de todo atendimento de pessoa física: pedido do Dr. José Carlos em
     14/11/2026 ("faltou comprovante de residência atualizado e 3 últimos comprovantes
     de rendimentos ou IR"). Empresa e correspondência não levam (semComuns). */
  comuns: ['RG e CPF', 'Comprovante de residência atualizado', 'Os 3 últimos comprovantes de rendimentos ou a declaração do Imposto de Renda'],
  advogados: {
    jose: { sigla: 'JCF', nome: 'Dr. José Carlos Fortes', oab: 'OAB/RJ 201.099', curto: 'o Dr. José Carlos Fortes' },
    viviana: { sigla: 'VF', nome: 'Dra. Viviana Faco', oab: 'OAB/RJ 201.393', curto: 'a Dra. Viviana Faco' },
    ezio: { sigla: 'EC', nome: 'Dr. Ezio Cotrim', oab: 'OAB/RJ 159.902', curto: 'o Dr. Ezio Cotrim' },
    escritorio: { sigla: 'JC', nome: 'Escritório JC Fortes', oab: 'Atendimento pelo WhatsApp do escritório', curto: 'o escritório' }
  },
  grupos: [
    {
      id: 'familia', nome: 'Família', quem: 'jose',
      itens: [
        { id: 'divorcio', t: 'Divórcio ou separação', docs: ['Certidão de casamento (ou o que comprove a união estável)', 'Certidão de nascimento dos filhos, se houver', 'Lista dos bens do casal: imóveis, carros, contas'] },
        { id: 'pensao', t: 'Pensão alimentícia', docs: ['Certidão de nascimento da criança', 'Gastos da criança: escola, saúde, alimentação', 'O que souber da renda de quem vai pagar', 'Decisão ou acordo anterior, se já existir pensão'] },
        { id: 'guarda', t: 'Guarda e convivência dos filhos', docs: ['Certidão de nascimento da criança', 'Acordos ou decisões anteriores, se houver'] },
        { id: 'inventario', t: 'Inventário e partilha de bens', docs: ['Certidão de óbito', 'Documentos dos herdeiros', 'Documentos dos bens: matrícula do imóvel, documento do carro, extratos', 'Testamento, se houver'] }
      ]
    },
    {
      id: 'consumidor', nome: 'Consumidor', quem: 'jose',
      nota: 'Guarde protocolos, prints e comprovantes: são eles que contam a história.',
      itens: [
        { id: 'cobranca', t: 'Cobrança indevida ou nome negativado', docs: ['Faturas ou boletos cobrados', 'Print ou carta da negativação', 'Números de protocolo do atendimento'] },
        { id: 'golpe', t: 'Golpe bancário ou no Pix', docs: ['Extrato com a transação', 'Boletim de ocorrência', 'Prints da conversa com o golpista', 'Protocolo da reclamação no banco'] },
        { id: 'plano', t: 'Plano de saúde negou cobertura', docs: ['Carteirinha e contrato do plano', 'Pedido médico e laudo', 'Negativa do plano por escrito (ou o protocolo)', 'Comprovantes de pagamento'] },
        { id: 'compra', t: 'Compra cancelada ou produto com defeito', nota: 'Quando o sistema de pagamento falha, o fornecedor deve apresentar uma solução.', docs: ['Nota fiscal ou comprovante de pagamento', 'Prints do anúncio e da conversa com a loja', 'Fotos do defeito', 'Protocolos de atendimento'] }
      ]
    },
    {
      id: 'dividas', nome: 'Financiamento e dívidas', quem: 'jose',
      itens: [
        { id: 'financiamento', t: 'Revisão de financiamento de veículo', nota: 'A Justiça permite rever contratos quando há juros excessivos, cobranças indevidas ou cláusulas abusivas.', docs: ['Contrato do financiamento', 'Carnê ou boletos pagos', 'Documento do veículo'] },
        { id: 'execucao', t: 'Penhora, bloqueio de conta ou leilão', nota: 'Mesmo em situação crítica, vale conhecer seus direitos antes do próximo passo do processo.', docs: ['Intimação ou citação que recebeu', 'Número do processo', 'Extrato mostrando o bloqueio', 'Documentos do bem penhorado'] }
      ]
    },
    {
      id: 'imoveis', nome: 'Imóveis', quem: 'jose',
      itens: [
        { id: 'contrato', t: 'Compra, venda ou aluguel', docs: ['Contrato (ou a minuta que vai assinar)', 'Matrícula atualizada do imóvel', 'Documentos das partes', 'Recibos e comprovantes de pagamento'] },
        { id: 'regularizacao', t: 'Regularização do imóvel', docs: ['Escritura, contrato de compra ou recibo', 'Matrícula ou certidão do cartório', 'Carnê do IPTU', 'Planta ou documentos da prefeitura, se houver'] }
      ]
    },
    {
      id: 'internet', nome: 'Internet', quem: 'jose',
      nota: 'Print é prova: guarde a data, o link do perfil e o da publicação.',
      itens: [
        { id: 'ofensa', t: 'Ofensa, exposição ou notícia falsa', docs: ['Prints com data e hora', 'Link do perfil e da publicação', 'Nomes de quem viu', 'Boletim de ocorrência, se já fez'] }
      ]
    },
    {
      id: 'trabalho', nome: 'Trabalho', quem: 'viviana',
      itens: [
        { id: 'rescisao', t: 'Demissão e verbas da rescisão', docs: ['Carteira de trabalho (física ou digital)', 'Termo de rescisão (TRCT)', 'Últimos contracheques', 'Extrato do FGTS'] },
        { id: 'horas', t: 'Horas extras, FGTS ou carteira não assinada', docs: ['Contracheques', 'Extrato do FGTS', 'Prints de conversas e escalas de horário', 'Nomes de colegas que podem confirmar'] }
      ]
    },
    {
      id: 'inss', nome: 'INSS e aposentadoria', quem: 'viviana',
      itens: [
        { id: 'aposentadoria', t: 'Aposentadoria', docs: ['Carteira de trabalho', 'Extrato do CNIS (no aplicativo Meu INSS)', 'Carnês de contribuição, se pagou por conta'] },
        { id: 'beneficio', t: 'Benefício negado ou cortado', docs: ['Carta de indeferimento ou de corte', 'Laudos e exames médicos', 'Extrato do CNIS (no aplicativo Meu INSS)', 'Número do benefício, se tiver'] }
      ]
    },
    {
      id: 'criminal', nome: 'Criminal', quem: 'ezio',
      itens: [
        { id: 'intimacao', t: 'Recebi intimação ou fui chamado na delegacia', docs: ['A intimação que recebeu', 'Boletim de ocorrência, se tiver', 'Número do inquérito ou do processo'] },
        { id: 'defesa', t: 'Defesa em processo criminal', docs: ['Número do processo', 'Denúncia ou citação recebida', 'Documentos e nomes de testemunhas'] },
        { id: 'vitima', t: 'Fui vítima de um crime', docs: ['Boletim de ocorrência', 'Provas que tiver: prints, fotos, laudos', 'Nomes de testemunhas'] }
      ]
    },
    {
      id: 'empresa', nome: 'Empresa', quem: 'escritorio', semComuns: true,
      nota: 'Prevenir é sempre mais acessível do que remediar.',
      itens: [
        { id: 'assessoria', t: 'Contratos e assessoria para a empresa', docs: ['CNPJ e contrato social', 'Contratos que usa hoje', 'O que quer resolver ou prevenir'] }
      ]
    },
    {
      id: 'colega', nome: 'Sou advogado(a)', quem: 'escritorio', semComuns: true,
      itens: [
        { id: 'correspondencia', t: 'Correspondência jurídica na Região dos Lagos', docs: ['Número do processo e a vara', 'O ato: audiência, protocolo, cópia ou diligência', 'Data e prazo'] }
      ]
    }
  ]
};
