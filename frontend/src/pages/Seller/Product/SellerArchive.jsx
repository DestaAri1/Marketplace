import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../Dashboard/DashboardTemplate'
import { useModal } from '../../../hooks/useModal'
import ProductTable from '../../../components/Seller/ProductTable'
import useProduct from '../../../hooks/useProduct'
import AddProductModal from '../../../components/Seller/AddProductModal'
import useCategory from '../../../hooks/useCategory'

export default function SellerArchive() {
  const {
    products,
    isFetched,
    isLoading,
    fetchProducts,
    handleCreateProduct,
  } = useProduct()
  
  const {category, fetchCategory} = useCategory()
  const [formData, setFormData] = useState({})

  useEffect(() => {
    if (!isFetched.current) {
      fetchProducts(false);
      fetchCategory()
      isFetched.current = true;
    }
  }, [fetchProducts, isFetched, fetchCategory]);

  const createModal = useModal()

  const handleConfirmCreateProduct = async(data) => {
    if (await handleCreateProduct(data)) {
      createModal.closeModal();
      setFormData({});  // Reset form data after successful creation
    }
  }

  return (
    <DashboardTemplate
      title='Products Archive'
      showButton={true}
      buttonTitle='Add Product'
      onButtonClick={createModal.openModal}
    >
      <AddProductModal
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.closeModal();
          setFormData({});  // Reset form data when closing modal
        }}
        onConfirm={handleConfirmCreateProduct}
        category={category}
        formData={formData}
        setFormData={setFormData}
      />
      
      <ProductTable
        products={products}
      />
    </DashboardTemplate>
  )
}