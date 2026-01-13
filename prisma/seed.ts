import { PrismaClient, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash('password123', 10);

  // ユーザーを作成
  const users = await prisma.user.createMany({
    data: [
      { name: '田中太郎', email: 'tanaka@example.com', password: hashedPassword, role: 'user' },
      { name: '山田花子', email: 'yamada@example.com', password: hashedPassword, role: 'admin' },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${users.count} users`);

  // 商品を作成
  const products = await prisma.product.createMany({
    data: [
      { name: 'ノートPC', price: new Prisma.Decimal(120000), stock: 10 },
      { name: 'マウス', price: new Prisma.Decimal(3000), stock: 50 },
      { name: 'キーボード', price: new Prisma.Decimal(8000), stock: 30 },
      { name: 'モニター', price: new Prisma.Decimal(45000), stock: 15 },
    ],
    skipDuplicates: true,
  });
  console.log(`Created ${products.count} products`);

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
