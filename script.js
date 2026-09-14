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

// ===== TIMES PRÉ-CARREGADOS (50 TIMES) =====
const DEFAULT_TEAMS = [
    { name: "Flamengo", color: "#FF0000", formation: "4-3-3", players: [
        { id: 1, name: "Diego Alves", number: 1, position: "Goleiro", strength: 85, speed: 70, technique: 80, rating: 78 },
        { id: 2, name: "Filipe Luís", number: 6, position: "Lateral", strength: 82, speed: 85, technique: 88, rating: 85 },
        { id: 3, name: "Léo Pereira", number: 4, position: "Zagueiro", strength: 88, speed: 78, technique: 82, rating: 82 },
        { id: 4, name: "David Luiz", number: 23, position: "Zagueiro", strength: 85, speed: 75, technique: 85, rating: 81 },
        { id: 5, name: "Rodinei", number: 2, position: "Lateral", strength: 80, speed: 88, technique: 78, rating: 82 },
        { id: 6, name: "Arturo Vidal", number: 22, position: "Volante", strength: 90, speed: 82, technique: 88, rating: 86 },
        { id: 7, name: "João Gomes", number: 5, position: "Volante", strength: 85, speed: 80, technique: 82, rating: 82 },
        { id: 8, name: "Arrascaeta", number: 14, position: "Meia", strength: 82, speed: 85, technique: 90, rating: 85 },
        { id: 9, name: "Gabriel Barbosa", number: 9, position: "Atacante", strength: 88, speed: 90, technique: 87, rating: 88 },
        { id: 10, name: "Bruno Henrique", number: 17, position: "Atacante", strength: 85, speed: 88, technique: 85, rating: 86 },
        { id: 11, name: "Everton Ribeiro", number: 7, position: "Meia", strength: 80, speed: 82, technique: 88, rating: 83 }
    ]},
    { name: "São Paulo", color: "#0066FF", formation: "4-2-4", players: [
        { id: 12, name: "Rafael", number: 1, position: "Goleiro", strength: 82, speed: 70, technique: 78, rating: 76 },
        { id: 13, name: "Welington", number: 6, position: "Lateral", strength: 80, speed: 82, technique: 80, rating: 80 },
        { id: 14, name: "Ferraresi", number: 3, position: "Zagueiro", strength: 86, speed: 75, technique: 80, rating: 80 },
        { id: 15, name: "Miranda", number: 4, position: "Zagueiro", strength: 85, speed: 72, technique: 82, rating: 79 },
        { id: 16, name: "Rafinha", number: 2, position: "Lateral", strength: 78, speed: 80, technique: 82, rating: 80 },
        { id: 17, name: "Pablo Maia", number: 25, position: "Volante", strength: 82, speed: 78, technique: 80, rating: 80 },
        { id: 18, name: "Liziero", number: 33, position: "Volante", strength: 80, speed: 80, technique: 78, rating: 79 },
        { id: 19, name: "Rigoni", number: 7, position: "Meia", strength: 80, speed: 85, technique: 88, rating: 84 },
        { id: 20, name: "Calleri", number: 9, position: "Atacante", strength: 87, speed: 82, technique: 85, rating: 84 },
        { id: 21, name: "Luciano", number: 10, position: "Atacante", strength: 85, speed: 87, technique: 84, rating: 85 },
        { id: 22, name: "Igor Vinícius", number: 16, position: "Meia", strength: 78, speed: 84, technique: 82, rating: 81 }
    ]},
    { name: "Palmeiras", color: "#009933", formation: "4-3-3", players: [
        { id: 23, name: "Weverton", number: 1, position: "Goleiro", strength: 85, speed: 75, technique: 82, rating: 80 },
        { id: 24, name: "Piquerez", number: 6, position: "Lateral", strength: 82, speed: 80, technique: 82, rating: 81 },
        { id: 25, name: "Gustavo Gómez", number: 15, position: "Zagueiro", strength: 88, speed: 76, technique: 80, rating: 81 },
        { id: 26, name: "Murilo", number: 4, position: "Zagueiro", strength: 86, speed: 78, technique: 82, rating: 82 },
        { id: 27, name: "Marcos Rocha", number: 2, position: "Lateral", strength: 80, speed: 82, technique: 80, rating: 80 },
        { id: 28, name: "Danilo", number: 14, position: "Volante", strength: 85, speed: 80, technique: 82, rating: 82 },
        { id: 29, name: "Zé Rafael", number: 5, position: "Volante", strength: 84, speed: 78, technique: 80, rating: 80 },
        { id: 30, name: "Raphael Veiga", number: 23, position: "Meia", strength: 80, speed: 82, technique: 88, rating: 83 },
        { id: 31, name: "Dudu", number: 7, position: "Atacante", strength: 85, speed: 88, technique: 86, rating: 86 },
        { id: 32, name: "Endrick", number: 9, position: "Atacante", strength: 82, speed: 90, technique: 88, rating: 86 },
        { id: 33, name: "Bruma", number: 11, position: "Meia", strength: 80, speed: 86, technique: 84, rating: 83 }
    ]},
    { name: "Corinthians", color: "#FFF000", formation: "4-4-2", players: [
        { id: 34, name: "Cássio", number: 1, position: "Goleiro", strength: 84, speed: 72, technique: 80, rating: 78 },
        { id: 35, name: "Lucas Piton", number: 6, position: "Lateral", strength: 80, speed: 82, technique: 80, rating: 80 },
        { id: 36, name: "Raul Gustavo", number: 4, position: "Zagueiro", strength: 86, speed: 75, technique: 78, rating: 79 },
        { id: 37, name: "Balbuena", number: 3, position: "Zagueiro", strength: 85, speed: 76, technique: 80, rating: 80 },
        { id: 38, name: "Rafael", number: 2, position: "Lateral", strength: 78, speed: 80, technique: 78, rating: 78 },
        { id: 39, name: "Fábio Santos", number: 17, position: "Lateral", strength: 76, speed: 78, technique: 76, rating: 76 },
        { id: 40, name: "Cantillo", number: 5, position: "Volante", strength: 82, speed: 78, technique: 80, rating: 80 },
        { id: 41, name: "Du Queiroz", number: 21, position: "Volante", strength: 80, speed: 76, technique: 78, rating: 78 },
        { id: 42, name: "Willian", number: 10, position: "Meia", strength: 80, speed: 82, technique: 88, rating: 83 },
        { id: 43, name: "Yuri Alberto", number: 9, position: "Atacante", strength: 86, speed: 84, technique: 82, rating: 84 },
        { id: 44, name: "Roger Guedes", number: 7, position: "Atacante", strength: 82, speed: 88, technique: 84, rating: 84 }
    ]},
    { name: "Botafogo", color: "#000000", formation: "3-5-2", players: [
        { id: 45, name: "John", number: 1, position: "Goleiro", strength: 80, speed: 68, technique: 76, rating: 74 },
        { id: 46, name: "Marçal", number: 6, position: "Lateral", strength: 78, speed: 80, technique: 78, rating: 78 },
        { id: 47, name: "Bastos", number: 4, position: "Zagueiro", strength: 84, speed: 72, technique: 76, rating: 77 },
        { id: 48, name: "Kanu", number: 14, position: "Zagueiro", strength: 82, speed: 70, technique: 74, rating: 75 },
        { id: 49, name: "Hugo", number: 2, position: "Lateral", strength: 76, speed: 78, technique: 76, rating: 76 },
        { id: 50, name: "Gatito Fernández", number: 1, position: "Goleiro", strength: 78, speed: 70, technique: 74, rating: 74 },
        { id: 51, name: "Tchê Tchê", number: 5, position: "Volante", strength: 80, speed: 76, technique: 78, rating: 78 },
        { id: 52, name: "Patrick de Paula", number: 8, position: "Volante", strength: 78, speed: 76, technique: 76, rating: 76 },
        { id: 53, name: "Janderson", number: 20, position: "Meia", strength: 76, speed: 82, technique: 80, rating: 79 },
        { id: 54, name: "Luiz Henrique", number: 7, position: "Atacante", strength: 80, speed: 86, technique: 82, rating: 82 },
        { id: 55, name: "Tiquinho Soares", number: 9, position: "Atacante", strength: 82, speed: 80, technique: 78, rating: 80 }
    ]},
    { name: "Santos", color: "#FFFFFF", formation: "4-3-3", players: [
        { id: 56, name: "João Paulo", number: 1, position: "Goleiro", strength: 82, speed: 70, technique: 78, rating: 76 },
        { id: 57, name: "Felipe Jonatan", number: 6, position: "Lateral", strength: 80, speed: 82, technique: 80, rating: 80 },
        { id: 58, name: "Maicon", number: 4, position: "Zagueiro", strength: 84, speed: 74, technique: 78, rating: 78 },
        { id: 59, name: "Luan Peres", number: 3, position: "Zagueiro", strength: 82, speed: 76, technique: 78, rating: 78 },
        { id: 60, name: "Nathan", number: 2, position: "Lateral", strength: 78, speed: 80, technique: 76, rating: 78 },
        { id: 61, name: "Camacho", number: 5, position: "Volante", strength: 80, speed: 76, technique: 76, rating: 77 },
        { id: 62, name: "Vinicius Balieiro", number: 28, position: "Volante", strength: 76, speed: 74, technique: 74, rating: 74 },
        { id: 63, name: "Lucas Braga", number: 16, position: "Meia", strength: 76, speed: 80, technique: 82, rating: 79 },
        { id: 64, name: "Soteldo", number: 10, position: "Atacante", strength: 80, speed: 88, technique: 86, rating: 84 },
        { id: 65, name: "Jhojan Montoya", number: 7, position: "Atacante", strength: 78, speed: 84, technique: 80, rating: 80 },
        { id: 66, name: "Madson", number: 9, position: "Atacante", strength: 76, speed: 78, technique: 74, rating: 76 }
    ]},
    { name: "Atlético Mineiro", color: "#000000", formation: "4-2-4", players: [
        { id: 67, name: "Everson", number: 1, position: "Goleiro", strength: 84, speed: 72, technique: 80, rating: 78 },
        { id: 68, name: "Guilherme Arana", number: 6, position: "Lateral", strength: 82, speed: 84, technique: 84, rating: 83 },
        { id: 69, name: "Nathan Silva", number: 4, position: "Zagueiro", strength: 86, speed: 74, technique: 80, rating: 80 },
        { id: 70, name: "Igor Rabello", number: 3, position: "Zagueiro", strength: 84, speed: 72, technique: 78, rating: 78 },
        { id: 71, name: "Mariano", number: 2, position: "Lateral", strength: 80, speed: 82, technique: 80, rating: 80 },
        { id: 72, name: "Alan Franco", number: 5, position: "Volante", strength: 84, speed: 76, technique: 80, rating: 80 },
        { id: 73, name: "Jemerson", number: 15, position: "Volante", strength: 82, speed: 74, technique: 78, rating: 78 },
        { id: 74, name: "Keno", number: 11, position: "Meia", strength: 80, speed: 86, technique: 84, rating: 83 },
        { id: 75, name: "Pedrinho", number: 22, position: "Meia", strength: 78, speed: 84, technique: 82, rating: 81 },
        { id: 76, name: "Hulk", number: 7, position: "Atacante", strength: 88, speed: 84, technique: 82, rating: 84 },
        { id: 77, name: "Diego Costa", number: 9, position: "Atacante", strength: 86, speed: 80, technique: 82, rating: 82 }
    ]},
    { name: "Grêmio", color: "#0099CC", formation: "4-3-3", players: [
        { id: 78, name: "Marchesín", number: 1, position: "Goleiro", strength: 82, speed: 70, technique: 78, rating: 76 },
        { id: 79, name: "Kannemann", number: 4, position: "Zagueiro", strength: 86, speed: 74, technique: 82, rating: 80 },
        { id: 80, name: "Geromel", number: 3, position: "Zagueiro", strength: 84, speed: 72, technique: 80, rating: 78 },
        { id: 81, name: "Paulo Miranda", number: 2, position: "Lateral", strength: 78, speed: 76, technique: 76, rating: 76 },
        { id: 82, name: "Cortez", number: 6, position: "Lateral", strength: 80, speed: 80, technique: 80, rating: 80 },
        { id: 83, name: "Villasanti", number: 5, position: "Volante", strength: 82, speed: 78, technique: 80, rating: 80 },
        { id: 84, name: "Bitello", number: 20, position: "Volante", strength: 80, speed: 76, technique: 78, rating: 78 },
        { id: 85, name: "Ferreira", number: 7, position: "Meia", strength: 78, speed: 82, technique: 84, rating: 81 },
        { id: 86, name: "Suárez", number: 9, position: "Atacante", strength: 84, speed: 82, technique: 86, rating: 84 },
        { id: 87, name: "João Pedro", number: 10, position: "Atacante", strength: 82, speed: 84, technique: 84, rating: 83 },
        { id: 88, name: "Alisson", number: 11, position: "Meia", strength: 76, speed: 80, technique: 82, rating: 79 }
    ]},
    { name: "Internacional", color: "#FF0000", formation: "4-4-2", players: [
        { id: 89, name: "Kepler", number: 1, position: "Goleiro", strength: 80, speed: 68, technique: 76, rating: 74 },
        { id: 90, name: "Maidana", number: 6, position: "Lateral", strength: 80, speed: 80, technique: 80, rating: 80 },
        { id: 91, name: "Paulo Miranda", number: 4, position: "Zagueiro", strength: 82, speed: 72, technique: 78, rating: 77 },
        { id: 92, name: "Vitão", number: 3, position: "Zagueiro", strength: 80, speed: 74, technique: 76, rating: 76 },
        { id: 93, name: "Rodinei", number: 2, position: "Lateral", strength: 78, speed: 82, technique: 78, rating: 79 },
        { id: 94, name: "Gabriel Mercado", number: 5, position: "Volante", strength: 80, speed: 76, technique: 78, rating: 78 },
        { id: 95, name: "Johnny", number: 15, position: "Volante", strength: 78, speed: 74, technique: 76, rating: 76 },
        { id: 96, name: "Sardar Azmoun", number: 10, position: "Meia", strength: 82, speed: 84, technique: 84, rating: 83 },
        { id: 97, name: "Taison", number: 8, position: "Meia", strength: 80, speed: 82, technique: 84, rating: 82 },
        { id: 98, name: "Peglow", number: 9, position: "Atacante", strength: 80, speed: 82, technique: 80, rating: 80 },
        { id: 99, name: "Enner Valencia", number: 7, position: "Atacante", strength: 84, speed: 80, technique: 78, rating: 80 }
    ]},
    { name: "Vasco da Gama", color: "#000000", formation: "3-5-2", players: [
        { id: 100, name: "Léo Jardim", number: 1, position: "Goleiro", strength: 80, speed: 68, technique: 76, rating: 74 },
        { id: 101, name: "Edimar Martínez", number: 6, position: "Lateral", strength: 78, speed: 78, technique: 76, rating: 77 },
        { id: 102, name: "Anderson Conceição", number: 4, position: "Zagueiro", strength: 82, speed: 72, technique: 76, rating: 76 },
        { id: 103, name: "Castan", number: 3, position: "Zagueiro", strength: 80, speed: 70, technique: 74, rating: 74 },
        { id: 104, name: "Héverson", number: 2, position: "Lateral", strength: 76, speed: 76, technique: 74, rating: 75 },
        { id: 105, name: "Zé Gabriel", number: 5, position: "Volante", strength: 78, speed: 74, technique: 76, rating: 76 },
        { id: 106, name: "Andrey Santos", number: 28, position: "Volante", strength: 76, speed: 76, technique: 74, rating: 75 },
        { id: 107, name: "Dmitri Chistyakov", number: 18, position: "Meia", strength: 74, speed: 78, technique: 80, rating: 77 },
        { id: 108, name: "Emerson Rodríguez", number: 7, position: "Atacante", strength: 78, speed: 80, technique: 80, rating: 79 },
        { id: 109, name: "Germanier", number: 9, position: "Atacante", strength: 76, speed: 78, technique: 76, rating: 76 },
        { id: 110, name: "Figueiredo", number: 10, position: "Meia", strength: 74, speed: 76, technique: 78, rating: 76 }
    ]},
    { name: "Cruzeiro", color: "#0000FF", formation: "4-3-3", players: [
        { id: 111, name: "Rafael Cabral", number: 1, position: "Goleiro", strength: 80, speed: 70, technique: 76, rating: 75 },
        { id: 112, name: "Cáceres", number: 6, position: "Lateral", strength: 78, speed: 80, technique: 78, rating: 78 },
        { id: 113, name: "Vitor Pedroto", number: 4, position: "Zagueiro", strength: 82, speed: 72, technique: 76, rating: 76 },
        { id: 114, name: "João Paulo", number: 3, position: "Zagueiro", strength: 80, speed: 70, technique: 74, rating: 74 },
        { id: 115, name: "Barros", number: 2, position: "Lateral", strength: 76, speed: 78, technique: 76, rating: 76 },
        { id: 116, name: "Lucas Romero", number: 5, position: "Volante", strength: 80, speed: 76, technique: 78, rating: 78 },
        { id: 117, name: "Ramires", number: 8, position: "Volante", strength: 78, speed: 74, technique: 76, rating: 76 },
        { id: 118, name: "Jadsom", number: 15, position: "Meia", strength: 76, speed: 80, technique: 82, rating: 79 },
        { id: 119, name: "Marquinhos Gabriel", number: 7, position: "Atacante", strength: 78, speed: 82, technique: 80, rating: 80 },
        { id: 120, name: "Luvannor", number: 9, position: "Atacante", strength: 76, speed: 80, technique: 78, rating: 78 },
        { id: 121, name: "Rafa Silva", number: 11, position: "Meia", strength: 74, speed: 78, technique: 80, rating: 77 }
    ]},
    // Continuando com 40 times adicionais...
    { name: "Fortaleza", color: "#CC0000", formation: "4-2-4", players: [] },
    { name: "Cebolinha", color: "#FF0000", formation: "4-3-3", players: [] },
    { name: "Bahia", color: "#0066FF", formation: "4-4-2", players: [] },
    { name: "Vitória", color: "#FF0000", formation: "3-5-2", players: [] },
    { name: "Paysandu", color: "#0099FF", formation: "4-3-3", players: [] },
    { name: "Remo", color: "#0099FF", formation: "4-2-4", players: [] },
    { name: "Goiás", color: "#006633", formation: "4-3-3", players: [] },
    { name: "Atlético Goianiense", color: "#FF0000", formation: "4-4-2", players: [] },
    { name: "Cuiabá", color: "#00AA66", formation: "3-5-2", players: [] },
    { name: "Distrito Federal", color: "#FFCC00", formation: "4-3-3", players: [] },
    { name: "Gama", color: "#FF6600", formation: "4-2-4", players: [] },
    { name: "Ceilândia", color: "#FF0000", formation: "4-4-2", players: [] },
    { name: "Brasiliense", color: "#FF0000", formation: "4-3-3", players: [] },
    { name: "Real Brasília", color: "#FFCC00", formation: "4-2-4", players: [] },
    { name: "Sampaio Corrêa", color: "#003366", formation: "4-3-3", players: [] },
    { name: "Moto Clube", color: "#FF0000", formation: "4-4-2", players: [] },
    { name: "Maranhão", color: "#FF0000", formation: "3-5-2", players: [] },
    { name: "Náutico", color: "#FF0000", formation: "4-3-3", players: [] },
    { name: "Santa Cruz", color: "#FF0000", formation: "4-2-4", players: [] },
    { name: "Sport Recife", color: "#FF0000", formation: "4-3-3", players: [] },
    { name: "Salgueiro", color: "#FF0000", formation: "4-4-2", players: [] },
    { name: "ABC", color: "#FF0000", formation: "4-3-3", players: [] },
    { name: "América do Rio Grande do Norte", color: "#FF0000", formation: "3-5-2", players: [] },
    { name: "Alecrim", color: "#FF0000", formation: "4-2-4", players: [] },
    { name: "Paraíba", color: "#00CC00", formation: "4-3-3", players: [] },
    { name: "Campinense", color: "#00CC00", formation: "4-4-2", players: [] },
    { name: "Treze", color: "#00CC00", formation: "4-3-3", players: [] },
    { name: "Sousa", color: "#00CC00", formation: "3-5-2", players: [] },
    { name: "CSP", color: "#00CC00", formation: "4-2-4", players: [] },
    { name: "Ceará", color: "#0066FF", formation: "4-3-3", players: [] },
    { name: "Ferroviário", color: "#0066FF", formation: "4-4-2", players: [] },
    { name: "Caucaia", color: "#0066FF", formation: "4-3-3", players: [] },
    { name: "Atlético Cearense", color: "#FF0000", formation: "3-5-2", players: [] },
    { name: "Iguatu", color: "#0066FF", formation: "4-2-4", players: [] },
    { name: "Juazeirense", color: "#FF9900", formation: "4-3-3", players: [] },
    { name: "Bragantino", color: "#FF0000", formation: "4-4-2", players: [] },
    { name: "Guarani", color: "#00CC00", formation: "4-3-3", players: [] },
    { name: "Ponte Preta", color: "#FFFFFF", formation: "3-5-2", players: [] },
    { name: "Avaí", color: "#0066FF", formation: "4-2-4", players: [] },
    { name: "Chapecoense", color: "#00CC00", formation: "4-3-3", players: [] },
    { name: "Santa Catarina", color: "#FF0000", formation: "4-4-2", players: [] }
];

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
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    const section = document.getElementById(sectionName);
    if (section) {
        section.classList.add('active');
    }

    const navBtn = document.querySelector(`[data-section="${sectionName}"]`);
    if (navBtn) {
        navBtn.classList.add('active');
    }

    if (sectionName === 'match') {
        resetMatchSetup();
    }
}

