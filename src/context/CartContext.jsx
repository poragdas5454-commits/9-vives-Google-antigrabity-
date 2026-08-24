import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('9vives_cart');
    return saved ? JSON.parse(saved) : [];
  });
  
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0); // percentage

  useEffect(() => {
    localStorage.setItem('9vives_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, selectedSize, selectedColor, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.selectedSize === selectedSize && item.selectedColor === selectedColor
      );

      if (existingIndex > -1) {
        const updated = [...prevItems];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prevItems,
          {
            id: product.id,
            brand: "9 Vives",
            name: product.name,
            price: product.price,
            image: product.images?.[0] || '/images/oversized_tee_black.jpg',
            selectedSize,
            selectedColor,
            quantity
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (index) => {
    setCartItems((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, delta) => {
    setCartItems((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const applyPromoCode = (code) => {
    if (code.trim().toUpperCase() === 'VIVES10' || code.trim().toUpperCase() === 'FIRST9') {
      setAppliedDiscount(10);
      setDiscountCode(code.toUpperCase());
      return { success: true, message: '10% 9 Vives Member Discount Applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try VIVES10' };
  };

  const clearCart = () => {
    setCartItems([]);
    setDiscountCode('');
    setAppliedDiscount(0);
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const total = subtotal - discountAmount;
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      discountCode,
      appliedDiscount,
      applyPromoCode,
      subtotal,
      discountAmount,
      total,
      cartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
