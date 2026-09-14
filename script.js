// ===== VARIÁVEIS GLOBAIS =====
let teams = [];
let currentTeamIndex = null;
let matchInProgress = false;
let matchPaused = false;
let matchTime = 0;
let team1Data = null;
let team2Data = null;
let matchStats = {
    team1: { goals: 0, shots: 0, possession: 0 },
    team2: { goals: 0, shots: 0, possession: 0 }
};
const MATCH_DURATION = 5400; // 90 minutos em segundos

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
    loadTeamsFromStorage();
    updateTeamSelects();
    setupEventListeners();
    addRangeInputListeners();
});

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navegação
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.getAttribute('data-section');
            goToSection(section);
        });
    });
}

function addRangeInputListeners() {
    const ranges = [
        { input: 'playerStrength', display: 'strengthValue' },
        { input: 'playerSpeed', display: 'speedValue' },
        { input: 'playerTechnique', display: 'techniqueValue' }
    ];

    ranges.forEach(({ input, display }) => {
        const elem = document.getElementById(input);
        if (elem) {
            elem.addEventListener('input', function() {
                document.getElementById(display).textContent = this.value;
            });
        }
    });
}

// ===== NAVEGAÇÃO =====
function goToSection(sectionName) {
    // Remover classe active de todas as seções
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Remover classe active de todos os botões
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Adicionar classe active à seção e botão corretos
    const section = document.getElementById(sectionName);
    if (section) {
        section.classList.add('active');
    }

    const navBtn = document.querySelector(`[data-section="${sectionName}"]`);
    if (navBtn) {
        navBtn.classList.add('active');
    }

    // Se for a seção de match, resetar
    if (sectionName === 'match') {
        resetMatchSetup();
    }
}

// ===== ARMAZENAMENTO LOCAL =====
function loadTeamsFromStorage() {
    const stored = localStorage.getItem('footballTeams');
    if (stored) {
        teams = JSON.parse(stored);
    }
}

function saveTeamsToStorage() {
    localStorage.setItem('footballTeams', JSON.stringify(teams));
}

function updateTeamSelects() {
    const selects = ['teamSelect', 'team1Select', 'team2Select'];
    
    selects.forEach(selectId => {
        const select = document.getElementById(selectId);
        if (select) {
            // Manter a primeira opção
            const firstOption = select.options[0];
            select.innerHTML = '';
            select.appendChild(firstOption);

            // Adicionar times
            teams.forEach((team, index) => {
                const option = document.createElement('option');
                option.value = index;
                option.textContent = team.name;
                select.appendChild(option);
            });
        }
    });
}

// ===== GERENCIAMENTO DE TIMES =====
function addPlayer() {
    const modal = document.getElementById('playerModal');
    resetPlayerForm();
    modal.classList.add('active');
}

function closeModal() {
    document.getElementById('playerModal').classList.remove('active');
}

function resetPlayerForm() {
    document.getElementById('playerName').value = '';
    document.getElementById('playerNumber').value = '';
    document.getElementById('playerPosition').value = 'Goleiro';
    document.getElementById('playerStrength').value = 50;
    document.getElementById('playerSpeed').value = 50;
    document.getElementById('playerTechnique').value = 50;
    document.getElementById('strengthValue').textContent = '50';
    document.getElementById('speedValue').textContent = '50';
    document.getElementById('techniqueValue').textContent = '50';
}

function confirmAddPlayer() {
    const name = document.getElementById('playerName').value.trim();
    const number = parseInt(document.getElementById('playerNumber').value);
    const position = document.getElementById('playerPosition').value;
    const strength = parseInt(document.getElementById('playerStrength').value);
    const speed = parseInt(document.getElementById('playerSpeed').value);
    const technique = parseInt(document.getElementById('playerTechnique').value);

    if (!name || !number || number < 1 || number > 99) {
        alert('Preencha corretamente: Nome e Número (1-99)');
        return;
    }

    if (currentTeamIndex === null) {
        alert('Selecione ou crie um time primeiro');
        return;
    }

    const player = {
        id: Date.now(),
        name,
        number,
        position,
        strength,
        speed,
        technique,
        rating: Math.round((strength + speed + technique) / 3)
    };

    teams[currentTeamIndex].players.push(player);
    saveTeamsToStorage();
    displayPlayersList();
    closeModal();
}

