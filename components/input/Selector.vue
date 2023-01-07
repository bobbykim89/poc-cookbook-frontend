<script setup lang="ts">
import { computed, withDefaults } from 'vue'
import type {
  ColorPalette,
  BodyText,
  InputType,
  SpacingLevel,
} from '@bobbykim/manguito-theme/theme/theme.types'
import generateClass from '@bobbykim/manguito-theme'

export interface SelectOptionType {
  text: string
  value: string | number
}

const props = withDefaults(
  defineProps<{
    identifier: string
    displayLabel?: boolean
    labelText?: string
    labelSize?: BodyText
    labelColor?: ColorPalette
    labelBold?: boolean
    displayBorder?: boolean
    borderColor?: ColorPalette
    displayHighlight?: boolean
    highlightColor?: ColorPalette
    bgColor?: ColorPalette
    placeholder?: string
    type?: InputType
    displayShadow?: boolean
    isRequired?: boolean
    spacing?: SpacingLevel
    options: SelectOptionType[]
    modelValue?: string
  }>(),
  {
    displayLabel: true,
    labelSize: 'md',
    labelColor: 'dark-3',
    labelBold: true,
    displayBorder: false,
    borderColor: 'light-4',
    displayHighlight: true,
    highlightColor: 'primary',
    bgColor: 'light-1',
    placeholder: '',
    type: 'text',
    displayShadow: true,
    isRequired: false,
    spacing: 'md',
  }
)

const emit = defineEmits(['update:modelValue'])
const inputValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
  },
})

const getLabelClass = (
  size: BodyText,
  color: ColorPalette,
  bold: boolean
): string => {
  /**
   * @size - labelSize
   * @color - labelColor
   * @bold - labelBold
   */

  const classArray: string[] = [
    generateClass('BODYTEXT', size),
    generateClass('TEXTCOLOR', color),
  ]

  if (bold) {
    classArray.push('font-bold')
  }

  return classArray.join(' ')
}

const getInputClass = (
  bgColor: ColorPalette,
  dBorder: boolean,
  bColor: ColorPalette,
  dHL: boolean,
  dShadow: boolean
): string => {
  /**
   * @bgColor - bgColor
   * @dBorder - displayBorder
   * @bColor - borderColor
   * @dHL - displayHighlight
   * @dShadow - displayShadow
   */

  const classArray: string[] = [generateClass('BGCOLOR', bgColor)]
  if (dBorder) {
    classArray.push('border-2')
    classArray.push(generateClass('BORDER', bColor))
  }
  if (!dHL) {
    classArray.push(
      'focus:ring-4 ring-offset-2 transition-all duration-300 ease-linear'
    )
    classArray.push(generateClass('FOCUSRING', bColor))
  }
  if (dShadow) {
    classArray.push('shadow-md')
  }
  return classArray.join(' ')
}
</script>

<template>
  <div :class="generateClass('MARGINB', spacing)">
    <label
      v-if="displayLabel"
      :for="identifier"
      v-html="labelText"
      class="inline-block mb-2xs"
      :class="getLabelClass(labelSize, labelColor, labelBold)"
    ></label>
    <select
      :id="identifier"
      :type="type"
      class="w-full p-2xs outline-none input__text"
      :class="
        getInputClass(
          bgColor,
          displayBorder,
          borderColor,
          displayHighlight,
          displayShadow
        )
      "
      v-model="inputValue"
      :required="isRequired"
    >
      <option
        v-if="placeholder"
        class="p-2xs"
        value=""
        v-html="placeholder"
        selected
      ></option>
      <option
        v-for="item in options"
        :key="item.text"
        class="p-2xs"
        v-html="item.text"
        :value="item.value"
      ></option>
    </select>
    <div
      v-if="displayHighlight"
      class="relative -top-1 h-3xs input__decorator"
      :class="generateClass('BEFOREBG', highlightColor)"
    ></div>
  </div>
</template>

<style lang="scss" scoped>
.input__decorator {
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0;
    transition: width 0.3s linear;
  }
}

.input__text {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-image: linear-gradient(45deg, transparent 50%, #1f2937 50%),
    linear-gradient(135deg, #1f2937 50%, transparent 50%);
  background-position: calc(100% - 20px) calc(1em + 2px),
    calc(100% - 15px) calc(1em + 2px), 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
}

.input__text:focus {
  background-image: linear-gradient(45deg, #1f2937 50%, transparent 50%),
    linear-gradient(135deg, transparent 50%, #1f2937 50%);

  background-position: calc(100% - 15px) 1em, calc(100% - 20px) 1em, 100% 0;
  background-size: 5px 5px, 5px 5px, 2.5em 2.5em;
  background-repeat: no-repeat;
  outline: 0;
}

.input__text:focus + .input__decorator::before {
  width: 100%;
}
</style>
