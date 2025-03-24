import Image from "next/image";

const recommendedItems = [
  {
    id: 1,
    title: "슈퍼 런 게임",
    description: "긴장감 넘치는 러닝 액션",
    image: "/banner/ca.webp",
    price: "무료",
  },
  {
    id: 2,
    title: "드로잉 마스터",
    description: "누구나 쉽게 그리는 아트툴",
    image: "/banner/ca2.webp",
    price: "₩1,000",
  },
  {
    id: 3,
    title: "음악 힐링 타이머",
    description: "명상과 집중을 위한 사운드 앱",
    image: "/banner/dark.webp",
    price: "무료",
  },
  // 필요한 만큼 추가 가능
];

export default function RecommendedCardList() {
  return (
    <section className="py-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-8 text-white">🔥 추천 작품</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {recommendedItems.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-md overflow-hidden hover:scale-[1.02] transition transform"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={400}
              height={250}
              className="w-full h-56 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-medium text-blue-500">{item.price}</span>
                <button className="text-sm bg-blue-500 text-white px-3 py-1 rounded-full hover:bg-blue-600">
                  다운로드
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
