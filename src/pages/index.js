import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout title={`${siteConfig.title}`} className="lg:px-8">
      <main className="lg:px-8 container-page">
        <div class="relative max-w-5xl mx-auto pt-20 sm:pt-24 lg:pt-32">
          <h1 class="text-slate-900 font-extrabold text-2xl md:text-5xl lg:text-6xl tracking-tight text-center dark:text-white">
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
              href="/docs/design"
            >
              Начать изучение
            </a>
            <button
              type="button"
              class="hidden lg:flex cursor-pointer transition items-center w-72 text-left space-x-3 px-4 h-12 bg-white ring-1 ring-slate-900/10 hover:ring-slate-400 shadow-sm rounded-lg text-slate-400"
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

        <div class="mb-[80px] mt-[80px] grid grid-cols-1 gap-10 lg:grid-cols-3 ml-[5px] mr-[5px] lg:mr-[50px] lg:ml-[50px]">
          <div class="relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 shadow-md relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <img
              src="/img/microgoverments/bg.png"
              alt="bg"
              class="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div class="absolute inset-0 bg-black/30"></div>
            <div className="flex align-middle justify-center">
              <img
                src="/img/microgoverments/microgoverments_logo.svg"
                alt="bg"
                class="z-[1] w-[100px] mt-[10px] mb-[10px] lg:w-[100px] xl:w-[160px]"
              />
            </div>
            <div class="pl-2 pr-2 lg:pl-6 lg:pr-6 pb-6 relative flex flex-col justify-end">
              <h4 class="block antialiased tracking-normal text-white font-extrabold xl:text-4xl text-2xl lg:text-2xl text-center">
                Micro<span className="text-[#00A1DE]">goverments</span>
              </h4>
              <p class="mx-2 lg:mx-10 block antialiased text-base leading-relaxed text-white my-2">
                Возглавь государство. Будь лидером. Сражайся.
                Полу-автоматическая ВПИ на базе сайта.
              </p>
              <a
                class="mx-2 lg:mx-10 mb-3 mt-6 transition bg-white hover:bg-slate-700 hover:text-slate-100 text-blue-500 font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto"
                href="docs/microgovernments"
              >
                Узнать больше <i class="fa-solid fa-chess-knight ml-2"></i>
              </a>
            </div>
          </div>
          <div class="opacity-60 border-solid border-slate-300 relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <div class="absolute inset-0 bg-white"></div>
            <div className="flex align-middle justify-center">
              <i class="z-[1] fa-solid fa-city bg-gradient-to-r from-blue-600  to-indigo-400 inline-block text-transparent bg-clip-text text-[100px]"></i>
            </div>
            <div class="pl-6 pr-6 pb-6 lg:pl-2 lg:pr-2 relative flex flex-col justify-end">
              <h4 class="block antialiased tracking-normal text-white font-extrabold text-2xl xl:text-4xl lg:text-2xl text-center">
                <span className="bg-gradient-to-r from-blue-600  to-indigo-400 inline-block text-transparent bg-clip-text">
                  Rival Politics Game
                </span>
              </h4>
              <p class="mx-2 lg:mx-10 block antialiased text-base leading-relaxed text-slate-600 my-2">
                Попробуйте себя в роли обычного человека и создайте свою
                бизнес-империю.
              </p>
              <p class="mx-2 lg:mx-10 mb-3 mt-6 transition bg-white border-solid border-slate-300  text-slate-500 font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto">
                Скоро
              </p>
            </div>
          </div>
          <div class="opacity-60 border-solid border-slate-300 relative flex flex-col bg-clip-border rounded-xl bg-transparent text-gray-700 relative grid min-h-[30rem] items-end overflow-hidden rounded-xl">
            <div class="absolute inset-0 bg-white"></div>
            <div className="flex align-middle justify-center">
              <i class="z-[1] fa-solid fa-planet-ringed text-amber-600 inline-block text-[100px]"></i>
            </div>
            <div class="pl-6 pr-6 pb-6 lg:pl-2 lg:pr-2 relative flex flex-col justify-end">
              <h4 class="block antialiased tracking-normal text-white font-extrabold xl:text-4xl text-2xl lg:text-2xl text-center">
                <span className="text-amber-600 inline-block">
                  Project Missuim
                </span>
              </h4>
              <p class="mx-2 lg:mx-10 lock antialiased text-base leading-relaxed text-slate-600 my-2">
                Возможно, скоро тут будет больше информации, но пока это просто
                заглушка.
              </p>
              <p class="mx-2 lg:mx-10 mb-3 mt-6 transition bg-white border-solid border-slate-300  text-slate-500 font-semibold h-12 px-6 rounded-lg w-full flex items-center justify-center sm:w-auto">
                В будущем...
              </p>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}
