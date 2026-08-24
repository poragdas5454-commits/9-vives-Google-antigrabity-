import { initializeApp, getApps } from 'firebase/app';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  onSnapshot 
} from 'firebase/firestore';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Official Live Firebase Project Configuration for 9 Vives (vives-bd49b)
export const liveFirebaseConfig = {
  apiKey: "AIzaSyDaQbClsu23drOMxEMjaTssO1jHUEQGvmE",
  authDomain: "vives-bd49b.firebaseapp.com",
  projectId: "vives-bd49b",
  storageBucket: "vives-bd49b.firebasestorage.app",
  messagingSenderId: "781467327861",
  appId: "1:781467327861:web:ef73338963600f6320c73c",
  measurementId: "G-QWENB9MC0E"
};

let app;
let db;
let auth;
let storage;
let analytics;

try {
  if (!getApps().length) {
    app = initializeApp(liveFirebaseConfig);
  } else {
    app = getApps()[0];
  }
  db = getFirestore(app);
  auth = getAuth(app);
  storage = getStorage(app);

  isSupported().then(supported => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
  console.log("🔥 9 Vives connected successfully to Live Firebase Project: vives-bd49b");
} catch (error) {
  console.error("Firebase live connection error:", error);
}

// 1. Centralized Store Settings (Firestore document: settings/store)
export const DEFAULT_STORE_SETTINGS = {
  brandName: "9 Vives",
  storeName: "9 Vives",
  tagline: "Premium T-Shirts & Modern Fashion",
  heroHeadline: "MODERN STYLE. UNCOMPROMISED QUALITY.",
  heroSubtext: "Crafted from 240+ GSM heavyweight combed cotton. Engineered for everyday confidence and contemporary street fashion.",
  heroCTA: "EXPLORE COLLECTION",
  heroImage: "/images/hero_banner.jpg",
  supportEmail: "concierge@9vives.com",
  supportPhone: "+880 1700-9VIVES",
  address: "House 9, Road 9, Banani, Dhaka, Bangladesh",
  currency: "৳",
  timezone: "Asia/Dhaka",
  logoURLs: {
    primary: "",
    light: "",
    dark: "",
    mobile: "",
    favicon: ""
  },
  socialLinks: {
    facebook: "https://facebook.com/9vives",
    instagram: "https://instagram.com/9vives",
    tiktok: "https://tiktok.com/@9vives",
    youtube: "https://youtube.com/@9vives"
  },
  defaultSEO: {
    title: "9 Vives | Premium T-Shirts & Modern Fashion",
    description: "9 Vives is a modern fashion e-commerce brand offering heavyweight oversized t-shirts, minimal streetwear, and contemporary apparel.",
    keywords: "9 Vives, T-Shirt, Oversized Tee, Streetwear, Modern Fashion, Bangladesh Fashion"
  },
  brandColors: {
    primaryBg: "#0a0a0a",
    cardBg: "#171717",
    textColor: "#f5f5f5",
    accentColor: "#d4af37"
  }
};

export const INITIAL_PRODUCTS = [
  {
    id: "9v-001",
    brand: "9 Vives",
    name: "9 Vives Signature Heavyweight Oversized Tee",
    category: "Oversized Tees",
    price: 1450,
    compareAtPrice: 1850,
    description: "Signature 9 Vives oversized tee crafted from 240 GSM 100% combed cotton. Features dropped shoulders, pre-shrunk fabric finish, and high-density 9 Vives tonal branding.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Matte Black", "Off White", "Charcoal"],
    images: ["/images/oversized_tee_black.jpg", "/images/oversized_tee_white.jpg"],
    stock: 45,
    isFeatured: true,
    isNewArrival: true,
    badge: "BESTSELLER"
  },
  {
    id: "9v-002",
    brand: "9 Vives",
    name: "9 Vives Minimalist Graphic Box Tee",
    category: "Graphic Tees",
    price: 1350,
    compareAtPrice: 1600,
    description: "Modern streetwear silhouette with screen-printed 9 Vives artwork on back and chest micro logo. Made with breathable 220 GSM luxury cotton.",
    sizes: ["M", "L", "XL"],
    colors: ["Off White", "Matte Black"],
    images: ["/images/oversized_tee_white.jpg", "/images/oversized_tee_black.jpg"],
    stock: 28,
    isFeatured: true,
    isNewArrival: true,
    badge: "NEW"
  },
  {
    id: "9v-003",
    brand: "9 Vives",
    name: "9 Vives Heavyweight Fleece Hoodie",
    category: "Outerwear",
    price: 2850,
    compareAtPrice: 3400,
    description: "400 GSM heavy fleece hoodie engineered for maximum warmth and structured drape. Double-lined hood with custom 9 Vives metal aglets.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Charcoal Grey", "Matte Black"],
    images: ["/images/streetwear_hoodie.jpg"],
    stock: 15,
    isFeatured: true,
    isNewArrival: false,
    badge: "LIMITED"
  },
  {
    id: "9v-004",
    brand: "9 Vives",
    name: "9 Vives Raw Essential Blank Tee",
    category: "Basics",
    price: 1150,
    compareAtPrice: 1350,
    description: "Clean, unembellished luxury basic t-shirt. Precision tailored collar that retains structure after 100+ washes. 200 GSM premium ring-spun cotton.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Matte Black", "Off White"],
    images: ["/images/oversized_tee_black.jpg"],
    stock: 60,
    isFeatured: false,
    isNewArrival: true,
    badge: "ESSENTIAL"
  }
];

// Live Firestore Functions
export const syncStoreSettingsToFirestore = async (newSettings) => {
  if (!db) return;
  try {
    const storeRef = doc(db, 'settings', 'store');
    await setDoc(storeRef, newSettings, { merge: true });
    console.log("🔥 Firestore Sync: settings/store updated in vives-bd49b");
  } catch (err) {
    console.warn("Firestore sync warning (settings/store):", err);
  }
};

export const syncUserToFirestore = async (userData) => {
  if (!db) return;
  try {
    const userRef = doc(db, 'users', userData.id);
    await setDoc(userRef, userData, { merge: true });
    console.log("🔥 Firestore Sync: user profile written to vives-bd49b", userData.id);
  } catch (err) {
    console.warn("Firestore sync warning (users):", err);
  }
};

export const syncOrderToFirestore = async (orderData) => {
  if (!db) return;
  try {
    const orderRef = doc(db, 'orders', orderData.id);
    await setDoc(orderRef, orderData);
    console.log("🔥 Firestore Sync: order recorded in vives-bd49b", orderData.id);
  } catch (err) {
    console.warn("Firestore sync warning (orders):", err);
  }
};

export const syncProductToFirestore = async (productData) => {
  if (!db) return;
  try {
    const prodRef = doc(db, 'products', productData.id);
    await setDoc(prodRef, productData);
    console.log("🔥 Firestore Sync: product written to vives-bd49b", productData.id);
  } catch (err) {
    console.warn("Firestore sync warning (products):", err);
  }
};

export { db, auth, storage, analytics };
