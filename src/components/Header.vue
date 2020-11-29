<template>
  <div class="w-full">
    <div class="px-5 pt-5 flex items-center w-full">
      <div
        class="text-xl bg-black text-white cursor-default select-none leading-none px-5 h-9 flex items-center rounded-full"
        title="Lower thirds that do the limbo"
      >
        Hermes
      </div>
      <!--
        Settings button:
        <button
          class="border-l border-gray-200 bg-black text-white rounded-full rounded-l-none pr-3 pl-2 h-9 flex items-center cursor-default hover:opacity-80 focus:opacity-80"
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M16.783 10c0-1.049 0.646-1.875 1.617-2.443-0.176-0.584-0.407-1.145-0.692-1.672-1.089 0.285-1.97-0.141-2.711-0.883-0.741-0.74-0.968-1.621-0.683-2.711-0.527-0.285-1.088-0.518-1.672-0.691-0.568 0.97-1.595 1.615-2.642 1.615-1.048 0-2.074-0.645-2.643-1.615-0.585 0.173-1.144 0.406-1.671 0.691 0.285 1.090 0.059 1.971-0.684 2.711-0.74 0.742-1.621 1.168-2.711 0.883-0.285 0.527-0.517 1.088-0.691 1.672 0.97 0.568 1.615 1.394 1.615 2.443 0 1.047-0.645 2.074-1.615 2.643 0.175 0.584 0.406 1.144 0.691 1.672 1.090-0.285 1.971-0.059 2.711 0.682s0.969 1.623 0.684 2.711c0.527 0.285 1.087 0.518 1.672 0.693 0.568-0.973 1.595-1.617 2.643-1.617 1.047 0 2.074 0.645 2.643 1.617 0.584-0.176 1.144-0.408 1.672-0.693-0.285-1.088-0.059-1.969 0.683-2.711 0.741-0.74 1.622-1.166 2.711-0.883 0.285-0.527 0.517-1.086 0.692-1.672-0.973-0.569-1.619-1.395-1.619-2.442zM10 13.652c-2.018 0-3.653-1.635-3.653-3.652 0-2.018 1.636-3.654 3.653-3.654s3.652 1.637 3.652 3.654c0 2.018-1.634 3.652-3.652 3.652z"
            ></path>
          </svg>
        </button>
      -->
      <div class="text-gray-500 text-sm ml-auto flex pr-4">
        <div>
          By
          <a
            class="underline hover:text-gray-900 focus:text-gray-900"
            href="https://twitter.com/JosephusPaye"
            target="_blank"
            rel="noopener"
            >Josephus</a
          >
          for
          <a
            class="underline hover:text-gray-900 focus:text-gray-900"
            href="https://twitter.com/JosephusPaye/status/1214853295023411200"
            target="_blank"
            rel="noopener"
            >#CreateWeekly</a
          >.
        </div>
        <a
          class="ml-2 hover:text-gray-900 focus:text-gray-900"
          href="https://github.com/JosephusPaye/hermes"
          target="_blank"
          rel="noopener"
          title="View source on GitHub"
        >
          <svg
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 20 20"
          >
            <path
              fill="currentColor"
              d="M13.18 11.309c-0.718 0-1.3 0.807-1.3 1.799 0 0.994 0.582 1.801 1.3 1.801s1.3-0.807 1.3-1.801c-0.001-0.992-0.582-1.799-1.3-1.799zM17.706 6.626c0.149-0.365 0.155-2.439-0.635-4.426 0 0-1.811 0.199-4.551 2.080-0.575-0.16-1.548-0.238-2.519-0.238-0.973 0-1.945 0.078-2.52 0.238-2.741-1.881-4.552-2.080-4.552-2.080-0.789 1.987-0.781 4.061-0.634 4.426-0.928 1.008-1.495 2.219-1.495 3.871 0 7.186 5.963 7.301 7.467 7.301 0.342 0 1.018 0.002 1.734 0.002s1.392-0.002 1.732-0.002c1.506 0 7.467-0.115 7.467-7.301 0-1.652-0.566-2.863-1.494-3.871zM10.028 16.915h-0.056c-3.771 0-6.709-0.449-6.709-4.115 0-0.879 0.31-1.693 1.047-2.369 1.227-1.127 3.305-0.531 5.662-0.531 0.010 0 0.020 0 0.029 0s0.018 0 0.027 0c2.357 0 4.436-0.596 5.664 0.531 0.735 0.676 1.045 1.49 1.045 2.369 0 3.666-2.937 4.115-6.709 4.115zM6.821 11.309c-0.718 0-1.3 0.807-1.3 1.799 0 0.994 0.582 1.801 1.3 1.801s1.301-0.807 1.301-1.801c0-0.992-0.582-1.799-1.301-1.799z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
};
</script>
