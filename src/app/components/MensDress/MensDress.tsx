import { useGetProductsQuery } from "@/app/features/productsApi";
import { useGetBusinessesQuery } from "@/app/features/buissinessApi";
import Title from "../UI/Title";
import CommonLayout from "@/app/layouts/CommonLayout";
import Banner from "../Home/Banner";

export default function MensDress() {
  const { data: productsData } = useGetProductsQuery();
  const { data: businessesData } = useGetBusinessesQuery();

  const categoryMap: Record<string, string> = {};
  const groupedProducts: Record<string, any[]> = {};

  if (businessesData?.data?.length) {
    const categories = businessesData.data[0].categories;

    // Flatten and map all child category IDs to their names
    categories.forEach((cat) => {
      if (cat.children && cat.children.length) {
        cat.children.forEach((child) => {
          if (child.children && child.children.length) {
            child.children.forEach((subChild) => {
              categoryMap[subChild._id] = subChild.name;
            });
          } else {
            categoryMap[child._id] = child.name;
          }
        });
      } else {
        categoryMap[cat._id] = cat.name;
      }
    });
  }

  if (productsData?.data?.length) {
    productsData.data.forEach((product) => {
      if (Array.isArray(product.sub_category)) {
        product.sub_category.forEach((cat) => {
          const catName = categoryMap[cat._id];
          if (catName) {
            if (!groupedProducts[catName]) groupedProducts[catName] = [];
            groupedProducts[catName].push(product);
          }
        });
      }
    });
  }

  return (
    <div className='mt-8'>
      <div className='mt-3 space-y-6'>
        {Object.entries(groupedProducts).map(([categoryName, products]) => (
          <>
            <CommonLayout>
              <div key={categoryName}>
                <Title title={categoryName} />

                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                  {products.map((product) => (
                    <div
                      key={product._id}
                      className='border p-4 rounded shadow-sm bg-white'
                    >
                      <img
                        src={product.images?.[0]?.secure_url}
                        alt={product.name}
                        className='w-full h-48 object-cover rounded mb-2'
                      />
                      <h3 className='font-semibold'>{product.name}</h3>
                      <p className='text-sm text-gray-600'>
                        {product.short_description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </CommonLayout>
            <Banner />
          </>
        ))}
      </div>
    </div>
  );
}
