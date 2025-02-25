import React, { useEffect, useState } from 'react'
import DashboardTemplate from '../../Dashboard/DashboardTemplate'
import { useModal } from '../../../hooks/useModal'
import useProduct from '../../../hooks/useProduct'
import ProductTable from '../../../components/Seller/ProductTable'
import AddProductModal from '../../../components/Seller/AddProductModal'
import useCategory from '../../../hooks/useCategory'
import StatusModal from '../../../components/Seller/StatusModal'
import UpdateProductModal from '../../../components/Seller/UpdateProductModal'
import DeleteProductModal from '../../../components/Seller/DeleteProductModal'

export default function SellerProducts() {
  const {
    isFetched,
    products,
    isLoading,
    fetchProducts,
    handleCreateProduct,
    handleStatus,
    handleUpdateProduct,
    handelDeleteProduct,
    statusFilter,
    setStatusFilter
  } = useProduct()
  
  const {
    category,
    fetchCategory,
  } = useCategory()
  
  const [formData, setFormData] = useState({})
  
  useEffect(() => {
    if (!isFetched.current) {
      fetchProducts();
      fetchCategory();
      isFetched.current = true;
    }
  }, [isFetched, fetchProducts, fetchCategory])
  
  const createModal = useModal()
  const statusModal = useModal()
  const updateModal = useModal()
  const deleteModal = useModal()
  
  const handleConfirmCreateProduct = async(data) => {
    if (await handleCreateProduct(data, true)) {
      createModal.closeModal()
      setFormData({});
    }
  }
  
  const handleConfirmStatus = async() => {
    // Toggle the status (true -> false or false -> true)
    const newStatus = !statusModal.selectedItem.status;
    
    if (await handleStatus(statusModal.selectedItem.id, newStatus)) {
      statusModal.closeModal();
    }
  }

  const handleConfirmUpdateProduct = async(data) => {
    if (await handleUpdateProduct(updateModal.selectedItem.id, data)) {
      updateModal.closeModal()
    }
  }

  const handleConfirmDeleteProduct = async() => {
    if (await handelDeleteProduct(deleteModal.selectedItem.id)) {
      deleteModal.closeModal()
    }
  }
  
  return (
    <DashboardTemplate
      title='Products'
      showButton={true}
      buttonTitle='Add Product'
      onButtonClick={createModal.openModal}
    >
      <div className="mb-4 flex items-center">
        <span className="mr-2">Filter:</span>
        <button
          className={`px-3 py-1 mr-2 rounded ${statusFilter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setStatusFilter(true)}
        >
          Active
        </button>
        <button
          className={`px-3 py-1 rounded ${!statusFilter ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          onClick={() => setStatusFilter(false)}
        >
          Archived
        </button>
      </div>
      
      <ProductTable
        products={products}
        onAdjust={statusModal.openModal}
        onUpdate={updateModal.openModal}
        onDelete={deleteModal.openModal}
      />
      
      <AddProductModal
        category={category}
        isOpen={createModal.isOpen}
        onClose={() => {
          createModal.closeModal()
          setFormData({});
        }}
        onConfirm={handleConfirmCreateProduct}
        formData={formData}
        setFormData={setFormData}
        isLoading={isLoading}
      />
      
      <StatusModal
        isOpen={statusModal.isOpen}
        product={statusModal.selectedItem}
        onClose={statusModal.closeModal}
        isLoading={isLoading}
        onConfirm={handleConfirmStatus}
      />

      <UpdateProductModal
        category={category}
        isLoading={isLoading}
        isOpen={updateModal.isOpen}
        onClose={updateModal.closeModal}
        onConfirm={handleConfirmUpdateProduct}
        product={updateModal.selectedItem}
      />

      <DeleteProductModal
        isLoading={isLoading}
        isOpen={deleteModal.isOpen}
        onClose={deleteModal.closeModal}
        onConfirm={handleConfirmDeleteProduct}
        product={deleteModal.selectedItem}
      />
    </DashboardTemplate>
  )
}