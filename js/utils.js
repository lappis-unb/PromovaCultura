categories = [{
  'name': 'Norte',
  'itemStyle': {
    'color': "#ef6b29"
  }
}, {
  'name': 'Nordeste',
  'itemStyle': {
    'color': "#edcb3b"
  }
}, {
  'name': 'Sudeste',
  'itemStyle': {
    'color': "#3aa53a"
  }
}, {
  'name': 'Sul',
  'itemStyle': {
    'color': "#16a2d3"
  }
}, {
  'name': 'Centro-Oeste',
  'itemStyle': {
    'color': "#416e82"
  }
}]

ufDict = {
  "Acre": "AC",
  "Amapá": "AP",
  "Amazonas": "AM",
  "Pará": "PA",
  "Rondônia": "RO",
  "Roraima": "RR",
  "Tocantins": "TO",
  "Alagoas": "AL",
  "Bahia": "BA",
  "Ceará": "CE",
  "Maranhão": "MA",
  "Paraíba": "PB",
  "Pernambuco": "PE",
  "Piauí": "PI",
  "Rio Grande do Norte": "RN",
  "Sergipe": "SE",
  "Espírito Santo": "ES",
  "Minas Gerais": "MG",
  "Rio de Janeiro": "RJ",
  "São Paulo": "SP",
  "Paraná": "PR",
  "Rio Grande do Sul": "RS",
  "Santa Catarina": "SC",
  "Distrito Federal": "DF",
  "Goiás": "GO",
  "Mato Grosso": "MT",
  "Mato Grosso do Sul": "MS",
}

var linkData = []

circleData = [{
  "name": "Acre",
  "category": "Norte",
  "symbolSize": 15,
  "value": 27,
  "x": 3,
  "y": -2,
}, {
  "name": "Amapá",
  "category": "Norte",
  "symbolSize": 30,
  "value": 8,
  "x": 1,
  "y": -6,
}, {
  "name": "Amazonas",
  "category": "Norte",
  "symbolSize": 16,
  "value": 7,
  "x": 0,
  "y": -1,
}, {
  "name": "Pará",
  "category": "Norte",
  "symbolSize": 60,
  "value": 7,
  "x": 7,
  "y": 1,
}, {
  "name": "Rondônia",
  "category": "Norte",
  "symbolSize": 15,
  "value": 7,
  "x": 4,
  "y": -6,
}, {
  "name": "Roraima",
  "category": "Norte",
  "symbolSize": 60,
  "value": 60,
  "x": 5,
  "y": -3,
}, {
  "name": "Tocantins",
  "symbolSize": 50,
  "category": "Norte",
  "value": 7,
  "x": 6,
  "y": 4,
}, {
  "name": "Alagoas",
  "category": "Nordeste",
  "value": 20,
  "symbolSize": 30,
  "x": 1,
  "y": 7,
}, {
  "name": "Bahia",
  "category": "Nordeste",
  "symbolSize": 16,
  "value": 7,
  "x": 1,
  "y": -3,
}, {
  "name": "Ceará",
  "category": "Nordeste",
  "symbolSize": 16,
  "value": 7,
  "x": -6,
  "y": -4,
}, {
  "name": "Maranhão",
  "category": "Nordeste",
  "symbolSize": 18,
  "value": 6,
  "x": 4,
  "y": 6,
}, {
  "name": "Paraíba",
  "category": "Nordeste",
  "symbolSize": 15,
  "value": 7,
  "x": -4,
  "y": 3,
}, {
  "name": "Pernambuco",
  "category": "Nordeste",
  "symbolSize": 16,
  "value": 7,
  "x": -1,
  "y": 2,
}, {
  "name": "Piauí",
  "category": "Nordeste",
  "symbolSize": 18,
  "value": 6,
  "x": 2,
  "y": -5,
}, {
  "name": "Rio Grande do Norte",
  "category": "Nordeste",
  "symbolSize": 16,
  "value": 7,
  "x": 7,
  "y": -1,
}, {
  "name": "Sergipe",
  "symbolSize": 16,
  "category": "Nordeste",
  "value": 7,
  "x": -5,
  "y": 7,
}, {
  "name": "Distrito Federal",
  "value": 5,
  "symbolSize": 40,
  "category": "Centro-Oeste",
  "x": 2,
  "y": 5,
}, {
  "name": "Goiás",
  "category": "Centro-Oeste",
  "symbolSize": 30,
  "value": 7,
  "x": 4,
  "y": 0,
}, {
  "name": "Mato Grosso",
  "category": "Centro-Oeste",
  "symbolSize": 7,
  "value": 7,
  "x": -1,
  "y": 5,
}, {
  "name": "Mato Grosso do Sul",
  "category": "Centro-Oeste",
  "symbolSize": 18,
  "value": 4,
  "x": -3,
  "y": 1,
}, {
  "name": "Espírito Santo",
  "category": "Sudeste",
  "symbolSize": 20,
  "value": 7,
  "x": -3,
  "y": -6,
}, {
  "name": "Minas Gerais",
  "category": "Sudeste",
  "symbolSize": 25,
  "value": 7,
  "x": -7,
  "y": 0,
}, {
  "name": "Rio de Janeiro",
  "category": "Sudeste",
  "symbolSize": 10,
  "value": 7,
  "x": 7,
  "y": 7,
}, {
  "name": "São Paulo",
  "category": "Sudeste",
  "symbolSize": 75,
  "value": 7,
  "x": 2,
  "y": 2,
}, {
  "name": "Paraná",
  "category": "Sul",
  "symbolSize": 30,
  "value": 7,
  "x": -3,
  "y": -3,
}, {
  "name": "Rio Grande do Sul",
  "category": "Sul",
  "symbolSize": 7,
  "value": 7,
  "x": -7,
  "y": 6,
}, {
  "name": "Santa Catarina",
  "category": "Sul",
  "symbolSize": 30,
  "value": 30,
  "x": 7,
  "y": -5,
}]

