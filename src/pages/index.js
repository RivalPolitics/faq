import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} className="lg:px-8">
      <main className="lg:px-8">
        <div class="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <h1 class="text-slate-900 font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
            Добро пожаловать в{" "}
            <span className="bg-gradient-to-r from-blue-600  to-indigo-400 inline-block text-transparent bg-clip-text">
              Rival Politics
            </span>{" "}
            Исследуйте и изучайте новый формат документации
          </h1>
          <p class="mt-6 text-lg text-slate-600 text-center max-w-3xl mx-auto dark:text-slate-400">
            Документация подходит как для новичков, так и для уже игроков
            проекта. Вы можете прочитать статьи:{" "}
            <code class="font-mono font-medium text-sky-500 dark:text-sky-400">
              Первые шаги
            </code>
            ,{" "}
            <code class="font-mono font-medium text-sky-500 dark:text-sky-400">
              Дизайн-документ
            </code>
            ,{" "}
            <code class="font-mono font-medium text-sky-500 dark:text-sky-400">
              Экономика
            </code>{" "}
            и{" "}
            <code class="font-mono font-medium text-sky-500 dark:text-sky-400">
              Политика
            </code>{" "}
            которые помогут вам больше понять проект.
          </p>
          <div class="mt-6 sm:mt-10 flex justify-center space-x-6 text-sm">
            <a
              class="transition bg-slate-900 hover:bg-slate-700 hover:text-slate-100 text-white font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto"
              href="/docs/installation"
            >
              Начать изучение
            </a>
            <button
              type="button"
              class="cursor-pointer transition sm:flex items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-400 shadow-sm rounded-lg text-slate-400"
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="flex-none text-slate-300"
                aria-hidden="true"
              >
                <path d="m19 19-3.5-3.5"></path>
                <circle cx="11" cy="11" r="6"></circle>
              </svg>
              <span class="flex-auto">Что бы найти, нажмите...</span>
              <kbd class="font-sans font-semibold">
                <abbr title="Control" class="no-underline text-slate-400">
                  Ctrl{" "}
                </abbr>{" "}
                K
              </kbd>
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}
