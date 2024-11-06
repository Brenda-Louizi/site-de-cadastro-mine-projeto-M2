
let materias = [];


function adicionarMateria() {
    const nome = document.getElementById('materia').value;  
    const duracao = parseInt(document.getElementById('duracao').value);
    const categoria = document.getElementById('categoria').value;
    const dia = document.getElementById('dia').value;

    if (!nome || isNaN(duracao) || !categoria || !dia) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    const novaMateria = { nome, duracao, categoria, dia };
    materias.push(novaMateria);
    atualizarLista();

    
    document.getElementById('materia').value = '';  
    document.getElementById('duracao').value = '';
    document.getElementById('categoria').value = '';
    document.getElementById('dia').value = '';
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
        topicoDia.innerHTML = `<h3>Dia: ${dia} - Total de Matérias: ${totalMaterias} | Tempo Total: ${horas}h ${minutos}min</h3>`;

        const listaDia = document.createElement('ul');
        materiasDoDia.forEach((materia, index) => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${materia.categoria}</strong>: ${materia.nome} - ${materia.duracao} min
                <div class="buttons">
                    <button class="edit-btn" onclick="editarMateria(${index}, '${dia}')">Editar</button>
                    <button class="delete-btn" onclick="excluirMateria(${index}, '${dia}')">Excluir</button>
                </div>
            `;
            listaDia.appendChild(item);
        });

        topicoDia.appendChild(listaDia);
        lista.appendChild(topicoDia);
    }
}


function editarMateria(index, dia) {
    const materia = materias.find((mat, i) => i === index && mat.dia === dia);

    if (materia) {
        document.getElementById('materia').value = materia.nome;
        document.getElementById('duracao').value = materia.duracao;
        document.getElementById('categoria').value = materia.categoria;
        document.getElementById('dia').value = materia.dia;

        materias = materias.filter((mat, i) => !(i === index && mat.dia === dia));
        atualizarLista();
    }
}

function excluirMateria(index, dia) {
    materias = materias.filter((mat, i) => !(i === index && mat.dia === dia));
    atualizarLista();
}
