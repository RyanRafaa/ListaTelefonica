//Ana Beatriz Sena
//Ryan Rafael Rocha Gonçalves Severino

let appForm = document.getElementById('app-form');
let listaPessoas = document.getElementById('listaPessoas');
let btnOrdenar = document.getElementById('btnOrdenar');


let pessoas = [];

appForm.onsubmit = addPessoa;
btnOrdenar.onclick = ordenarLista;

function addPessoa(e){
	e.preventDefault();

	console.log(e);

	let nome = e.target.pessoaNome.value;
	let endereco = e.target.pessoaEndereco.value;
	let telefone = e.target.pessoaTelefone.value
    let cidade = e.target.pessoaCidade.value
    let estado = e.target.pessoaEstado.value

	let pessoa = { nome, endereco, telefone, cidade, estado };

	let validation = validarCampos(pessoa);
	if(!validation.status){
		alert(validation.error);
		return;
	}
	pessoas.push(pessoa);
	appForm.reset();
	mostrarLista();
	console.log(pessoas);
}

function validarCampos(pessoa){
	let validation = { status: true, error: '', };

	if(pessoa.nome.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo Nome';
	}
	else if(pessoa.endereco.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo Endereço';
	}
	else if(pessoa.telefone.length < 10){
		validation.status = false;
		validation.error = 'Preencha o campo Telefone corretamente';
	}
    else if(pessoa.cidade.length === 0){
		validation.status = false;
		validation.error = 'Preencha o campo Cidade';
	}
	return validation;
}

function mostrarLista(){
	listaPessoas.innerHTML = '';
	for(pessoa of pessoas){
		let nomeEl = document.createElement('strong');
		nomeEl.appendChild(document.createTextNode(pessoa.nome));

        let enderecoEl = document.createElement('p');
		enderecoEl.appendChild(document.createTextNode(`Endereço: ${pessoa.endereco}, ${pessoa.cidade}-${pessoa.estado} `));

		let telefoneEl = document.createElement('p');
		telefoneEl.appendChild(document.createTextNode(`Telefone: ${pessoa.telefone}`));

		let indice = pessoas.indexOf(pessoa);

		let removerEl = document.createElement('a');
		removerEl.setAttribute('href', '#');
		let removerText = document.createTextNode('Remover');
		removerEl.appendChild(removerText);
		removerEl.setAttribute('onclick', 'removerPessoa(' + indice + ')');
        

		let itemEl = document.createElement('li');
		itemEl.appendChild(nomeEl);
        itemEl.appendChild(enderecoEl);
		itemEl.appendChild(telefoneEl);
		itemEl.appendChild(removerEl);

		listaPessoas.appendChild(itemEl);
	}
}

function removerPessoa(indice){
	pessoas.splice(indice, 1);
	mostrarLista();
}



function ordenarLista(){
	pessoas.sort(function(a, b){
		let x = a.nome.toLowerCase() + a.endereco.toLowerCase();
		let y = b.nome.toLowerCase() + b.endereco.toLowerCase();
		if(x < y) return -1;
		if(x > y) return 1;
		return 0;
	});
	mostrarLista();
}

let inputElement = document.querySelector("input")
let listElement = document.querySelector("ul")
let itemElement = listElement.querySelectorAll("li")

inputElement.addEventListener("input", (e) => {
	desenhar(e.target.value)
});

function desenhar(search){
    listaPessoas.innerHTML = '';
	const FILTRO = search;
    var data = pessoas;
    if(FILTRO.trim()){
            const expReg = eval(`/${FILTRO.trim().replace(/[^\d\w]+/g,'.*')}/i`)
            data = data.filter( pessoa => {
                return expReg.test( pessoa.nome ) || expReg.test( pessoa.telefone ) || expReg.test( pessoa.endereco ) || expReg.test( pessoa.cidade) || expReg.test( pessoa.estado )
        	} )
   		}
        data = data
            .map( pessoa => {
                let nomeEl = document.createElement('strong');
				nomeEl.appendChild(document.createTextNode(pessoa.nome));

				let enderecoEl = document.createElement('p');
				enderecoEl.appendChild(document.createTextNode(`Endereço: ${pessoa.endereco}, ${pessoa.cidade}-${pessoa.estado} `));

				let telefoneEl = document.createElement('p');
				telefoneEl.appendChild(document.createTextNode(`Telefone: ${pessoa.telefone}`));

				let indice = pessoas.indexOf(pessoa);

				let removerEl = document.createElement('a');
				removerEl.setAttribute('href', '#');
				let removerText = document.createTextNode('Remover');
				removerEl.appendChild(removerText);
				removerEl.setAttribute('onclick', 'removerPessoa(' + indice + ')');
				

				let itemEl = document.createElement('li');
				itemEl.appendChild(nomeEl);
				itemEl.appendChild(enderecoEl);
				itemEl.appendChild(telefoneEl);
				itemEl.appendChild(removerEl);

				listaPessoas.appendChild(itemEl);
    		} )
}



