<script setup>
import { NSpace, NIcon } from "naive-ui";
import { WebviewWindow } from "@tauri-apps/api/window";
import IconMove from "../components/icon/IconMove.vue";
import IconStart from "../components/icon/IconStart.vue";
import IconSetting from "../components/icon/IconSetting.vue";
import { useSettingStore } from "../store/index";
import { onMounted, ref } from "vue";
import { formatText } from "../utils/index";

var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
var SpeechGrammarList = SpeechGrammarList || window.webkitSpeechGrammarList;
var SpeechRecognitionEvent =
  SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

const text = ref("示例文字");

// 是否继续
const conStart = ref(false);

const recognition = ref(null);
// 加载 微软 语音
function initSpeechRecognition() {
  if (recognition.value == null) {
    recognition.value = new SpeechRecognition();

    recognition.value.continuous = false;
    recognition.value.lang = "zh-cn";
    recognition.value.interimResults = false;
    // recognition.value.maxAlternatives = 1;
    initEvents();
  }
}

function initEvents() {
  recognition.value.onresult = function (event) {
    const sttText = Array.from(event.results)
      .map((result) => result[0])
      .map((result) => result.transcript)
      .join("");
    console.log("onresult == > " + sttText);
    text.value += sttText;
    formatText(sttText, formatTextCallback);
    window.scrollTo(
      0,
      document.documentElement.scrollHeight + 50 - window.innerHeight
    );
  };

  recognition.value.onend = (e) => {
    console.log("onend ......");
    if (conStart) {
      console.log("recognition.value.start....");
      recognition.value.start();
    }
  };
}

const callbackMethods = {
  clear: () => {
    text.value = ""
  },
};

function formatTextCallback(option) {
  callbackMethods[option]();
}

function settingPage() {
  // text.value = "123456789";
  // console.log("start ..... ", recognition.value);

  const webview = new WebviewWindow("settingWin", {
    url: "#/setting",
    // transparent: true,
  });
  //   webview.tr
  // Tauri emits the `tauri://created` and `tauri://error` to notify you of the creation response
  webview.once("tauri://created", function () {
    // webview window successfully created
  });
  webview.once("tauri://error", function (e) {
    // an error occurred during webview window creation
    // console.log(e);
  });

  webview.onCloseRequested((event) => {
    setting.reload();
  });
}

function start() {
  conStart.value = true;
  recognition.value && recognition.value.start();
}

onMounted(() => {
  initSpeechRecognition();
});

const setting = useSettingStore();
</script>

<template>
  <div
    class="home"
    :style="{
      backgroundColor: setting.background,
    }"
  >
    <div
      class="icons"
      :style="{
        '--color': setting.color,
      }"
    >
      <n-space>
        <n-icon>
          <IconMove data-tauri-drag-region />
        </n-icon>
        <n-icon @click="start">
          <IconStart />
        </n-icon>
        <n-icon @click="settingPage">
          <IconSetting />
        </n-icon>
      </n-space>
    </div>
    <div
      :style="{
        fontSize: setting.fontsize,
        color: setting.color,
      }"
    >
      {{ text }}
    </div>
  </div>
</template>

<style>
.home {
  background-color: aliceblue;
  height: 100vh;
}

.home .icons {
  transition: all 0.3s;
  display: none;
}
.home:focus .icons,
.home:active .icons,
.home:hover .icons {
  display: block;
}
.home .icons .icon {
  padding: 6px;
  fill: var(--color);
}
</style>
