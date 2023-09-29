<template>
  <div class="container fit WhySchool">
    <h2 class="Main_Title">Why Al-Sarraj Al-Munir Al-Azhari Institute ?</h2>
    <div class="answer">
      <p>
        The Al-Siraj Al-Muneer Al-Azhar Institute aims to provide comprehensive
        Islamic education to nurture the younger generation, encompassing their
        beliefs, intellect, physical well-being, and character development. We
        prioritize their growth and consider the unique characteristics of each
        stage of their lives. By doing so, we can achieve the general objectives
        of education as a whole and specifically for our institute :
      </p>
      <div class="objectives">
        <div
          class="feat"
          v-for="(objective, index) in objectives"
          :key="objective"
        >
          <span class="number">{{ index + 1 }}- </span>
          <span class="objective">{{ objective }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "WhySchool",
  data() {
    return {
      objectives: [
        "Memorizing and understanding the Quran correctly.",
        "Establishing the Islamic creed in the student's self and making it the guide for their behavior and actions, and fostering love, fear, and consciousness of Allah in their hearts.",
        "Providing the student with appropriate knowledge and experiences according to their age, so they become familiar with the general principles and basic principles of culture and sciences.",
        "Encouraging the student to seek knowledge and cultivating their ability for contemplation and scientific inquiry.",
        "Developing the student's intellectual abilities and various skills through guidance and refinement.",
        "Educating the student on the Islamic social life characterized by brotherhood, cooperation, appreciation of loyalty, and assuming responsibility.",
        "Training the student to serve their community and cultivate the spirit of advice and loyalty to their country.",
        "Instilling the habit of preserving and utilizing time effectively.",
        "Strengthening the student's awareness to confront misleading rumors and destructive ideologies in accordance with the Prophet's teachings.",
        "Inspiring the student to strive and raise their aspirations to restore the glory of the Islamic nation to which they belong.",
        "Preparing the student to face challenges and overcome difficulties in life.",
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.WhySchool {
  font-family: cursive;
  // margin-top: 40px;
  // h2 {
  //   text-align: center;
  //   margin: 60px auto 20px;
  //   color: var(--Black-color);
  // }
  p {
    color: var(--Black-color);
    opacity: 0.7;
  }
  .objectives {
    display: flex;
    flex-direction: column;
    gap: 10px;
    .feat {
      display: flex;
      gap: 5px;
      background: var(--White-color);
      filter: brightness(0.9);
      padding: 10px;
      border-radius: 5px;
      border-bottom: 1px solid var(--main-color);
      align-items: center;
      span.number {
        width: 45px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: var(--main-color);
        border-radius: 5px;
        color: #fff;
        font-weight: bold;
      }
      span.objective {
        width: 95%;
        color: var(--Black-color);
      }
    }
  }
}
</style>
