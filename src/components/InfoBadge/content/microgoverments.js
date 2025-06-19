export default <>
  <p>Политическая игра, где игроки управляют небольшими государствами, ведут дипломатию, развивают экономику и участвуют в конфликтах.</p>
  <div className="mt-3 flex flex-col items-center">
    <div className="relative w-24 h-24 rounded-lg overflow-hidden shadow-lg">
      <img
        src="/img/microgoverments/bg.png"
        alt="bg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/img/microgoverments/microgoverments_logo.svg"
          alt="logo"
          className="w-12 h-12 z-10"
        />
      </div>
    </div>
    <div className="mt-2 text-center">
      <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200">
        Micro<span className="text-[#00A1DE]">goverments</span>
      </h4>
    </div>
  </div>
</>; 