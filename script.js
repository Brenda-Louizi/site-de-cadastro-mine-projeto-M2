
class Materia {
    constructor(nome, duracao, categoria, dia) {
        this.nome = nome;
        this.duracao = duracao;
        this.categoria = categoria;
        this.dia = dia;
    }

    editar(nome, duracao, categoria, dia) {
        this.nome = nome;
        this.duracao = duracao;
        this.categoria = categoria;
        this.dia = dia;
    }
}


class MateriasManager {
    constructor() {
        this.materias = [];
    }

    adicionarMateria(materia) {
        this.materias.push(materia);
        this.atualizarLista();
    }

    editarMateria(index, nome, duracao, categoria, dia) {
        const materia = this.materias[index];
        if (materia) {
            materia.editar(nome, duracao, categoria, dia);
            this.atualizarLista();
        }
    }

    excluirMateria(index) {
        this.materias.splice(index, 1);
        this.atualizarLista();
    }

    atualizarLista() {
        const lista = document.getElementById('lista-materias');
        lista.innerHTML = ""; 
        const materiasPorDia = this.organizarPorDia();
        for (const dia in materiasPorDia) {
            const materiasDoDia = materiasPorDia[dia];

            const tempoTotalMinutos = materiasDoDia.reduce((total, materia) => total + materia.duracao, 0);
            const horas = Math.floor(tempoTotalMinutos / 60);
            const minutos = tempoTotalMinutos % 60;
            const totalMaterias = materiasDoDia.length;

            const topicoDia = document.createElement('div');
            topicoDia.innerHTML = `<h3>Dia: ${dia} - Total de Matérias: ${totalMaterias} | Tempo Total: ${horas}h ${minutos}min</h3>`;

            const listaDia = document.createElement('ul');
            materiasDoDia.forEach((materia, index) => {
                const item = document.createElement('li');
                item.innerHTML = `
                    <strong>${materia.categoria}</strong>: ${materia.nome} - ${materia.duracao} min
                    <div class="buttons">
                        <button class="edit-btn" onclick="editarMateria(${index}, '${dia}')">Editar</button>
                        <button class="delete-btn" onclick="excluirMateria(${index})">Excluir</button>
                    </div>
                `;
                listaDia.appendChild(item);
            });

            topicoDia.appendChild(listaDia);
            lista.appendChild(topicoDia);
        }
    }

    organizarPorDia() {
        return this.materias.reduce((acc, materia) => {
            if (!acc[materia.dia]) {
                acc[materia.dia] = [];
            }
            acc[materia.dia].push(materia);
            return acc;
        }, {});
    }
}


const materiasManager = new MateriasManager();


function adicionarMateria() {
    const nome = document.getElementById('materia').value;
    const duracao = parseInt(document.getElementById('duracao').value);
    const categoria = document.getElementById('categoria').value;
    const dia = document.getElementById('dia').value;

    if (!nome || isNaN(duracao) || !categoria || !dia) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaMateria = new Materia(nome, duracao, categoria, dia);
    materiasManager.adicionarMateria(novaMateria);

    
    document.getElementById('materia').value = '';
    document.getElementById('duracao').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('dia').value = '';
}


function editarMateria(index, dia) {
    const materia = materiasManager.materias[index];
    if (materia) {
        document.getElementById('materia').value = materia.nome;
        document.getElementById('duracao').value = materia.duracao;
        document.getElementById('categoria').value = materia.categoria;
        document.getElementById('dia').value = materia.dia;

        
        materiasManager.excluirMateria(index);
    }
}


function excluirMateria(index) {
    materiasManager.excluirMateria(index);
}
