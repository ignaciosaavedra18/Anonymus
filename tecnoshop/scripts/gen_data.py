import json, random, base64

random.seed(42)

categories = ["Computadores", "Celulares", "Tablets", "Smartwatches", "Monitores", "Audífonos", "Accesorios"]

brand_by_cat = {
    "Computadores": ["Lenovo", "HP", "Dell", "Asus", "Apple"],
    "Celulares": ["Apple", "Samsung", "Xiaomi", "Motorola"],
    "Tablets": ["Apple", "Samsung", "Lenovo", "Xiaomi"],
    "Smartwatches": ["Apple", "Samsung", "Xiaomi", "Garmin"],
    "Monitores": ["LG", "Samsung", "Asus", "Dell"],
    "Audífonos": ["Sony", "JBL", "Apple", "Logitech"],
    "Accesorios": ["Logitech", "Anker", "Belkin", "JBL"],
}

product_lines = {
    "Computadores": ["Notebook 14\"", "Notebook 15.6\"", "Notebook Gamer 16\"", "All in One 24\"", "Mini PC"],
    "Celulares": ["Smartphone 128GB", "Smartphone 256GB", "Smartphone 5G 128GB", "Smartphone Lite"],
    "Tablets": ["Tablet 10.9\"", "Tablet 11\" Pro", "Tablet 8\" Mini"],
    "Smartwatches": ["Smartwatch Sport", "Smartwatch GPS", "Smartwatch Classic"],
    "Monitores": ["Monitor 24\" FHD", "Monitor 27\" QHD", "Monitor 32\" 4K", "Monitor Curvo 27\""],
    "Audífonos": ["Audífonos Inalámbricos", "Audífonos Cancelación de Ruido", "Audífonos Gamer", "Audífonos Deportivos"],
    "Accesorios": ["Mouse Inalámbrico", "Teclado Mecánico", "Cargador rápido 65W", "Hub USB-C", "Power Bank 20000mAh", "Funda Protectora", "Soporte para Notebook"],
}

price_range_by_cat = {
    "Computadores": (289990, 1299990),
    "Celulares": (149990, 1199990),
    "Tablets": (129990, 799990),
    "Smartwatches": (49990, 349990),
    "Monitores": (99990, 549990),
    "Audífonos": (14990, 219990),
    "Accesorios": (7990, 89990),
}

# Deep indigo family + amber accent, varied per category for quick visual scanning
cat_colors = {
    "Computadores": "#3730A9",
    "Celulares": "#23206B",
    "Tablets": "#4B46C4",
    "Smartwatches": "#6C63D8",
    "Monitores": "#2C2790",
    "Audífonos": "#524BC0",
    "Accesorios": "#7A73E0",
}

cat_icon_paths = {
    "Computadores": '<rect x="30" y="30" width="140" height="90" rx="4"/><rect x="70" y="150" width="60" height="8" rx="2"/>',
    "Celulares": '<rect x="65" y="25" width="70" height="150" rx="10"/><circle cx="100" cy="150" r="4"/>',
    "Tablets": '<rect x="45" y="30" width="110" height="140" rx="8"/><circle cx="100" cy="150" r="4"/>',
    "Smartwatches": '<rect x="70" y="55" width="60" height="70" rx="10"/><rect x="82" y="30" width="36" height="25" rx="4"/><rect x="82" y="125" width="36" height="25" rx="4"/>',
    "Monitores": '<rect x="30" y="35" width="140" height="95" rx="4"/><rect x="85" y="135" width="30" height="20"/><rect x="65" y="155" width="70" height="8" rx="2"/>',
    "Audífonos": '<path d="M50 100a50 50 0 0 1 100 0" fill="none" stroke-width="8"/><rect x="42" y="95" width="20" height="40" rx="8"/><rect x="138" y="95" width="20" height="40" rx="8"/>',
    "Accesorios": '<circle cx="100" cy="100" r="55" fill="none" stroke-width="6"/><circle cx="100" cy="100" r="10"/>',
}

