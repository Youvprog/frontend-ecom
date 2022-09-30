<template>
    <div class="box mb-4">
        <h3>Order N#{{order.id}}</h3>
        <table class="table is-fullwidth">
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="item in order.items">
                    <td>{{item.product.name}}</td>
                    <td>${{item.product.price}}</td>
                    <td>{{item.quantity}}</td>
                    <td>${{(item.product.price * item.quantity).toFixed(2)}}</td>
                </tr>
        </tbody>
        </table>
    </div>
</template>

<script>
export default{
    name: 'orders',
    props: {
        order: {
            type: Object
        }
    },
}
</script>


<style>

</style>