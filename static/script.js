document.getElementById('consultaForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário

    const estado = document.getElementById('estado').value.toLowerCase();

    fetch(`/dados-json/${estado}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const resultadosTabela = document.getElementById('resultadosTabela');
            resultadosTabela.innerHTML = ''; // Limpa os resultados anteriores

            if (data.length > 0) {
                data.forEach(item => {
                    const linha = `<tr>
                                    <td>${item['Nome da instituição/unidade']}</td>
                                    <td>${item['Estado']}</td>
                                    <td>${item['Telefone 1']}</td>
                                    <td>${item['Modalidade de internação']}</td>
                                    <td>${item['Nome do Logradouro']} ${item['Número no Logradouro']}, ${item['Bairro']}</td>
                                  </tr>`;
                    resultadosTabela.innerHTML += linha;
                });
            } else {
                resultadosTabela.innerHTML = '<tr><td colspan="5">Nenhum resultado encontrado</td></tr>';
            }
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
});
