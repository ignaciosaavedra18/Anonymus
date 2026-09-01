import type { Product, User, Order, CartLine, OrderStatus } from '../types';
import seedProducts from '../data/products.json';
import seedUsers from '../data/users.json';
import seedOrders from '../data/orders.json';

const DB_KEY = 'tecnoshop_db_v1';
const SESSION_KEY = 'tecnoshop_session_v1';

interface DB {
  products: Product[];
  users: User[];
  orders: Order[];
  cart: CartLine[];
}

function loadDB(): DB {
  const raw = localStorage.getItem(DB_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as DB;
    } catch {
      // fall through to reseed on corrupt data
    }
  }
  const fresh: DB = {
    products: seedProducts as Product[],
    users: seedUsers as User[],
    orders: seedOrders as Order[],
    cart: [],
  };
  localStorage.setItem(DB_KEY, JSON.stringify(fresh));
  return fresh;
}

let db = loadDB();

function persist() {
  localStorage.setItem(DB_KEY, JSON.stringify(db));
}

/* ---------- Sesión ---------- */

export function getSession(): User | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

export function login(email: string, password: string): User | null {
  const user = db.users.find(
    (u) => u.email.toLowerCase() === email.trim().toLowerCase() && u.password === password
  );
  if (user) localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user ?? null;
}

export function register(name: string, email: string, password: string): User | { error: string } {
  const exists = db.users.some((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  if (exists) return { error: 'Ya existe una cuenta registrada con ese correo.' };
  const user: User = {
    id: `U${(db.users.length + 1).toString().padStart(3, '0')}`,
    name: name.trim(),
    email: email.trim().toLowerCase(),
    password,
    role: 'cliente',
    region: 'Metropolitana',
  };
  db.users.push(user);
  persist();
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  return user;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

/* ---------- Catálogo ---------- */

export function getProducts(): Product[] {
  return db.products;
}

export function getProduct(id: string): Product | undefined {
  return db.products.find((p) => p.id === id);
}

export function getCategories(): string[] {
  return Array.from(new Set(db.products.map((p) => p.category))).sort();
}

export function getBrands(): string[] {
  return Array.from(new Set(db.products.map((p) => p.brand))).sort();
}

export function upsertProduct(product: Product) {
  const idx = db.products.findIndex((p) => p.id === product.id);
  if (idx === -1) db.products.push(product);
  else db.products[idx] = product;
  persist();
}

export function nextProductId(): string {
  const max = db.products.reduce((m, p) => Math.max(m, parseInt(p.id.slice(1), 10) || 0), 0);
  return `P${(max + 1).toString().padStart(3, '0')}`;
}

/* ---------- Carrito ---------- */

export function getCart(): CartLine[] {
  return db.cart;
}

export function addToCart(productId: string, qty = 1) {
  const line = db.cart.find((c) => c.productId === productId);
  if (line) line.qty += qty;
  else db.cart.push({ productId, qty });
  persist();
}

export function updateCartQty(productId: string, qty: number) {
  if (qty <= 0) {
    db.cart = db.cart.filter((c) => c.productId !== productId);
  } else {
    const line = db.cart.find((c) => c.productId === productId);
    if (line) line.qty = qty;
  }
  persist();
}

export function removeFromCart(productId: string) {
  db.cart = db.cart.filter((c) => c.productId !== productId);
  persist();
}

export function clearCart() {
  db.cart = [];
  persist();
}

export function cartLinesWithProducts() {
  return db.cart
    .map((line) => ({ line, product: getProduct(line.productId) }))
    .filter((x): x is { line: CartLine; product: Product } => !!x.product);
}

export function cartTotal(): number {
  return cartLinesWithProducts().reduce((sum, { line, product }) => sum + line.qty * product.price, 0);
}

export function cartCount(): number {
  return db.cart.reduce((sum, c) => sum + c.qty, 0);
}

/* ---------- Pedidos ---------- */

export function getOrders(): Order[] {
  return db.orders;
}

export function getOrdersByUser(userId: string): Order[] {
  return db.orders.filter((o) => o.userId === userId).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function nextOrderId(): string {
  const max = db.orders.reduce((m, o) => Math.max(m, parseInt(o.id.slice(2), 10) || 0), 0);
  return `OC${(max + 1).toString().padStart(4, '0')}`;
}

export function placeOrder(userId: string): Order | { error: string } {
  const lines = cartLinesWithProducts();
  if (lines.length === 0) return { error: 'El carrito está vacío.' };
  for (const { line, product } of lines) {
    if (line.qty > product.stock) {
      return { error: `Stock insuficiente para ${product.name}.` };
    }
  }
  const order: Order = {
    id: nextOrderId(),
    userId,
    date: new Date().toISOString().slice(0, 10),
    items: lines.map(({ line, product }) => ({
      productId: product.id,
      name: product.name,
      unitPrice: product.price,
      qty: line.qty,
    })),
    total: cartTotal(),
    status: 'pendiente',
  };
  db.orders.push(order);
  for (const { line, product } of lines) {
    product.stock -= line.qty;
  }
  db.cart = [];
  persist();
  return order;
}

export function updateOrderStatus(orderId: string, status: OrderStatus) {
  const order = db.orders.find((o) => o.id === orderId);
  if (order) order.status = status;
  persist();
}

/* ---------- Usuarios (admin) ---------- */

export function getUsers(): User[] {
  return db.users;
}

export function resetDemoData() {
  localStorage.removeItem(DB_KEY);
  localStorage.removeItem(SESSION_KEY);
  db = loadDB();
}
