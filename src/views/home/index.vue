<template>
  <div class="container">
    <div class="top">
      <v-row>
        <v-col cols="8" sm="8">
          <div class="d-flex">
            <span>
              <v-text-field
                label="Tìm kiếm"
                variant="outlined"
                hide-details
                density="compact"
                style="width: 300px !important"
                prepend-inner-icon="mdi-magnify"
              ></v-text-field>
            </span>

            <v-btn
              style="height: 41px"
              class="ml-2"
              color="secondary"
              variant="tonal"
        
              icon="mdi-calendar-plus"
            ></v-btn>
          </div>
        </v-col>
        <v-col cols="4" sm="4">
     
        </v-col>
      </v-row>
    </div>
    <v-row>
    
    </v-row>
  </div>
</template>

<script>

export default {
  
  data() {
    return {
      
    };
  },
  methods: {
  
  },
  created() {
  },
};
</script>

<style lang="scss" scoped>
.container {
  // background: red;
  margin: auto;
  max-width: 1400px;
  .top {
    background: #fff;
    padding: 16px;
    margin-bottom: 12px;
    border-radius: 7px;
    margin-top: -16px;
    box-shadow: #919eab4d 0 0 2px, #919eab1f 0 12px 24px -4px !important;
  }
}
</style>
