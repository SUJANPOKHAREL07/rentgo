import { PrismaClient, Role, VehicleFuelType, VehicleStatus, VehicleTransmission } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Starting database seeding...");

  // 1. Password hashing
  const defaultPassword = "password123";
  const hashedPassword = await bcrypt.hash(defaultPassword, 10);

  // 2. Seed Admin
  console.log("👤 Seeding admin account...");
  const admin = await prisma.admin.upsert({
    where: { email: "admin@rentgo.com" },
    update: {},
    create: {
      ownername: "admin",
      email: "admin@rentgo.com",
      passowrd: hashedPassword,
      verified: true,
      role: Role.admin,
      updatedAt: new Date(),
    },
  });
  console.log(`✅ Admin created: ${admin.email} (password: ${defaultPassword})`);

  // 3. Seed Users
  console.log("👥 Seeding demo user...");
  const demoUser = await prisma.user.upsert({
    where: { email: "user@rentgo.com" },
    update: {},
    create: {
      username: "sujan",
      email: "user@rentgo.com",
      password: hashedPassword,
      verified: true,
      role: Role.user,
      updateAt: new Date(),
    },
  });
  console.log(`✅ User created: ${demoUser.email} (password: ${defaultPassword})`);

  // 4. Seed Categories
  console.log("🚗 Seeding categories...");
  const categoryNames = ["SUV", "Sedan", "Hatchback", "Electric", "Luxury", "Bike"];
  const categoryMap = new Map<string, number>();

  for (const name of categoryNames) {
    const category = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    });
    categoryMap.set(name, category.c_id);
  }
  console.log(`✅ Created ${categoryMap.size} categories.`);

  // 5. Seed Vehicles (using existing vehicle images from uploads/vehicles)
  console.log("🚙 Seeding vehicles...");
  const vehiclesData = [
    {
      name: "Toyota RAV4 Prime",
      brand: "Toyota",
      model: "2024",
      description: "Comfortable and fuel-efficient plug-in hybrid compact SUV with all-wheel drive, premium audio, and advanced safety features.",
      licensePlate: "BA-02-PA-1024",
      vin: "2T3P1RFV5PW102401",
      mileage: 12500,
      fuelType: VehicleFuelType.HYBRID,
      transmission: VehicleTransmission.AUTOMATIC,
      seatingCapacity: 5,
      dailyRate: 75.0,
      status: VehicleStatus.AVAILABLE,
      image: "1756744159003-498366660.jpg",
      image1: "1756820263015-756514893.jpg",
      image2: "1756820263047-937356488.jpg",
      categoryName: "SUV",
    },
    {
      name: "Hyundai Creta SX",
      brand: "Hyundai",
      model: "2023",
      description: "Popular compact SUV offering a smooth ride, panoramic sunroof, ventilated front seats, and spacious boot space.",
      licensePlate: "BA-03-CHA-4589",
      vin: "MALC51BV8PW458902",
      mileage: 22000,
      fuelType: VehicleFuelType.PETROL,
      transmission: VehicleTransmission.MANUAL,
      seatingCapacity: 5,
      dailyRate: 55.0,
      status: VehicleStatus.AVAILABLE,
      image: "1757157283040-123254926.jpg",
      image1: "1757157283066-643566168.jpg",
      image2: "1757157305710-340449098.jpg",
      categoryName: "SUV",
    },
    {
      name: "Tesla Model 3 Long Range",
      brand: "Tesla",
      model: "2024",
      description: "All-electric performance sedan with instant acceleration, Autopilot, 15-inch touchscreen display, and whisper-quiet ride.",
      licensePlate: "BA-01-EA-3321",
      vin: "5YJ3E1EB8NF332103",
      mileage: 8000,
      fuelType: VehicleFuelType.ELECTRIC,
      transmission: VehicleTransmission.AUTOMATIC,
      seatingCapacity: 5,
      dailyRate: 110.0,
      status: VehicleStatus.AVAILABLE,
      image: "1757158082639-667485123.jpg",
      image1: "1757158091969-226606191.jpg",
      image2: "1757158169534-388291949.jpg",
      categoryName: "Electric",
    },
    {
      name: "Honda Civic Touring",
      brand: "Honda",
      model: "2023",
      description: "Sleek and sporty compact sedan with turbocharged engine, leather-trimmed seats, Apple CarPlay, and superb highway mileage.",
      licensePlate: "BA-02-PA-8890",
      vin: "1HGCV1F34PA889004",
      mileage: 18000,
      fuelType: VehicleFuelType.PETROL,
      transmission: VehicleTransmission.AUTOMATIC,
      seatingCapacity: 5,
      dailyRate: 60.0,
      status: VehicleStatus.AVAILABLE,
      image: "1757158940489-779506326.jpg",
      image1: "1757158940494-743520802.png",
      image2: "1757158972864-326677735.jpg",
      categoryName: "Sedan",
    },
    {
      name: "Mercedes-Benz C-Class",
      brand: "Mercedes-Benz",
      model: "2023",
      description: "Executive luxury sedan with mild-hybrid turbo engine, Burmester 3D sound, ambient interior lighting, and cutting-edge MBUX system.",
      licensePlate: "BA-01-VIP-7700",
      vin: "WDDWF8DB9PN770005",
      mileage: 14000,
      fuelType: VehicleFuelType.PETROL,
      transmission: VehicleTransmission.AUTOMATIC,
      seatingCapacity: 5,
      dailyRate: 140.0,
      status: VehicleStatus.AVAILABLE,
      image: "1757159038507-855394519.jpg",
      image1: "1757159038518-93988755.jpg",
      image2: "1757159160545-945528667.jpg",
      categoryName: "Luxury",
    },
    {
      name: "Suzuki Swift GLX",
      brand: "Suzuki",
      model: "2022",
      description: "Agile, economic, and easy-to-park city hatchback. Great fuel economy, keyless entry, and touchscreen infotainment.",
      licensePlate: "BA-03-PA-6512",
      vin: "TSMZC13S3NN651206",
      mileage: 31000,
      fuelType: VehicleFuelType.PETROL,
      transmission: VehicleTransmission.MANUAL,
      seatingCapacity: 5,
      dailyRate: 40.0,
      status: VehicleStatus.AVAILABLE,
      image: "1757159270303-204246746.jpg",
      image1: "1757159270307-176657906.jpg",
      image2: "1757159270308-55820595.jpg",
      categoryName: "Hatchback",
    },
    {
      name: "Royal Enfield Himalayan 450",
      brand: "Royal Enfield",
      model: "2024",
      description: "Rugged adventure touring motorcycle built for mountains and off-road trails. 452cc Sherpa liquid-cooled engine with Google maps navigation display.",
      licensePlate: "BA-02-B-9944",
      vin: "ME3SH4508PW994407",
      mileage: 4500,
      fuelType: VehicleFuelType.PETROL,
      transmission: VehicleTransmission.MANUAL,
      seatingCapacity: 2,
      dailyRate: 35.0,
      status: VehicleStatus.AVAILABLE,
      image: "1762313900805-877669862.jpg",
      image1: "1762314174515-315287802.jpg",
      image2: "1762314267662-300655840.jpg",
      categoryName: "Bike",
    },
  ];

  for (const v of vehiclesData) {
    const categoryId = categoryMap.get(v.categoryName);
    if (!categoryId) continue;

    const { categoryName, ...vehicleFields } = v;

    await prisma.vehicle.upsert({
      where: { licensePlate: v.licensePlate },
      update: {},
      create: {
        ...vehicleFields,
        categoryId,
        updatedAt: new Date(),
      },
    });
  }

  console.log(`✅ Seeded ${vehiclesData.length} vehicles.`);
  console.log("✨ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
