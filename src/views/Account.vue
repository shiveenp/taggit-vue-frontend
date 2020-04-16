<template>
    <div class="container">
        <div class="section">
        </div>
        <div class="section">
            <h2 class="title">
                Profile
            </h2>
            <p class="subtitle">Your personal information</p>
            <div class="card">
                <header class="card-header">
                    <p class="card-header-title">
                        Personal Information
                    </p>
                </header>
                <div class="card-content">
                    <b-field label="User Name" label-position="on-border">
                        <b-input type=""></b-input>
                    </b-field>

                    <b-field label="Email" label-position="on-border">
                        <b-input type="email">
                        </b-input>
                    </b-field>
                </div>
            </div>
            <button class="is-small is-primary">Edit Info</button>
        </div>
    </div>
</template>

<script>
  export default {
    name: "UpdateProfile"
  }
</script>

<style scoped>

</style>
