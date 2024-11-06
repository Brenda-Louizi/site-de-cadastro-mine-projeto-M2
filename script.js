
class Materia {
    constructor(categoria, nome, duracao, dia) {
        this.categoria = categoria;
        this.nome = nome;
        this.duracao = parseInt(duracao);  
        this.dia = dia;
    }
}


let materias = [];


function cadastrarMateria() {
    const categoria = document.getElementById('categoria').value;
    const nome = document.getElementById('materia').value;
    const duracao = document.getElementById('duracao').value;
    const dia = document.getElementById('dia').value;
    
   
    if (!nome || !duracao || !dia) {
        alert("Por favor, preencha todos os campos!");
        return;
    }
    
    
    const materia = new Materia(categoria, nome, duracao, dia);
    materias.push(materia);
    
   
    atualizarLista();
}


function atualizarLista() {
    const lista = document.getElementById('lista-materias');
    lista.innerHTML = "";  
    
    
    const materiasPorDia = {};
    materias.forEach(materia => {
        if (!materiasPorDia[materia.dia]) {
            materiasPorDia[materia.dia] = [];
        }
        materiasPorDia[materia.dia].push(materia);
    });

    
    for (const dia in materiasPorDia) {
        const materiasDoDia = materiasPorDia[dia];
        
        
        const tempoTotalMinutos = materiasDoDia.reduce((total, materia) => total + materia.duracao, 0);
        const horas = Math.floor(tempoTotalMinutos / 60);
        const minutos = tempoTotalMinutos % 60;
        const totalMaterias = materiasDoDia.length;

        
        const topicoDia = document.createElement('div');
        topicoDia.innerHTML = `<h3>Dia: ${dia} - Total de Matérias: ${totalMaterias}</h3>`;

        
        const listaDia = document.createElement('ul');
        materiasDoDia.forEach((materia, index) => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${materia.categoria}</strong>: ${materia.nome} - ${materia.duracao} min
                <button onclick="editarMateria(${materias.indexOf(materia)})">Editar</button>
                <button onclick="excluirMateria(${materias.indexOf(materia)})">Excluir</button>
            `;
            listaDia.appendChild(item);
        });

        
        const tempoTotalDia = document.createElement('p');
        tempoTotalDia.textContent = `Tempo Total: ${horas}h ${minutos}min`;

        topicoDia.appendChild(listaDia);
        topicoDia.appendChild(tempoTotalDia);
        lista.appendChild(topicoDia);
    }
}


function excluirMateria(index) {
    materias.splice(index, 1); 
    atualizarLista(); 
}


function editarMateria(index) {
    const materia = materias[index];
    document.getElementById('categoria').value = materia.categoria;
    document.getElementById('materia').value = materia.nome;
    document.getElementById('duracao').value = materia.duracao;
    document.getElementById('dia').value = materia.dia;
    
    
    excluirMateria(index);
}


window.onload = atualizarLista;
