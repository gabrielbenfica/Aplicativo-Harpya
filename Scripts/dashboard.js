(() => {
  'use strict'

  const ctx = document.getElementById('myChart')
  const mesSelect = document.getElementById('mesSelect')
  const anoSelect = document.getElementById('anoSelect')

  let dados = []

  // Função para criar gráfico
  function criarGrafico(labels, data) {
    // se já existir gráfico, destruir para recriar
    if(window.grafico) window.grafico.destroy()

    window.grafico = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [{
          data,
          lineTension: 0,
          backgroundColor: 'transparent',
          borderColor: '#007bff',
          borderWidth: 2,
          fill: false,
          pointBackgroundColor: '#007bff'
        }]
      },
      options: {
        plugins: {
          legend: { display: false },
          tooltip: { boxPadding: 3 }
        }
      }
    })
  }

  // Função para filtrar dados por mês e ano
  function filtrarDados(mes, ano) {
    return dados.filter(item => {
      const [dd, mm, yyyy] = item.dia.split('/')
      return Number(mm) === mes && Number(yyyy) === ano
    })
  }

  // Atualiza gráfico conforme seleção
  function atualizarGrafico() {
    const mes = Number(mesSelect.value)
    const ano = Number(anoSelect.value)
    const dadosFiltrados = filtrarDados(mes, ano)
    const labels = dadosFiltrados.map(item => item.dia)
    const data = dadosFiltrados.map(item => item.valor)
    criarGrafico(labels, data)
  }

  // Carrega CSV e inicializa
  fetch('../assets/data/dados.csv')
    .then(response => response.text())
    .then(text => {
      const linhas = text.trim().split('\n')
      dados = []

      for(let i = 1; i < linhas.length; i++) {
        const [dia, valor] = linhas[i].split(',')
        dados.push({ dia, valor: Number(valor) })
      }

      atualizarGrafico()
    })
    .catch(err => console.error('Erro ao carregar CSV:', err))

  // Event listeners para filtros
  mesSelect.addEventListener('change', atualizarGrafico)
  anoSelect.addEventListener('change', atualizarGrafico)

})()
