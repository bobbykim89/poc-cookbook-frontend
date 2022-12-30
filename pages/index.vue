<script setup lang="ts">
import HeroAlpha from "@bobbykim/hero-alpha";
import BtnAlpha from "@bobbykim/btn-alpha";
import BtnBeta from "@bobbykim/btn-beta";

const heroContent = {
  title: "Time for cooking",
  subTitle: "You don't need to be good at it",
  image:
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1470&q=80",
  text: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus expedita illum, odit perspiciatis, fugiat velit itaque officia architecto, voluptate dolorem atque! Distinctio libero labore, officiis magni id delectus excepturi a?",
};
</script>

<template>
  <div>
    <hero-alpha
      :title="heroContent.title"
      title-level="h1"
      title-size="md"
      :sub-title="heroContent.subTitle"
      sub-title-level="h2"
      :display-sub-title="true"
      :bg-image="heroContent.image"
      img-position="right"
    >
      <div class="mb-xs" v-html="heroContent.text"></div>
      <div class="flex gap-4">
        <btn-alpha color="warning">Go to Recipes</btn-alpha>
        <btn-beta color="danger">Sign up</btn-beta>
      </div>
    </hero-alpha>
  </div>
</template>

<style lang="scss" scoped></style>