var areas = {
  "Artes Cênicas": [
    "Artes Cênicas",
    "Teatro",
    "Dança",
    "Circo",
    "Ópera",
    "Mímica",
    "Ópera Rock",
    "Ações de capacitação e treinamento de pessoal 1",
    "Teatro de formas animadas",
    "Teatro de mamulengos",
    "Teatro de  bonecos e congêneres",
    "Desfile de  escola de samba",
    "Desfile de bloco carnavalesco",
    "Desfile de  cortejo da cultura popular ",
    "Construção de salas de teatro munic(< 100 mil hab) 1",
    "Construção de centros comunit.Munic(< 100 mil hab)",
    "Manutenção de salas de teatro Munic(< 100 mil hab)",
    "Manutenção de centros comunit.Munic(< 100 mil hab)",
    "Teatro musical"
  ],
  "Audiovisual": [
    "Audiovisual",
    "Distribuição Cinematográfica",
    "Preservação/Restauração da Memória Cinematográfica",
    "Jogos eletrônicos",
    "Videofonográfica",
    "Produção Cinematográfica de curta metragem",
    "Rádio/Tvs Educativa",
    "Multimídia",
    "Produção Cinematográfica de média metragem",
    "Formação/Pesquisa e informação",
    "Formação /Pesquisa/Informação",
    "Exibição Cinematográfica",
    "Produção Cinematográfica",
    "Infra-estrutura Técnica Audiovisual",
    "Produção Videofonográfica de curta metragem",
    "Produção Videofonográfica de média metragem",
    "Formação Audiovisual",
    "Pesquisa Audiovisual",
    "Rádios e TVs Educativas não comerciais",
    "Doação de acervos audiovisuais",
    "Construção de salas de cinema (< 100 mil hab)",
    "Manutenção de salas de cinema (< 100 mil hab)",
    "Constr. centro comunitário c/sala cinema(<100 mil)",
    "Manut. centro comunitário c/sala cinema(<100 mil)",
    "Difusão de acervo audiovisual",
    "Preservação de acervos audiovisuais",
    "Restauração de acervos audiovisuais",
    "Produção de web série",
    "Projetos Audiovisuais Transmidiáticos",
    "Aquisi. equipamentos p/manut.-acervos audiovisuais",
    "Produção de conteúdo audiovisual de curta metragem",
    "Produção de conteúdo audiovisual de média metragem",
    "Produção Televisiva",
    "Difusão de acervo e conteúdo audiovisual",
    "Difusão"
  ],
  "Música": [
    "Música",
    "Música Popular Cantada",
    "Música Erudita",
    "Música Instrumental",
    "Áreas Integradas",
    "Orquestra",
    "Doações de Acervos Musicais",
    "Canto Coral",
    "Ações de capacitação e treinamento de pessoal"
  ],
  "Artes Visuais": [
    "Artes Visuais",
    "Plásticas",
    "Gráficas",
    "Filatelia",
    "Gravura",
    "Cartazes",
    "Fotografia",
    "Exposição Itinerante",
    "Design",
    "Artes Plásticas",
    "Artes Gráficas",
    "Exposição de Artes Visuais",
    "Moda",
    "Doações de Acervos de Artes Visuais",
    "Formação técnica e artística de profissionais",
    "Projeto educativo de artes visuais",
    "Projeto de fomento à cadeia produtiva arte visual",
    "Ações educativo-culturais"
  ],
  "Patrimônio Cultural": [
    "Patrimônio Cultural",
    "História",
    "Arquitetônico",
    "Arqueológico",
    "Museu",
    "Acervo",
    "Acervos Museológicos",
    "Cultura Afro Brasileira",
    "Cultura Indígena",
    "Artesanato/Folclore",
    "Preservação de Patrimônio Imaterial",
    "Manutenção de equipamentos culturais em geral",
    "Ações de capacitação",
    "Doações / aquisições de acervos culturais em geral",
    "Preservação de Patrimônio Material",
    "Restauração de Patrimônio Material",
    "Preservação de Patrimônio Museológico",
    "Restauração de Patrimônio Museológico",
    "Preservação de Acervos",
    "Restauração de Acervos",
    "Preservação de Acervos Museológicos",
    "Restauração de Acervos Museológicos",
    "Gastronomia",
    "Aquisição de equipamentos p/ manutenção de acervos",
    "Manutenção de salas de Teatro (<100 mil hab)",
    "Manu centro comunitário c/sl teatro (<100 mil hab)",
    "Construção de equipamentos culturais em geral",
    "Construção de salas de teatro munic(< 100 mil hab)",
    "Identificação, registro, educação do patrimônio",
    "Ações document./pesquisa/digitaliz./sistem.-acervo",
    "Preserv./revitaliz./edificações destinada-acervos",
    "Ações segurança p/preservação patrimônio/acervos",
    "Planos anuais de preservação do patrimônio/acervos",
    "Ações educativo-culturais",
    "Treinamento  pessoal/aquis.equip. p/manut. Acervos",
    "Elaboração de projetos de arquitetura e urbanismo"
  ],
  "Humanidades": [
    "Humanidades",
    "Produção de obras seriadas",
    "Edição de Livros",
    "Obras de Referência",
    "História 1",
    "Filosofia",
    "Acervo Bibliográfico",
    "Arquivo",
    "Biblioteca",
    "Evento Literário",
    "Periódicos",
    "Ações de formação e capacitação",
    "Eventos e ações de incentivo à leitura",
    "Livros  ou obras de referência - valor Artístico",
    "Livros  ou obras de referência - valor Literário",
    "Livros ou  obras de referência - valor Humanístico",
    "Periódicos e outras publicações",
    "Treina pessoal p manuten de acervos bibliográficos",
    "Aquisiç equip p/manuten de acervos bibliográficos",
    "Doação de acervos acessíveis ao público em geral",
    "Impressos/eletrônicos-artístico, literário, human.",
    "Aquis.acervos biblio.-artístico, literário, human.",
    "Aquisi. arquivísticos-artístico, literário, human.",
    "Manut. acervos biblio.artístico, literário, human.",
    "Manut. acervos arquiv.artístico, literário, human.",
    "Prese. acervos biblio.artístico, literário, human.",
    "Prese. acervos arquiv.artístico, literário, human.",
    "Resta. acervos biblio.artístico, literário, human.",
    "Resta. acervos arquiv.artístico, literário, human.",
    "Treinamento-pessoal, demais ações de capacitação",
    "Aquis.equip. p/manut. acervos de bibliot. Públicas",
    "Aquisição equipamentos p/manut. acervos de museus",
    "Aquisição equip. p/manut. acervos arquivo públicos",
    "Aquisição equip. p/manut. acervos de cinematecas"
  ],
  "Artes Integradas": [
    "Artes Integradas",
    "Restauração/Bolsas",
    "Multimídia 1",
    "Carnaval",
    "Carnaval fora de época",
    "Cultura Popular",
    "Equipamentos culturais multifuncionais"
  ],
  "Museus e Memória": [
    "Museus e Memória",
    "Doação ou aquisição de acervos para museus",
    "Doação de acervos p/instit. preservação da memória",
    "Aquisição acervos p/instit. preservação da memória",
    "Preservação. Restauração, conservaçao, registro",
    "Identificação, registro e promoção",
    "Documentação e digitalização de acervos",
    "Sistemas de informações",
    "Ações de segurança para preservação de acervos",
    "Planos anuais de atividades e planos museológicos",
    "Exposições realizadas em museus",
    "Exposições organizadas com acervos de museus",
    "Exposições organizadas com museografia",
    "Pesquisa",
    "Ações educativs, seminários, congresso, palestras",
    "Criação projetos, construção, restauração, reforma",
    "Implan. projetos, construção, restauração, reforma",
    "Espaços museais",
    "Treinamento de pessoal",
    "Aquisição de equipamentos p/preservação de acervos",
    "Aquisição de equipamentos p/manutenção de acervos"
  ]
}


segmentCategories = [{
  "name": "Artes Integradas",
  'itemStyle': {
    'color': "#16a2d3"
  }
}, {
  "name": "Música",
  'itemStyle': {
    'color': "#ef6b29"
  }
}, {
  "name": "Patrimônio Cultural",
  'itemStyle': {
    'color': "#3aa53a"
  }
}, {
  "name": "Audiovisual",
  'itemStyle': {
    'color': "#db3737"
  }
}, {
  "name": "Artes Visuais",
  'itemStyle': {
    'color': "#edcb3b"
  }
}, {
  "name": "Humanidades",
  'itemStyle': {
    'color': "#17a984"
  }
}, {
  "name": "Artes Cênicas",
  'itemStyle': {
    'color': "#7f6793"
  }
}, {
  "name": "Museus e Memória",
  'itemStyle': {
    'color': "#416e82"
  }
}]

colors = [
  "#df5451",
  "#27ddad",
  "#5faee6",
  "#f7ea00",
  "#ec9a5e",
  "#87d041",
  "#c966ff",
  "#7688c1"
]
