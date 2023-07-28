<template>
      <div id="overlay">
    <div class="d-flex align-items-center flex-column">
      <h2>Enter Passcode</h2>
      <h4>Enter your four-digit passcode</h4>
      <form @submit.prevent="onSubmit">
        <div id="verification-code" class="input">
          <div style="display: flex; gap:1em">
            <input
              v-for="digit of new Array(4).fill(null)"
              :key="digit"
              type="text"
              ref="digitsRefs"
              class="rounded border-0 text-center"
              style="font-size: 3em"
            />
          </div>
          <span class="__message block my-[1em] text-red-500 font-bold"></span>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import IMask from "imask";
import { useSecurityStore } from "@/stores/security";

function $mask($input, mask) {
  return IMask($input, { mask });
}

const securityStore = useSecurityStore();

const digitsRefs = ref([]);

onMounted(() => {

  const $digits = digitsRefs.value;

  $digits.forEach(($digit, digitIndex) => {

    $digit.addEventListener("input", (e) => {

      if (e.inputType === "insertFromPaste") {
        const characters = e.target.value.split("");

        characters.forEach((character, characterIndex) => {
          const $currentDigit = $digits[digitIndex + characterIndex];
          if ($currentDigit) $currentDigit.value = character;
        });

        if (characters.length - 1 < $digits.length - 1)
          $digits[characters.length - 1].focus();
        else onSubmit()
      } else {
        const $nextDigit = $digits[digitIndex + 1];

        if ($digit.value !== "")
          $nextDigit ? $nextDigit.focus() : onSubmit()
      }

    });

    $mask($digit, "0");

    $digit.addEventListener("keydown", (e) => {
      if (e.key === "Backspace") {
        const $prevDigit = $digits[digitIndex - 1];
        if ($digit.value === "")
          $prevDigit ? $prevDigit.focus() : $digits[0].focus();
        else {
          $prevDigit.value === "";
          $prevDigit.focus();
        }
      }
    });

  });
});

const onSubmit = () => {
  const code = Array.from(digitsRefs.value).reduce((code, $digit) => (code += $digit.value), "");
  securityStore.startNewSession();
};
</script>
<style lang="scss">
#overlay {
  width: 100vw;
  height: 100vh;
  position: absolute;
  background-color: hsl(0deg 0% 50.2% / 40%);
  z-index: 1033;
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;

  input {

    width: 60px;
    height: 120px;

  }

}
</style>