function loadTeam() {
    const select = document.getElementById('teamSelect');
    const teamIndex = parseInt(select.value);

    if (teamIndex === '') {
        // Novo time
        currentTeamIndex = null;
        document.getElementById('teamName').value = '';
        document.getElementById('teamColor').value = '#FF0000';
        document.getElementById('formation').value = '4-3-3';
        document.getElementById('playersList').innerHTML = '';
        return;
    }

    currentTeamIndex = teamIndex;
    const team = teams[teamIndex];
    document.getElementById('teamName').value = team.name;
    document.getElementById('teamColor').value = team.color;
    document.getElementById('formation').value = team.formation;
    displayPlayersList();
}

function displayPlayersList() {
    const playersList = document.getElementById('playersList');
    playersList.innerHTML = '';

    if (currentTeamIndex === null) return;

    const team = teams[currentTeamIndex];
    
    if (team.players.length === 0) {
        playersList.innerHTML = '<p style="color: #888; text-align: center;">Nenhum jogador adicionado</p>';
        return;
    }

    team.players.forEach(player => {
        const card = document.createElement('div');
        card.className = 'player-card';
        card.innerHTML = `
            <div class="player-info">
                <div class="player-name">#${player.number} - ${player.name}</div>
                <div class="player-details">
                    ${player.position} | ⭐ ${player.rating}/100 | 
                    💪 ${player.strength} ⚡ ${player.speed} 🎯 ${player.technique}
                </div>
            </div>
            <div class="player-actions">
                <button class="edit-btn" onclick="editPlayer(${player.id})">✏️ Editar</button>
                <button class="delete-btn" onclick="deletePlayer(${player.id})">🗑️ Remover</button>
            </div>
        `;
        playersList.appendChild(card);
    });
}

function editPlayer(playerId) {
    // Funcionalidade de editar jogador
    alert('Funcionalidade de edição em desenvolvimento!');
}

function deletePlayer(playerId) {
    if (currentTeamIndex === null) return;

    if (confirm('Remover este jogador?')) {
        teams[currentTeamIndex].players = teams[currentTeamIndex].players.filter(p => p.id !== playerId);
        saveTeamsToStorage();
        displayPlayersList();
    }
}

function saveTeam() {
    const teamName = document.getElementById('teamName').value.trim();
    const teamColor = document.getElementById('teamColor').value;
    const formation = document.getElementById('formation').value;

    if (!teamName) {
        alert('Digite o nome do time');
        return;
    }

    if (currentTeamIndex === null) {
        // Novo time
        const newTeam = {
            id: Date.now(),
            name: teamName,
            color: teamColor,
            formation: formation,
            players: []
        };
        teams.push(newTeam);
        currentTeamIndex = teams.length - 1;
    } else {
        // Atualizar time existente
        teams[currentTeamIndex].name = teamName;
        teams[currentTeamIndex].color = teamColor;
        teams[currentTeamIndex].formation = formation;
    }

    saveTeamsToStorage();
    updateTeamSelects();
    alert('✅ Time salvo com sucesso!');
}

function deleteTeam() {
    if (currentTeamIndex === null) {
        alert('Selecione um time para deletar');
        return;
    }

    if (confirm('Deletar este time permanentemente?')) {
        const teamName = teams[currentTeamIndex].name;
        teams.splice(currentTeamIndex, 1);
        currentTeamIndex = null;
        saveTeamsToStorage();
        updateTeamSelects();
        document.getElementById('teamName').value = '';
        document.getElementById('playersList').innerHTML = '';
        alert(`✅ Time ${teamName} deletado!`);
    }
}

