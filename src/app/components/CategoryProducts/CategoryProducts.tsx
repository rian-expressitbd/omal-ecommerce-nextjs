import { useGetProductsQuery } from "@/app/features/productsApi";
import { useGetBusinessesQuery } from "@/app/features/buissinessApi";
import Title from "../UI/Title";
import CommonLayout from "@/app/layouts/CommonLayout";
import Banner from "../Home/Banner";
import CategoryProductCard from "../UI/CategoryProductCard";
import { useMemo } from "react";

export default function CategoryProducts() {
  const {
    data: productsData,
    isLoading: productsLoading,
    error: productsError,
  } = useGetProductsQuery();
  const {
    data: businessesData,
    isLoading: businessesLoading,
    error: businessesError,
  } = useGetBusinessesQuery();

  const { categoryMap, groupedProducts } = useMemo(() => {
    const categoryMap: Record<string, string> = {};
    const groupedProducts: Record<string, any[]> = {};

    // Build category map
    if (businessesData?.data?.length) {
      const categories = businessesData.data[0].categories;

      const processCategory = (category: any) => {
        categoryMap[category._id] = category.name;

        if (category.children?.length) {
          category.children.forEach(processCategory);
        }
      };

      categories.forEach(processCategory);
    }

    // Group products by category
    if (productsData?.data?.length) {
      productsData.data.forEach((product) => {
        if (Array.isArray(product.sub_category)) {
          product.sub_category.forEach((cat) => {
            const catName = categoryMap[cat._id];
            if (catName) {
              if (!groupedProducts[catName]) {
                groupedProducts[catName] = [];
              }
              groupedProducts[catName].push(product);
            }
          });
        }
      });
    }

    return { categoryMap, groupedProducts };
  }, [businessesData, productsData]);

  // Loading and error states
  if (businessesLoading || productsLoading) return <div>Loading...</div>;
  if (businessesError || productsError) return <div>Error loading data</div>;
  if (!Object.keys(groupedProducts).length) return <div>No products found</div>;

  return (
    <div className='mt-8'>
      <div className='mt-3 space-y-6'>
        {Object.entries(groupedProducts).map(([categoryName, products]) => (
          <div key={categoryName}>
            <CommonLayout>
              <Title title={categoryName} />
              <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
                {products.map((product, index) => (
                  <CategoryProductCard
                    key={index} 
                    product={product}
                  />
                ))}
              </div>
            </CommonLayout>
            <Banner />
          </div>
        ))}
      </div>
    </div>
  );
}