// ===== ARMAZENAMENTO LOCAL =====
function loadTeamsFromStorage() {
    const stored = localStorage.getItem('footballTeams');
    if (stored) {
        teams = JSON.parse(stored);
    } else {
        // Primeira vez: carregar times padrão
        teams = JSON.parse(JSON.stringify(DEFAULT_TEAMS));
        saveTeamsToStorage();
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
            const firstOption = select.options[0];
            select.innerHTML = '';
            select.appendChild(firstOption);

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

    matchStats = {
        team1: { goals: 0, shots: 0, possession: 0 },
        team2: { goals: 0, shots: 0, possession: 0 }
    };
    matchTime = 0;
    matchInProgress = true;
    matchPaused = false;

    document.querySelector('.match-setup').style.display = 'none';
    document.getElementById('matchField').classList.remove('hidden');

    document.getElementById('team1Name').textContent = team1Data.name;
    document.getElementById('team2Name').textContent = team2Data.name;
    document.getElementById('team1Score').textContent = '0';
    document.getElementById('team2Score').textContent = '0';
    document.getElementById('matchStatus').textContent = '1º Tempo';

    positionPlayers();
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

    team1Data.players.forEach((player, index) => {
        const playerEl = createPlayerElement(player, true);
        const x = (fieldWidth * 0.2) + (Math.random() * fieldWidth * 0.15);
        const y = (fieldHeight * 0.1) + (index % 5) * (fieldHeight / 5) + (Math.random() * fieldHeight * 0.08);
        playerEl.style.left = x + 'px';
        playerEl.style.top = y + 'px';
        team1PlayersDiv.appendChild(playerEl);
    });

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

        if (Math.random() < 0.01) {
            simulateShot();
        }

        if (Math.random() < 0.005) {
            simulateGoal();
        }

        if (Math.random() < 0.002) {
            simulateCard();
        }

        setTimeout(simulateMatch, 100);
    } else {
        endMatchNormally();
    }
}

function updateMatchDisplay() {
    const minutes = Math.floor(matchTime / 60);
    const seconds = matchTime % 60;
    const timeStr = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    document.getElementById('matchTime').textContent = timeStr;

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

window.addEventListener('beforeunload', function() {
    saveTeamsToStorage();
});