// ===== SIMULAÇÃO DE PARTIDA =====
function startMatch() {
    const team1Index = parseInt(document.getElementById('team1Select').value);
    const team2Index = parseInt(document.getElementById('team2Select').value);

    if (team1Index === '' || team2Index === '') {
        alert('Selecione os dois times');
        return;
    }

    if (team1Index === team2Index) {
        alert('Selecione times diferentes');
        return;
    }

    team1Data = JSON.parse(JSON.stringify(teams[team1Index]));
    team2Data = JSON.parse(JSON.stringify(teams[team2Index]));

    // Resetar estatísticas
    matchStats = {
        team1: { goals: 0, shots: 0, possession: 0 },
        team2: { goals: 0, shots: 0, possession: 0 }
    };
    matchTime = 0;
    matchInProgress = true;
    matchPaused = false;

    // Mostrar campo de jogo
    document.querySelector('.match-setup').style.display = 'none';
    document.getElementById('matchField').classList.remove('hidden');

    // Atualizar placar
    document.getElementById('team1Name').textContent = team1Data.name;
    document.getElementById('team2Name').textContent = team2Data.name;
    document.getElementById('team1Score').textContent = '0';
    document.getElementById('team2Score').textContent = '0';
    document.getElementById('matchStatus').textContent = '1º Tempo';

    // Posicionar jogadores
    positionPlayers();

    // Iniciar simulação
    simulateMatch();
}

function positionPlayers() {
    const team1PlayersDiv = document.getElementById('team1Players');
    const team2PlayersDiv = document.getElementById('team2Players');
    team1PlayersDiv.innerHTML = '';
    team2PlayersDiv.innerHTML = '';

    const field = document.querySelector('.field');
    const fieldWidth = field.offsetWidth;
    const fieldHeight = field.offsetHeight;

    // Distribuir jogadores do time 1 (esquerda)
    team1Data.players.forEach((player, index) => {
        const playerEl = createPlayerElement(player, true);
        const x = (fieldWidth * 0.2) + (Math.random() * fieldWidth * 0.15);
        const y = (fieldHeight * 0.1) + (index % 5) * (fieldHeight / 5) + (Math.random() * fieldHeight * 0.08);
        playerEl.style.left = x + 'px';
        playerEl.style.top = y + 'px';
        team1PlayersDiv.appendChild(playerEl);
    });

    // Distribuir jogadores do time 2 (direita)
    team2Data.players.forEach((player, index) => {
        const playerEl = createPlayerElement(player, false);
        const x = (fieldWidth * 0.65) + (Math.random() * fieldWidth * 0.15);
        const y = (fieldHeight * 0.1) + (index % 5) * (fieldHeight / 5) + (Math.random() * fieldHeight * 0.08);
        playerEl.style.left = x + 'px';
        playerEl.style.top = y + 'px';
        team2PlayersDiv.appendChild(playerEl);
    });
}

function createPlayerElement(player, isTeam1) {
    const div = document.createElement('div');
    div.className = 'player';
    div.textContent = player.number;
    div.title = `${player.name} (${player.position})`;
    return div;
}

function simulateMatch() {
    if (!matchInProgress || matchPaused) return;

    if (matchTime < MATCH_DURATION) {
        matchTime++;
        updateMatchDisplay();

        // Simular eventos aleatórios
        if (Math.random() < 0.01) {
            simulateShot();
        }

        if (Math.random() < 0.005) {
            simulateGoal();
        }

        if (Math.random() < 0.002) {
            simulateCard();
        }

        setTimeout(simulateMatch, 100); // Atualizar a cada 100ms (representa 1.5 segundos por iteração)
    } else {
        endMatchNormally();
    }
}

function updateMatchDisplay() {
    const minutes = Math.floor(matchTime / 60);
    const seconds = matchTime % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('matchTime').textContent = timeStr;

    // Determinar tempo
    if (minutes < 45) {
        document.getElementById('matchStatus').textContent = '1º Tempo';
    } else if (minutes < 90) {
        document.getElementById('matchStatus').textContent = '2º Tempo';
    }
}

function simulateShot() {
    const isTeam1 = Math.random() < 0.5;
    const team = isTeam1 ? team1Data : team2Data;
    const attacker = team.players[Math.floor(Math.random() * team.players.length)];
    
    addEvent(`${team.name} - ${attacker.name} chuta!`);
    moveBall();
}

function simulateGoal() {
    const isTeam1 = Math.random() < 0.5;
    const team = isTeam1 ? team1Data : team2Data;
    const scorer = team.players[Math.floor(Math.random() * team.players.length)];

    if (isTeam1) {
        matchStats.team1.goals++;
        document.getElementById('team1Score').textContent = matchStats.team1.goals;
    } else {
        matchStats.team2.goals++;
        document.getElementById('team2Score').textContent = matchStats.team2.goals;
    }

    const minutes = Math.floor(matchTime / 60);
    addEvent(`⚽ GOL! ${scorer.name} (${team.name}) - ${minutes}'`, 'goal');
    moveBall();
}

