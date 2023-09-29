<template>
  <div class="container fit Modifications">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb">
        <li class="breadcrumb-item">
          <router-link to="TheAdmin">The Administrator</router-link>
        </li>
        <li class="breadcrumb-item active" aria-current="page">
          Modifications
        </li>
      </ol>
    </nav>
    <h1>
      <span>Modifications</span>
    </h1>
    <div class="content">
      <router-link to="/TheNews" class="box">
        <font-awesome-icon :icon="['fas', 'newspaper']" />
        <span>News</span>
      </router-link>

      <router-link to="/InstituteNumbers" class="box">
        <font-awesome-icon :icon="['fas', 'list-ol']" />
        <span>Institute numbers</span>
      </router-link>
      <router-link class="box" to="/TheStatistics">
        <font-awesome-icon :icon="['fas', 'chart-bar']" />
        <span>Statistics</span>
      </router-link>
      <router-link class="box" to="/PhotoGallery">
        <font-awesome-icon :icon="['fas', 'images']" />
        <span>Photo Gallery</span>
      </router-link>

      <router-link class="box" to="/VacantJobs">
        <font-awesome-icon :icon="['fas', 'file-signature']" />
        <span>Vacant Jobs</span>
      </router-link>
      <router-link class="box" to="/CommonQuestions">
        <font-awesome-icon :icon="['fas', 'comments']" />
        <span>Common Questions</span>
      </router-link>
    </div>
  </div>
</template>
<script>
export default {
  name: "TheModifications",
};
</script>
<style lang="scss">
.container.Modifications {
  margin: 70px auto 2px;

  nav {
    border-radius: 5px;
    padding: 10px 20px;
    display: flex;
    align-items: center;
    background: var(--White-color);
    filter: brightness(0.95);
    ol {
      margin: 0;
    }
  }
  .breadcrumb-item a {
    color: var(--main-color) !important;
    font-weight: bold;
  }
  .breadcrumb-item.active {
    color: var(--Black-color);
  }
  .breadcrumb-item + .breadcrumb-item::before {
    color: var(--Black-color);
  }
  h1 {
    color: var(--main-color);
    border-radius: 5px;
    background: var(--White-color);
    border-bottom: 1px solid var(--main-color);
    border-bottom-right-radius: 0;
    border-bottom-left-radius: 0;
    filter: brightness(0.95);
    padding: 20px;
    margin: 10px auto 10px;
    display: flex;
    justify-content: space-between;
    font-size: 30px;
    svg {
      cursor: pointer;
    }
  }
  .content {
    display: flex;
    flex-wrap: wrap;
    gap: 18px;
    .box {
      color: var(--Black-color);
      width: 32%;
      background: var(--White-color);
      filter: brightness(0.95);
      padding: 10px;
      border-radius: 5px;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 19px;
      font-family: revert;
      position: relative;
      transition: 0.3s;
      &::before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        width: 0;
        height: 100%;
        background: var(--main-color);
        opacity: 0.2;
        transition: 0.3s;
        z-index: -1;
      }
      &:hover::before {
        width: 100%;
      }
      &:hover {
        color: var(--main-color);
      }
    }
  }
}
</style>
