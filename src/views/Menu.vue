<template>
  <div>
    <main class="card">
      <div class="page_header">Nosso Cardápio</div>
      <table class="table">
        <tr v-for="flavor of flavorList" :key="flavor.id">
          <td>{{ flavor.nome }}</td>
          <td>R$ {{ formatPrice(flavor.valor) }}</td>
        </tr>
      </table>
    </main>
  </div>
</template>

<script>

import api from '@/services/ApiService.js'

export default {

    data() {
			return {
				flavorList: []
			}
    },

		mounted() {
			this.getFlavors()
		},

		methods: {
			getFlavors() {
        api.get('').then(response => {
					this.flavorList = response.data
				})

				this.selectedFlavors = [null, null, null]
			},

      formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			}
		}
}

</script>
