import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../../lib/firebase/firebase";
import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, addDoc, updateDoc, deleteDoc, onSnapshot, serverTimestamp } from "firebase/firestore";
import { Product } from "../../types/types";
import '../../styles/auth-styles.css';
import ProductCard from "../../components/ProductCard/ProductCard";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Omit<Product, 'id' | 'createdAt' | 'updatedAt'>>({
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    quantity: 1
  });
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        navigate('/login');
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productList = snapshot.docs.map((doc) => ({
        id: doc.id, ...doc.data() })) as Product[];

        const validProducts = productList.filter(p => p.id && p.title && p.price);
        setProducts(validProducts);
    });
    return () => unsubscribe();
  }, []);

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'quantity' ? Number(value): value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProduct.title || !newProduct.image || newProduct.price <= 0 || !newProduct.category || !newProduct.description) {
      setError('Please fill out all the required fields');
      return;
    }
    
    try {
      if (editingProductId) {
        await updateDoc(doc(db, 'products', editingProductId), {
          ...newProduct,
          updatedAt: serverTimestamp()
        });
        setSuccess('Product successfully updated');
      } else {
        await addDoc(collection(db, 'products'), {
          ...newProduct,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp()
        });
        setSuccess('Product successfully added');
        setTimeout(() => setSuccess(''), 3000);
      }
      setNewProduct({ 
        title: '',
        price: 0,
        description: '',
        category: '',
        image: '',
        quantity: 1
      });
      setEditingProductId(null);
    } catch (err: any) {
        setError(err.message);
    }
  };
    
  const handleEdit = (product: Product) => {
    setNewProduct({
      title: product.title,
      price: product.price,
      description: product.description,
      category: product.category,
      image: product.image,
      quantity: product.quantity
    });
    setEditingProductId(product.id || null )
  };

  const handleDelete = async (productId: string) => {
    try {
      await deleteDoc(doc(db, 'products', productId));
      setSuccess('Product deleted successfully.');
      setTimeout(() => setSuccess(''), 3000);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <>
    <div className="form">
      <h1>Home Page</h1>

      <form onSubmit={handleSubmit}>
        <fieldset className="fieldset">
          <legend className="legend">Product Form</legend>

          <input
          className="input"
          name="title"
          type="text"
          value={newProduct.title}
          placeholder="Product Title"
          onChange={handleProductChange}
          required
          />

          <input
          className="price"
          name="price"
          type="number"
          value={newProduct.price}
          placeholder="Product Price"
          onChange={handleProductChange}
          required
          />

          <textarea
          name="description"
          cols={20 as number}
          rows={5 as number}
          value={newProduct.description}
          placeholder="Product Description"
          onChange={handleProductChange}
          required
          />

          <select
          name="category"
          value={newProduct.category}
          onChange={handleProductChange}
          required>
            <option value="">Select Category</option>
            <option value="home">Home</option>
            <option value="clothing">Clothing</option>
            <option value="electronics">Electronics</option>
          </select>

          <input
          className="input"
          name="image"
          type="text"
          value={newProduct.image}
          placeholder="Product Image URL"
          onChange={handleProductChange}
          required
          />

          <input
          className="input"
          name="quantity"
          type="number"
          value={newProduct.quantity}
          placeholder="Product Quantity"
          onChange={handleProductChange}
          min='1'
          required
          />

          <button type="submit" className="button">{editingProductId ? 'Update Product' : 'Add Product'}</button>
          {editingProductId && <button type="button" onClick={() => {
            setEditingProductId(null);
            setNewProduct({ 
              title: '',
              price: 0,
              description: '',
              category: '',
              image: '',
              quantity: 1
            });
            }}>Cancel</button>}
        </fieldset>

      </form>

      {success && <p className="success">{success}</p>}
      {error && <p className="error">{error}</p>}

      <h2>Product List</h2>
      {products.length > 0 ? (
        <div>
          {products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />

              <button className="button" onClick={() => handleEdit(product)}>Edit</button>

              <button className="deleteButton" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          ))}
        </div>
      ) : (
        <p>No product available</p>
      )}
    </div>
    </>
  )
};

export default Home;