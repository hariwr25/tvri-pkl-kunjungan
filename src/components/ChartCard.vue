<template>
  <div class="card bg-base-100 shadow-md p-6 rounded-lg">
    <h3 class="text-xl font-semibold mb-4">{{ title }}</h3>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { ref, onMounted, watch } from 'vue'
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  LineController,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
)

export default {
  name: 'ChartCard',
  props: {
    title: String,
    labels: Array,
    data: Array,
    chartType: {
      type: String,
      default: 'bar',
    },
    color: {
      type: String,
      default: 'blue',
    },
  },
  setup(props) {
    const canvas = ref(null)
    let chartInstance = null

    const createChart = () => {
      if (chartInstance) chartInstance.destroy()
      chartInstance = new Chart(canvas.value, {
        type: props.chartType,
        data: {
          labels: props.labels,
          datasets: [
            {
              label: props.title,
              data: props.data,
              backgroundColor:
                props.chartType === 'bar'
                  ? `rgba(59, 130, 246, 0.7)` // Tailwind blue-500
                  : 'transparent',
              borderColor: `rgba(59, 130, 246, 1)`,
              borderWidth: 2,
              fill: props.chartType === 'line',
              tension: 0.3,
              pointBackgroundColor: `rgba(59, 130, 246, 1)`,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: { stepSize: 1 },
            },
          },
        },
      })
    }

    onMounted(createChart)
    watch(
      () => [props.labels, props.data],
      () => {
        createChart()
      }
    )

    return { canvas }
  },
}
</script>

<style scoped>
canvas {
  width: 100% !important;
  height: 300px !important;
}
</style>