function simulateCard() {
    const isTeam1 = Math.random() < 0.5;
    const team = isTeam1 ? team1Data : team2Data;
    const player = team.players[Math.floor(Math.random() * team.players.length)];
    const isRed = Math.random() < 0.2;

    if (isRed) {
        addEvent(`🔴 CARTÃO VERMELHO! ${player.name} (${team.name})`, 'red-card');
    } else {
        addEvent(`🟨 CARTÃO AMARELO! ${player.name} (${team.name})`, 'yellow-card');
    }
}

function moveBall() {
    const ball = document.getElementById('ball');
    ball.style.animation = 'none';
    
    setTimeout(() => {
        const x = Math.random() * 80 + 10;
        const y = Math.random() * 80 + 10;
        ball.style.left = x + '%';
        ball.style.top = y + '%';
        ball.style.animation = 'ballMove 0.5s ease';
    }, 10);
}

function addEvent(text, type = '') {
    const eventsList = document.getElementById('eventsList');
    const eventEl = document.createElement('div');
    eventEl.className = `event-item ${type}`;
    eventEl.textContent = text;
    eventsList.insertBefore(eventEl, eventsList.firstChild);

    // Manter apenas os últimos 20 eventos
    if (eventsList.children.length > 20) {
        eventsList.removeChild(eventsList.lastChild);
    }
}

function pauseMatch() {
    matchPaused = true;
    document.getElementById('pauseBtn').style.display = 'none';
    document.getElementById('resumeBtn').style.display = 'inline-block';
    addEvent('⏸️ Partida pausada');
}

function resumeMatch() {
    matchPaused = false;
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('resumeBtn').style.display = 'none';
    addEvent('▶️ Partida retomada');
    simulateMatch();
}

function endMatch() {
    if (confirm('Tem certeza que deseja encerrar a partida?')) {
        endMatchNormally();
    }
}

function endMatchNormally() {
    matchInProgress = false;
    showMatchResult();
}

function resetMatchSetup() {
    document.querySelector('.match-setup').style.display = 'grid';
    document.getElementById('matchField').classList.add('hidden');
    document.getElementById('team1Select').value = '';
    document.getElementById('team2Select').value = '';
    document.getElementById('eventsList').innerHTML = '';
    document.getElementById('pauseBtn').style.display = 'inline-block';
    document.getElementById('resumeBtn').style.display = 'none';
    matchInProgress = false;
    matchPaused = false;
    matchTime = 0;
}

function showMatchResult() {
    const resultDiv = document.getElementById('matchResult');
    const resultTitle = document.getElementById('resultTitle');
    const resultStats = document.getElementById('resultStats');

    const team1Goals = matchStats.team1.goals;
    const team2Goals = matchStats.team2.goals;
    let title = '';

    if (team1Goals > team2Goals) {
        title = `🏆 ${team1Data.name} venceu ${team1Goals}x${team2Goals}!`;
    } else if (team2Goals > team1Goals) {
        title = `🏆 ${team2Data.name} venceu ${team2Goals}x${team1Goals}!`;
    } else {
        title = `🤝 Empate ${team1Goals}x${team2Goals}`;
    }

    resultTitle.textContent = title;

    resultStats.innerHTML = `
        <h3>${team1Data.name}</h3>
        <div class="stat-row">
            <span>Gols:</span>
            <span>${team1Goals}</span>
        </div>
        <div class="stat-row">
            <span>Chutes:</span>
            <span>${matchStats.team1.shots}</span>
        </div>
        <hr style="margin: 15px 0; border: none; border-top: 1px solid rgba(255,255,255,0.3);">
        <h3>${team2Data.name}</h3>
        <div class="stat-row">
            <span>Gols:</span>
            <span>${team2Goals}</span>
        </div>
        <div class="stat-row">
            <span>Chutes:</span>
            <span>${matchStats.team2.shots}</span>
        </div>
    `;

    document.querySelector('.match-controls').style.display = 'none';
    resultDiv.classList.remove('hidden');
}

// ===== UTILITÁRIOS =====
window.addEventListener('beforeunload', function() {
    saveTeamsToStorage();
});