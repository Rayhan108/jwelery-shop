import Image from "next/image";
import SubCategories from "../../components/shared/SubCategories";
import mainUrl from "../../components/shared/mainUrl";

const page = async ({ params }) => {
  const { id } = await params;
  const category = await mainUrl(`/categories/${id}`);
  return (
    <div className="container mx-auto mt-9 px-4 lg:px-0">
      <div>
        <h1 className="pb-4">{category?.name}</h1>

        <div
          className="relative bg-cover bg-center md:h-[55vh] h-[200px] -mt-[1px]"
          style={{ width: "100%" }}
        >
          <Image
            src={category?.img_url}
            className="rounded-2xl"
            alt="Hero Image"
            layout="fill"
            objectFit="cover"
            objectPosition="center"
          />

          {/* White overlay with improved opacity for clear readability */}
          <div className="absolute inset-0 bg-white opacity-80 rounded-2xl"></div>

          <div className="absolute inset-0 px-4 lg:px-0 flex items-center">
            <div className="md:pl-20">
              <h1 className="text-3xl md:text-5xl font-semibold text-gray-900 drop-shadow-sm">
                {category?.name}
              </h1>
              <p className="py-2 md:py-5 text-sm md:text-base text-gray-800 max-w-2xl drop-shadow-sm">
                {category?.details}
              </p>
            </div>
          </div>
        </div>


      </div>
      <SubCategories categorys={category} categoryId={id} />
    </div>
  );
};

export default page;
