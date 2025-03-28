import { useRef, useState, useEffect } from "react";
import { sellerProductsApi } from "../services/productSeller";
import { toast } from "react-toastify";
import { showSuccessToast } from "../utils/Toast";

export default function useProduct() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState(true); // Default showing active products
  const [allProducts, setAllProducts] = useState([]);
  const isFetched = useRef(false);

  // Apply filter whenever statusFilter changes
  useEffect(() => {
    if (allProducts.length > 0) {
      setProducts(
        allProducts.filter((product) => product.status === statusFilter)
      );
    }
  }, [statusFilter, allProducts]);

  const handleApiCall = async (apiFunction, successMessage) => {
    setIsLoading(true);
    try {
      const response = await apiFunction();
      if (response?.data?.message) {
        toast.dismiss();
        showSuccessToast(response.data.message || successMessage);
        return true;
      }
      return false;
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || error.message || "Operation failed";
      toast.error(errorMessage);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const { data: { data = [] } = {} } =
        (await sellerProductsApi.getAll()) || {};
      setAllProducts(data);
      // Let the useEffect handle filtering
    } catch (error) {
      toast.error(error.message || "Failed to fetch products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateProduct = async (formData, status) => {
    // Buat FormData untuk upload multipart/form-data
    const productData = new FormData();

    // Konversi dan tambahkan data dengan hati-hati
    productData.append("name", String(formData.name).trim());

    // Pastikan stock dikonversi dengan benar
    const stockValue =
      formData.stock !== undefined && formData.stock !== null
        ? parseInt(formData.stock, 10)
        : 0;
    productData.append("stock", String(stockValue));

    // Konversi harga
    const priceValue =
      formData.price !== undefined && formData.price !== null
        ? parseFloat(formData.price)
        : 0;
    productData.append("price", String(priceValue));

    // Tambahkan category_id dengan metode yang lebih aman
    if (formData.category_id) {
      const categoryId = parseInt(formData.category_id, 10);
      if (!isNaN(categoryId)) {
        productData.append("category_id", String(categoryId));
      } else {
        toast.error("ID Kategori tidak valid");
        return false;
      }
    } else {
      toast.error("Pilih kategori terlebih dahulu");
      return false;
    }

    // Tambahkan deskripsi
    productData.append(
      "description",
      String(formData.description || "").trim()
    );

    // Tambahkan status
    productData.append("status", status ? "true" : "false");

    // Tambahkan gambar jika ada
    if (formData.product_image) {
      productData.append("image", formData.product_image);
    }

    const success = await handleApiCall(
      () => sellerProductsApi.create(productData),
      "Produk berhasil dibuat"
    );

    if (success) {
      await fetchProducts(); // Refresh daftar produk
    }

    return success;
  };

  const handleStatus = async (id, newStatus) => {
    const success = await handleApiCall(
      () => sellerProductsApi.updateStatus(id, newStatus),
      "Successfully change status"
    );

    if (success) {
      // Update the local state immediately
      setAllProducts((prevProducts) =>
        prevProducts.map((product) =>
          product.id === id ? { ...product, status: newStatus } : product
        )
      );
    }

    return success;
  };

  const handleUpdateProduct = async (id, formData) => {
    // Create FormData for multipart/form-data upload
    const productData = new FormData();
    productData.append("name", String(formData.name).trim());
    productData.append("stock", parseInt(formData.stock, 10));
    productData.append("price", parseFloat(formData.price));
    productData.append("category", parseInt(formData.category_id, 10));
    productData.append("description", String(formData.description).trim());

    // Append image if it exists
    if (formData.product_image) {
      productData.append("image", formData.product_image);
    }

    const success = await handleApiCall(
      () => sellerProductsApi.update(id, productData),
      "Successfully updated product"
    );

    if (success) {
      await fetchProducts(); // Refresh products after update
    }

    return success;
  };

  const handelDeleteProduct = async (id) => {
    const success = await handleApiCall(
      () => sellerProductsApi.delete(id),
      "Successfully delete product"
    );

    if (success) {
      await fetchProducts(); // Refresh products after delete
    }

    return success;
  };

  return {
    products,
    allProducts,
    isFetched,
    isLoading,
    fetchProducts,
    statusFilter,
    setStatusFilter,
    handleCreateProduct,
    handleStatus,
    handleUpdateProduct,
    handelDeleteProduct,
  };
}