def make_svg(category: str, brand: str) -> str:
    color = cat_colors.get(category, "#3730A9")
    icon = cat_icon_paths.get(category, "")
    svg = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
<rect width="200" height="200" fill="#EEF0F6"/>
<g fill="none" stroke="{color}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" opacity="0.85">{icon}</g>
<text x="100" y="188" font-family="Arial, sans-serif" font-size="11" text-anchor="middle" fill="{color}" font-weight="600">{brand}</text>
</svg>'''
    encoded = base64.b64encode(svg.encode("utf-8")).decode("ascii")
    return f"data:image/svg+xml;base64,{encoded}"

products = []
pid = 1
for cat in categories:
    lines = product_lines[cat]
    count = 0
    while count < 8:
        line = random.choice(lines)
        brand = random.choice(brand_by_cat[cat])
        lo, hi = price_range_by_cat[cat]
        price = random.randrange(lo, hi, 1000)
        stock = random.randint(0, 60)
        products.append({
            "id": f"P{pid:03d}",
            "name": f"{brand} {line}",
            "category": cat,
            "brand": brand,
            "price": price,
            "stock": stock,
            "rating": round(random.uniform(3.5, 5.0), 1),
            "image": make_svg(cat, brand),
            "description": f"{line} de la marca {brand}, ideal para uso diario, estudio o trabajo. Categoría: {cat}.",
        })
        pid += 1
        count += 1

assert len(products) == 56

first_names = ["Ignacio","Kevin","Joaquín","Camila","Fernanda","Matías","Josefa","Diego","Valentina","Sebastián",
               "Antonia","Cristóbal","Martina","Benjamín","Constanza","Vicente","Isidora","Tomás","Florencia","Agustín"]
last_names = ["Saavedra","Aguilera","Cárdenas","González","Muñoz","Rojas","Contreras","Silva","Fuentes","Vergara"]

roles = ["cliente"]*17 + ["administrador"]*2 + ["soporte"]*1

users = []
for i in range(20):
    fn = first_names[i]
    ln = random.choice(last_names)
    users.append({
        "id": f"U{i+1:03d}",
        "name": f"{fn} {ln}",
        "email": f"{fn.lower()}.{ln.lower()}@tecnoshop.cl".replace('í','i').replace('é','e').replace('á','a').replace('ó','o').replace('ú','u'),
        "password": "Demo1234",
        "role": roles[i],
        "region": random.choice(["Metropolitana","Valparaíso","Biobío","Los Lagos","Coquimbo","Maule"]),
    })

statuses = ["pendiente","confirmado","en_preparacion","enviado","entregado","cancelado"]
status_weights = [0.15,0.15,0.15,0.2,0.3,0.05]

orders = []
client_users = [u for u in users if u["role"] == "cliente"]
for i in range(24):
    user = random.choice(client_users)
    n_items = random.randint(1,4)
    chosen = random.sample(products, n_items)
    items = []
    total = 0
    for p in chosen:
        qty = random.randint(1,3)
        items.append({"productId": p["id"], "name": p["name"], "unitPrice": p["price"], "qty": qty})
        total += p["price"]*qty
    status = random.choices(statuses, weights=status_weights)[0]
    orders.append({
        "id": f"OC{i+1:04d}",
        "userId": user["id"],
        "date": f"2026-0{random.randint(1,8)}-{random.randint(1,28):02d}",
        "items": items,
        "total": total,
        "status": status,
    })

print("products:", len(products), "users:", len(users), "orders:", len(orders), "sum:", len(products)+len(users)+len(orders))

import os
os.makedirs("src/data", exist_ok=True)
with open("src/data/products.json","w",encoding="utf-8") as f:
    json.dump(products, f, ensure_ascii=False, indent=2)
with open("src/data/users.json","w",encoding="utf-8") as f:
    json.dump(users, f, ensure_ascii=False, indent=2)
with open("src/data/orders.json","w",encoding="utf-8") as f:
    json.dump(orders, f, ensure_ascii=False, indent=2)
