<template>
  <div>
    <div :class="$style.title">title</div>
    <br/>
    <div :class="$style.content">content</div>
    <hr/>
    <h1>
      h1
      <div :class="$style.subh1">
        sub-h1
      </div>
    </h1>
  </div>
</template>

<style lang="scss" module>
  @import "../../css/reset.scss";
  .title {
    font-size:80px;
    color:blue;
  }
</style>

<script>
  export default{

  }
</script>
