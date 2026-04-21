import os
import django
import random
from datetime import date, timedelta, datetime, time

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "aerobook.settings")  # ← твоя папка
django.setup()

from core.models import Flight, Airport, Airplane
from django.utils import timezone

# ════════════════════════════════════════════════════════════
#  ДАННЫЕ
# ════════════════════════════════════════════════════════════

AIRPORTS_DATA = [
    {"iata_code": "ALA", "city": "Almaty",    "name": "Международный аэропорт Алматы", "country": "Kazakhstan"},
    {"iata_code": "IST", "city": "Istanbul",  "name": "Аэропорт Стамбул",              "country": "Turkey"},
    {"iata_code": "DXB", "city": "Dubai",     "name": "Международный аэропорт Дубай",  "country": "UAE"},
    {"iata_code": "FRA", "city": "Frankfurt", "name": "Аэропорт Франкфурт",            "country": "Germany"},
    {"iata_code": "MOW", "city": "Moscow",    "name": "Аэропорт Шереметьево",          "country": "Russia"},
    {"iata_code": "TSE", "city": "Astana",    "name": "Международный аэропорт Астана", "country": "Kazakhstan"},
    {"iata_code": "BKK", "city": "Bangkok",   "name": "Аэропорт Суварнабхуми",         "country": "Thailand"},
    {"iata_code": "PEK", "city": "Beijing",   "name": "Международный аэропорт Пекин",  "country": "China"},
]

# Самолёты — посмотри поля своей модели Airplane в admin или models.py
# Скорее всего там: model, registration, capacity или похожее
AIRPLANES_DATA = [
    {"model": "Boeing 737-800",  "total_rows": 31, "seats_per_row": 6, "business_rows": 4},
    {"model": "Boeing 757-200",  "total_rows": 36, "seats_per_row": 6, "business_rows": 5},
    {"model": "Airbus A320",     "total_rows": 30, "seats_per_row": 6, "business_rows": 4},
    {"model": "Airbus A321",     "total_rows": 36, "seats_per_row": 6, "business_rows": 5},
    {"model": "Boeing 767-300",  "total_rows": 42, "seats_per_row": 7, "business_rows": 6},
    {"model": "Airbus A330-200", "total_rows": 40, "seats_per_row": 8, "business_rows": 6},
]

ROUTES = [
    ("ALA", "IST", 360, 35000),
    ("ALA", "DXB", 300, 28000),
    ("ALA", "FRA", 480, 55000),
    ("ALA", "MOW", 240, 22000),
    ("ALA", "TSE",  90,  8000),
    ("ALA", "BKK", 420, 45000),
    ("ALA", "PEK", 270, 30000),
    ("IST", "ALA", 360, 38000),
    ("DXB", "ALA", 300, 32000),
    ("MOW", "ALA", 240, 25000),
    ("TSE", "ALA",  90,  9000),
    ("IST", "DXB", 210, 20000),
    ("FRA", "IST", 195, 22000),
]

# ════════════════════════════════════════════════════════════

def create_airports():
    print("📍 Создаю аэропорты...")
    airports = {}
    for d in AIRPORTS_DATA:
        ap, created = Airport.objects.get_or_create(
            iata_code=d["iata_code"],
            defaults={"name": d["name"], "city": d["city"], "country": d["country"]}
        )
        airports[d["iata_code"]] = ap
        if created:
            print(f"   ✅ {d['iata_code']} — {d['city']}")
    print(f"   Итого аэропортов в БД: {Airport.objects.count()}")
    return airports


def create_airplanes():
    print("\n✈️  Создаю самолёты...")
    airplanes = []
    for d in AIRPLANES_DATA:
        airplane, created = Airplane.objects.get_or_create(
            model=d["model"],
            defaults={
                "total_rows":    d["total_rows"],
                "seats_per_row": d["seats_per_row"],
                "business_rows": d["business_rows"],
            }
        )
        airplanes.append(airplane)
        if created:
            print(f"   ✅ {d['model']}")
    print(f"   Итого самолётов в БД: {Airplane.objects.count()}")
    return airplanes

def random_price(base: int) -> int:
    return int(base * random.uniform(0.8, 1.25) / 500) * 500

def random_dep_time() -> time:
    return time(
        random.choice([6, 8, 9, 10, 12, 14, 16, 18, 20, 22]),
        random.choice([0, 15, 30, 45])
    )

def create_flights(airports, airplanes, start_date, end_date):
    print(f"\n🛫 Создаю рейсы с {start_date} по {end_date}...")
    created_count = 0
    current = start_date

    while current <= end_date:
        for (orig_iata, dest_iata, duration, base_price) in ROUTES:
            orig_ap = airports.get(orig_iata)
            dest_ap = airports.get(dest_iata)
            if not orig_ap or not dest_ap:
                continue

            for _ in range(random.randint(2, 4)):
                dep_time = random_dep_time()
                dep_dt   = timezone.make_aware(datetime.combine(current, dep_time))
                arr_dt   = dep_dt + timedelta(minutes=duration + random.randint(-10, 15))

                Flight.objects.create(
                    origin=orig_ap,
                    destination=dest_ap,
                    departure_time=dep_dt,
                    arrival_time=arr_dt,
                    price=random_price(base_price),
                    status="scheduled",
                    airplane=random.choice(airplanes),
                )
                created_count += 1

        current += timedelta(days=1)

        if (current - start_date).days % 10 == 0:
            print(f"   📅 {current} — создано: {created_count}")

    print(f"\n✅ Готово! Всего создано рейсов: {created_count}")


# ════════════════════════════════════════════════════════════

if __name__ == "__main__":
    print("=" * 50)
    print("  SkyTravel — заполнение базы данных")
    print("=" * 50)

    airports  = create_airports()
    airplanes = create_airplanes()

    if not airplanes:
        print("❌ Самолёты не созданы! Проверь модель Airplane")
        exit(1)

    create_flights(
        airports=airports,
        airplanes=airplanes,
        start_date=date(2026, 4, 1),
        end_date=date(2026, 6, 30),
    )

    total = Flight.objects.filter(status="scheduled").count()
    print(f"\n📊 Всего рейсов в БД: {total}")