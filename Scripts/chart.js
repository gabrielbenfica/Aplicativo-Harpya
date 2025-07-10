const ctx = document.getElementById('acessosGrafico').getContext('2d');

new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['01/07/2025', '02/07/2025', '03/07/2025', '04/07/2025', '05/07/2025'],
    datasets: [{
      label: 'Número de acessos',
      data: [5, 8, 12, 7, 3],
      borderColor: '#03e9f4',
      backgroundColor: 'rgba(3, 233, 244, 0.2)',
      tension: 0.4
    }]
  },
  options: {
    responsive: true,                 // ✅ Mantém responsivo
    maintainAspectRatio: true,       // ✅ Respeita aspect-ratio do CSS
    plugins: {
      legend: { display: false }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: { color: '#fff' }
      },
      x: {
        ticks: { color: '#fff' }
      }
    }
  }
});
