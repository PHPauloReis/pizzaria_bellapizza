<template>
	<div>
		<main class="card">

			<div class="page_header">Configure o seu pedido</div>
			
			<label for="flavorAmount">Quantidade de fatias</label>
			<select name="flavorAmount" id="flavorAmount" v-model="flavorAmount" v-on:change="showFlavors">
				<option value="0">--- Selecione a quantidade ---</option>
				<option value="1">1 sabor</option>
				<option value="2">2 sabores</option>
				<option value="3">3 sabores</option>
			</select>

			<div v-if="flavorAmount > 0">
				<label v-if="flavorAmount > 1" class="form-label" for="flavor1">Sabor da parte 1</label>
				<label v-else class="form-label" for="flavor1">Sabor</label>
				<select v-on:change="selectFlavor($event, 1)" name="flavor1" id="flavor1">
					<option value="">--- Selecione ---</option>
					<option v-for="flavor of flavorList" :key="flavor.id" :value="flavor.id">{{ flavor.nome }}</option>
				</select>
			</div>

			<div v-if="flavorAmount > 1">
				<label v-if="flavorAmount > 1" class="form-label" for="flavor2">Sabor da parte 2</label>
				<select v-on:change="selectFlavor($event, 2)" name="flavor2" id="flavor2">
					<option value="">--- Selecione ---</option>
					<option v-for="flavor of flavorList" :key="flavor.id" :value="flavor.id">{{ flavor.nome }}</option>
				</select>
			</div>

			<div v-if="flavorAmount > 2">
				<label class="form-label" for="flavor3">Sabor da parte 3</label>
				<select v-on:change="selectFlavor($event, 3)" name="flavor3" id="flavor3">
					<option value="">--- Selecione ---</option>
					<option v-for="flavor of flavorList" :key="flavor.id" :value="flavor.id">{{ flavor.nome }}</option>
				</select>
			</div>

			<div class="row" v-show="showCalculateButton">
				<button @click="makeInvoice">Calcular</button>
			</div>
			
		</main>

		<div class="card" v-if="totalPrice > 0 && showCalculateButton">
			<div class="page_header">Pedido</div>
			<table class="table">
				<tr v-if="flavor1 != null">
					<td>{{ flavorObject1.nome }}</td>
					<td>R$ {{ formatPrice(flavorObject1.valor) }}</td>
				</tr>
				<tr v-if="flavor2 != null">
					<td>{{ flavorObject2.nome }}</td>
					<td>R$ {{ formatPrice(flavorObject2.valor) }}</td>
				</tr>
				<tr v-if="flavor3 != null">
					<td>{{ flavorObject3.nome }}</td>
					<td>R$ {{ formatPrice(flavorObject3.valor) }}</td>
				</tr>
			</table>

			<div class="price_container">
				<div class="price_label">Valor do pedido</div>
				<div class="price_total">R$ {{ formatPrice(totalPrice) }}</div>
			</div>

		</div>
	</div>
</template>

<script>

export default {

    data() {
			return {
				flavorAmount: 0,
				flavor1: "",
				flavor2: "",
				flavor3: "",
				flavorList: [],
				totalPrice: 0
			}
    },
		
		computed: {
			showCalculateButton() {
				return (this.flavorAmount == 1 && this.flavor1 != null) ||
							 (this.flavorAmount == 2 && this.flavor1 != null && this.flavor2 != null) ||
							 (this.flavorAmount == 3 && this.flavor1 != null && this.flavor2 != null && this.flavor3 != null)
			},
			flavorObject1() {
				return this.flavorList.filter(flavor => flavor.id == this.flavor1)[0]
			},
			flavorObject2() {
				return this.flavorList.filter(flavor => flavor.id == this.flavor2)[0]
			},
			flavorObject3() {
				return this.flavorList.filter(flavor => flavor.id == this.flavor3)[0]
			}
		},

		mounted() {
			this.getFlavors()
		},

		methods: {
			async getFlavors() {
				const apiBaseUrl = "https://pizzaria.roxo.dev.br/"

				fetch(apiBaseUrl).then(async response => {
					return await response.json()
				}).then(async data => {
					this.flavorList = await data
				})

				this.selectedFlavors = [null, null, null]
			},

			showFlavors() {
				this.flavor1 = this.flavor2 = this.flavor3 = null

				this.selectedFlavors = [
					this.flavor1, 
					this.flavor2, 
					this.flavor3
				]

				this.totalPrice = 0
			},

			selectFlavor(event, position) {
				switch (position) {
					case 1:
						this.flavor1 = event.target.value ? event.target.value : null
						break

					case 2:
						this.flavor2 = event.target.value ? event.target.value : null
						break

					case 3:
						this.flavor3 = event.target.value ? event.target.value : null
						break
				}

				this.totalPrice = 0
			},

			makeInvoice() {
					this.calculate()
			},

			calculate() {
				this.totalPrice = 0

				switch(this.flavorAmount) {
					case "1":
						this.totalPrice = parseFloat(this.flavorList.filter(flavor => flavor.id == this.flavor1)[0].valor)
						break
					
					case "2":
						this.totalPrice += parseFloat(this.flavorList.filter(flavor => flavor.id == this.flavor1)[0].valor) / 2
						this.totalPrice += parseFloat(this.flavorList.filter(flavor => flavor.id == this.flavor2)[0].valor) / 2
						break

					case "3":
						this.totalPrice += parseFloat(this.flavorList.filter(flavor => flavor.id == this.flavor1)[0].valor) / 3
						this.totalPrice += parseFloat(this.flavorList.filter(flavor => flavor.id == this.flavor2)[0].valor) / 3
						this.totalPrice += parseFloat(this.flavorList.filter(flavor => flavor.id == this.flavor3)[0].valor) / 3
						break
								
				}
			},

			formatPrice(value) {
				let val = (value/1).toFixed(2).replace('.', ',')
				return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
			}
		},

}

</script>
