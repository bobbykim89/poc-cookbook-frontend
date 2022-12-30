<script setup lang="ts">
import NavAlpha from "@bobbykim/nav-alpha";
import FooterAlpha from "@bobbykim/footer-alpha";

// import assets
import Logo from "@/assets/imgs/logo.png";
import Pattern from "@/assets/imgs/pattern.svg";

interface NavItemType {
  title: string;
  url: string;
  target?: "_blank" | "_self";
}
interface SocialLinkType {
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
}

const navProps = {
  title: 'Cookbook<span class="text-warning">4</span>All',
  titleLink: "/",
  logo: Logo,
  logoAlt: "Cookbook for All",
  logoLink: "/",
};

const navItems: NavItemType[] = [
  { title: "HOME", url: "/", target: "_self" },
  { title: "RECIPES", url: "/recipes", target: "_self" },
  { title: "ABOUT", url: "/about", target: "_self" },
];

const socialLinks: SocialLinkType = {
  linkedin: "https://www.linkedin.com/in/sihun-kim-9baa17165/",
  github: "https://github.com/bobbykim89",
};

const getBgPattern = computed(() => {
  return {
    "--bg-image": `url('${Pattern}')`,
  };
});
</script>

<template>
  <div>
    <nav-alpha
      :title="navProps.title"
      :title-link="navProps.titleLink"
      :logo="navProps.logo"
      :logo-alt="navProps.logoAlt"
      :logo-link="navProps.logoLink"
      :nav-items="navItems"
      highlight-color="warning"
    ></nav-alpha>
    <div class="relative min-h-[60vh]">
      <div
        class="absolute inset-0 bg-repeat opacity-5 bg-pattern"
        :style="getBgPattern"
      ></div>
      <div class="relative">
        <slot></slot>
      </div>
    </div>
    <footer-alpha
      :title="navProps.title"
      :logo="navProps.logo"
      :logo-alt="navProps.logoAlt"
      :logo-link="navProps.logoLink"
      :nav-items="navItems"
      :social-links="socialLinks"
      social-icon-color="light-1"
      highlight-color="warning"
      border-top-color="warning"
    ></footer-alpha>
  </div>
</template>

<style lang="scss" scoped>
.bg-pattern {
  background-image: var(--bg-image);
}
</style>
