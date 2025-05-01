# REST API – Project Manager

Tämä API mahdollistaa projektien hallinnan (luonti, haku, muokkaus ja poisto) Node.js:n, Expressin ja MongoDB:n avulla.

---

## Reitit

| Method | URL                  | Kuvaus                         |
|--------|-----------------------|---------------------------------|
| GET    | `/api/getall`        | Hae kaikki projektit            |
| GET    | `/api/:id`           | Hae yksi projekti ID:n mukaan   |
| POST   | `/api/add`           | Luo uusi projekti               |
| PUT    | `/api/update/:id`    | Päivitä projekti ID:n mukaan    |
| DELETE | `/api/delete/:id`    | Poista projekti ID:n mukaan     |

---

## Esimerkkipyyntö – POST `/api/add`

**Pyynnön runko (JSON):**

```json
{
  "title": "REST API Workshop",
  "description": "Esimerkki projektista",
  "status": "active"
}
```

**Mahdolliset arvot `status`:**
- `"active"`
- `"completed"`
- `"archived"`

---

## Esimerkkivastaus

```json
{
  "_id": "662ff1abc...",
  "title": "REST API Workshop",
  "description": "Esimerkki projektista",
  "status": "active",
  "createdAt": "2025-05-01T17:00:00.000Z"
}
```

---

## Vastausformaatti – GET `/api/getall`

```json
[
  {
    "_id": "662ffa12...",
    "title": "Projektin nimi",
    "description": "Kuvaus",
    "status": "completed",
    "createdAt": "2025-05-01T10:00:00.000Z"
  }
]
```
