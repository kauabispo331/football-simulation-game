# ⚽ Football Simulation Game

Um jogo interativo de simulação de futebol com modo amistoso e editor completo de times via site!

## 🎮 Funcionalidades

### 🎨 Editor de Times
- ✅ Criar e editar times personalizados
- ✅ Adicionar jogadores com atributos (força, velocidade, técnica)
- ✅ Definir diferentes formações táticas (4-3-3, 4-2-4, 3-5-2, 5-3-2, 4-4-2)
- ✅ Escolher cores para identificar times
- ✅ Gerenciar elenco completo
- ✅ Salvar times no armazenamento local
- ✅ Deletar times quando necessário

### ⚽ Simulação de Partidas
- ✅ Modo amistoso com dois times diferentes
- ✅ Campo de jogo visual com jogadores posicionados
- ✅ Simulação em tempo real de eventos (chutes, gols, cartões)
- ✅ Placar ao vivo e cronômetro
- ✅ Log de eventos completo da partida
- ✅ Pausar e retomar partida
- ✅ Resultado final com estatísticas

### 🎯 Recursos Adicionais
- 📱 Design responsivo (funciona em mobile, tablet e desktop)
- 💾 Armazenamento persistente usando localStorage
- 🎨 Interface moderna e intuitiva
- ⚡ Animações suaves
- 🏆 Sistema de ranking de jogadores

## 🚀 Como Usar

### Início Rápido

1. **Abra o arquivo `index.html` no seu navegador**
   - Sem necessidade de servidor
   - Funciona completamente offline após primeiro carregamento

### Criando um Time

1. Clique em **"Editor de Times"** no menu
2. Digite o nome do time
3. Escolha a cor principal
4. Selecione a formação tática
5. Clique em **"➕ Adicionar Jogador"**
6. Preencha os dados do jogador:
   - **Nome**: Nome do jogador
   - **Número**: 1-99
   - **Posição**: Goleiro, Zagueiro, Lateral, Volante, Meia ou Atacante
   - **Força**: 0-100 (capacidade física)
   - **Velocidade**: 0-100 (rapidez)
   - **Técnica**: 0-100 (habilidade com a bola)
7. Clique em **"✅ Adicionar"**
8. Repita o processo para adicionar mais jogadores
9. Clique em **"💾 Salvar Time"** para guardar

### Simulando uma Partida

1. Clique em **"Simulação"** no menu
2. Selecione **Time 1** no primeiro seletor
3. Selecione **Time 2** no segundo seletor
4. Clique em **"⚽ Iniciar Partida"**
5. Acompanhe a partida:
   - Veja o placar em tempo real
   - Observe os eventos (gols, cartões, chutes)
   - Use os botões para pausar ou encerrar
6. Ao final, veja o resultado completo

## 📁 Estrutura do Projeto

```
football-simulation-game/
├── index.html          # Página principal e estrutura HTML
├── style.css           # Estilos e design responsivo
├── script.js           # Lógica do jogo e simulação
└── README.md           # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura e semântica
- **CSS3**: Design responsivo com Grid e Flexbox
- **JavaScript (ES6+)**: Lógica do jogo e simulação

## 💾 Dados Persistentes

Todos os times criados são salvos automaticamente no `localStorage` do navegador:
- Dados são mantidos mesmo após fechar o navegador
- Cada navegador/dispositivo tem seu próprio armazenamento
- Para limpar dados, use as ferramentas do desenvolvedor do navegador

## 🎮 Controles

### Navegação
- Clique nos botões do menu superior para mudar de seção
- **Home**: Tela inicial
- **Editor de Times**: Gerenciar times e jogadores
- **Simulação**: Criar e simular partidas

### Na Partida
- **⏸️ Pausar**: Congela a simulação
- **▶️ Retomar**: Continua a partida
- **⏹️ Encerrar**: Finaliza a partida antecipadamente

## 📊 Atributos dos Jogadores

| Atributo | Descrição | Efeito na Simulação |
|----------|-----------|-------------------|
| **Força** | Capacidade física | Afeta força de chute e defesa |
| **Velocidade** | Rapidez de movimento | Afeta velocidade da bola e interceptações |
| **Técnica** | Habilidade com bola | Afeta precisão de passes e chutes |
| **Rating** | Média dos 3 atributos | Indicador geral do jogador |

## 📝 Formações Táticas

- **4-3-3**: Equilibrada e ofensiva
- **4-2-4**: Defensiva com dois volantes
- **3-5-2**: Três zagueiros, cinco do meio
- **5-3-2**: Muito defensiva
- **4-4-2**: Clássica e equilibrada

## 🎨 Temas de Cores

O jogo utiliza um esquema de cores moderno:
- 🟠 **Primária**: #FF6B35 (Laranja)
- 🔵 **Secundária**: #004E89 (Azul)
- 🟢 **Sucesso**: #06A77D (Verde)
- 🔴 **Perigo**: #D62828 (Vermelho)
- 🟡 **Aviso**: #F77F00 (Amarelo)

## 📱 Responsividade

O jogo é totalmente responsivo:
- ✅ Desktop (1024px+)
- ✅ Tablet (768px - 1024px)
- ✅ Mobile (até 768px)

## 🐛 Possíveis Melhorias Futuras

- [ ] Sistema de ligas e campeonatos
- [ ] Estatísticas detalhadas de jogadores
- [ ] Sistema de transferências
- [ ] Multiplayer online
- [ ] Modo carreira
- [ ] Gerador aleatório de times
- [ ] Histórico de partidas
- [ ] Análise tática em tempo real
- [ ] Sons e notificações
- [ ] Compartilhamento de times

## 🤝 Contribuindo

Sinta-se livre para fazer fork, abrir issues e enviar pull requests!

## 📄 Licença

Este projeto está licenciado sob a MIT License - veja o arquivo LICENSE para detalhes.

## 👨‍💻 Autor

Desenvolvido com ❤️ para amantes de futebol e programação!

---

**Divirta-se simulando suas partidas favoritas!** ⚽🎮

### Dicas Úteis:
- Crie times com nomes reais para simular partidas conhecidas
- Experimente diferentes formações para ver qual é mais eficiente
- Adicione jogadores com atributos variados para times mais interessantes
- Salve seus times favoritos para futuras simulações
